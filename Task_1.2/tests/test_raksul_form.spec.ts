import { WebTest, expect } from '@fixtures/BaseTest';
import { faker } from '@faker-js/faker';
import Env from '@configs/Env';
import Path from '@helpers/Path.json';

const FormPageUrl = Env.WEB_BASEURL + Path.formPagePath;

WebTest.describe.parallel('RAKSUL-FORM-E2E-TEST', () => {
  WebTest.beforeEach('Launch browser and open the page', async ({ formPage }) => {
    await formPage.navigate();
    const currentUrl = await formPage.getCurrentUrl();
    expect.soft(currentUrl).toBe(FormPageUrl);
  });

  WebTest('Validate the form page URL', async ({ formPage }) => {
    await WebTest.step('Check the URL', async () => {
      await formPage.fillEmail(faker.internet.email());
      await formPage.fillLastName(faker.person.lastName());
      await formPage.fillFirstName(faker.person.firstName());
      await formPage.selectInfoSourceOption('Search engines');
      await formPage.selectCheckBoxOfSvcOfInterest('Printing');
      await formPage.selectRadioBtnFromAssocType('Prospect');
      await formPage.fillExplanation(faker.lorem.sentence());
      await formPage.clickSubmit();
      expect(await formPage.isSuccessMessageDisplayed()).toBeTruthy();
    });
  });
});
