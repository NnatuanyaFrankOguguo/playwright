// import { test, expect } from '@playwright/test';
// import { ai } from '@zerostep/playwright';
// import process from 'process';

// test('test', async ({ page }) => {
//   // test.setTimeout(900000);

//   // Step 1: Microsoft login
//   // await page.goto('https://login.microsoftonline.com/42804ae1-d2e9-40b7-a4a3-45811234298b/oauth2/authorize?client_id=00000007-0000-0000-c000-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DMAAAABW-6z4BaRHxjHkAIkgG4duoCYw83Xlo7RfDWLXF0FaTtQ7NgBdkgVmShJD-vcnmEAEAAAABAAAACS5yZWRpcmVjdCFodHRwczovL2d3bS1kZXYuY3JtLmR5bmFtaWNzLmNvbS8%26ReplyUrl%3DMAAAABW%252b6z4BaRHxjHkAIkgG4dvbkXQVxqno3dUwXXaJM5MbmF14qiIqiDQjCRSAVk22RWh0dHBzOi8vYnkyLS1uYW1jcm1saXZlc2c2NDQuY3JtLmR5bmFtaWNzLmNvbS8%253d%26RedirectTo%3DMAAAABW%252b6z4BaRHxjHkAIkgG4dukkojBulFFLx7CSBDT%252bUoBXfLS4drT2wNUPqKLQ0oumWh0dHBzOi8vZ3dtLWRldi5jcm0uZHluYW1pY3MuY29tLw%253d%253d%26RedirectToForMcas%3Dhttps%253a%252f%252fgwm-dev.crm.dynamics.com%252f&response_mode=form_post&nonce=639066046807200319.NjA3OWJiNDEtOTUwMC00YTIwLWJhMzYtMmFjZDI0YjRkYzYxOGY2MTNhYzktM2M1Ni00ZjFjLWFlMTMtNjU4NDk0OTM3YTZm&redirect_uri=https%3A%2F%2Fby2--namcrmlivesg644.crm.dynamics.com%2F&max_age=86400&claims=%7B%22id_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&x-client-SKU=ID_NET472&x-client-ver=8.14.0.0&sso_reload=true');

//   // await page.waitForLoadState('networkidle');

//   // await ai("Type 'fnnatuanya@byupathway.edu' in the email textbox", { page, test });
//   // await ai("Click the Next button", { page, test });

//   // await page.waitForLoadState('networkidle');
//   // await page.waitForTimeout(6000);

//   // await ai(`Type 'nnatuanyafrankoguguo' in the church sign-in textbox`, { page, test });
//   // await ai("Click the Next button", { page, test });
//   // await page.waitForLoadState('networkidle');
//   // await ai(`Type ${process.env.CHURCH_PASSWORD || 'Fr@07070018654!!'} in the Password textbox`, { page, test });
//   // await ai("Click the Verify button", { page, test });

//   // // Step 3: Wait for auth to complete
//   // await page.waitForURL('**main.aspx**', { timeout: 120000 });
//   // await page.waitForLoadState('domcontentloaded');

//   // // Step 4: Navigate to the contacts view
//   // await page.goto('https://gwm-dev.crm.dynamics.com/main.aspx?appid=d4450a19-9cef-493b-843b-a5065042b928&pagetype=entitylist&etn=contact&viewid=42eb0f93-2182-f011-b4cb-000d3a3187b2&viewType=1039');
//   // await page.waitForURL('**main.aspx**', { timeout: 60000 });
//   // await page.waitForLoadState('domcontentloaded');

//   // // Step 5: Click on Frank Nnatuanya
//   // await ai("Click the link named 'Frank Nnatuanya'", { page, test });

//   // await page.waitForURL('**main.aspx**', { timeout: 60000 });
//   // await page.waitForLoadState('domcontentloaded');

//   // // Step 6: Navigate to the contact record
//   // await page.goto('https://gwm-dev.crm.dynamics.com/main.aspx?appid=d4450a19-9cef-493b-843b-a5065042b928&pagetype=entityrecord&etn=contact&id=0d8e629a-a3c1-f011-bbd3-0022480abfbd');
//   // await page.waitForURL('**main.aspx**', { timeout: 60000 });
//   // await page.waitForLoadState('domcontentloaded');

//   // // Step 7: Assertions
//   // await ai("Expect the 'Personal Email' textbox to have the value 'fnnatuanya@byupathway.edu'", { page, test });
//   // await ai("Expect a menu item named 'Send Assesment Invitation' to be visible", { page, test });
//   // await ai("Expect the Overview tab panel to contain sections for Personal, Career Documents, Transcripts, Application, Hiring, Ecclesiastical Endorsement, Provisioning, Languages, and Assessments", { page, test });
//   // await ai("Expect the Personal section to have fields for Preferred First Name, First Name, Last Name with value 'Nnatuanya', Personal Email with value 'fnnatuanya@byupathway.edu', BYU-Pathway Email with value 'fnnatuanya@byupathway.edu', BYU-Idaho Email with value 'fnnatuanya@byupathway.edu', Mobile Phone, Country of Residence, Birthday, Gender, Picture, and CMIS ID", { page, test });
//   // await ai("Expect the Hiring section to contain 'Brazil' in the Hiring Entity field", { page, test });

//   await ai("Navigate to www.google.com", { page, test });
// });