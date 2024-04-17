import { WebTest, expect } from '@fixtures/BaseTest';
import { faker } from '@faker-js/faker';
import Env from '@configs/Env';
import Path from '@helpers/Path.json';
import { getRandomElement, generateRandomString } from '@helpers/Utils';
import CommonText from '@helpers/CommonText.json';
import ValidData from '@data/ValidData.json';
import InvalidData from '@data/InvalidData.json';
import FormDto from '@helpers/FormDto';

const FormPageUrl = Env.WEB_BASEURL + Path.formPagePath;

WebTest.describe.parallel('RAKSUL-FORM-E2E-TEST', () => {
  WebTest.beforeEach('Launch browser and open the page', async ({ formPage }) => {
    await formPage.navigate();
    const currentUrl = await formPage.getCurrentUrl();
    expect.soft(currentUrl).toBe(FormPageUrl);
  });

  for (const data of ValidData) {
    WebTest(`Submit form successfully with email ${data.email}`, async ({ formPage }) => {
      const randomData = {
        email: generateRandomString(10).concat(data.email),
        lastName: generateRandomString().concat(data.lastName),
        firstName: generateRandomString().concat(data.firstName),
        infoSource: getRandomElement(CommonText.infoSource),
        svcInterest: getRandomElement(CommonText.serviceOfInterest),
        assocType: getRandomElement(CommonText.typeOfAssociation),
        explanation: data.explanation.concat(faker.lorem.sentence())
      };

      await WebTest.step(`Enter email: ${randomData.email}`, async () => {
        await formPage.enterEmail(faker.internet.displayName().concat(data.email));
      });

      await WebTest.step(`Enter last name: ${randomData.lastName}`, async () => {
        await formPage.enterLastName(faker.person.lastName().concat(data.lastName));
      });

      await WebTest.step(`Enter first name: ${randomData.firstName}`, async () => {
        await formPage.enterFirstName(faker.person.firstName().concat(data.firstName));
      });

      await WebTest.step(`Select info source: ${randomData.infoSource}`, async () => {
        await formPage.selectInfoSourceOption(randomData.infoSource);
      });

      await WebTest.step(`Select service of interest: ${randomData.svcInterest}`, async () => {
        await formPage.selectCheckBoxOfSvcOfInterest(randomData.svcInterest);
      });

      await WebTest.step(`Select association type: ${randomData.assocType}`, async () => {
        await formPage.selectRadioBtnFromAssocType(randomData.assocType);
      });

      await WebTest.step(`Enter explanation: ${randomData.explanation}`, async () => {
        await formPage.enterExplanation(randomData.explanation.concat(faker.lorem.sentence()));
      });

      await WebTest.step('Submit the form', async () => {
        await formPage.clickSubmit();
      });

      expect(await formPage.isCheckIconDisplayed()).toBeTruthy();
      expect(await formPage.isSuccessMessageDisplayed()).toBeTruthy();
    });
  }

  for (const data of InvalidData) {
    WebTest(`Submit form failes with error [${data.errorMsg}]`, async ({ formPage }) => {
      await WebTest.step('Fill the form with empty email', async () => {
        await formPage.fillTheForm(data as FormDto);
        expect.soft(await formPage.isSuccessMessageNotDisplayed()).toBeTruthy();
      });

      await WebTest.step('Verify error message is displayed', async () => {
        expect(await formPage.isErrorMessageDisplayed(data.errorMsg)).toBeTruthy();
      });
    });
  }
});
