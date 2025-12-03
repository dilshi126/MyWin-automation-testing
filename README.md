# Mywin.lk Automation Testing

Playwright automation tests for Mywin.lk website using TypeScript and Page Object Model (POM).

## Prerequisites

- Node.js installed (v18 or higher)
- npm or yarn package manager

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Project Structure

```
├── pages/              # Page Object Model classes
│   ├── BasePage.ts    # Base page with common methods
│   └── HomePage.ts    # Home page object
├── tests/             # Test specifications
│   └── mywin.spec.ts  # Mywin.lk tests
├── playwright.config.ts  # Playwright configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in headed mode (see browser):
```bash
npm run test:headed
```

Run tests with UI mode:
```bash
npm run test:ui
```

Run tests in specific browser:
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

## Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Page Object Model (POM)

This project uses POM design pattern:
- **BasePage**: Contains common methods used across all pages
- **HomePage**: Contains elements and methods specific to the home page
- **Tests**: Use page objects to interact with the website

