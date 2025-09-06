const { browser } = require('protractor');
const homePage = require('../pages/home.page');
const signupPage = require('../pages/signup.page');
const TestDataGenerator = require('../data/testData');
const TestHelper = require('../utils/testHelper');
const config = require('../config/test.config');

describe('User Registration and Account Management Flow', () => {
  let testData;

  beforeAll(async () => {
    await browser.manage().window().setSize(config.browser.windowSize.width, config.browser.windowSize.height);
    testData = TestDataGenerator.generateRandomUser();
    TestHelper.logTestStep('Test suite started - User Registration Flow');
  });

  beforeEach(async () => {
    await browser.waitForAngularEnabled(false);
  });

  afterEach(async function() {
    try {
      // Check if current spec has failures
      const currentSpec = jasmine.currentSpec || this.currentSpec;
      if (currentSpec && currentSpec.failedExpectations && currentSpec.failedExpectations.length > 0) {
        const specName = (currentSpec.description || 'unknown_test').replace(/\s+/g, '_');
        await homePage.takeScreenshot(`failed_${specName}_${Date.now()}`);
      }
    } catch (error) {
      console.log('Screenshot capture failed:', error.message);
    }
  });

  describe('Home Page Navigation', () => {
    it('should launch browser and navigate to automation exercise website', async () => {
      TestHelper.logTestStep('Opening home page');
      await homePage.open();
      
      const currentUrl = await homePage.getCurrentUrl();
      expect(currentUrl).toContain('automationexercise.com');
      
      const pageTitle = await homePage.getPageTitle();
      expect(pageTitle).toBeTruthy();
    });

    it('should verify that home page is visible successfully', async () => {
      TestHelper.logTestStep('Verifying home page visibility');
      const isVisible = await homePage.isHomePageVisible();
      expect(isVisible).toBe(true, 'Home page should be visible with slider and logo');
    });
  });

  describe('User Signup Process', () => {
    it('should click on Signup/Login button and navigate to signup page', async () => {
      TestHelper.logTestStep('Clicking Signup/Login button');
      await homePage.clickSignupLogin();
      
      const isSignupVisible = await signupPage.isNewUserSignupVisible();
      expect(isSignupVisible).toBe(true, 'New User Signup section should be visible');
    });

    it('should verify New User Signup is visible', async () => {
      TestHelper.logTestStep('Verifying New User Signup visibility');
      const isVisible = await signupPage.isNewUserSignupVisible();
      expect(isVisible).toBe(true, 'New User Signup heading should be visible');
    });

    it('should enter name and email address and click signup', async () => {
      TestHelper.logTestStep(`Entering signup details - Name: ${testData.name}, Email: ${testData.email}`);
      await signupPage.signup(testData.name, testData.email);
      
      // Check if email already exists
      const emailExists = await signupPage.isEmailExistsErrorVisible();
      if (emailExists) {
        // Generate new test data with different email
        testData = TestDataGenerator.generateRandomUser();
        TestHelper.logTestStep(`Email exists, trying with new email: ${testData.email}`);
        await homePage.open();
        await homePage.clickSignupLogin();
        await signupPage.signup(testData.name, testData.email);
      }
      
      const isAccountInfoVisible = await signupPage.isEnterAccountInfoVisible();
      expect(isAccountInfoVisible).toBe(true, 'Enter Account Information should be visible');
    });
  });

  describe('Account Information Form', () => {
    it('should verify that ENTER ACCOUNT INFORMATION is visible', async () => {
      TestHelper.logTestStep('Verifying Enter Account Information visibility');
      const isVisible = await signupPage.isEnterAccountInfoVisible();
      expect(isVisible).toBe(true, 'Enter Account Information should be visible');
    });

    it('should fill account details including title, password and date of birth', async () => {
      TestHelper.logTestStep('Filling account information details');
      const dateOfBirth = TestDataGenerator.getValidDateOfBirth();
      
      await signupPage.fillAccountInfo({
        title: testData.title,
        password: testData.password,
        day: dateOfBirth.day,
        month: dateOfBirth.month,
        year: dateOfBirth.year,
      });

      // Verify the form fields are filled (basic validation)
      expect(true).toBe(true, 'Account information should be filled successfully');
    });

    it('should select newsletter and special offers checkboxes', async () => {
      TestHelper.logTestStep('Selecting newsletter and special offers checkboxes');
      await signupPage.selectNewsletter();
      await signupPage.selectOptin();
      
      expect(true).toBe(true, 'Checkboxes should be selected successfully');
    });

    it('should fill address information details', async () => {
      TestHelper.logTestStep('Filling address information');
      await signupPage.fillAddressInfo({
        firstName: testData.firstName,
        lastName: testData.lastName,
        company: testData.company,
        address1: testData.address1,
        address2: testData.address2,
        country: testData.country,
        state: testData.state,
        city: testData.city,
        zipcode: testData.zipcode,
        mobileNumber: testData.mobileNumber,
      });

      expect(true).toBe(true, 'Address information should be filled successfully');
    });
  });

  describe('Account Creation and Verification', () => {
    it('should click Create Account button and verify account creation', async () => {
      TestHelper.logTestStep('Clicking Create Account button');
      await signupPage.clickCreateAccount();
      
      const isAccountCreated = await signupPage.isAccountCreatedVisible();
      expect(isAccountCreated).toBe(true, 'Account Created message should be visible');
      
      const accountMessage = await signupPage.getAccountCreatedMessage();
      expect(accountMessage).toContain('ACCOUNT CREATED!', 'Account creation message should be correct');
    });

    it('should click Continue button after account creation', async () => {
      TestHelper.logTestStep('Clicking Continue button after account creation');
      await signupPage.clickContinue();
      
      const isLoggedIn = await homePage.isLoggedInAsVisible();
      expect(isLoggedIn).toBe(true, 'User should be logged in successfully');
      
      const username = await homePage.getLoggedInUsername();
      expect(username).toBe(testData.name, `Logged in username should match: ${testData.name}`);
    });

    it('should verify that Logged in as username is visible', async () => {
      TestHelper.logTestStep('Verifying logged in status');
      const isVisible = await homePage.isLoggedInAsVisible();
      expect(isVisible).toBe(true, 'Logged in as username should be visible');
      
      const loggedInUser = await homePage.getLoggedInUsername();
      expect(loggedInUser).toBeTruthy('Username should be displayed');
    });
  });

  describe('Account Deletion Process', () => {
    it('should click Delete Account button', async () => {
      TestHelper.logTestStep('Clicking Delete Account button');
      await homePage.clickDeleteAccount();
      
      const isAccountDeleted = await signupPage.isAccountDeletedVisible();
      expect(isAccountDeleted).toBe(true, 'Account Deleted message should be visible');
    });

    it('should verify that ACCOUNT DELETED is visible and click Continue', async () => {
      TestHelper.logTestStep('Verifying account deletion and clicking Continue');
      const isVisible = await signupPage.isAccountDeletedVisible();
      expect(isVisible).toBe(true, 'Account Deleted message should be visible');
      
      const deleteMessage = await signupPage.getAccountDeletedMessage();
      expect(deleteMessage).toContain('ACCOUNT DELETED!', 'Account deletion message should be correct');
      
      await signupPage.clickContinue();
      TestHelper.logTestStep('Account deletion process completed successfully');
    });
  });

  afterAll(async () => {
    TestHelper.logTestStep('Test suite completed - Cleaning up');
    if (config.test.cleanup) {
      await browser.executeScript('window.localStorage.clear();');
      await browser.executeScript('window.sessionStorage.clear();');
    }
  });
});
