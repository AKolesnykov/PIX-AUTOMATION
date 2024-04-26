import { Page } from 'playwright-core';
import { AuthMasterPage } from '../../../pages/auth/master.auth.page';
import { AuthLoginFillCredentialsPage } from '../../../pages/auth/login/credentials.login.auth.page';
import { AuthLoginFillOtpPage } from '../../../pages/auth/login/otp.login.auth.page';
import { AuthRegisterRenterSuretyPage } from '../../../pages/auth/register/register.surety.auth.page';
import { AuthRegisterSetPasswordPage } from '../../../pages/auth/register/setpassword.register.auth.page';
import { AuthRegisterConfirmationPage } from '../../../pages/auth/register/confirmation.register.auth.page';
import EmailContent from '../../../base/services/email.content';
import sleep from 'await-sleep';
import { expect } from '@playwright/test';
import { adminCredentials } from '../../../data/credentials/credentials.data';

export class MonoAuthenticateSteps {
  private readonly page: Page;
  readonly authMasterPage: AuthMasterPage;


  constructor(page: Page) {
    this.page = page;
    this.authMasterPage = new AuthMasterPage(this.page);
  }

  async login(email: string, password: string, startFromMasterPage = false) {
    if (startFromMasterPage) {
      await this.authMasterPage.goto();
      // await this.authMasterPage.clickSignInLink();
    }
    await this.authLoginFillCredentialsPage.fillCredentials(email, password);
    const otp = await this.emailContent.common.getAuthOtp(email);
    await this.authLoginFillOtpPage.fillOtp(otp);
    expect(await this.authLoginFillOtpPage.getErrorMessageState(), 'Error message should not be visible').toBe(false);
    expect(
      await this.authLoginFillOtpPage.getPromptErrorMessageState(),
      'Prompt Error message should not be visible',
    ).toBe(false);
    // await this.page.waitForLoadState('networkidle', {
    //   timeout: 30000,
    // });
  }

  async loginWithoutEmailReceiving(email: string, password: string, startFromMasterPage = false) {
    if (startFromMasterPage) {
      await this.authMasterPage.goto();
      // await this.authMasterPage.clickSignInLink();
    }
    await this.authLoginFillCredentialsPage.fillCredentials(email, password);
  }

  async loginWithRetry(email: string, password: string, startFromMasterPage = false, qtyOfAttempts = 3) {
    const login = async () => {
      if (startFromMasterPage) {
        await this.authMasterPage.goto();
        // await this.authMasterPage.clickSignInLink();
        await this.page.waitForLoadState('networkidle', {
          timeout: 30_000,
        });
      }
      if (!(await this.authLoginFillCredentialsPage.getLoginPageState())) {
        let state = false;
        for (let index = 0; index < 5 && state === false; index++) {
          state = await this.authLoginFillCredentialsPage.getLoginPageState();
          console.log('Log In page is not ready. Reloading page... ', `Attempt: ${index}`);
          await sleep(3_000);
          await this.page.reload();
          await sleep(3_000);
        }
      }
      await this.authLoginFillCredentialsPage.fillCredentials(email, password);
      await sleep(2_000);
      expect(await this.authLoginFillCredentialsPage.getErrorMessageState()).toBe(false);
      const otp = await this.emailContent.common.getAuthOtp(email);
      await this.page.waitForLoadState('networkidle', {
        timeout: 30_000,
      });
      await this.authLoginFillOtpPage.fillOtp(otp);
    };

    await login();
    let state: boolean = await this.authLoginFillOtpPage.getPromptErrorMessageState();
    if (state) {
      for (let i = 0; i < qtyOfAttempts && state === true; i++) {
        console.log(i + 1 + ' attempt to login. ', 'Wait 2 minutes and try again.');
        await sleep(120_000);
        await this.authLoginFillOtpPage.clickResendCode();
        expect(await this.authLoginFillOtpPage.getPromptErrorMessageState()).toBe(false);
        await sleep(5_000);
        const otp = await this.emailContent.common.getAuthOtp(email);
        await this.page.waitForLoadState('networkidle', {
          timeout: 30_000,
        });
        await this.authLoginFillOtpPage.fillOtp(otp);
        state = await this.authLoginFillOtpPage.getPromptErrorMessageState();
      }
    }
    await this.page.waitForSelector(`a[href*='admin'], [id*='CardItem'], svg[width='102']`, { timeout: 180_000 });
  }

  async loginWithCustomCredentials(customEmail: string) {
    try {
      await this.loginWithRetry(customEmail, adminCredentials.surety.monolith.password, true, 0);
    } catch (error) {
      console.log(
        `Attempt to log in with custom admin account ${customEmail} failed. Trying to log in with default admin account. Error: `,
        error,
      );
      await this.loginWithRetry(
        adminCredentials.surety.monolith.email,
        adminCredentials.surety.monolith.password,
        false,
      );
    }
  }

  async registerInvitedRenter(email: string, password: string) {
    await this.authRegisterRenterSuretyPage.clickCreateAnAccountButton();
    const verificationLink = await this.emailContent.renter.getAuthAccountIsReadyLink(email);
    await this.page.goto(verificationLink);
    await this.authRegisterSetPasswordPage.submitPassword(password);
    await this.authRegisterConfirmationPage.clickGotoLoginPageButton();
  }

  async registerBrokerInvitedRenter(password: string) {
    await this.authRegisterSetPasswordPage.submitPassword(password);
    await this.authMasterPage.signInButton.isEnabled();
  }

  async registerNewRenter(email: string, password: string) {
    await this.authRegisterRenterSuretyPage.submitEmailAddress(email);
    await this.authRegisterSetPasswordPage.submitPassword(password);
    await this.authRegisterConfirmationPage.clickGotoLoginPageButton();
  }
}
