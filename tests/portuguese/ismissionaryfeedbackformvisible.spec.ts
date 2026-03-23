import { test } from '@playwright/test';
import process from 'process';
import { ChurchLoginPage } from '../../pages/ChurchLoginPage';
import { MissionaryFeedbackPage } from '../../pages/MissionaryFeedbackPage';

const AUTH_URL = 'https://id.churchofjesuschrist.org/oauth2/default/v1/authorize?client_id=0oa1bufvsjns2bSz2358&redirect_uri=https%3A%2F%2Fmygatherings-anth-test.powerappsportals.com%2Fsignin-openid_1&response_type=code&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3D_7AULX3lR-m4lT2dFiJUhN7-s2V_AVArCz_9LjVeG2MMSPqLDnnxm_jXGb2-CCsmkuCAKUKA4rDgJoAenzB3SW2iLtNuegPGYUiqAtXfPBwqgW6U1_cMF8LsO0cVSWwoWUCgxPH0ti5luo0ghhTZCifRYR0YmqVNHLEzH_O8pleCNbYujgFh2BswNDN7Tmx5ubJIejUklSHifv9tS3cn5zclvA9kEoKBFrucNEnq-GGAV8dp2rACPS0X8IitWDcsCjjpVxRQtkr569X2jpTeWyvHnmVdkjKtj9VXXkgvPPlQdmhzrMkcKEQ5pOejeBmle9kKv1SMr6CtMJCSJRMUKZMppC7qvjAs8uU-i11v_BDxC0ErvbMVzxpXwdtI-_EPfr6DZnxnjKBab0bk2hKMRvhyh1lXu4j7RSFF6LroWclUuyVcEH-InLh6yCP3-NTQIjmpxdv7VlUVWI_lPD2ehg&nonce=639083556699468505.Y2IyMDIwYzItMTBhMS00MjczLWI0MDgtY2RlYTVjYjM5Y2YxODgwZjQ2NzQtYWMzOS00OWMzLWExMmQtYzE0ZDk2OGQzM2Zh&ui_locales=en-US&x-client-SKU=ID_NET472&x-client-ver=6.35.0.0';
const PORTAL_URL = 'https://mygatherings-anth-test.powerappsportals.com/';

const CHURCH_USERNAME = process.env.CHURCH_USERNAME!;
const CHURCH_PASSWORD = process.env.CHURCH_PASSWORD!;

//Passed!!!

test('test if missionary feedback form is visible @dashboard', async ({ page }) => {
  const loginPage = new ChurchLoginPage(page, AUTH_URL, CHURCH_USERNAME, CHURCH_PASSWORD);
  const feedbackPage = new MissionaryFeedbackPage(page, PORTAL_URL);

  await loginPage.login();
  await feedbackPage.navigate();
  await feedbackPage.openFeedbackForm();
  await feedbackPage.expectSurveyVisible();
  await feedbackPage.expectFeedbackFormMatchesSnapshot(`
    - form "General Feedback":
      - listbox "Language:":
        - option "en-us" [selected]: English (United States)‎
      - heading "General Feedback" [level=2]
      - text: ""
      - group:
        - heading [level=2]
        - text: This form is meant to help
        - strong: BYU-Pathway
        - text: leadership become aware of
        - emphasis: widespread or ongoing issues
        - text: that may be affecting many
        - strong: students
        - text: . It is
        - strong: not
        - text: the right place to report individual technical problems or student-specific concerns. If you need help with a technical issue, please use the
        - strong: “Help” tab
        - text: in
        - emphasis: My Gatherings
        - text: . For any concerns about a specific student, the
        - strong: student
        - text: should submit a request through the
        - emphasis: Help Center
        - text: . You may fill out and submit this form whenever you notice a general trend or issue that needs attention. Please avoid sending the same information through multiple channels. This form is
        - strong: separate
        - text: from the regular
        - emphasis: Missionary Feedback
        - text: collected every six months. 1. Topic *
        - listbox "1. Topic *":
          - option "Select your answer" [selected]
        - text: 2. Feedback *
        - textbox "2. Feedback *":
          - /placeholder: Enter Max Characters by 1000
      - button "Submit"
      - text: Never give out your password.
      - link "Report abuse":
        - /url: javascript:void(0)
    - contentinfo:
      - text: /The feedback you submit will be sent to the creator of this survey\\. Powered by Dynamics \\d+ Customer Voice \\|/
      - link "Privacy and cookies will open in a new tab or window.":
        - /url: https://go.microsoft.com/fwlink/?LinkId=521839
        - text: ""
      - text: "|"
      - link "Terms of use will open in a new tab or window.":
        - /url: https://go.microsoft.com/fwlink/?linkid=866263
        - text: ""
    `);
});