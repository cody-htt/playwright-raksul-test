import { WebTest, expect } from '@fixtures/BaseTest';

WebTest.describe.parallel('RAKSUL-FORM-E2E-TEST', () => {
  WebTest.beforeEach('Launch browser and open the page', async ({ formPage }) => {
    await formPage.navigate();
  });

  WebTest('Validate the form page URL', async ({ formPage }) => {
    await WebTest.step('Check the URL', async () => {
      const url = await formPage.getCurrentUrl();
      expect(url).toContain('/recruit-qa-engineer-work-sample');
    });
  });
});
