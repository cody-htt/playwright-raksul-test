import { Page } from '@playwright/test';
import BasePage from '@fixtures/BasePage';
import { FormPageLocators as locators } from '@locators/FormPageLocators';
import { replaceStringItem } from '@helpers/StringHelper';

export default class FormPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async navigate() {
    await this.goToPage('/recruit-qa-engineer-work-sample');
  }

  public async selectCheckBoxOfSvcOfInterest(text: string) {
    await this.selectCheckboxFromGroup(locators.svcInterestField, text);
  }

  public async selectRadioBtnFromAssocType(text: string) {
    await this.selectCheckboxFromGroup(locators.assocTypeField, text);
  }

  public async selectInfoSourceOption(option: string) {
    await this.click(locators.infoSourceInput);
    await this.waitForElementState(locators.infoSourceList, 'visible');
    await this.click(replaceStringItem(locators.infoSourceListItem, option));
  }
}
