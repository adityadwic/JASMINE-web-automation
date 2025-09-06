const { browser, element, by, ExpectedConditions } = require('protractor');

class BasePage {
  constructor() {
    this.timeout = 10000;
  }

  async waitForElement(element, timeout = this.timeout) {
    await browser.wait(ExpectedConditions.presenceOf(element), timeout);
  }

  async waitForElementToBeClickable(element, timeout = this.timeout) {
    await browser.wait(ExpectedConditions.elementToBeClickable(element), timeout);
  }

  async waitForElementToBeVisible(element, timeout = this.timeout) {
    await browser.wait(ExpectedConditions.visibilityOf(element), timeout);
  }

  async safeClick(element) {
    await this.waitForElementToBeClickable(element);
    await browser.executeScript("arguments[0].scrollIntoView(true);", element.getWebElement());
    await browser.sleep(500); // Small delay for stability
    await element.click();
  }

  async safeType(element, text) {
    await this.waitForElement(element);
    await element.clear();
    await element.sendKeys(text);
  }

  async selectDropdownByText(element, text) {
    await this.waitForElement(element);
    await element.sendKeys(text);
  }

  async isElementPresent(element) {
    try {
      await this.waitForElement(element, 5000);
      return await element.isPresent();
    } catch (error) {
      return false;
    }
  }

  async isElementVisible(element) {
    try {
      await this.waitForElementToBeVisible(element, 5000);
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  async getElementText(element) {
    await this.waitForElement(element);
    return await element.getText();
  }

  async takeScreenshot(name) {
    const screenshot = await browser.takeScreenshot();
    const fs = require('fs');
    const path = require('path');
    
    const screenshotDir = path.join(__dirname, '../screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    const filename = `${name}_${new Date().getTime()}.png`;
    fs.writeFileSync(path.join(screenshotDir, filename), screenshot, 'base64');
  }
}

module.exports = BasePage;
