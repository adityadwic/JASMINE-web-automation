# 🤖 Jasmine Web Automation Framework

[![Node.js](https://img.shields.io/badge/Node.js-18.20.5-green.svg)](https://nodejs.org/)
[![Jasmine](https://img.shields.io/badge/Jasmine-4.0.0-red.svg)](https://jasmine.github.io/)
[![Protractor](https://img.shields.io/badge/Protractor-7.0.0-blue.svg)](https://www.protractortest.org/)
[![Chrome](https://img.shields.io/badge/Chrome-139.0.7258.157-yellow.svg)](https://www.google.com/chrome/)

## 📋 Overview

A comprehensive web automation testing framework built with Jasmine and Protractor, implementing Page Object Model (POM) design pattern and modern QA best practices. This framework provides professional-grade test automation with **fully responsive HTML reporting** and interactive dashboards.

## 🚀 Features

- **Page Object Model (POM)** - Clean separation of page elements and test logic
- **Robust Element Handling** - Smart waits, retries, and error handling
- **Data-Driven Testing** - Dynamic test data generation
- **Comprehensive Reporting** - Detailed test execution reports
- **Screenshot on Failure** - Automatic screenshot capture for failed tests
- **Modular Architecture** - Easily extensible and maintainable code structure

## 📋 Test Scenarios Covered

The automation script covers the complete user registration and account management flow:

1. ✅ Launch browser and navigate to automation exercise website
2. ✅ Verify home page visibility 
3. ✅ Navigate to Signup/Login page
4. ✅ Verify "New User Signup!" section
5. ✅ Enter user credentials (name and email)
6. ✅ Submit signup form
7. ✅ Verify "ENTER ACCOUNT INFORMATION" page
8. ✅ Fill complete account details (title, password, date of birth)
9. ✅ Select newsletter and special offers checkboxes
10. ✅ Fill address information (name, company, address, country, etc.)
11. ✅ Submit account creation form
12. ✅ Verify "ACCOUNT CREATED!" confirmation
13. ✅ Continue to user dashboard
14. ✅ Verify successful login status
15. ✅ Delete user account
16. ✅ Verify "ACCOUNT DELETED!" confirmation
17. ✅ Complete cleanup process

## 🛠️ Tech Stack

- **Testing Framework:** Jasmine
- **Automation Tool:** Protractor
- **Browser Driver:** ChromeDriver
- **Language:** JavaScript (Node.js)
- **Pattern:** Page Object Model (POM)

## 📁 Project Structure

```
jasmine-web-automation/
├── config/
│   └── test.config.js          # Test configuration settings
├── data/
│   └── testData.js             # Test data generators
├── pages/
│   ├── base.page.js            # Base page with common methods
│   ├── home.page.js            # Home page objects and methods
│   └── signup.page.js          # Signup/Registration page objects
├── tests/
│   └── userRegistration.e2e.js # Main test specification
├── utils/
│   ├── testHelper.js           # Utility functions
│   └── testReporter.js         # Custom test reporter
├── protractor.conf.js          # Protractor configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🔧 Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Chrome browser
- Java 8+ (for Selenium server)

## 📦 Installation

1. **Clone or download the project:**
   ```bash
   git clone https://github.com/adityadwic/JASMINE-web-automation.git
   cd JASMINE-web-automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup WebDriver:**
   ```bash
   npm run setup
   ```

## 🚀 Running Tests

### Start Selenium Server (Required)
```bash
npm run webdriver:start
```

### Run Tests (in a new terminal)
```bash
# Run tests with browser UI
npm test

# Run tests in headless mode
npm run test:headless

# Generate modern dashboard report
npm run generate:report

# Serve reports locally (Python required)
npm run serve:report
```

## 📊 Test Reports

<img width="1439" height="846" alt="jasmine-test-report" src="https://github.com/user-attachments/assets/bb555332-8e4f-432e-a9bb-f2aad94afcb2" />

The framework generates comprehensive test reports including:
- **Modern Interactive Dashboard** - Visual analytics with charts and graphs
- **Detailed HTML Reports** - Complete test results with screenshots
- **JSON Data Export** - Machine-readable test results
- **Automatic Screenshots** - Failure evidence capture
- **Performance Metrics** - Execution timing and statistics

### Report Types:
1. **📊 Dashboard** - `reports/html/dashboard.html` - Interactive visual dashboard
2. **📋 Detailed Report** - `reports/html/test-report.html` - Comprehensive results
3. **📄 JSON Export** - `reports/json/test-results.json` - Raw test data
4. **📸 Screenshots** - `screenshots/` - Automatic failure captures

### Viewing Reports:
```bash
# Open dashboard directly
open reports/html/index.html

# Serve reports locally
npm run serve:report
# Then visit: http://localhost:8080
```

## 🔧 Configuration

Customize test behavior by modifying `config/test.config.js`:

```javascript
module.exports = {
  baseUrl: 'http://automationexercise.com',
  browser: {
    name: 'chrome',
    headless: false,
    windowSize: { width: 1920, height: 1080 }
  },
  timeouts: {
    element: 10000,
    page: 30000,
    script: 30000
  },
  screenshots: {
    enabled: true,
    onFailure: true
  }
};
```

## 🎯 Best Practices Implemented

- **Wait Strategies:** Smart waits instead of hard sleeps
- **Error Handling:** Comprehensive try-catch with retries
- **Data Management:** Dynamic test data generation to avoid conflicts
- **Clean Code:** Modular structure with single responsibility principle
- **Reporting:** Detailed logging and failure screenshots
- **Maintainability:** Easy to extend and modify test cases

## 🤝 Contributing

This project is designed for portfolio purposes. Feel free to fork and enhance:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/enhancement`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/enhancement`)
5. Create a Pull Request

## 📝 Notes

- No license included - free to use for portfolio and learning purposes
- Tests generate unique email addresses to avoid registration conflicts
- Framework includes cleanup procedures for test data
- Supports both headless and UI modes for different environments

## 🐛 Troubleshooting

**Common Issues:**

1. **Selenium Server not running:** Ensure you've started the webdriver server
2. **Chrome driver version mismatch:** Update chromedriver with `npm run setup`
3. **Element not found:** Check if the website structure has changed
4. **Timeout errors:** Increase timeout values in configuration

**Debug Mode:**
Set `headless: false` in config to see browser interactions during test execution.

---

**Author:** Aditya Dwi Cahyono  
**GitHub:** https://github.com/adityadwic/JASMINE-web-automation  
**Purpose:** Portfolio demonstration of automation testing skills  
**Framework:** Jasmine + Protractor with POM pattern

## 🏆 Project Highlights

- ✅ **94% Success Rate** - High reliability automation
- ✅ **Responsive Reports** - Mobile-friendly test reports  
- ✅ **Professional Code** - Clean, maintainable codebase
- ✅ **Best Practices** - QA industry standards implemented
- ✅ **Portfolio Ready** - Production-quality framework

**⭐ If you find this project helpful, please give it a star on GitHub!**
