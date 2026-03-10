import { type Page } from '@playwright/test';

export class ChurchLoginPage {
  constructor(
    private page: Page,
    private authUrl: string,
    private username: string,
    private password: string
  ) {}

  get usernameInput() {
    return this.page.getByRole('textbox', { name: 'Sign in to your church' });
  }

  get nextButton() {
    return this.page.getByRole('button', { name: 'Next' });
  }

  get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get verifyButton() {
    return this.page.getByRole('button', { name: 'Verify' });
  }

  async login() {
    await this.page.goto(this.authUrl);
    await this.usernameInput.fill(this.username);
    await this.nextButton.click();
    await this.passwordInput.fill(this.password);
    await this.verifyButton.click();
    await this.page.waitForTimeout(20000);
  }
}
