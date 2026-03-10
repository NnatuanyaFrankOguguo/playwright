# Zerostep Setup Guide (No Docker!)

Zerostep is an AI-powered testing tool that integrates directly with Playwright. **No Docker required!**

## ✨ Why Zerostep?

- ✅ No Docker needed
- ✅ No external server required
- ✅ Works directly with Playwright
- ✅ Simple setup (just API key)
- ✅ Natural language test instructions

## 🚀 Quick Start (2 Steps)

### Step 1: Get API Key

Get your Zerostep API key:
1. Go to https://zerostep.ai/
2. Sign up (free)
3. Get your API key from the dashboard

### Step 2: Set Environment Variable

Add your API key to `.env`:

```env
ZEROSTEP_API_KEY=your_api_key_here
```

Or set it as an environment variable:

```bash
# Windows
set ZEROSTEP_API_KEY=your_api_key_here

# macOS/Linux
export ZEROSTEP_API_KEY=your_api_key_here
```

### Step 3: Run Tests

```bash
npx playwright test tests/mygatheringhelpsupportticket.zerostep.spec.ts
```

That's it! 🎉

---

## 📖 Zerostep Syntax

### Basic Actions

```typescript
const zs = new ZeroStep(page);

// Perform actions
await zs.action('Click the Next button');
await zs.action('Fill the email field with "user@example.com"');
await zs.action('Scroll down to see more content');
```

### Complex Actions

```typescript
// Chain multiple actions
await zs.action('Click Support, then click Help, then click "Create a Case"');

// Actions with variables
const username = 'john.doe';
const password = 'secret123';
await zs.action(`Sign in with username "${username}" and password "${password}"`);
```

### Verification

```typescript
// Check if something exists or is visible
const result = await zs.check('The success message is displayed');
console.log('Check result:', result);

// Check with specific text
await zs.check(`The page shows ticket with title "${TICKET_TITLE}"`);
```

---

## 🎯 Zerostep vs Playwright

### Traditional Playwright
```typescript
await page.getByRole('button', { name: 'Next' }).click();
await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
```

### Zerostep
```typescript
const zs = new ZeroStep(page);
await zs.action('Click the Next button');
await zs.action('Fill the email field with "user@example.com"');
```

---

## 📝 Complete Example

```typescript
import { test } from '@playwright/test';
import { ZeroStep } from '@zerostep/playwright';

test('create ticket with zerostep', async ({ page }) => {
  const zs = new ZeroStep(page);

  // Navigate
  await page.goto('https://example.com');

  // Sign in
  await zs.action('Sign in with username "john" and password "pass123"');

  // Create ticket
  await zs.action('Click Create New Ticket');
  await zs.action('Fill Title with "My Test Ticket"');
  await zs.action('Fill Description with "Testing zerostep"');
  await zs.action('Click Submit');

  // Verify
  const verified = await zs.check('The ticket is created successfully');
  console.log('Result:', verified);
});
```

---

## 🔍 API Reference

### `new ZeroStep(page)`

Initialize Zerostep with a Playwright page:

```typescript
import { ZeroStep } from '@zerostep/playwright';

const zs = new ZeroStep(page);
```

### `zs.action(instruction: string): Promise<string>`

Performs actions based on natural language:

```typescript
const result = await zs.action('Click the button');
console.log('Result:', result);  // Returns what was done
```

### `zs.check(assertion: string): Promise<boolean>`

Verifies if something is true:

```typescript
const isVisible = await zs.check('The success message is displayed');
if (isVisible) {
  console.log('✅ Assertion passed');
}
```

---

## 🐛 Troubleshooting

### "ZEROSTEP_API_KEY not found"

**Solution**: Make sure your `.env` file has:
```env
ZEROSTEP_API_KEY=your_key_here
```

And load it with dotenv:
```typescript
import dotenv from 'dotenv';
dotenv.config();
```

### "Action failed: Element not found"

**Solution**: Be more specific:
```typescript
// Instead of:
await zs.action('Fill the field');

// Use:
await zs.action('Fill the Title field with "My Text"');
```

### Tests are slow

**Normal behavior** - AI-powered tests take longer. Zerostep is still much faster than Alumnium since it doesn't need Docker.

Typical timing:
- Simple action: 2-5 seconds
- Complex action: 5-10 seconds
- Check: 2-5 seconds

---

## 🔄 GitHub Actions Integration

Create `.github/workflows/zerostep-tests.yml`:

```yaml
name: Zerostep Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci

      - run: npx playwright install --with-deps

      - name: Run Zerostep tests
        run: npx playwright test tests/mygatheringhelpsupportticket.zerostep.spec.ts
        env:
          ZEROSTEP_API_KEY: ${{ secrets.ZEROSTEP_API_KEY }}
          CHURCH_USERNAME: ${{ secrets.CHURCH_USERNAME }}
          CHURCH_PASSWORD: ${{ secrets.CHURCH_PASSWORD }}
          LOGIN_EMAIL: ${{ secrets.LOGIN_EMAIL }}

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

Then add `ZEROSTEP_API_KEY` to your GitHub repository secrets.

---

## ✅ Files

- `tests/mygatheringhelpsupportticket.zerostep.spec.ts` - Your test with Zerostep
- `.env` - Configuration (update with your API key)

## 📚 Resources

- [Zerostep Website](https://zerostep.ai/)
- [Zerostep Documentation](https://zerostep.ai/docs)
- [Zerostep GitHub](https://github.com/zerostep-ai/playwright)

---

## 🎯 Next Steps

1. ✅ Get Zerostep API key from https://zerostep.ai/
2. ✅ Add key to `.env` file
3. ✅ Run: `npx playwright test tests/mygatheringhelpsupportticket.zerostep.spec.ts`
4. ✅ Watch your tests run with natural language! 🚀
