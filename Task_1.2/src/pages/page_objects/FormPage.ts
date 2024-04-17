import { Page } from '@playwright/test';
import BasePage from '@fixtures/BasePage';
import { FormPageLocators as locators } from '@locators/FormPageLocators';
import { replaceStringItem } from '@helpers/StringHelper';
import Path from '@helpers/Path.json';
import CommonText from '@helpers/CommonText.json';

export default class FormPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async navigate() {
    await this.goToPage(Path.formPagePath);
  }

  public async fillEmail(email: string) {
    await this.enterText(locators.emailInput, email);
  }

  public async fillLastName(lastName: string) {
    await this.enterText(locators.lastNameInput, lastName);
  }

  public async fillFirstName(firstName: string) {
    await this.enterText(locators.firstNameInput, firstName);
  }

  public async fillExplanation(explanation: string) {
    await this.enterText(locators.expTextArea, explanation);
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

  public async clickSubmit() {
    await this.click(locators.submitBtn);
  }

  public async isSuccessMessageDisplayed() {
    return this.isElementVisible(replaceStringItem(locators.notiMsg, CommonText.successfulSubmission));
  }
}
