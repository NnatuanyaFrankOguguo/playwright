import { type Page, type Locator, expect } from '@playwright/test';

export class MissionaryFeedbackPage {
  constructor(
    private page: Page,
    private portalUrl: string
  ) {}

  get supportButton() {
    return this.page.getByRole('button', { name: 'Support' });
  }

  get feedbackLink() {
    return this.page.getByRole('link', { name: 'Feedback' });
  }

  get surveyDiv() {
    return this.page.locator('#surveyDiv');
  }

  get feedbackIframe() {
    return this.page.locator('iframe[title="Feedback survey popup"]').contentFrame();
  }

  get feedbackForm() {
    return this.feedbackIframe.getByRole('main');
  }

  async navigate() {
    await this.page.goto(this.portalUrl);
  }

  async openFeedbackForm() {
    await this.supportButton.click();
    await this.feedbackLink.click();
  }

  async expectSurveyVisible() {
    await expect(this.surveyDiv).toBeVisible();
  }

  async expectFeedbackFormMatchesSnapshot(snapshot: string) {
    await expect(this.feedbackForm).toMatchAriaSnapshot(snapshot);
  }
}
