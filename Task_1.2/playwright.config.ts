import { defineConfig, devices } from '@playwright/test';

const globalTimeout = 10 * 1000; /** 10 seconds */

/**
 * Configuration file for Playwright tests.
 *
 * @fileoverview This file contains the configuration options for running Playwright tests.
 * It specifies the test directory, test match pattern, timeout settings, expect timeout,
 * parallel execution options, reporters, global setup and teardown scripts, action timeout,
 * trace collection, and project configurations for different browsers.
 *
 * @module playwright.config
 */

export default defineConfig({
  // Test directory
  testDir: './tests',
  // Test match pattern
  testMatch: /.*\.spec\.ts/,
  // Timeout settings
  timeout: process.env.CI === 'true' ? globalTimeout * 18 : globalTimeout * 6,
  // Expect timeout
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     */
    timeout: process.env.CI === 'true' ? globalTimeout * 3 : globalTimeout
  },
  // Parallel execution options
  fullyParallel: true,
  // Retry on CI only
  retries: process.env.CI === 'true' ? 0 : 0,
  // Number of workers for parallel execution on CI
  workers: process.env.CI === 'true' ? 4 : 6,
  // Reporters to use
  reporter: [['html', { outputFolder: `./report/html-report`, open: 'never' }]],
  // Global setup script
  globalSetup: require.resolve('./global-setup.ts'),
  // Global teardown script
  globalTeardown: require.resolve('./global-teardown.ts'),
  use: {
    /**
     * Global action timeout, e.g page.click() will throw an error when the timeout is exceeded.
     */
    actionTimeout: process.env.CI === 'true' ? globalTimeout * 3 : globalTimeout,
    /**
     * Collect trace when retrying the failed test.
     * See https://playwright.dev/docs/trace-viewer
     */
    trace: 'retain-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'RAKSUL-FORM-E2E-TEST',
      use: {
        ...devices['Desktop Chrome'],
        headless: process.env.CI === 'true'
      },
      // Filter test cases for this project execution script
      grep: [/E2E/]
    }
  ]
});
