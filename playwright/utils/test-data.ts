export const TestData = {
  users: {
    validUser: {
      phoneNumber: process.env.TEST_PHONE_NUMBER || '0711996825',
      otp: process.env.TEST_OTP || '123456', // This will need to be manually entered or retrieved
    },
    invalidUser: {
      phoneNumber: '0000000000',
      otp: '000000',
    },
  },

  tickets: {
    sampleTicket: {
      title: 'Test Ticket',
      description: 'This is a test ticket description',
      priority: 'High',
    },
  },

  urls: {
    home: '/',
    login: '/login',
    dashboard: '/',
    tickets: '/tickets',
  },

  timeouts: {
    short: 5000,
    medium: 10000,
    long: 30000,
    otpWait: 60000, // Wait time for OTP
  },
};

export const generateRandomEmail = (): string => {
  const timestamp = Date.now();
  return `testuser_${timestamp}@example.com`;
};

export const generateRandomString = (length: number = 10): string => {
  return Math.random().toString(36).substring(2, length + 2);
};
