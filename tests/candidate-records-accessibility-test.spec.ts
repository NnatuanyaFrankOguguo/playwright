// import { test, expect } from '@playwright/test';
// import process from 'process'

// const TENANT_ID = process.env.AZURE_TENANT_ID!;
// const DYNAMICS_BASE_URL = process.env.DYNAMICS_BASE_URL!;
// const APP_ID = process.env.DYNAMICS_APP_ID!;
// const LOGIN_EMAIL = process.env.LOGIN_EMAIL!;
// const CHURCH_USERNAME = process.env.CHURCH_USERNAME!;
// const CHURCH_PASSWORD = process.env.CHURCH_PASSWORD!;
// const CONTACT_NAME = process.env.CONTACT_NAME!;
// const CONTACT_ID = process.env.CONTACT_ID!;
// const CONTACT_VIEW_ID = process.env.CONTACT_VIEW_ID!;

// test('test', async ({ page }) => {
//   test.setTimeout(900000);
//   await page.goto('https://login.microsoftonline.com/42804ae1-d2e9-40b7-a4a3-45811234298b/oauth2/authorize?client_id=00000007-0000-0000-c000-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DMAAAABW-6z4BaRHxjHkAIkgG4duoCYw83Xlo7RfDWLXF0FaTtQ7NgBdkgVmShJD-vcnmEAEAAAABAAAACS5yZWRpcmVjdCFodHRwczovL2d3bS1kZXYuY3JtLmR5bmFtaWNzLmNvbS8%26ReplyUrl%3DMAAAABW%252b6z4BaRHxjHkAIkgG4dvbkXQVxqno3dUwXXaJM5MbmF14qiIqiDQjCRSAVk22RWh0dHBzOi8vYnkyLS1uYW1jcm1saXZlc2c2NDQuY3JtLmR5bmFtaWNzLmNvbS8%253d%26RedirectTo%3DMAAAABW%252b6z4BaRHxjHkAIkgG4dukkojBulFFLx7CSBDT%252bUoBXfLS4drT2wNUPqKLQ0oumWh0dHBzOi8vZ3dtLWRldi5jcm0uZHluYW1pY3MuY29tLw%253d%253d%26RedirectToForMcas%3Dhttps%253a%252f%252fgwm-dev.crm.dynamics.com%252f&response_mode=form_post&nonce=639066046807200319.NjA3OWJiNDEtOTUwMC00YTIwLWJhMzYtMmFjZDI0YjRkYzYxOGY2MTNhYzktM2M1Ni00ZjFjLWFlMTMtNjU4NDk0OTM3YTZm&redirect_uri=https%3A%2F%2Fby2--namcrmlivesg644.crm.dynamics.com%2F&max_age=86400&claims=%7B%22id_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&x-client-SKU=ID_NET472&x-client-ver=8.14.0.0&sso_reload=true');
//   await page.getByRole('textbox', { name: 'someone@example.com' }).fill(LOGIN_EMAIL);
//   await page.getByRole('button', { name: 'Next' }).click();

//   // Wait for Church login page
//   await page.getByText('Sign in to your church').first().waitFor({ state: 'visible' });

//   await page.getByRole('textbox', { name: 'Sign in to your church' }).fill(CHURCH_USERNAME);
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).waitFor({ state: 'visible' });
//   await page.getByRole('textbox', { name: 'Password' }).fill(CHURCH_PASSWORD);
//   await expect(page.getByRole('button', { name: 'Verify' })).toBeEnabled();
//   await page.getByRole('button', { name: 'Verify' }).click();

//   // Wait for the auth callback chain to finish
//   await page.waitForURL('**main.aspx**', { timeout: 120000 });
//   await page.waitForLoadState('domcontentloaded');

//   // Navigate to Dynamics contact list after authentication
//   await page.goto('https://gwm-dev.crm.dynamics.com/main.aspx?appid=d4450a19-9cef-493b-843b-a5065042b928&pagetype=entitylist&etn=contact&viewid=42eb0f93-2182-f011-b4cb-000d3a3187b2&viewType=1039');

//   await page.waitForURL('**main.aspx**', { timeout: 60000 });
//   await page.waitForLoadState('domcontentloaded');

//   await page.getByRole('link', { name: 'Frank Nnatuanya' }).click();
//   await page.waitForURL('**main.aspx**', { timeout: 60000 });
//   await page.waitForLoadState('domcontentloaded');

//   // Navigate directly to the contact record
//   await page.goto('https://gwm-dev.crm.dynamics.com/main.aspx?appid=d4450a19-9cef-493b-843b-a5065042b928&pagetype=entityrecord&etn=contact&id=0d8e629a-a3c1-f011-bbd3-0022480abfbd');

//   await page.waitForURL('**main.aspx**', { timeout: 60000 });
//   await page.waitForLoadState('domcontentloaded');

//   // Dismiss "Script Error" dialog if it appears
//   const scriptErrorDialog = page.getByRole('dialog', { name: 'Script Error' });
//   try {
//     await scriptErrorDialog.waitFor({ state: 'visible', timeout: 10000 });
//     await scriptErrorDialog.getByRole('button', { name: 'OK' }).click();
//     await scriptErrorDialog.waitFor({ state: 'hidden', timeout: 5000 });
//   } catch {
//     // Dialog did not appear, continue
//   }

//   // Wait for form to fully render
//   await page.waitForLoadState('domcontentloaded');
//   await expect(page.getByText('Frank Nnatuanya')).toBeVisible({ timeout: 30000 });

//   // Assertions — use getByLabel for resilient form field locators
//   await expect(page.getByLabel('Personal Email', { exact: true })).toHaveValue('fnnatuanya@byupathway.edu', { timeout: 60000 });
//   await page.waitForLoadState('domcontentloaded');
//   await expect(page.getByText('Send Assesment Invitation Surveys')).toBeVisible();
//   await page.waitForLoadState('domcontentloaded');
//   await expect(page.getByLabel('First Name', { exact: true })).toHaveValue('Frank');
//   await expect(page.getByLabel('Last Name', { exact: true })).toHaveValue('Nnatuanya');
//   await expect(page.getByLabel('BYU-Pathway Email', { exact: true })).toHaveValue('fnnatuanya@byupathway.edu');
//   await expect(page.getByLabel('BYU-Idaho Email', { exact: true })).toHaveValue('fnnatuanya@byupathway.edu');
//   await expect(page.getByLabel('CMIS ID (Populated from survey)', { exact: true })).toHaveValue('32174193562');
//   await expect(page.getByText('Career Documents').first()).toBeVisible();
//   await expect(page.getByLabel('Preferred First Name')).toBeVisible();
//   await expect(page.getByLabel('Full Name', { exact: true })).toBeVisible();
//   await expect(page.getByLabel('Mobile Phone')).toBeVisible();
//   await expect(page.getByText('Country of Residence')).toBeVisible();
//   await expect(page.getByText('Gender')).toBeVisible();
// });