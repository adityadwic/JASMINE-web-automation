class TestHelper {
  static async retry(fn, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === maxRetries - 1) {
          throw error;
        }
        console.log(`Attempt ${i + 1} failed, retrying in ${delay}ms...`);
        await this.sleep(delay);
      }
    }
  }

  static async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static generateUniqueEmail() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `test_${timestamp}_${random}@automation.test`;
  }

  static generateRandomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static async waitForPageLoad(browser, timeout = 10000) {
    await browser.wait(() => {
      return browser.executeScript('return document.readyState').then(state => {
        return state === 'complete';
      });
    }, timeout);
  }

  static getCurrentTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }

  static logTestStep(stepDescription) {
    console.log(`[${this.getCurrentTimestamp()}] Step: ${stepDescription}`);
  }
}

module.exports = TestHelper;
