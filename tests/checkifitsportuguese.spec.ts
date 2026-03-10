import { test, expect } from '@playwright/test';
import process from 'process';

const CHURCH_USERNAME = process.env.CHURCH_USERNAME!;
const CHURCH_PASSWORD = process.env.CHURCH_PASSWORD!;

//Passed!!!

test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.locator('body').click();
  await page.goto('https://id.churchofjesuschrist.org/oauth2/default/v1/authorize?client_id=0oa1bufvsjns2bSz2358&redirect_uri=https%3A%2F%2Fmygatherings-anth-test.powerappsportals.com%2Fsignin-openid_1&response_type=code&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DSOkOgCkTmBfdvEbIgQ42ocQxxLJeVQBm9VB1maDaWacn1XFFmorgg6oM9IJZQvL15k2Lc7Hhj5nPs-VktuCucvrAW8-picUjjJ20n5VPeBIaRtCwZT0-_VyQ-hRaysJAv0uH0j0K9GXr6WAyHhJm6HWWlrFCRwLoonl8rw_FptzIHanZtOLG0LuyuqtZap289jud9huHiRZe3q5suonizXsaIzedZ1b0caQ028GvUcudVFdTSOOTn4CluQqzxiO2tHvMxNWr9E1I0mzyllcVnB4wcIbJvOqC16pk4AVXzO8ZoExyyDLQBi0CWzjzlnJGYcCtVOVaTOIp4zT-r0dQLk-JaKN6bU2ZPRxMU-eUOMvcbYg749I6HxJJy17Tdq9tdv01DBLyz3B9Zgg7-GVpwBFv6jnPOu2ExO2UaMAHTfwWYMFnH0S0PhbAxKJOgJkF2DYYBTUpimQsqVPkg5aXFg&nonce=639083550034894725.ZmQzZDc5MDYtOTZlMS00MWZhLTkxY2UtOThhODgzNmJmN2Y2NDQ5NzVkYzUtYWQwMi00M2M4LWJkZWMtNjY3MWQ1OWE3ZDc4&ui_locales=en-US&x-client-SKU=ID_NET472&x-client-ver=6.35.0.0');
  await page.getByRole('textbox', { name: 'Sign in to your church' }).fill(CHURCH_USERNAME);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(CHURCH_PASSWORD);
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.waitForTimeout(20000);
  await page.goto('https://mygatherings-anth-test.powerappsportals.com/');
  await page.getByRole('link', { name: 'English' }).click();
  await page.getByRole('link', { name: 'Português (Brasil)' }).click();

  await expect(page.getByLabel('Text Home Press enter to edit')).toBeVisible();
  await expect(page.getByRole('link', { name: 'English' })).toBeVisible();
  //await expect(page.getByRole('link', { name: 'Português (Brasil)' })).toBeVisible();

});