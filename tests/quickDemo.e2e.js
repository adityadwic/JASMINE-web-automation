const homePage = require('../pages/home.page');
const TestHelper = require('../utils/testHelper');

describe('Quick Demo Test - Basic Functionality', () => {
  
  beforeAll(async () => {
    TestHelper.logTestStep('Starting quick demo test');
  });

  it('should load home page and verify basic elements', async () => {
    TestHelper.logTestStep('Loading automation exercise home page');
    
    try {
      await homePage.open();
      await browser.sleep(3000); // Give page time to load
      
      const currentUrl = await homePage.getCurrentUrl();
      expect(currentUrl).toContain('automationexercise.com');
      TestHelper.logTestStep('✅ URL verification passed');
      
      const title = await homePage.getPageTitle();
      expect(title).toBeTruthy();
      TestHelper.logTestStep('✅ Page title retrieved successfully');
      
      TestHelper.logTestStep('✅ Basic functionality test completed successfully');
      
    } catch (error) {
      TestHelper.logTestStep(`❌ Error occurred: ${error.message}`);
      throw error;
    }
  });

  afterAll(async () => {
    TestHelper.logTestStep('Quick demo test completed');
  });
});
