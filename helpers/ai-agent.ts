/**
 * AI Agent Helper — Playwright + OpenAI LLM
 *
 * Uses the same technique as @playwright/mcp under the hood:
 * 1. Reads the page accessibility snapshot
 * 2. Sends it to OpenAI (GPT-4o) with your natural language instruction
 * 3. The LLM decides which Playwright actions to perform via tool calls
 * 4. Executes them via getByRole() / keyboard APIs (click, fill, navigate, assert, etc.)
 * 5. Loops until the instruction is fulfilled
 *
 * Usage:
 *   const ai = createAI(page);
 *   await ai("Click the login button and fill in 'admin' for username");
 */

import OpenAI from 'openai';
import type {
  ChatCompletionTool,
  ChatCompletionMessageParam,
  ChatCompletionToolMessageParam,
  ChatCompletionMessageFunctionToolCall,
} from 'openai/resources/chat/completions';
import type { Page } from '@playwright/test';

// ── Tool definitions (OpenAI function-calling format) ────────────────────────

const tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'click',
      description:
        'Click an element on the page. Identify it by its ARIA role and accessible name from the accessibility snapshot.',
      parameters: {
        type: 'object',
        properties: {
          role: {
            type: 'string',
            description:
              'ARIA role exactly as it appears in the snapshot (e.g. button, link, menuitem, tab, textbox, heading, gridcell, row, checkbox, radio, combobox, option)',
          },
          name: {
            type: 'string',
            description:
              'Accessible name of the element — must be an exact or partial match from the snapshot',
          },
          exact: {
            type: 'boolean',
            description: 'Whether the name must match exactly (default false — substring match)',
          },
        },
        required: ['role', 'name'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'fill',
      description: 'Clear a text field and type a new value into it.',
      parameters: {
        type: 'object',
        properties: {
          role: {
            type: 'string',
            description: 'ARIA role of the input (usually textbox, combobox, or searchbox)',
          },
          name: {
            type: 'string',
            description: 'Accessible name / label of the input field',
          },
          value: {
            type: 'string',
            description: 'Text to type into the field',
          },
        },
        required: ['role', 'name', 'value'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'select_option',
      description: 'Select an option from a dropdown / select element.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Accessible name of the select / combobox' },
          option: { type: 'string', description: 'Option text to select' },
        },
        required: ['name', 'option'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'check',
      description: 'Check or uncheck a checkbox.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Accessible name of the checkbox' },
          checked: { type: 'boolean', description: 'true to check, false to uncheck' },
        },
        required: ['name', 'checked'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'press_key',
      description: 'Press a keyboard key (Enter, Tab, Escape, ArrowDown, etc.).',
      parameters: {
        type: 'object',
        properties: {
          key: { type: 'string', description: "Key name, e.g. 'Enter', 'Tab', 'Escape'" },
        },
        required: ['key'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_by_text_click',
      description:
        'Click an element by its visible text content. Use when the accessibility snapshot does not expose a useful role/name for the target element.',
      parameters: {
        type: 'object',
        properties: {
          text: { type: 'string', description: 'Visible text of the element to click' },
          exact: { type: 'boolean', description: 'Exact match (default false)' },
        },
        required: ['text'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'fill_by_label',
      description:
        'Fill an input field by its associated label text. Use this when the ARIA snapshot does not show the input with a clear role/name, but a visible label is present near the field.',
      parameters: {
        type: 'object',
        properties: {
          label: { type: 'string', description: 'The visible label text near the input field' },
          value: { type: 'string', description: 'Text to type into the field' },
        },
        required: ['label', 'value'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'fill_by_placeholder',
      description:
        'Fill an input field by its placeholder text. Use when label-based approaches fail.',
      parameters: {
        type: 'object',
        properties: {
          placeholder: { type: 'string', description: 'The placeholder text of the input' },
          value: { type: 'string', description: 'Text to type into the field' },
        },
        required: ['placeholder', 'value'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'fill_by_selector',
      description:
        'Fill an input/textarea by CSS selector. Use as a last resort when ARIA, label, and placeholder approaches all fail. The selector is from the form fields listing in the snapshot.',
      parameters: {
        type: 'object',
        properties: {
          selector: { type: 'string', description: 'CSS selector for the input element (e.g. "#title", "textarea[name=description]", "input[id=title]")' },
          value: { type: 'string', description: 'Text to type into the field' },
        },
        required: ['selector', 'value'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'click_by_selector',
      description:
        'Click an element by CSS selector. Use as a fallback when ARIA role/name and text-based clicks fail.',
      parameters: {
        type: 'object',
        properties: {
          selector: { type: 'string', description: 'CSS selector for the element to click' },
        },
        required: ['selector'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'fill_in_iframe',
      description:
        'Fill a text field INSIDE an iframe. Use this when the snapshot shows an iframe section with form fields inside it.',
      parameters: {
        type: 'object',
        properties: {
          iframe_selector: {
            type: 'string',
            description: 'CSS selector for the iframe element (e.g. \'iframe[title="Create New"]\' )',
          },
          role: {
            type: 'string',
            description: 'ARIA role of the input inside the iframe (usually textbox)',
          },
          name: {
            type: 'string',
            description: 'Accessible name of the input inside the iframe',
          },
          value: {
            type: 'string',
            description: 'Text to type into the field',
          },
        },
        required: ['iframe_selector', 'role', 'name', 'value'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'click_in_iframe',
      description:
        'Click an element INSIDE an iframe. Use this when the target element is inside an iframe shown in the snapshot.',
      parameters: {
        type: 'object',
        properties: {
          iframe_selector: {
            type: 'string',
            description: 'CSS selector for the iframe element (e.g. \'iframe[title="Create New"]\' )',
          },
          role: {
            type: 'string',
            description: 'ARIA role of the element inside the iframe',
          },
          name: {
            type: 'string',
            description: 'Accessible name of the element inside the iframe',
          },
        },
        required: ['iframe_selector', 'role', 'name'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'navigate',
      description:
        'Navigate the browser to a URL. Use for going to a new page, following a redirect, or loading a specific address.',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'The full URL to navigate to (e.g. https://example.com/dashboard)',
          },
        },
        required: ['url'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'assert_visible',
      description:
        'Assert that an element with the given role and name is visible on the page. Fails if the element is not found or not visible within the timeout.',
      parameters: {
        type: 'object',
        properties: {
          role: {
            type: 'string',
            description: 'ARIA role of the element to assert (e.g. button, heading, gridcell, link, textbox)',
          },
          name: {
            type: 'string',
            description: 'Accessible name or text content of the element',
          },
          exact: {
            type: 'boolean',
            description: 'Whether the name must match exactly (default false)',
          },
        },
        required: ['role', 'name'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'assert_text_visible',
      description:
        'Assert that specific text content is visible somewhere on the page. Fails if the text is not found or not visible.',
      parameters: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'The text content to look for on the page',
          },
          exact: {
            type: 'boolean',
            description: 'Whether the text must match exactly (default false)',
          },
        },
        required: ['text'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'assert_url',
      description:
        'Assert that the current page URL contains or matches a given string. Useful for verifying navigation landed on the correct page.',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'The URL or URL substring that the current page URL should contain',
          },
        },
        required: ['url'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'wait',
      description: 'Wait for the page to settle (e.g. after navigation or animations).',
      parameters: {
        type: 'object',
        properties: {
          milliseconds: {
            type: 'number',
            description: 'Milliseconds to wait (default 2000, max 10000)',
          },
        },
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'done',
      description: 'Call this when the instruction has been fully completed.',
      parameters: {
        type: 'object',
        properties: {
          summary: { type: 'string', description: 'Brief summary of what was accomplished' },
        },
        required: ['summary'],
      },
    },
  },
];

// ── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a browser automation agent. You control a web browser through structured tool calls.

You will receive:
1. An accessibility snapshot of the current page (JSON tree of ARIA roles, names, values)
2. A natural language instruction describing what the user wants done

Your job:
- Examine the snapshot to understand the current page state.
- Call one tool at a time to perform the next action toward completing the instruction.
- After each tool call you will receive the result and an updated snapshot.
- When the instruction is fully completed, call the "done" tool.

Rules:
- Use EXACT names from the snapshot when calling click/fill tools.
- If an element is not visible in the snapshot, try scrolling or waiting first.
- If a click doesn't seem to work, try get_by_text_click or click_by_selector as a fallback.
- Use navigate() to go to a URL when the instruction asks to open or go to a page.
- Use assert_visible(), assert_text_visible(), or assert_url() to verify page state when the instruction asks you to check, verify, or confirm something.
- IMPORTANT: For form fields, the ARIA snapshot may not show inputs clearly (especially in Power Apps / Dynamics portals). Check the "Form Fields" section of the snapshot — it lists all visible input/textarea/select elements with their id, name, placeholder, type, and nearby label.
- When fill() doesn't work, try these in order: fill_by_label → fill_by_placeholder → fill_by_selector.
- CRITICAL: The page may contain iframes. The snapshot will have a section titled "### Iframe: ..." for each visible iframe. When form fields or buttons are INSIDE an iframe, you MUST use fill_in_iframe or click_in_iframe tools with the iframe CSS selector shown in the snapshot header. Regular fill/click tools will NOT find elements inside iframes.
- Do not assume page structure — always read the snapshot.
- Perform only what is asked; do not take extra actions.
- NEVER call done until you have actually performed the requested action. If you cannot find the target element, try alternative tools before giving up.`;

// ── Helpers ──────────────────────────────────────────────────────────────────

async function getSnapshot(page: Page): Promise<string> {
  let ariaSnap = '';
  try {
    const snap = await page.locator('body').ariaSnapshot();
    if (snap) ariaSnap = snap;
  } catch {
    // fall through
  }

  // Also collect visible form fields (inputs, textareas, selects) with their attributes
  // This is critical for Power Apps / Dynamics portals where ARIA doesn't expose fields well
  let formFields = '';
  try {
    formFields = await page.evaluate(() => {
      const fields: string[] = [];
      document.querySelectorAll('input, textarea, select').forEach((el) => {
        const htmlEl = el as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        if (htmlEl.offsetParent === null) return; // skip hidden
        const tag = htmlEl.tagName.toLowerCase();
        const type = htmlEl.getAttribute('type') || '';
        const id = htmlEl.id || '';
        const name = htmlEl.getAttribute('name') || '';
        const placeholder = htmlEl.getAttribute('placeholder') || '';
        const ariaLabel = htmlEl.getAttribute('aria-label') || '';
        const value = htmlEl.value || '';

        // Find nearby label
        let labelText = '';
        if (id) {
          const label = document.querySelector(`label[for="${CSS.escape(id)}"]`);
          if (label) labelText = (label.textContent || '').trim();
        }
        if (!labelText) {
          const closestLabel = htmlEl.closest('label');
          if (closestLabel) labelText = (closestLabel.textContent || '').trim();
        }
        if (!labelText) {
          // Check preceding siblings / parent for label-like text
          const prev = htmlEl.previousElementSibling;
          if (prev && (prev.tagName === 'LABEL' || prev.tagName === 'SPAN' || prev.tagName === 'DIV')) {
            labelText = (prev.textContent || '').trim();
          }
        }

        fields.push(
          `  ${tag}${type ? `[type=${type}]` : ''} id="${id}" name="${name}" placeholder="${placeholder}" aria-label="${ariaLabel}" label="${labelText}" value="${value}"`
        );
      });
      return fields.length ? fields.join('\n') : '(no visible form fields)';
    });
  } catch {
    formFields = '(could not read form fields)';
  }

  // Scan iframes for their content — this is critical for Power Apps portals
  // that open forms in iframes (e.g. "Create New" dialog)
  let iframeContent = '';
  try {
    const iframes = page.locator('iframe');
    const count = await iframes.count();
    for (let i = 0; i < count; i++) {
      const iframe = iframes.nth(i);
      const isVisible = await iframe.isVisible().catch(() => false);
      if (!isVisible) continue;

      const title = await iframe.getAttribute('title') || '';
      const src = await iframe.getAttribute('src') || '';
      const iframeSelector = title
        ? `iframe[title="${title}"]`
        : src
          ? `iframe[src="${src}"]`
          : `iframe:nth-of-type(${i + 1})`;

      try {
        const frame = iframe.contentFrame();
        // Get ARIA snapshot of the iframe content
        let iframeAria = '';
        try {
          iframeAria = await frame.locator('body').ariaSnapshot();
        } catch { /* ignore */ }

        // Get form fields inside iframe by evaluating within the iframe's context
        let iframeFields = '';
        try {
          // Use the frame's locator to find form elements and extract their info
          const inputs = frame.locator('input, textarea, select');
          const inputCount = await inputs.count();
          const fieldLines: string[] = [];
          for (let j = 0; j < inputCount; j++) {
            const el = inputs.nth(j);
            const isVis = await el.isVisible().catch(() => false);
            if (!isVis) continue;
            const tag = await el.evaluate(e => e.tagName.toLowerCase());
            const type = await el.getAttribute('type') || '';
            const id = await el.getAttribute('id') || '';
            const elName = await el.getAttribute('name') || '';
            const placeholder = await el.getAttribute('placeholder') || '';
            const ariaLabel = await el.getAttribute('aria-label') || '';
            fieldLines.push(
              `  ${tag}${type ? `[type=${type}]` : ''} id="${id}" name="${elName}" placeholder="${placeholder}" aria-label="${ariaLabel}"`
            );
          }
          iframeFields = fieldLines.length ? fieldLines.join('\n') : '';
        } catch { /* ignore */ }

        if (iframeAria || iframeFields) {
          iframeContent += `\n\n### Iframe: ${iframeSelector}\n`;
          if (iframeAria) iframeContent += `ARIA:\n${iframeAria}\n`;
          if (iframeFields) iframeContent += `Form Fields:\n${iframeFields}\n`;
          iframeContent += `(Use fill_in_iframe / click_in_iframe with iframe_selector="${iframeSelector}" to interact)`;
        }
      } catch { /* skip inaccessible iframe */ }
    }
  } catch {
    // ignore iframe scanning errors
  }

  const parts: string[] = [];
  if (ariaSnap) parts.push(`### ARIA Snapshot\n${ariaSnap}`);
  parts.push(`### Form Fields\n${formFields}`);
  if (iframeContent) parts.push(iframeContent);
  if (!ariaSnap && !formFields) {
    parts.push(JSON.stringify({ url: page.url(), title: await page.title() }));
  }
  return parts.join('\n\n');
}

type ToolInput = Record<string, unknown>;

async function executeTool(page: Page, name: string, input: ToolInput): Promise<string> {
  const asRole = (r: unknown) => r as Parameters<Page['getByRole']>[0];

  switch (name) {
    case 'click': {
      const opts: Record<string, unknown> = {};
      if (input.name) opts.name = input.name as string;
      if (input.exact !== undefined) opts.exact = input.exact as boolean;
      await page.getByRole(asRole(input.role), opts).first().click();
      return `Clicked ${input.role} "${input.name}"`;
    }

    case 'fill': {
      const opts: Record<string, unknown> = {};
      if (input.name) opts.name = input.name as string;
      await page.getByRole(asRole(input.role), opts).first().fill(input.value as string);
      return `Filled ${input.role} "${input.name}" with "${input.value}"`;
    }

    case 'select_option': {
      await page
        .getByRole('combobox', { name: input.name as string })
        .first()
        .selectOption(input.option as string);
      return `Selected "${input.option}" in "${input.name}"`;
    }

    case 'check': {
      const cb = page.getByRole('checkbox', { name: input.name as string }).first();
      if (input.checked) await cb.check();
      else await cb.uncheck();
      return `${input.checked ? 'Checked' : 'Unchecked'} "${input.name}"`;
    }

    case 'press_key': {
      await page.keyboard.press(input.key as string);
      return `Pressed key "${input.key}"`;
    }

    case 'get_by_text_click': {
      await page
        .getByText(input.text as string, { exact: (input.exact as boolean) ?? false })
        .first()
        .click();
      return `Clicked text "${input.text}"`;
    }

    case 'fill_by_label': {
      await page.getByLabel(input.label as string).first().fill(input.value as string);
      return `Filled field with label "${input.label}" with "${input.value}"`;
    }

    case 'fill_by_placeholder': {
      await page.getByPlaceholder(input.placeholder as string).first().fill(input.value as string);
      return `Filled field with placeholder "${input.placeholder}" with "${input.value}"`;
    }

    case 'fill_by_selector': {
      const el = page.locator(input.selector as string).first();
      await el.click();
      await el.fill(input.value as string);
      return `Filled "${input.selector}" with "${input.value}"`;
    }

    case 'click_by_selector': {
      await page.locator(input.selector as string).first().click();
      return `Clicked selector "${input.selector}"`;
    }

    case 'fill_in_iframe': {
      const frame = page.locator(input.iframe_selector as string).contentFrame();
      const opts: Record<string, unknown> = {};
      if (input.name) opts.name = input.name as string;
      const el = frame.getByRole(asRole(input.role), opts).first();
      await el.click();
      await el.fill(input.value as string);
      return `Filled ${input.role} "${input.name}" with "${input.value}" inside iframe "${input.iframe_selector}"`;
    }

    case 'click_in_iframe': {
      const frame = page.locator(input.iframe_selector as string).contentFrame();
      const opts: Record<string, unknown> = {};
      if (input.name) opts.name = input.name as string;
      await frame.getByRole(asRole(input.role), opts).first().click();
      return `Clicked ${input.role} "${input.name}" inside iframe "${input.iframe_selector}"`;
    }

    case 'navigate': {
      const url = input.url as string;
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      return `Navigated to ${url}`;
    }

    case 'assert_visible': {
      const opts: Record<string, unknown> = {};
      if (input.name) opts.name = input.name as string;
      if (input.exact !== undefined) opts.exact = input.exact as boolean;
      const el = page.getByRole(asRole(input.role), opts).first();
      await el.waitFor({ state: 'visible', timeout: 10_000 });
      return `Assertion passed: ${input.role} "${input.name}" is visible`;
    }

    case 'assert_text_visible': {
      const el = page.getByText(input.text as string, { exact: (input.exact as boolean) ?? false }).first();
      await el.waitFor({ state: 'visible', timeout: 10_000 });
      return `Assertion passed: text "${input.text}" is visible`;
    }

    case 'assert_url': {
      const currentUrl = page.url();
      const expected = input.url as string;
      if (!currentUrl.includes(expected)) {
        throw new Error(`URL assertion failed: expected current URL to contain "${expected}" but got "${currentUrl}"`);
      }
      return `Assertion passed: URL contains "${expected}" (current: ${currentUrl})`;
    }

    case 'wait': {
      const ms = Math.min((input.milliseconds as number) || 2000, 10_000);
      await page.waitForTimeout(ms);
      return `Waited ${ms}ms`;
    }

    default:
      return `Unknown tool: ${name}`;
  }
}

// ── Public API ───────────────────────────────────────────────────────────────

export interface AIOptions {
  /** OpenAI model to use (default: gpt-4o) */
  model?: string;
  /** Print progress to console (default: true) */
  verbose?: boolean;
  /** Max agent loop iterations (default: 15) */
  maxIterations?: number;
  /** Milliseconds to wait after each action for page to settle (default: 1000) */
  settleTimeout?: number;
}

/**
 * Create an `ai()` function bound to a Playwright Page.
 *
 * ```ts
 * const ai = createAI(page);
 * await ai("Click the Sign In button, enter 'admin' as the username, and submit");
 * ```
 */
export function createAI(page: Page, options?: AIOptions) {
  const client = new OpenAI(); // reads OPENAI_API_KEY from env
  const model = options?.model ?? 'gpt-4o';
  const verbose = options?.verbose ?? true;
  const maxIterations = options?.maxIterations ?? 15;
  const settleTimeout = options?.settleTimeout ?? 1000;

  return async function ai(instruction: string): Promise<void> {
    if (verbose) console.log(`\n🤖 AI: "${instruction}"`);

    // Initial snapshot
    const snapshot = await getSnapshot(page);

    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: `## Current Page (${page.url()})\n\n### Accessibility Snapshot\n\`\`\`json\n${snapshot}\n\`\`\`\n\n### Instruction\n${instruction}`,
      },
    ];

    for (let i = 0; i < maxIterations; i++) {
      const response = await client.chat.completions.create({
        model,
        max_tokens: 2048,
        tools,
        messages,
      });

      const choice = response.choices[0];

      // Push assistant reply into conversation
      messages.push(choice.message);

      // If the model stopped without tool calls, we're done
      if (choice.finish_reason === 'stop' || !choice.message.tool_calls?.length) {
        if (verbose) console.log('✅ AI completed');
        return;
      }

      // Process each tool call
      const toolResults: ChatCompletionToolMessageParam[] = [];

      for (const toolCall of choice.message.tool_calls) {
        const fn = (toolCall as ChatCompletionMessageFunctionToolCall).function;
        const fnName = fn.name;
        const args = JSON.parse(fn.arguments) as ToolInput;

        // "done" tool → we're finished
        if (fnName === 'done') {
          const summary = args.summary ?? 'completed';
          if (verbose) console.log(`✅ AI done: ${summary}`);
          return;
        }

        try {
          const result = await executeTool(page, fnName, args);
          if (verbose) console.log(`   → ${result}`);

          // Let the page settle
          await page.waitForTimeout(settleTimeout);

          // Fresh snapshot for the LLM
          const newSnapshot = await getSnapshot(page);

          toolResults.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: `Success: ${result}\n\nUpdated page (${page.url()}):\n\`\`\`json\n${newSnapshot}\n\`\`\``,
          });
        } catch (error: unknown) {
          const msg = error instanceof Error ? error.message : String(error);
          if (verbose) console.log(`   ⚠ Error: ${msg}`);
          toolResults.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: `Error: ${msg}. Try a different approach — re-read the snapshot carefully.`,
          });
        }
      }

      messages.push(...toolResults);
    }

    throw new Error(`AI agent exceeded max iterations (${maxIterations}) for: "${instruction}"`);
  };
}
