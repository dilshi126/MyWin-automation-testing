# Quick Reference - MyWin.lk Login Automation

## 🚀 Quick Commands

```bash
# Run automated login tests (no OTP entry)
npm run test:auth

# Run manual login test (with OTP pause)
npm run test:login-manual

# Run in debug mode
npm run test:debug

# Run all tests
npm test

# View test report
npm run test:report
```

## 📱 Login Flow

```
1. Home (mywin.lk) 
   ↓ Click "Login" button
2. Login Page
   ↓ Enter phone: 0711996825
   ↓ Click "Send Verification Code"
3. OTP Page
   ↓ Enter OTP from SMS
   ↓ Click "Login"
4. Logged In
   ✓ "My Account" link visible
   ✓ Profile picture visible
```

## 📝 Test Data

```env
TEST_PHONE_NUMBER=0711996825
TEST_OTP=123456  # For test environments
BASE_URL=https://mywin.lk
```

## 🎯 Page Objects

| Page | File | Key Methods |
|------|------|-------------|
| Home | `HomePage.ts` | `clickLoginButton()` |
| Login | `LoginPage.ts` | `sendVerificationCode(phone)` |
| OTP | `OTPPage.ts` | `submitOTP(code)` |
| Dashboard | `DashboardPage.ts` | `isUserLoggedIn()` |

## ✅ Verification Points

```typescript
// Check if logged in
await dashboardPage.isUserLoggedIn()  // true if "My Account" visible

// Check profile picture
await dashboardPage.isProfilePictureVisible()  // true if visible

// Get account name
await dashboardPage.getAccountName()  // returns account name
```

## 🔧 Common Test Patterns

### Basic Login Test
```typescript
const homePage = new HomePage(page);
const loginPage = new LoginPage(page);
const otpPage = new OTPPage(page);

await homePage.open();
await homePage.clickLoginButton();
await loginPage.sendVerificationCode('0711996825');
await page.pause(); // Manual OTP entry
```

### With Fixtures
```typescript
import { test, expect } from '../../fixtures/auth.fixture';

test('my test', async ({ homePage, loginPage, otpPage }) => {
  await homePage.open();
  // Use page objects directly
});
```

## 🐛 Debugging

```bash
# Open Playwright Inspector
npm run test:debug playwright/tests/auth/login-manual.spec.ts

# Run with headed browser
npm run test:headed

# Run with UI mode
npm run test:ui
```

## 📸 Screenshots

Screenshots saved to: `screenshots/`
- `logged-in-state.png` - After successful login

## ⚠️ Important Notes

1. **OTP expires in ~3 minutes** - Act quickly!
2. **Phone number must receive SMS** - Use real test number
3. **Manual tests pause** - Enter OTP and click Resume
4. **Automated tests need TEST_OTP** - Set in .env file

## 🔗 Documentation

- `README.md` - Main documentation
- `LOGIN_AUTOMATION_GUIDE.md` - Detailed login guide
- `CHANGELOG.md` - Recent changes
- `QUICK_START.md` - Getting started

## 💡 Tips

- Use `test:login-manual` for first-time testing
- Set up `.env` file before running tests
- Check console logs for step-by-step progress
- Use `page.pause()` to inspect elements
- Run `test:codegen` to generate new selectors

## 🎓 Learning Resources

```bash
# Generate test code
npm run test:codegen

# View test traces
npx playwright show-trace trace.zip

# Open test report
npm run test:report
```

## 📞 Support

- Check `LOGIN_AUTOMATION_GUIDE.md` for detailed help
- Review test output for error messages
- Use debug mode to step through tests
- Check screenshots in `screenshots/` folder
