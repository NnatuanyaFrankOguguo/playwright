// import { test } from '@playwright/test';
// import { createAI } from '../helpers/ai-agent';
// import process from 'process';

// // Playwright + Claude LLM test
// // Uses AI agent to translate natural language → Playwright actions at runtime
// // Requires ANTHROPIC_API_KEY in .env

// const CHURCH_USERNAME = process.env.CHURCH_USERNAME!;
// const CHURCH_PASSWORD = process.env.CHURCH_PASSWORD!;

// const nowTime = Date.now();
// const TICKET_TITLE = `Testing Playwright Test ${nowTime}`;

// test('create support ticket with AI agent', async ({ page }) => {
//   // Create the ai() function — bound to this page
//   const ai = createAI(page);

//   // Navigate to login page — using the AI agent
//   await ai('Navigate to https://id.churchofjesuschrist.org/oauth2/default/v1/authorize?client_id=0oa1bufvsjns2bSz2358&redirect_uri=https%3A%2F%2Fmygatherings-anth-dev.powerappsportals.com%2Fsignin-openid_1&response_type=code&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DPH4dNSBOMtM0_QPvsSNrmtzbvaUl_FSFN8oPV2C6vzmjpbaVnvSnochKOuPozMRyfdHoBM86rgdaC_vUpI9H5pyllGpLcyFYgaqwwOM8WTWDeRALek7qrobikWqqJ5qDKXWIdupqUKd8lsZpllW_Q7k0Eimd9ioGz1AKlsR3Z5vZXFrsZwQ4XhwNovXp_cNVaE2NOoPSUFnrPz-LUwN0c2ETKJ3pya9iicsZnbOnjR1KgaZLUdfrTm7OL-5Z64sMR0-MYL1Hudr-IY-sOlfhwfBQv-QkhmPy8mLb1Emlj5FKdeoKPxnt5P1HwxGrqYn48ZhUle0bvLAbc8jxttXomTNtWAwSycmvu6I_wh3oQChgNXxGzAPH6uZs5zn_Ab6lgn3zPTua2J5Bfi1IFhXM6dWlr5GQvSC-OGpqdDqbKDAFoRdIWR9a25i33ui3-xcBreDgntciJqoK_MXQNNF89g&nonce=639083367693768177.NmMwZTEzMjAtOGJiYS00MDU1LThjYTQtZmFlYzJjMjAzYWEwZGI4ZDAyMzctOThjZS00YTEyLWE1MjQtY2QwN2JkMWZiNjJj&ui_locales=en-US&x-client-SKU=ID_NET472&x-client-ver=6.35.0.0');

//   await page.waitForLoadState('networkidle');
//   await page.waitForTimeout(2000);

//   // ── Login (split into steps so each completes fully) ────────────────
//   await ai(`Enter "${CHURCH_USERNAME}" into the username field and click Next`);

//   await page.waitForTimeout(3000);

//   await ai(`Enter "${CHURCH_PASSWORD}" into the password field and click Verify`);

//   // Wait for authentication redirect
//   await page.waitForTimeout(5000);

//   // ── Navigate to support portal — using the AI agent ─────────────────────
//   await ai('Navigate to https://mygatherings-anth-test.powerappsportals.com/');
//   await page.waitForLoadState('networkidle');

//   await ai('Click on the Support button');

//   await page.waitForTimeout(1500);

//   await ai('Click on the Help link');

//   //await page.waitForTimeout(1500);

//   // ── Create support ticket ──────────────────────────────────────────────
//   await ai('Click on the Create a Case button');

//   //await page.waitForTimeout(2000);

//   await ai(`Fill in the Title field with "${TICKET_TITLE}"`);

//   await ai('Fill in the Description field with "This is to check if the playwright can check if the case was created successfully"');

//   await ai('Click on the Create Case button to submit the form');

//   // ── Verify — using the AI agent ────────────────────────────────────────
//   // await page.waitForTimeout(1000);

//   await ai(`Verify that a gridcell with the text "${TICKET_TITLE}" is visible on the page`);

//   console.log('✅ Ticket creation verified successfully!');
// });
