const { browser, element, by } = require('protractor');
const BasePage = require('./base.page');

class HomePage extends BasePage {
  constructor() {
    super();
    this.pageUrl = 'http://automationexercise.com';
    
    // Locators
    this.homePageSlider = element(by.css('#slider'));
    this.signupLoginBtn = element(by.xpath("//a[contains(text(),'Signup / Login')]"));
    this.loggedInAs = element(by.xpath("//a[contains(text(),'Logged in as')]"));
    this.deleteAccountBtn = element(by.xpath("//a[contains(text(),'Delete Account')]"));
    this.homePageTitle = element(by.css('title'));
    this.logo = element(by.css('.logo'));
    this.featuresItems = element.all(by.css('.features_items'));
  }

  async open() {
    await browser.get(this.pageUrl);
    await browser.waitForAngularEnabled(false);
  }

  async isHomePageVisible() {
    const isSliderVisible = await this.isElementVisible(this.homePageSlider);
    const isLogoVisible = await this.isElementVisible(this.logo);
    return isSliderVisible && isLogoVisible;
  }

  async clickSignupLogin() {
    await this.safeClick(this.signupLoginBtn);
  }

  async isSignupLoginVisible() {
    return await this.isElementVisible(this.signupLoginBtn);
  }

  async isLoggedInAsVisible() {
    return await this.isElementVisible(this.loggedInAs);
  }

  async getLoggedInUsername() {
    if (await this.isLoggedInAsVisible()) {
      const text = await this.getElementText(this.loggedInAs);
      return text.replace('Logged in as ', '');
    }
    return null;
  }

  async clickDeleteAccount() {
    await this.safeClick(this.deleteAccountBtn);
  }

  async getPageTitle() {
    return await browser.getTitle();
  }

  async getCurrentUrl() {
    return await browser.getCurrentUrl();
  }
}

module.exports = new HomePage();

module.exports = new HomePage();
