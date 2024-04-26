import { Patient } from '../base/roles/patient';
import { test as baseTest } from './access.portals';

type PatientFlowsFixtures = {
  invitedPatient: Patient;
};

export const expect = baseTest.expect;

export const slowExpect = baseTest.expect.configure({
  timeout: 20_000,
});

export const test = baseTest.extend<PatientFlowsFixtures>({

  /**
   * Patient visits invitation link, register, login and skip 'getting started' pages to land on questionnaire.
   */
  invitedPatient: async ({ invitation, patient }, use) => {
    await patient.steps.suretySteps.monolith.monoPatientSteps.registerAndLoginByInvitation(
      invitation.email,
      invitation.password,
      invitation.link,
    );

    await patient.steps.suretySteps.monolith.monoPatientSteps.skipGetStarted();

    await slowExpect(
      patient.pages.monolith.monoPatientQuestionnairePage.page,
      'should be landed on questionnaire page',
    ).toHaveURL(/application\/questionnaire/);

    await use(patient);
  },

});
