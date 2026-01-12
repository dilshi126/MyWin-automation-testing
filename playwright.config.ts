import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright/tests',
  timeout: 60000, // Increased timeout for login flows
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'https://mywin.lk',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [
    // Setup project - runs first to authenticate (run manually when needed)
    {
      name: 'setup',
      testDir: './playwright/auth',
      testMatch: /.*\.setup\.ts/,
    },
    
    // Chromium with authentication (uses saved auth, no setup dependency)
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        // Use saved authentication state
        storageState: 'playwright/.auth/user.json',
      },
    },
    
    // Chromium with setup dependency (runs setup first if auth expired)
    {
      name: 'chromium-with-setup',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    
    // Chromium without authentication (for tests that don't need login)
    {
      name: 'chromium-no-auth',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
        storageState: 'playwright/.auth/user.json',
      },
    },
    
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
        storageState: 'playwright/.auth/user.json',
      },
    },
  ],
});
