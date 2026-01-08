# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Verify Installation
```bash
node --version    # Should show v18 or higher
npm --version     # Should show npm version
```

### Step 2: Install Dependencies
```bash
npm install
npx playwright install
```

### Step 3: Configure Environment (Optional)
```bash
cp .env.example .env
# Edit .env with your credentials if needed
```

### Step 4: Run Your First Test
```bash
# Run smoke tests (basic checks)
npm run test:smoke

# Or run all tests
npm test
```

### Step 5: View Test Report
```bash
npm run test:report
```

## 📝 Common Commands

### Running Tests
```bash
# Run all tests
npm test

# Run specific test suite
npm run test:auth        # Authentication tests
npm run test:tickets     # Ticket tests
npm run test:smoke       # Smoke tests

# Run with visible browser
npm run test:headed

# Run in specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Debug mode
npm run test:debug

# UI mode (interactive)
npm run test:ui
```

### Generating Tests
```bash
# Open Playwright codegen tool
npm run test:codegen

# This will open a browser where you can:
# 1. Navigate to pages
# 2. Click elements
# 3. Fill forms
# 4. Playwright generates the code for you!
```

### Viewing Reports
```bash
# View last test report
npm run test:report
```

## 🎯 Your First Custom Test

### 1. Create a new test file
```typescript
// playwright/tests/my-feature/my-test.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('My Feature', () => {
  test('should do something', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    
    // Your test steps here
    expect(await homePage.getTitle()).toBeTruthy();
  });
});
```

### 2. Run your test
```bash
npx playwright test my-test.spec.ts
```

## 🔧 Customizing for Mywin.lk

### Update Selectors
The current selectors are generic. Update them based on actual mywin.lk elements:

1. Open mywin.lk in browser
2. Right-click element → Inspect
3. Copy selector
4. Update in page object file

Example:
```typescript
// playwright/pages/LoginPage.ts
this.usernameInput = page.locator('#email');  // Update with actual ID
this.passwordInput = page.locator('#password');
this.loginButton = page.locator('button[type="submit"]');
```

### Add Test Credentials
```bash
# Edit .env file
TEST_USERNAME=your-test-email@example.com
TEST_PASSWORD=YourTestPassword123
```

## 📚 Project Structure Quick Reference

```
playwright/
├── tests/          # Your test files go here
│   ├── auth/       # Login/logout tests
│   ├── tickets/    # Ticket-related tests
│   └── smoke/      # Basic health checks
├── pages/          # Page objects (selectors + actions)
├── fixtures/       # Reusable test setup
└── utils/          # Helper functions
```

## 💡 Tips

1. **Use Page Objects**: Don't put selectors in tests, use page objects
2. **Use Fixtures**: For common setup like login
3. **Use test:codegen**: To generate selectors automatically
4. **Use test:ui**: For interactive debugging
5. **Check Reports**: Always check HTML reports for failures

## 🐛 Troubleshooting

### Tests failing?
- Check if selectors match actual website elements
- Use `npm run test:headed` to see what's happening
- Use `npm run test:debug` to step through tests

### Slow tests?
- Increase timeouts in playwright.config.ts
- Check network speed
- Use `--workers=1` to run tests sequentially

### Can't find elements?
- Use `npm run test:codegen` to get correct selectors
- Check if element is in iframe
- Wait for element to load

## 📞 Need Help?

- Check README.md for detailed documentation
- Check PROJECT_STRUCTURE.md for architecture details
- Check VALIDATION.md for what's implemented
- Create an issue on GitHub

## 🎉 You're Ready!

Start writing tests and automating mywin.lk! 🚀
