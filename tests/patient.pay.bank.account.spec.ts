import { test, slowExpect } from '@fixtures/patient.flow';
import { getApprovedPatientData } from '@data/pix/questionnaire.data';
export type BankAccount = {
  institution: string;
  onlineId: string;
};
test('<PBI419392> Complete ACH Payment on PIX Checkout Page @pix-nightly', async ({ invitedPatient }) => {
  const { pix } = invitedPatient.pages;
  const { pixSteps } = invitedPatient.steps;
  const questionnaireData = getApprovedPatientData();
  const testBank: BankAccount = {
    institution: 'Test Bank',
    onlineId: 'user_custom',
  };

  await pixSteps.pix.pixQuestionnaireSteps.invitedPatient(questionnaireData);
  await pix.pixPatientDocumentsPage.updloadDocAndSubmit();
  await pixSteps.pix.pixCheckoutSteps.checkoutSinglePaymentBankAccount(testBank);

  await slowExpect(pix.pixPatientQuestionnairePage.page, "should be redirected to 'confirmation'").toHaveURL(
    /confirmation/,
  );
});
