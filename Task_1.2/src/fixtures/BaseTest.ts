import { test } from '@playwright/test';
import Env from '@configs/Env';
import { PageObjects } from '@helpers/TestTypes';
import FormPage from '@pages/FormPage';

export const WebTest = test.extend<PageObjects>({
  formPage: async ({ page }, use) => {
    await use(new FormPage(page));
  },
  baseURL: Env.WEB_BASEURL
});

export const expect = WebTest.expect;
