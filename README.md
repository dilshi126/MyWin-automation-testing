# Mywin.lk E2E Automation Testing

Comprehensive Playwright end-to-end automation tests for Mywin.lk website using TypeScript and Page Object Model (POM).

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/dilshi126/MyWin-automation-testing.git
cd MyWin-automation-testing
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your test credentials
```

## 📁 Project Structure

```
playwright/
├── tests/
│   ├── auth/
│   │   └── login.spec.ts           # Login functionality tests
│   ├── tickets/
│   │   └── take-ticket.spec.ts     # Ticket management tests
│   └── smoke/
│       └── basic-checks.spec.ts    # Smoke tests
├── fixtures/
│   └── auth.fixture.ts             # Authentication fixtures
├── pages/
│   ├── BasePage.ts                 # Base page class
│   ├── LoginPage.ts                # Login page object
│   ├── DashboardPage.ts            # Dashboard page object
│   └── HomePage.ts                 # Home page object
├── utils/
│   ├── test-data.ts                # Test data and constants
│   └── helpers.ts                  # Helper functions
└── playwright.config.ts            # Playwright configuration
```

## 🧪 Running Tests

### Run all tests:
```bash
npm test
```

### Run specific test suites:
```bash
npm run test:auth        # Run authentication tests
npm run test:tickets     # Run ticket tests
npm run test:smoke       # Run smoke tests
```

### Run tests in different modes:
```bash
npm run test:headed      # Run with visible browser
npm run test:ui          # Run with Playwright UI mode
npm run test:debug       # Run in debug mode
```

### Run tests in specific browsers:
```bash
npm run test:chrome      # Run in Chromium
npm run test:firefox     # Run in Firefox
npm run test:webkit      # Run in WebKit (Safari)
```

### Generate test code:
```bash
npm run test:codegen     # Open Playwright codegen tool
```

## 📊 Test Reports

View HTML report after test execution:
```bash
npm run test:report
```

Reports are generated in `playwright-report/` directory.

## 🏗️ Architecture

### Page Object Model (POM)
- **BasePage**: Common methods for all pages (navigate, click, fill, etc.)
- **LoginPage**: Login page elements and actions
- **DashboardPage**: Dashboard page elements and actions
- **HomePage**: Home page elements and actions

### Fixtures
- **auth.fixture.ts**: Provides authenticated session for tests that require login

### Test Organization
- **auth/**: Authentication and login tests
- **tickets/**: Ticket creation and management tests
- **smoke/**: Basic functionality and health checks

### Utilities
- **test-data.ts**: Centralized test data and user credentials
- **helpers.ts**: Reusable helper functions (screenshots, waits, storage)

## 🔧 Configuration

### Environment Variables
Configure in `.env` file:
- `BASE_URL`: Application base URL
- `TEST_USERNAME`: Test user email
- `TEST_PASSWORD`: Test user password
- `ADMIN_USERNAME`: Admin user email
- `ADMIN_PASSWORD`: Admin user password

### Playwright Config
Key settings in `playwright.config.ts`:
- Test timeout: 30 seconds
- Retries: 2 (in CI), 0 (locally)
- Browsers: Chromium, Firefox, WebKit
- Screenshots: On failure
- Videos: On failure
- Traces: On first retry

## 📝 Writing Tests

### Example test structure:
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    // Test steps...
  });
});
```

### Using authenticated fixture:
```typescript
import { test, expect } from '../../fixtures/auth.fixture';

test.describe('Protected Feature', () => {
  test.use({ authenticatedPage: undefined });
  
  test('should access protected page', async ({ page }) => {
    // User is already logged in
  });
});
```

## 🎯 Best Practices

1. **Use Page Objects**: Keep selectors and actions in page classes
2. **Use Fixtures**: Reuse common setup like authentication
3. **Use Test Data**: Centralize test data in `test-data.ts`
4. **Descriptive Names**: Use clear test and variable names
5. **Independent Tests**: Each test should be independent
6. **Clean Up**: Reset state between tests
7. **Assertions**: Use meaningful assertions with clear messages

## 🐛 Debugging

### Debug a specific test:
```bash
npx playwright test login.spec.ts --debug
```

### View trace:
```bash
npx playwright show-trace trace.zip
```

### Generate selectors:
```bash
npm run test:codegen
```

## 📈 CI/CD Integration

Tests are configured for CI/CD with:
- Automatic retries on failure
- Parallel execution
- HTML and JSON reports
- Screenshots and videos on failure

## 🤝 Contributing

1. Create a feature branch
2. Write tests following the existing structure
3. Ensure all tests pass
4. Submit a pull request

## 📞 Support

For issues or questions, please create an issue in the GitHub repository.

## 📄 License

ISC
