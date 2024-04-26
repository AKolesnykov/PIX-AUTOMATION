import { EmailClient, ParsedMessage, RequestOptions } from '@email/client';

export default class EmailContent {
  patient = {
    async getDsdrInvitationLink(emailAddress: string, searchOptions?: RequestOptions): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      return await emailClient.getLinkUrlFromEmail(
        EmailClient.EmailSubject.Patient.DSDR_INVITATION,
        'Get My Quote',
        searchOptions,
      );
    },
    async getBankingCode(emailAddress: string, searchOptions?: RequestOptions): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      const mail = await emailClient.getLatestEmail(EmailClient.EmailSubject.Patient.BANKING_CODE, searchOptions);
      let code;
      if (mail.textPart) {
        const regex = /Identification Code is: (\d+)/;
        const match = regex.exec(mail.textPart);
        code = match ? match[1] : null;
      }
      return code;
    },
    async getClientNotQualifiedContent(
      emailAddress: string,
      searchOptions?: RequestOptions,
    ): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      const mail = await emailClient.getLatestEmail(
        EmailClient.EmailSubject.Patient.CLIENT_NOTIFY_NOT_QUALIFIED,
        searchOptions,
      );
      return mail.htmlPart;
    },
    async getPaymentClearedContent(emailAddress: string, searchOptions?: RequestOptions): Promise<any> {
      const emailClient = new EmailClient(emailAddress);
      const mail = await emailClient.getLatestEmail(EmailClient.EmailSubject.Patient.PAYMENT_CLEARED, searchOptions);
      return {
        htmlContent: mail.htmlPart,
        pdfAttachment: mail.pdfAttachmentPart,
      };
    },
    async getConfirmAccountLink(emailAddress: string, searchOptions?: RequestOptions): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      return await emailClient.getLinkUrlFromEmail(
        EmailClient.EmailSubject.Patient.ACCOUNT_CONFIRMATION,
        'Confirm Account',
        searchOptions,
      );
    },
    async getReviewDocumentsLink(emailAddress: string, searchOptions?: RequestOptions): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      return await emailClient.getLinkUrlFromEmail(
        EmailClient.EmailSubject.Patient.LEASE_GUARANTEE_AGREEMENT,
        'REVIEW DOCUMENTS',
        searchOptions,
      );
    },
    async getPatientInvitationEmail(
      email: string,
      searchOptions: RequestOptions = { retries: 12, retryDelayMs: 5_000, timeWindowToSearchMs: 5_000 },
      subject = EmailClient.EmailSubject.Patient.INVITATION,
      linkText?: string,
    ): Promise<any | undefined> {
      const emailClient: any = new EmailClient(email);
      const foundEmail = await emailClient.getLatestEmail(subject, searchOptions, email);
      const links = emailClient.getAnchorLinksInBody(foundEmail);
      const url = emailClient.getUrlFromLinkText(links, linkText === undefined ? 'Get Started' : linkText);
      return { email: foundEmail, invitationLink: url };
    },
    async getInvitationGetQualifiedLink(
      emailAddress: string,
      searchOptions?: RequestOptions,
    ): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      return await emailClient.getLinkUrlFromEmail(
        EmailClient.EmailSubject.Patient.COTENANT_INVITATION,
        'Apply Now',
        searchOptions,
      );
    },
    async getApplyNowLink(
      emailAddress: string,
      searchOptions: RequestOptions = { retries: 12, retryDelayMs: 5_000, timeWindowToSearchMs: 65_000 },
    ): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      return await emailClient.getLinkUrlFromEmail(
        EmailClient.EmailSubject.Patient.COTENANT_INVITATION,
        'Apply Now',
        searchOptions,
      );
    },
    async getBrokerInvitationLink(emailAddress: string, searchOptions?: RequestOptions): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      return await emailClient.getLinkUrlFromEmail(
        EmailClient.EmailSubject.Patient.BROKER_INVITATION,
        'Get Started',
        searchOptions,
      );
    },
    async getLandlordInvitationLink(emailAddress: string, searchOptions?: RequestOptions): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      return await emailClient.getLinkUrlFromEmail(
        EmailClient.EmailSubject.Patient.LANDLORD_INVITATION,
        'Get Started',
        searchOptions,
      );
    },
    async getMsaLoginLink(emailAddress: string, searchOptions?: RequestOptions): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      return await emailClient.getLinkUrlFromEmail(
        EmailClient.EmailSubject.Patient.MSA_LOGIN_LINK,
        'Log in',
        searchOptions,
      );
    },
    async getAuthAccountIsReadyLink(emailAddress: string, searchOptions?: RequestOptions): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      return await emailClient.getLinkUrlFromEmail(
        EmailClient.EmailSubject.Patient.AUTH_ACCOUNT_READY,
        'Set your password',
        searchOptions,
      );
    },
    async getApplicationUpdateEmail(emailAddress: string): Promise<ParsedMessage> {
      return new EmailClient(emailAddress).getLatestEmail(EmailClient.EmailSubject.Patient.APPLICATION_UPDATE);
    },
  };
  landlord = {
    async getLandlordNotifyPatientStartedApplication(
      emailAddress: string,
      searchOptions?: RequestOptions,
    ): Promise<string> {
      const emailClient = new EmailClient(emailAddress);
      const mail = await emailClient.getLatestEmail(
        EmailClient.EmailSubject.Landlord.LANDLORD_NOTIFY_NEW_RENTER,
        searchOptions,
      );
      return mail.fullData.snippet;
    },
    async getLanlordNotifyInviteContent(
      emailAddress: string,
      searchOptions?: RequestOptions,
    ): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      const mail = await emailClient.getLatestEmail(
        EmailClient.EmailSubject.Landlord.LANDLORD_NOTIFY_INVITE,
        searchOptions,
      );
      return mail.textPart;
    },
    async getLanlordNotifyNotQualifiedeContent(
      emailAddress: string,
      searchOptions?: RequestOptions,
    ): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      const mail = await emailClient.getLatestEmail(
        EmailClient.EmailSubject.Landlord.LANDLORD_NOTIFY_NOT_QUALIFIED,
        searchOptions,
      );
      return mail.htmlPart;
    },
    async getLandlordNotifyPurchaseContent(emailAddress: string, searchOptions?: RequestOptions): Promise<any> {
      const emailClient = new EmailClient(emailAddress);
      const mail = await emailClient.getLatestEmail(
        EmailClient.EmailSubject.Landlord.LANDLORD_NOTIFY_PURCHASE,
        searchOptions,
      );
      return {
        htmlContent: mail.htmlPart,
        pdfAttachment: mail.pdfAttachmentPart,
      };
    },
    async getLandlordRIpolicyPurchaseContent(
      emailAddress: string,
      searchOptions?: RequestOptions,
    ): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      const mail = await emailClient.getLatestEmail(
        EmailClient.EmailSubject.Landlord.LANDLORD_RI_POLICY_PURCHASE_DETAILS,
        searchOptions,
      );
      return mail.htmlPart;
    },
  };
  common = {
    async getCoreLoginLink(emailAddress: string, searchOptions?: RequestOptions): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      return await emailClient.getLinkUrlFromEmail(
        EmailClient.EmailSubject.Common.PASSWORDLESS_LOGIN,
        'Enter',
        searchOptions,
      );
    },
    async isLicenseNumberPresentInEmail(emailAddress: string, tgLicenseNumber: string, searchOptions?: RequestOptions) {
      const emailClient = new EmailClient(emailAddress);
      await emailClient.authenticateEmail();
      const email = await emailClient.getLatestEmail(EmailClient.EmailSubject.Common.PASSWORDLESS_LOGIN, searchOptions);
      let isPresent = false;
      if (email.htmlPartJsdom) {
        email.htmlPartJsdom.window.document.querySelectorAll('td').forEach((node) => {
          if (node.textContent && node.textContent.includes(tgLicenseNumber)) {
            isPresent = true;
          }
        });
      }
      return isPresent;
    },
    async getAuthOtp(emailAddress: string, searchOptions?: RequestOptions): Promise<any> {
      const emailClient = new EmailClient(emailAddress);
      const mail = await emailClient.getLatestEmail(EmailClient.EmailSubject.Common.AUTH_MFA_TOKEN, searchOptions);
      const textContent = mail.textPart;
      const regex = /Your verification code is:\s(\d+)/;
      const code = textContent.trim().match(regex)[1];
      console.log(`AUTH Verification Code is: ${code}`);
      return code;
    },
    async getAuthEmailVerificationLink(emailAddress: string, searchOptions?: RequestOptions): Promise<string> {
      const emailClient = new EmailClient(emailAddress);
      return await emailClient.getLinkUrlFromEmail(
        EmailClient.EmailSubject.Common.AUTH_EMAIL_VERIFY,
        'Verify Your Email',
        searchOptions,
      );
    },
    async getAuthEmailUpdateLink(emailAddress: string, searchOptions?: RequestOptions): Promise<string> {
      const emailClient = new EmailClient(emailAddress);
      return await emailClient.getLinkUrlFromEmail(
        EmailClient.EmailSubject.Common.AUTH_EMAIL_UPDATE,
        'Verify Your Email',
        searchOptions,
      );
    },
  };
  admin = {
    async getOktaSandboxOtp(emailAddress: string, searchOptions?: RequestOptions): Promise<any> {
      const emailClient = new EmailClient(emailAddress);
      const mail = await emailClient.getLatestEmail(EmailClient.EmailSubject.Admin.OKTA_SANDBOX_OTP, searchOptions);
      const textContent = mail.textPart;
      const regex = /Can't use the link\? Enter a code instead:\s(\d+)/;
      const code = textContent.trim().match(regex)[1];
      console.log(`Okta Sandbox Verification Code is: ${code}`);
      return code;
    },
    async getVerificationCode(emailAddress: string, searchOptions?: RequestOptions): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      const mail = await emailClient.getLatestEmail(EmailClient.EmailSubject.Common.AUTH_MFA_TOKEN, searchOptions);
      let code: string;
      if (mail.textPart) {
        const regex = /Your verification code is: (\d+)/;
        const match = regex.exec(mail.textPart);
        code = match ? match[1] : null;
      }
      return code;
    },
    async getVerificationCodeAndRemoveMessage(
      emailAddress: string,
      searchOptions?: RequestOptions,
    ): Promise<string | undefined> {
      const emailClient = new EmailClient(emailAddress);
      const mail = await emailClient.getLatestEmail(EmailClient.EmailSubject.Common.AUTH_MFA_TOKEN, searchOptions);
      let code: string;
      if (mail.textPart) {
        const regex = /Your verification code is: (\d+)/;
        const match = regex.exec(mail.textPart);
        code = match ? match[1] : null;
      }
      await emailClient.removeMessageById(mail.messageId);
      console.log(`AUTH Verification Code is: ${code}`);
      return code;
    },
  };
}
