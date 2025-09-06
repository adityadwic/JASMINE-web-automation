const homePage = require('../pages/home.page');
const TestHelper = require('../utils/testHelper');

describe('Smoke Tests - Basic Functionality', () => {
  
  beforeAll(async () => {
    TestHelper.logTestStep('Starting smoke tests');
  });

  it('should load home page successfully', async () => {
    TestHelper.logTestStep('Loading home page');
    await homePage.open();
    
    const isVisible = await homePage.isHomePageVisible();
    expect(isVisible).toBe(true, 'Home page should load successfully');
  });

  it('should have correct page title', async () => {
    TestHelper.logTestStep('Checking page title');
    const title = await homePage.getPageTitle();
    expect(title).toContain('Automation Exercise', 'Page title should contain "Automation Exercise"');
  });

  it('should have signup/login button visible', async () => {
    TestHelper.logTestStep('Checking signup/login button visibility');
    const isButtonVisible = await homePage.isSignupLoginVisible();
    expect(isButtonVisible).toBe(true, 'Signup/Login button should be visible');
    
    // Test button click functionality
    await homePage.clickSignupLogin();
    
    // Wait for navigation and check URL
    await browser.sleep(2000);
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toContain('/login', 'Should navigate to login page');
  });

  afterAll(async () => {
    TestHelper.logTestStep('Smoke tests completed');
  });
});
