import { Page, Locator } from 'playwright-core';
import fs from 'fs';
import path from 'path';

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Saves cookies from current context to a file as JSON
   */
  async saveCookies() {
    const cookies = await this.page.context().cookies();
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
  }

  /**
   * Loads the saved cookies to the current context
   */
  async setSavedCookiesToContext() {
    const cookieString = fs.readFileSync('cookies.json').toString();
    const cookies = JSON.parse(cookieString);
    await this.page.context().addCookies([...cookies]);
  }

  async assertTextInPage(expectedText: string): Promise<boolean> {
    console.log(`Assert page has text: '${expectedText}'`);
    const bodyText = await this.page.textContent('body');
    return bodyText?.includes(expectedText) ?? false;
  }

  async assertUrlContains(searchString: string): Promise<boolean> {
    const currentUrl = this.page.url();
    return currentUrl.includes(searchString);
  }

  async gotoUrl(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getCurrentUrl(): Promise<string> {
    const url = this.page.url();
    return url;
  }

  /**
   * When a click event opens a new tab, passing the locator to click
   * will open the new tab in the current tab and close the new tab
   * so that flow can continue in the current tab
   * @param locatorToClick locator to click that opens a new tab
   */
  async openNewTabInCurrentTab(locatorToClick: Locator): Promise<void> {
    const [newTabHandle] = await Promise.all([this.page.context().waitForEvent('page'), await locatorToClick.click()]);
    const url = newTabHandle.url();
    await this.page.goto(url);
    await newTabHandle.close();
  }

  /**
   * Functiin showing new tab was opened and printing this new tab's URL in the console
   * Browser remains in the context of the initial tab and new tab is closed.
   * @param selector  button or link needs to be clicked to open a new tub
   */
  async waitForNewTab(selector: Locator, url: string) {
    const [newTab] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 1200000 }),
      await selector.click(),
    ]);
    newTab.url().includes(url);
    console.log(`New tab url is ${newTab.url()}}`);
    newTab.close();
  }
}