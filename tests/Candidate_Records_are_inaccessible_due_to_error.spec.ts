// import { test, expect } from '@playwright/test';
// import process from 'process';

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

//   // Wait for navigation
//   await page.waitForLoadState('networkidle');
//   //await page.goto('https://id.churchofjesuschrist.org/oauth2/default/v1/authorize?state=M3Q4M3ZzSENPT0NqYi85VTVRWlZhb0NHSjVzT1A2U2JLbXJhSGkwcUlYcDhiTC9hYjNuU2pXTFpONC9CSUovKw&nonce=Gvd3WeY181pcaXAfaPCbzvGt75ZKnPN1&client_id=0oafj6dbfvEvMIGet357&redirect_uri=https%3A%2F%2Fauth.ceslogin.org%2Foauth2%2Fv1%2Fauthorize%2Fcallback&response_type=code&display=page&login_hint=fnnatuanya%40byupathway.edu&scope=cmisid+openid+profile+email');

//   await page.getByRole('textbox', { name: 'Sign in to your church' }).fill(CHURCH_USERNAME);
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill(CHURCH_PASSWORD);
//   await page.getByRole('button', { name: 'Verify' }).click();

//   // Wait for the auth callback chain to finish
//   await page.waitForURL('**main.aspx**', { timeout: 120000 });
//   await page.waitForLoadState('domcontentloaded');
//   // Navigate to Dynamics after authentication
//   await page.goto('https://gwm-dev.crm.dynamics.com/main.aspx?appid=d4450a19-9cef-493b-843b-a5065042b928&pagetype=entitylist&etn=contact&viewid=42eb0f93-2182-f011-b4cb-000d3a3187b2&viewType=1039');

//   await page.waitForURL('**main.aspx**', { timeout: 60000 });
//   await page.waitForLoadState('domcontentloaded');

  

//   await page.getByRole('link', { name: 'Frank Nnatuanya' }).click();
//     // Wait for the auth callback chain to finish
//   await page.waitForURL('**main.aspx**', { timeout: 60000 });
//   await page.waitForLoadState('domcontentloaded');

//   // Wait for page load

//   await page.goto('https://gwm-dev.crm.dynamics.com/main.aspx?appid=d4450a19-9cef-493b-843b-a5065042b928&pagetype=entityrecord&etn=contact&id=0d8e629a-a3c1-f011-bbd3-0022480abfbd');

//     // Wait for the auth callback chain to finish
//   await page.waitForURL('**main.aspx**', { timeout: 60000 });
//   await page.waitForLoadState('domcontentloaded');

//   // Assertions
//   await expect(page.getByRole('textbox', { name: 'Personal Email' })).toHaveValue('fnnatuanya@byupathway.edu');
//   await page.waitForLoadState('domcontentloaded');
//   await expect(page.getByRole('menuitem', { name: 'Send Assesment Invitation' })).toBeVisible();
//   await page.waitForLoadState('domcontentloaded');
//   await expect(page.locator('#id-159')).toMatchAriaSnapshot(`
//     - tabpanel "Overview":
//       - region "Personal":
//         - heading "Personal" [level=2]
//         - text: Preferred First Name
//         - textbox "Preferred First Name":
//           - /placeholder: "---"
//         - text: First Name
//         - textbox "First Name":
//           - /placeholder: "---"
//           - text: ""
//         - text: Last Name
//         - textbox "Last Name":
//           - /placeholder: "---"
//           - text: Nnatuanya
//         - text: Personal Email
//         - textbox "Personal Email":
//           - /placeholder: "---"
//           - text: fnnatuanya@byupathway.edu
//         - link "Send new email to provided address"
//         - text: BYU-Pathway Email
//         - textbox "BYU-Pathway Email":
//           - /placeholder: "---"
//           - text: fnnatuanya@byupathway.edu
//         - link "Send new email to provided address"
//         - text: BYU-Idaho Email
//         - textbox "BYU-Idaho Email":
//           - /placeholder: "---"
//           - text: fnnatuanya@byupathway.edu
//         - link "Send new email to provided address"
//         - text: Mobile Phone
//         - textbox "Mobile Phone":
//           - /placeholder: "---"
//         - text: Country of Residence
//         - status
//         - combobox "Country of Residence, Lookup"
//         - button "Search records for Country of Residence, Lookup field"
//         - text: Birthday
//         - img "Secured Birthday"
//         - combobox "Date of Birthday"
//         - text: ""
//         - img "Secured Gender"
//         - combobox "Gender"
//         - text: ""
//         - button "Choose file for Picture"
//         - text: CMIS ID (Populated from survey)
//         - img "Locked CMIS ID (Populated from survey)"
//         - textbox "CMIS ID (Populated from survey)":
//           - /placeholder: "---"
//           - text: ""
//       - region "New Section":
//         - status
//         - heading "Career Documents" [level=3]
//         - menubar "Career Document Commands":
//           - menuitem "More commands for Career Document"
//         - treegrid "Candidate Related Work Histories":
//           - rowgroup:
//             - row "Status column No rows to select Name Notes Created On":
//               - columnheader "Status column No rows to select"
//               - columnheader "Name":
//                 - button "Name"
//               - columnheader "Notes":
//                 - button "Notes"
//               - columnheader "Created On":
//                 - button "Created On"
//         - text: ""
//         - status
//       - region "New Section"
//       - region "Transcripts":
//         - heading "Transcripts" [level=2]
//       - region "Application":
//         - heading "Application" [level=2]
//         - text: Application Date
//         - combobox "Date of Application Date"
//         - text: Application Block
//         - status
//         - combobox "Application Block, Lookup"
//         - button "Search records for Application Block, Lookup field"
//       - region "Hiring":
//         - heading "Hiring" [level=2]
//         - text: Hiring Entity
//         - list "Hiring Entity":
//           - listitem:
//             - link "Brazil"
//             - button "Delete Brazil"
//         - button "Search records for Hiring Entity, Lookup field"
//         - status
//         - text: Position
//         - combobox "Position"
//         - text: Candidate Status Notes
//         - textbox "Candidate Status Notes":
//           - /placeholder: "---"
//         - text: Offer Letter Sent Date
//         - combobox "Date of Offer Letter Sent Date"
//         - text: Offer Accepted Date
//         - combobox "Date of Offer Accepted Date"
//         - text: I-Number
//         - textbox "I-Number":
//           - /placeholder: "---"
//         - text: BYU-I Username
//         - textbox "BYU-I Username":
//           - /placeholder: "---"
//         - text: Start Block
//         - status
//         - combobox "Start Block, Lookup"
//         - button "Search records for Start Block, Lookup field"
//         - text: Start Date
//         - combobox "Date of Start Date"
//       - region "Ecclesiastical Endorsement":
//         - heading "Ecclesiastical Endorsement" [level=2]
//       - region "Provisioning":
//         - heading "Provisioning" [level=2]
//       - region "Languages"
//       - region "New Section"
//       - region "Assessments"
//       - region "New Section"
//     `);
// });


