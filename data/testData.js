class TestDataGenerator {
  static generateRandomUser() {
    const random = Math.floor(Math.random() * 100000);
    const timestamp = Date.now();
    
    return {
      name: `TestUser${random}`,
      email: `testuser${random}_${timestamp}@automation.test`,
      password: 'Test@1234',
      day: '15',
      month: 'June',
      year: '1990',
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe',
      company: 'Automation Corp',
      address1: '123 Test Street',
      address2: 'Suite 456',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      zipcode: '12345',
      mobileNumber: '+1234567890',
    };
  }

  static generateRandomUserFemale() {
    const random = Math.floor(Math.random() * 100000);
    const timestamp = Date.now();
    
    return {
      name: `TestUser${random}`,
      email: `testuser${random}_${timestamp}@automation.test`,
      password: 'Test@1234',
      day: '20',
      month: 'March',
      year: '1995',
      title: 'Mrs',
      firstName: 'Jane',
      lastName: 'Smith',
      company: 'Test Solutions Inc',
      address1: '456 Automation Ave',
      address2: 'Floor 2',
      country: 'United States',
      state: 'California',
      city: 'San Francisco',
      zipcode: '94102',
      mobileNumber: '+1987654321',
    };
  }

  static getValidDateOfBirth() {
    const days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = ['1970', '1975', '1980', '1985', '1990', '1995', '2000', '2005'];

    return {
      day: days[Math.floor(Math.random() * days.length)],
      month: months[Math.floor(Math.random() * months.length)],
      year: years[Math.floor(Math.random() * years.length)]
    };
  }

  static getValidCountries() {
    return ['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore'];
  }
}

module.exports = TestDataGenerator;
