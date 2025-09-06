const { element, by } = require('protractor');
const BasePage = require('./base.page');

class SignupPage extends BasePage {
  constructor() {
    super();
    
    // Sign up form locators
    this.newUserSignup = element(by.xpath("//h2[contains(text(),'New User Signup!')]"));
    this.nameInput = element(by.xpath("//input[@data-qa='signup-name']"));
    this.emailInput = element(by.xpath("//input[@data-qa='signup-email']"));
    this.signupBtn = element(by.xpath("//button[@data-qa='signup-button']"));
    
    // Account information form locators
    this.enterAccountInfo = element(by.xpath("//b[contains(text(),'Enter Account Information')]"));
    this.titleMr = element(by.id('id_gender1'));
    this.titleMrs = element(by.id('id_gender2'));
    this.nameField = element(by.id('name'));
    this.emailField = element(by.id('email'));
    this.passwordInput = element(by.id('password'));
    this.days = element(by.id('days'));
    this.months = element(by.id('months'));
    this.years = element(by.id('years'));
    this.newsletterCheckbox = element(by.id('newsletter'));
    this.optinCheckbox = element(by.id('optin'));
    
    // Address information form locators
    this.firstName = element(by.id('first_name'));
    this.lastName = element(by.id('last_name'));
    this.company = element(by.id('company'));
    this.address1 = element(by.id('address1'));
    this.address2 = element(by.id('address2'));
    this.country = element(by.id('country'));
    this.state = element(by.id('state'));
    this.city = element(by.id('city'));
    this.zipcode = element(by.id('zipcode'));
    this.mobileNumber = element(by.id('mobile_number'));
    
    // Account creation and deletion locators
    this.createAccountBtn = element(by.xpath("//button[@data-qa='create-account']"));
    this.accountCreated = element(by.xpath("//b[contains(text(),'Account Created!')]"));
    this.continueBtn = element(by.xpath("//a[@data-qa='continue-button']"));
    this.accountDeleted = element(by.xpath("//b[contains(text(),'Account Deleted!')]"));
    
    // Error messages
    this.emailExistsError = element(by.xpath("//p[contains(text(),'Email Address already exist!')]"));
  }

  async isNewUserSignupVisible() {
    return await this.isElementVisible(this.newUserSignup);
  }

  async signup(name, email) {
    await this.safeType(this.nameInput, name);
    await this.safeType(this.emailInput, email);
    await this.safeClick(this.signupBtn);
  }

  async isEnterAccountInfoVisible() {
    return await this.isElementVisible(this.enterAccountInfo);
  }

  async isEmailExistsErrorVisible() {
    return await this.isElementVisible(this.emailExistsError);
  }

  async fillAccountInfo({title, password, day, month, year}) {
    // Select title
    if (title === 'Mr') {
      await this.safeClick(this.titleMr);
    } else {
      await this.safeClick(this.titleMrs);
    }
    
    // Fill password
    await this.safeType(this.passwordInput, password);
    
    // Select date of birth
    await this.selectDropdownByText(this.days, day);
    await this.selectDropdownByText(this.months, month);
    await this.selectDropdownByText(this.years, year);
  }

  async selectNewsletter() {
    if (!await this.newsletterCheckbox.isSelected()) {
      await this.safeClick(this.newsletterCheckbox);
    }
  }

  async selectOptin() {
    if (!await this.optinCheckbox.isSelected()) {
      await this.safeClick(this.optinCheckbox);
    }
  }

  async fillAddressInfo({firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber}) {
    await this.safeType(this.firstName, firstName);
    await this.safeType(this.lastName, lastName);
    await this.safeType(this.company, company);
    await this.safeType(this.address1, address1);
    await this.safeType(this.address2, address2);
    await this.selectDropdownByText(this.country, country);
    await this.safeType(this.state, state);
    await this.safeType(this.city, city);
    await this.safeType(this.zipcode, zipcode);
    await this.safeType(this.mobileNumber, mobileNumber);
  }

  async clickCreateAccount() {
    await this.safeClick(this.createAccountBtn);
  }

  async isAccountCreatedVisible() {
    return await this.isElementVisible(this.accountCreated);
  }

  async clickContinue() {
    await this.safeClick(this.continueBtn);
  }

  async isAccountDeletedVisible() {
    return await this.isElementVisible(this.accountDeleted);
  }

  async getAccountCreatedMessage() {
    if (await this.isAccountCreatedVisible()) {
      return await this.getElementText(this.accountCreated);
    }
    return null;
  }

  async getAccountDeletedMessage() {
    if (await this.isAccountDeletedVisible()) {
      return await this.getElementText(this.accountDeleted);
    }
    return null;
  }
}

module.exports = new SignupPage();

module.exports = new SignupPage();
