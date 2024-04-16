// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {
  protected static readonly SHORT_WAIT = 10 * 1000;
  protected static readonly MEDIUM_WAIT = BasePage.SHORT_WAIT * 2;
  protected static readonly LONG_WAIT = process.env.CI === 'true' ? BasePage.SHORT_WAIT * 3 : BasePage.MEDIUM_WAIT;

  constructor(protected page: Page) {}

  /**
   * Finds a locator on the page.
   * @param value - The value of the locator to find.
   * @param options - Optional parameters for finding the locator.
   * @returns A Promise that resolves to the located element.
   */
  protected async findLocator(
    value: string,
    options?: {
      frame?: string;
      tabId?: number;
      timeOut?: number;
      has?: Locator;
      hasText?: string;
    },
  ): Promise<Locator> {
    // improve this window concept
    if (options?.tabId) {
      this.page = this.page.context().pages()[options.tabId];
    }
    if (options?.frame) {
      return this.page.frameLocator(options.frame).locator(value, {
        has: options?.has,
        hasText: options?.hasText,
      });
    }
    return this.page.locator(value, {
      has: options?.has,
      hasText: options?.hasText,
    });
  }

  protected async findLocators(
    value: string,
    options?: {
      frame?: string;
      tabId?: number;
      timeOut?: number;
      has?: Locator;
      hasText?: string;
      all?: boolean;
    },
  ): Promise<Locator[]> {
    if (options?.tabId) {
      this.page = this.page.context().pages()[options.tabId];
    }

    const locatorOptions = {
      has: options?.has,
      hasText: options?.hasText,
    };

    let locators: Locator[];

    if (options?.frame) {
      const frameLocator = this.page.frameLocator(options.frame).locator(value, locatorOptions);
      locators = await frameLocator.all();
    } else {
      const pageLocator = this.page.locator(value, locatorOptions);
      locators = await pageLocator.all();
    }

    return locators;
  }

  /**
   * Finds the first element that matches the given text.
   * @param text The text to search for.
   * @returns The first element that matches the given text.
   */
  protected async findFirstByText(text: string) {
    const element = this.page.getByText(text, { exact: true });
    return element.first();
  }

  /**
   * Finds the last element on the page that matches the given text.
   * @param text The text to search for.
   * @returns The last element on the page that matches the given text.
   */
  protected async findLastByText(text: string) {
    const element = this.page.getByText(text, { exact: true });
    return element.last();
  }

  /**
   * Finds the nth element with the given text.
   * @param text - The text to search for.
   * @param index - The index of the element to return.
   * @returns The nth element with the given text.
   */
  protected async findNthByText(text: string, index: number) {
    const element = this.page.getByText(text, { exact: true });
    return element.nth(index);
  }

  /**
   * Navigates to the specified path and waits for the page to load.
   * @param path - The path to navigate to.
   */
  protected async goToPage(path: string) {
    await this.page.goto(path, { timeout: BasePage.LONG_WAIT, waitUntil: 'load' });
    await this.waitForPageToLoad(BasePage.LONG_WAIT);
  }

  /**
   * Returns the current URL of the page.
   * @returns {Promise<string>} A promise that resolves with the current URL of the page.
   */
  protected async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Enters the specified text into the element located by the given locator.
   * @param locator The locator used to find the element.
   * @param text The text to enter into the element.
   * @throws An error if the element cannot be found or if there is an error while filling the element with text.
   */
  protected async enterText(locator: string, text: string) {
    try {
      const element = await this.findLocator(locator);
      await element.fill(text);
    } catch (error) {
      throw new Error(`Failed with ${error.message}`);
    }
  }

  /**
   * Presses a key on the element located by the given locator.
   * @param locator - The locator string used to find the element.
   * @param key - The key to be pressed on the element.
   * @returns A promise that resolves when the key has been pressed on the element.
   * @throws An error if the element cannot be found or if the key cannot be pressed on the element.
   */
  protected async pressKeyOnElement(locator: string, key: string) {
    try {
      const element = await this.findLocator(locator);
      await element.press(key, { delay: 100, noWaitAfter: true, timeout: BasePage.LONG_WAIT });
    } catch (error) {
      throw new Error(`Failed with ${error.message}`);
    }
  }

  /**
   * Clicks on the element located by the given locator.
   * @param locator - The locator string used to find the element to click.
   * @throws An error if the element cannot be found or clicked.
   */
  protected async click(locator: string | Locator) {
    try {
      if (typeof locator === 'string') {
        const element = await this.findLocator(locator);
        await element.click({ timeout: BasePage.LONG_WAIT });
      } else {
        await locator.click({ timeout: BasePage.LONG_WAIT });
      }
    } catch (error) {
      throw new Error(`Failed with ${error.message}`);
    }
  }

  /**
   * Double-Clicks on the element located by the given locator.
   * @param locator - The locator string used to find the element to click.
   * @throws An error if the element cannot be found or clicked.
   */
  protected async doubleClick(locator: string) {
    try {
      const element = await this.findLocator(locator);
      await element.dblclick({ timeout: BasePage.LONG_WAIT });
    } catch (error) {
      throw new Error(`Failed with ${error.message}`);
    }
  }

  /**
   * Clicks the first element found with the given text.
   * @param text - The text to search for.
   * @throws An error if no element is found or if there is an error clicking the element.
   */
  protected async clickByText(text: string) {
    try {
      const element = await this.findFirstByText(text);
      await element.click();
    } catch (error) {
      throw new Error(`Failed with ${error.message}`);
    }
  }

  /**
   * Clicks on an element using JavaScript.
   * @param locator - The locator of the element to be clicked.
   * @returns A Promise that resolves when the element is clicked.
   */
  protected async clickElementJS(locator: string): Promise<void> {
    await this.waitFor(BasePage.LONG_WAIT);
    // eslint-disable-next-line playwright/no-eval
    await this.page.$eval(locator, (element: HTMLElement) => element.click());
  }

  /**
   * Selects an option from a dropdown element based on the provided locator and options.
   * @param locator - The locator of the dropdown element.
   * @param options - The options to select from the dropdown element.
   * @param options.value - The value of the option to select.
   * @param options.label - The label of the option to select.
   * @param options.index - The index of the option to select.
   * @throws An error if the selection fails.
   */
  protected async selectFromDropdown(locator: string, options: { value?: string; label?: string; index?: number }) {
    try {
      const dropdown = await this.findLocator(locator);
      await dropdown.selectOption(options);
    } catch (error) {
      throw new Error(`Failed with ${error.message}`);
    }
  }

  /**
   * Gets the text content of an element located by the given locator.
   * @param locator - The locator used to find the element.
   * @returns A promise that resolves to the text content of the element.
   * @throws An error if the element cannot be found or if there is an error retrieving its text content.
   */
  protected async getTextContent(locator: string) {
    try {
      const element = await this.findLocator(locator);
      return element.textContent({ timeout: BasePage.LONG_WAIT });
    } catch (error) {
      throw new Error(`Failed with ${error.message}`);
    }
  }

  /**
   * Retrieves the inner text of an element located by the given locator.
   * @param locator - The locator used to find the element.
   * @returns A promise that resolves to the inner text of the element.
   * @throws An error if the element cannot be found or if there is an error retrieving the inner text.
   */
  protected async getInnerText(locator: string) {
    try {
      const element = await this.findLocator(locator);
      return element.innerText({ timeout: BasePage.LONG_WAIT });
    } catch (error) {
      throw new Error(`Failed with ${error.message}`);
    }
  }

  /**
   * Gets the value of the specified attribute of an element located by the given locator.
   * @param locator - The locator used to find the element.
   * @param attr - The name of the attribute to get the value of.
   * @returns A promise that resolves to the value of the specified attribute.
   * @throws An error if the element cannot be found or if there is an error getting the attribute value.
   */
  protected async getElementAttr(locator: string, attr: string) {
    try {
      const element = await this.findLocator(locator);
      return element.getAttribute(attr, { timeout: BasePage.LONG_WAIT });
    } catch (error) {
      throw new Error(`Failed with ${error.message}`);
    }
  }

  /**
   * Waits for a specified amount of time.
   * @param time The amount of time to wait, in milliseconds. Defaults to `LONG_WAIT`.
   */
  public async waitFor(time = BasePage.LONG_WAIT) {
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(time);
  }

  /**
   * Waits for the page to finish loading.
   * @param timeout The maximum amount of time to wait for the page to load, in milliseconds.
   */
  public async waitForPageToLoad(timeout = BasePage.LONG_WAIT) {
    await this.page.waitForLoadState('domcontentloaded', { timeout });
  }

  /**
   * Waits for the element with the given locator to disappear from the page.
   * @param locator The locator of the element to wait for.
   * @param timeout The maximum amount of time to wait for the element to disappear, in milliseconds.
   * @returns A promise that resolves when the element has disappeared, or rejects if the timeout is exceeded.
   */
  protected async waitForElementToDisappear(locator: string, timeout = BasePage.LONG_WAIT) {
    const element = await this.findLocator(locator);
    return element.isHidden({ timeout });
  }

  /**
   * Waits for the specified element to reach the specified state.
   * @param locator - The locator for the element to wait for.
   * @param state - The state to wait for ('attached', 'detached', 'visible', or 'hidden').
   * @param timeout - The maximum amount of time to wait for the element to reach the specified state (in milliseconds).
   */
  protected async waitForElementState(
    locator: string,
    state: 'attached' | 'detached' | 'visible' | 'hidden',
    timeout = BasePage.LONG_WAIT,
  ) {
    const element = await this.findLocator(locator);
    element.waitFor({ state, timeout });
  }

  /**
   * Checks if the element located by the given locator is visible on the page.
   * @param locator - The locator string used to find the element.
   * @returns A boolean indicating whether the element is visible or not.
   */
  protected async isElementVisible(locator: string) {
    const element = await this.findLocator(locator);
    return element.first().isVisible({ timeout: BasePage.LONG_WAIT });
  }

  /**
   * Checks if the element located by the given locator is not visible.
   * @param locator - The locator string used to find the element.
   * @returns A boolean indicating whether the element is not visible.
   */
  protected async isElementNotVisible(locator: string) {
    const element = await this.findLocator(locator);
    const isNotVisible = await element.first().isVisible({ timeout: BasePage.LONG_WAIT });
    return !isNotVisible;
  }

  /**
   * Checks if the element located by the given locator is hidden.
   * @param locator - The locator string used to find the element.
   * @returns A promise that resolves to a boolean indicating whether the element is hidden or not.
   */
  protected async isElementHidden(locator: string) {
    const element = await this.findLocator(locator);
    return element.first().isHidden({ timeout: BasePage.LONG_WAIT });
  }

  /**
   * Checks if the element located by the given locator is checked.
   * @param locator The locator string used to find the element.
   * @returns A boolean indicating whether the element is checked or not.
   */
  protected async isElementChecked(locator: string) {
    const element = await this.findLocator(locator);
    return element.first().isChecked({ timeout: BasePage.LONG_WAIT });
  }

  /**
   * Checks if the element located by the given locator is enabled.
   * @param locator - The locator string used to find the element.
   * @returns A promise that resolves to a boolean indicating whether the element is enabled.
   */
  protected async isElementEnabled(locator: string) {
    const element = await this.findLocator(locator);
    return element.first().isEnabled({ timeout: BasePage.LONG_WAIT });
  }
}
