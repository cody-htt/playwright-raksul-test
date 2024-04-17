import { Page } from '@playwright/test';
import BasePage from '@fixtures/BasePage';
import { FormPageLocators as locators } from '@locators/FormPageLocators';
import { replaceStringItem } from '@helpers/StringHelper';
import Path from '@helpers/Path.json';
import CommonText from '@helpers/CommonText.json';
import FormDto from '@helpers/FormDto';

export default class FormPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async navigate() {
    await this.goToPage(Path.formPagePath);
  }

  public async enterEmail(email: string) {
    if (email) await this.enterText(locators.emailInput, email);
  }

  public async enterLastName(lastName: string) {
    if (lastName) await this.enterText(locators.lastNameInput, lastName);
  }

  public async enterFirstName(firstName: string) {
    if (firstName) await this.enterText(locators.firstNameInput, firstName);
  }

  public async enterExplanation(explanation: string) {
    if (explanation) await this.enterText(locators.expTextArea, explanation);
  }

  public async selectCheckBoxOfSvcOfInterest(serviceOfInterest: string) {
    if (serviceOfInterest) await this.selectCheckboxFromGroup(locators.svcInterestField, serviceOfInterest);
  }

  public async selectRadioBtnFromAssocType(typeOfAssociation: string) {
    if (typeOfAssociation) await this.selectCheckboxFromGroup(locators.assocTypeField, typeOfAssociation);
  }

  public async selectInfoSourceOption(option: string) {
    if (!option) return;
    await this.click(locators.infoSourceInput);
    await this.waitForElementState(locators.infoSourceList, 'visible');
    await this.click(replaceStringItem(locators.infoSourceListItem, option));
  }

  public async clickSubmit() {
    await this.click(locators.submitBtn);
  }

  public async fillTheForm(data: FormDto) {
    await this.enterEmail(data.email);
    await this.enterLastName(data.lastName);
    await this.enterFirstName(data.firstName);
    await this.selectInfoSourceOption(data.infoSource);
    await this.selectCheckBoxOfSvcOfInterest(data.svcInterest);
    await this.selectRadioBtnFromAssocType(data.assocType);
    await this.enterExplanation(data.explanation);
    await this.clickSubmit();
  }

  public async isSuccessMessageDisplayed() {
    return this.isElementVisible(replaceStringItem(locators.alertMessage, CommonText.successfulSubmission));
  }

  public async isSuccessMessageNotDisplayed() {
    return this.isElementHidden(replaceStringItem(locators.alertMessage, CommonText.successfulSubmission));
  }

  public async isCheckIconDisplayed() {
    return this.isElementVisible(locators.checkIcon);
  }

  public isErrorMessageDisplayed(errorMsg: string) {
    return this.isElementVisible(replaceStringItem(locators.alertMessage, errorMsg));
  }
}
