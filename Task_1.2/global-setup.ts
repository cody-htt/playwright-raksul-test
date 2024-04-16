import { FullConfig } from '@playwright/test';
import { ReadEnv } from '@configs/ReadEnv';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalSetup = async (config: FullConfig) => {
  ReadEnv();
};

export default globalSetup;
