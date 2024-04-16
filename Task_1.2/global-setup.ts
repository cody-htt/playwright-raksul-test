import { FullConfig } from '@playwright/test';
import { ReadEnv } from '@configs/ReadEnv';
import Env from '@configs/Env';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalSetup = async (config: FullConfig) => {
  await ReadEnv();
  console.log(`Global setup for ${process.env.ENV} environment.`);
  console.log(`Base URL: [${Env.WEB_BASEURL}]`);
};

export default globalSetup;
