import { test, expect } from '@playwright/test';
import process from 'process';

// // this is to test if the support ticket can be created successfully in my gathering portal using playwright
// // then appear in the list of support ticket created in the portal

// //it's supposed to passed but not working in test

const LOGIN_EMAIL = process.env.LOGIN_EMAIL!;
const CHURCH_USERNAME = process.env.CHURCH_USERNAME!;
const CHURCH_PASSWORD = process.env.CHURCH_PASSWORD!;

const nowTime = Date.now().toString();

test('test help support ticket creation @mygathering', async ({ page }) => {
  await page.goto('https://id.churchofjesuschrist.org/oauth2/default/v1/authorize?client_id=0oa1bufvsjns2bSz2358&redirect_uri=https%3A%2F%2Fmygatherings-anth-dev.powerappsportals.com%2Fsignin-openid_1&response_type=code&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DPH4dNSBOMtM0_QPvsSNrmtzbvaUl_FSFN8oPV2C6vzmjpbaVnvSnochKOuPozMRyfdHoBM86rgdaC_vUpI9H5pyllGpLcyFYgaqwwOM8WTWDeRALek7qrobikWqqJ5qDKXWIdupqUKd8lsZpllW_Q7k0Eimd9ioGz1AKlsR3Z5vZXFrsZwQ4XhwNovXp_cNVaE2NOoPSUFnrPz-LUwN0c2ETKJ3pya9iicsZnbOnjR1KgaZLUdfrTm7OL-5Z64sMR0-MYL1Hudr-IY-sOlfhwfBQv-QkhmPy8mLb1Emlj5FKdeoKPxnt5P1HwxGrqYn48ZhUle0bvLAbc8jxttXomTNtWAwSycmvu6I_wh3oQChgNXxGzAPH6uZs5zn_Ab6lgn3zPTua2J5Bfi1IFhXM6dWlr5GQvSC-OGpqdDqbKDAFoRdIWR9a25i33ui3-xcBreDgntciJqoK_MXQNNF89g&nonce=639083367693768177.NmMwZTEzMjAtOGJiYS00MDU1LThjYTQtZmFlYzJjMjAzYWEwZGI4ZDAyMzctOThjZS00YTEyLWE1MjQtY2QwN2JkMWZiNjJj&ui_locales=en-US&x-client-SKU=ID_NET472&x-client-ver=6.35.0.0');
  await page.getByRole('textbox', { name: 'Sign in to your church' }).fill(CHURCH_USERNAME);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(CHURCH_PASSWORD);
  await page.getByRole('button', { name: 'Verify' }).click();
  // Wait for authentication
  await page.waitForTimeout(5000);


  // await page.getByRole('button', { name: 'Okta Verify' }).click();
  await page.goto('https://mygatherings-anth-test.powerappsportals.com/');
  await page.getByRole('button', { name: 'Support' }).click();
  await page.getByRole('link', { name: 'Help' }).click();
  await page.getByRole('button', { name: 'Create a Case' }).click();
  await page.locator('iframe[title="Create New"]').contentFrame().getByRole('textbox', { name: 'Title' }).click();
  await page.locator('iframe[title="Create New"]').contentFrame().getByRole('textbox', { name: 'Title' }).fill(`Testing Playwright Test ${nowTime}`);
  await page.locator('iframe[title="Create New"]').contentFrame().getByRole('textbox', { name: 'Description' }).click();
  await page.locator('iframe[title="Create New"]').contentFrame().getByRole('textbox', { name: 'Description' }).fill('This is to check if the playwright can check if the case was created successfully');
  //await expect(page.locator('iframe[title="Create New"]').contentFrame().getByRole('textbox', { name: 'Title' })).toHaveValue('Testing Playwright Test');
  await page.locator('iframe[title="Create New"]').contentFrame().getByRole('button', { name: 'Create Case' }).click();
  await expect(page.getByRole('gridcell', { name: `Testing Playwright Test ${nowTime}` })).toBeVisible();
});