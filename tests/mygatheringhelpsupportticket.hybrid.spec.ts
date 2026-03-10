// import { test, expect } from '@playwright/test';
// import { ai } from '@zerostep/playwright';
// import process from 'process';

// // Hybrid approach: Playwright for login (reliable) + Zerostep for ticket creation (maintainable)

// const LOGIN_EMAIL = process.env.LOGIN_EMAIL!;
// const CHURCH_USERNAME = process.env.CHURCH_USERNAME!;
// const CHURCH_PASSWORD = process.env.CHURCH_PASSWORD!;

// const nowTime = Date.now().toString();
// const TICKET_TITLE = `Testing Playwright Test ${nowTime}`;

// test('create support ticket - hybrid (Playwright + Zerostep)', async ({ page }) => {
//   // ===== STEP 1: Login with Playwright (reliable for complex auth) =====
//   await page.goto(
//     'https://id.churchofjesuschrist.org/oauth2/default/v1/authorize?client_id=0oa1bufvsjns2bSz2358&redirect_uri=https%3A%2F%2Fmygatherings-anth-dev.powerappsportals.com%2Fsignin-openid_1&response_type=code&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DPH4dNSBOMtM0_QPvsSNrmtzbvaUl_FSFN8oPV2C6vzmjpbaVnvSnochKOuPozMRyfdHoBM86rgdaC_vUpI9H5pyllGpLcyFYgaqwwOM8WTWDeRALek7qrobikWqqJ5qDKXWIdupqUKd8lsZpllW_Q7k0Eimd9ioGz1AKlsR3Z5vZXFrsZwQ4XhwNovXp_cNVaE2NOoPSUFnrPz-LUwN0c2ETKJ3pya9iicsZnbOnjR1KgaZLUdfrTm7OL-5Z64sMR0-MYL1Hudr-IY-sOlfhwfBQv-QkhmPy8mLb1Emlj5FKdeoKPxnt5P1HwxGrqYn48ZhUle0bvLAbc8jxttXomTNtWAwSycmvu6I_wh3oQChgNXxGzAPH6uZs5zn_Ab6lgn3zPTua2J5Bfi1IFhXM6dWlr5GQvSC-OGpqdDqbKDAFoRdIWR9a25i33ui3-xcBreDgntciJqoK_MXQNNF89g&nonce=639083367693768177.NmMwZTEzMjAtOGJiYS00MDU1LThjYTQtZmFlYzJjMjAzYWEwZGI4ZDAyMzctOThjZS00YTEyLWE1MjQtY2QwN2JkMWZiNjJj&ui_locales=en-US&x-client-SKU=ID_NET472&x-client-ver=6.35.0.0'
//   );

//   console.log('🔐 Logging in with Playwright (reliable for auth)...');

//   // Use explicit Playwright selectors for login (more reliable)
//   await page.getByRole('textbox', { name: 'Sign in to your church' }).fill(CHURCH_USERNAME);
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill(CHURCH_PASSWORD);
//   await page.getByRole('button', { name: 'Verify' }).click();
  
//   await page.waitForTimeout(5000);

//   console.log('✅ Logged in successfully');

//   // ===== STEP 2: Navigate to support portal =====
//   console.log('📱 Navigating to support portal...');
//   await page.goto('https://mygatherings-anth-test.powerappsportals.com/');

//   // Use Zerostep for navigation (more maintainable)
//   await ai('Click on the Support button', { page, test });
//   await ai('Click on the Help link', { page, test });

//   console.log('✅ Navigated to support portal');

//   // ===== STEP 3: Create ticket with Zerostep (AI-powered) =====
//   console.log('🤖 Creating support ticket with Zerostep...');

//   // Use Playwright to click the button since Zerostep had issues
//   const createButton = page.getByRole('button', { name: 'Create a Case' });
//   await createButton.click();
//   await page.waitForTimeout(2000);

//   // Use Playwright for form filling (more reliable for iframes)
//   const titleField = page.locator('iframe[title="Create New"]').contentFrame().getByRole('textbox', { name: 'Title' });
//   await titleField.click();
//   await titleField.fill(TICKET_TITLE);

//   const descField = page.locator('iframe[title="Create New"]').contentFrame().getByRole('textbox', { name: 'Description' });
//   await descField.click();
//   await descField.fill('This is to check if the playwright can check if the case was created successfully');

//   // Submit with Playwright
//   const submitButton = page.locator('iframe[title="Create New"]').contentFrame().getByRole('button', { name: 'Create Case' });
//   await submitButton.click();

//   console.log('✅ Ticket submitted');

//   // ===== STEP 4: Verify ticket creation =====
//   console.log('🔍 Verifying ticket creation...');

//   await expect(page.getByRole('gridcell', { name: TICKET_TITLE })).toBeVisible();

//   console.log('✅ Ticket creation verified successfully!');
// });
