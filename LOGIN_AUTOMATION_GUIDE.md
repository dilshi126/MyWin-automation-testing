# MyWin.lk Login Automation Guide

## Login Flow Overview

The MyWin.lk website uses a phone-based OTP (One-Time Password) authentication system. Here's the complete flow:

### Step-by-Step Login Process

1. **Home Page** (`https://mywin.lk`)
   - User sees the welcome page with lottery information
   - Click the "Login" button in the navigation bar

2. **Login Page** (`https://mywin.lk/login`)
   - Page displays: "Please enter your mobile number to send Verification code via SMS"
   - Enter phone number: `0711996825`
   - Click "Send Verification Code" button

3. **OTP Verification Page**
   - Page displays: "Please enter the OTP sent to 0711996825"
   - Shows countdown timer (e.g., "Time Remaining: 02:50")
   - User receives SMS with OTP code
   - Enter the OTP code
   - Click "Login" button

4. **Logged-In State**
   - User is redirected to home page
   - Navigation bar now shows:
     - Profile picture
     - Account name
     - "My Account" link
   - Login button is replaced with user profile

## Automated Test Files

### 1. Page Objects

#### `HomePage.ts`
- Handles home page interactions
- `clickLoginButton()` - Clicks the Login button to start login flow
- `isLogoVisible()` - Verifies page loaded

#### `LoginPage.ts`
- Handles phone number entry
- `enterMobileNumber(phoneNumber)` - Enters phone number
- `clickSendVerificationCode()` - Sends verification code
- `sendVerificationCode(phoneNumber)` - Combined action

#### `OTPPage.ts`
- Handles OTP entry and submission
- `enterOTP(otpCode)` - Enters the OTP code
- `clickLogin()` - Submits the OTP
- `submitOTP(otpCode)` - Combined action
- `getRemainingTime()` - Gets countdown timer value
- `clickGoBack()` - Returns to login page

#### `DashboardPage.ts`
- Verifies logged-in state
- `isUserLoggedIn()` - Checks if "My Account" link is visible
- `isProfilePictureVisible()` - Checks if profile picture is visible
- `getAccountName()` - Gets the displayed account name

### 2. Test Files

#### `login.spec.ts` - Automated Login Tests
Tests the login flow up to OTP entry (without actual OTP):
- Display login page elements
- Navigate to OTP page after phone entry
- Display time remaining
- Go back functionality

```bash
npm run test:auth
```

#### `login-manual.spec.ts` - Manual Login Test
Complete login flow with manual OTP entry:
- Pauses at OTP page for manual entry
- Verifies complete logged-in state
- Takes screenshot of logged-in state

```bash
npm run test:login-manual
```

## Running the Tests

### Option 1: Automated Tests (No OTP Entry)
Tests the flow up to OTP page:
```bash
npm run test:auth
```

### Option 2: Manual OTP Entry Test
Run with headed browser and manual OTP entry:
```bash
npm run test:login-manual
```

**Steps:**
1. Test will open browser and navigate through login flow
2. Test will pause at OTP page
3. Check your phone for SMS with OTP code
4. Manually enter the OTP in the browser
5. Click "Login" button
6. Click "Resume" in Playwright Inspector
7. Test will verify logged-in state

### Option 3: Debug Mode
Run any test in debug mode:
```bash
npm run test:debug playwright/tests/auth/login-manual.spec.ts
```

## Handling OTP in Automation

### Challenge
The OTP is sent via SMS to a real phone number, making full automation challenging.

### Solutions

#### 1. Manual Entry (Current Implementation)
- Test pauses at OTP page
- Tester manually enters OTP
- Good for: Development, debugging, demo

#### 2. Test Phone Number with Known OTP
- Use a test phone number that always receives the same OTP
- Set `TEST_OTP` in `.env` file
- Good for: CI/CD, automated testing

```bash
# .env
TEST_PHONE_NUMBER=0711996825
TEST_OTP=123456
```

#### 3. SMS Interception Service
- Use services like Twilio, MessageBird
- Intercept SMS and extract OTP programmatically
- Good for: Full automation

#### 4. API-Based OTP Retrieval
- If MyWin provides a test API to get OTP
- Fetch OTP via API call
- Good for: Full automation

#### 5. Mock SMS Service (Test Environment)
- Use a test environment with mocked SMS
- OTP is returned in API response
- Good for: Full automation in test environment

## Test Data Configuration

Update `.env` file with your test credentials:

```env
# Test phone number
TEST_PHONE_NUMBER=0711996825

# Test OTP (if using test environment with known OTP)
TEST_OTP=123456

# Base URL
BASE_URL=https://mywin.lk
```

## Example: Complete Login Test

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { OTPPage } from '../../pages/OTPPage';
import { DashboardPage } from '../../pages/DashboardPage';

test('complete login flow', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const otpPage = new OTPPage(page);
  const dashboardPage = new DashboardPage(page);
  
  // Navigate and click login
  await homePage.open();
  await homePage.clickLoginButton();
  
  // Enter phone and send code
  await loginPage.sendVerificationCode('0711996825');
  
  // Enter OTP (manual or automated)
  await page.pause(); // For manual entry
  // OR
  // await otpPage.submitOTP('123456'); // For automated
  
  // Verify logged in
  expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
});
```

## Verification Points

After successful login, verify:
- ✅ "My Account" link is visible
- ✅ Profile picture is displayed
- ✅ Login button is no longer visible
- ✅ User can access protected pages

## Troubleshooting

### Test fails at OTP page
- Ensure phone number is correct
- Check if SMS was received
- Verify OTP is entered within time limit (usually 3 minutes)

### Cannot find "My Account" link
- Wait for page to fully load after OTP submission
- Check if login was successful
- Verify selectors match actual page elements

### OTP expired
- OTP typically expires after 2-3 minutes
- Re-run the test to get a new OTP
- Consider increasing timeout if needed

## Next Steps

1. **Set up test phone number** with known OTP
2. **Configure SMS interception** for full automation
3. **Add logout tests** to complete the auth flow
4. **Add session management** to reuse logged-in state
5. **Add error handling** for invalid OTP, expired OTP, etc.

## Screenshots

Screenshots are automatically saved to `screenshots/` folder:
- `logged-in-state.png` - Shows the logged-in navigation bar

## CI/CD Integration

For CI/CD pipelines:
1. Use test environment with mocked SMS
2. Set `TEST_OTP` environment variable
3. Run tests without manual intervention
4. Store test credentials securely

```yaml
# Example GitHub Actions
env:
  TEST_PHONE_NUMBER: ${{ secrets.TEST_PHONE_NUMBER }}
  TEST_OTP: ${{ secrets.TEST_OTP }}
```

## Support

For questions or issues:
- Check the main README.md
- Review Playwright documentation
- Create an issue in the repository
