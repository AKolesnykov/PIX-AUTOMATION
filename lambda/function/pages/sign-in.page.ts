import { Locator, Page } from 'playwright-core';
import { BasePage } from './base.page';
import { Urls } from '../data/urls';

export class PixLoginPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
  
    constructor(page: Page) {
      super(page);
      this.emailInput = page.locator('[name="email"]');
      this.passwordInput = page.locator('[type="password"]');
      this.loginButton = page.locator('[type="submit"]');
    }
  
    async goto() {
      await this.page.goto(new Urls().PIX.LOGIN);
    }
  
    async fillEmail(email: string) {
      console.log(`Filling email with: ${email}`);
      await this.emailInput.fill(email);
    }
  
    async fillPassword(password: string) {
      console.log(`Filling password with: ${password}`);
      await this.passwordInput.fill(password);
    }
  
    async clickLogin() {
      console.log(`Clicking login button`);
      await this.loginButton.click();
    }
  
    async login(email: string, password: string, submit = true) {
      await this.fillEmail(email);
      await this.fillPassword(password);
      if (submit) {
        await this.clickLogin();
      }
    }
  }