// // import { test, expect } from '@playwright/test';

// // test('test', async ({ page }) => {
// //   test.setTimeout(120000);

// //   // Step 1: Login
// //   await page.goto('https://login.microsoftonline.com/42804ae1-d2e9-40b7-a4a3-45811234298b/oauth2/authorize?client_id=00000007-0000-0000-c000-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DMAAAABW-6z4BaRHxjHkAIkgG4duoCYw83Xlo7RfDWLXF0FaTtQ7NgBdkgVmShJD-vcnmEAEAAAABAAAACS5yZWRpcmVjdCFodHRwczovL2d3bS1kZXYuY3JtLmR5bmFtaWNzLmNvbS8%26ReplyUrl%3DMAAAABW%252b6z4BaRHxjHkAIkgG4dvbkXQVxqno3dUwXXaJM5MbmF14qiIqiDQjCRSAVk22RWh0dHBzOi8vYnkyLS1uYW1jcm1saXZlc2c2NDQuY3JtLmR5bmFtaWNzLmNvbS8%253d%26RedirectTo%3DMAAAABW%252b6z4BaRHxjHkAIkgG4dukkojBulFFLx7CSBDT%252bUoBXfLS4drT2wNUPqKLQ0oumWh0dHBzOi8vZ3dtLWRldi5jcm0uZHluYW1pY3MuY29tLw%253d%253d%26RedirectToForMcas%3Dhttps%253a%252f%252fgwm-dev.crm.dynamics.com%252f&response_mode=form_post&nonce=639066046807200319.NjA3OWJiNDEtOTUwMC00YTIwLWJhMzYtMmFjZDI0YjRkYzYxOGY2MTNhYzktM2M1Ni00ZjFjLWFlMTMtNjU4NDk0OTM3YTZm&redirect_uri=https%3A%2F%2Fby2--namcrmlivesg644.crm.dynamics.com%2F&max_age=86400&claims=%7B%22id_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&x-client-SKU=ID_NET472&x-client-ver=8.14.0.0&sso_reload=true');
  
// //   await page.getByRole('textbox', { name: 'someone@example.com' }).fill('fnnatuanya@byupathway.edu');
// //   await page.getByRole('button', { name: 'Next' }).click();
  
// //   await page.waitForLoadState('networkidle');
  
// //   await page.getByRole('textbox', { name: 'Sign in to your church' }).fill('nnatuanyafrankoguguo');
// //   await page.getByRole('button', { name: 'Next' }).click();
  
// //   await page.getByRole('textbox', { name: 'Password' }).fill('Fr@07070018654!!');
// //   await page.getByRole('button', { name: 'Verify' }).click();
  
// //   // Step 2: Wait for successful authentication and landing on the main page
// //   console.log('Waiting for authentication to complete...');
// //   await page.waitForURL('**/main.aspx**', { timeout: 60000 });
// //   await page.waitForLoadState('networkidle');
// //   await page.waitForTimeout(5000);
  
// //   console.log('Current URL:', page.url());
  
// //   // Step 3: Click on Global Workforce Management app
// //   console.log('Looking for iframe...');
  
// //   // Wait for iframe to appear
// //   await page.waitForSelector('iframe[title="AppLandingPage"]', { timeout: 30000 });
  
// //   const frame = page.frameLocator('iframe[title="AppLandingPage"]');
  
// //   // Click the app link
// //   await frame.getByRole('link', { name: 'Global Workforce Management' }).click({ 
// //     timeout: 30000 
// //   });
  
// //   // Step 4: Wait to land on the contacts list page
// //   console.log('Waiting for contacts page...');
// //   await page.waitForURL('**/etn=contact**', { timeout: 60000 });
// //   await page.waitForLoadState('networkidle');
  
// //   // Step 5: Click on Frank Nnatuanya
// //   console.log('Looking for Frank Nnatuanya...');
// //   await page.getByRole('link', { name: 'Frank Nnatuanya' }).click();
  
// //   // Step 6: Wait for the contact record to load
// //   await page.waitForLoadState('networkidle');
// //   await page.waitForTimeout(3000);
  
// //   // Step 7: Assertions
// //   console.log('Running assertions...');
// //   await expect(page.getByRole('textbox', { name: 'Personal Email' })).toHaveValue('fnnatuanya@byupathway.edu', { timeout: 10000 });
// //   await expect(page.getByRole('menuitem', { name: 'Send Assesment Invitation' })).toBeVisible();
  
// //   console.log('✅ Test passed!');
// // });