const config = require('./config/test.config');
const path = require('path');

exports.config = {
  framework: 'jasmine',
  directConnect: true,
  chromeDriver: path.join(__dirname, 'node_modules/chromedriver/bin/chromedriver'),
  specs: ['./tests/*.e2e.js'],
  
  capabilities: {
    browserName: config.browser.name,
    chromeOptions: {
      args: config.browser.headless ? ['--headless', '--no-sandbox', '--disable-dev-shm-usage'] : ['--no-sandbox', '--disable-dev-shm-usage'],
      prefs: {
        'profile.default_content_setting_values.notifications': 2
      }
    }
  },
  
  // Timeouts
  allScriptsTimeout: config.timeouts.script,
  getPageTimeout: config.timeouts.page,
  
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
    showColors: true,
    includeStackTrace: true,
    print: function() {}
  },

  // Hooks
  onPrepare: function() {
    // Set window size
    browser.driver.manage().window().setSize(config.browser.windowSize.width, config.browser.windowSize.height);
    
    // Disable Angular synchronization
    browser.waitForAngularEnabled(false);
    
    // Set timeouts
    browser.manage().timeouts().implicitlyWait(config.timeouts.implicit);
    browser.manage().timeouts().pageLoadTimeout(config.timeouts.page);
    browser.manage().timeouts().setScriptTimeout(config.timeouts.script);

    // Setup Modern Reporter
    const SimpleTestReporter = require('./utils/simpleTestReporter');
    const reporter = new SimpleTestReporter();
    jasmine.getEnv().addReporter(reporter);

    // Simple console reporter for real-time feedback
    jasmine.getEnv().addReporter({
      specStarted: function(result) {
        console.log(`\n--- Starting: ${result.fullName} ---`);
      },
      specDone: function(result) {
        console.log(`--- ${result.status.toUpperCase()}: ${result.fullName} ---`);
        if (result.status === 'failed') {
          console.log('Failure reasons:', result.failedExpectations.map(e => e.message));
        }
      }
    });

    // Screenshot on failure
    const fs = require('fs');
    const path = require('path');
    
    jasmine.getEnv().addReporter({
      specDone: async function(result) {
        if (result.status === 'failed' && config.screenshots.onFailure) {
          try {
            const screenshot = await browser.takeScreenshot();
            const screenshotDir = path.join(__dirname, config.screenshots.directory);
            
            if (!fs.existsSync(screenshotDir)) {
              fs.mkdirSync(screenshotDir, { recursive: true });
            }
            
            const filename = `${result.fullName.replace(/\s+/g, '_')}_${Date.now()}.png`;
            fs.writeFileSync(path.join(screenshotDir, filename), screenshot, 'base64');
            console.log(`Screenshot saved: ${filename}`);
          } catch (error) {
            console.log('Failed to capture screenshot:', error.message);
          }
        }
      }
    });
  },

  onComplete: function() {
    console.log('\n=== TEST EXECUTION COMPLETED ===');
  }
};
