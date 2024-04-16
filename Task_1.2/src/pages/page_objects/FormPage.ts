import { Page } from '@playwright/test';
import BasePage from '@fixtures/BasePage';
// import { FormPageLocators as locators } from '@locators/FormPageLocators';

export default class FormPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async navigate(): Promise<void> {
    await this.goToPage('/recruit-qa-engineer-work-sample');
  }
}
