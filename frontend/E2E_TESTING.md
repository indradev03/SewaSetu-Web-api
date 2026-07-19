# E2E Testing with Playwright

This project uses Playwright for end-to-end testing of the frontend application.

## Setup

Playwright is already installed and configured. The browsers are installed via:
```bash
npx playwright install
```

## Running Tests

### Run all E2E tests (headless)
```bash
npm run test:e2e
```

### Run tests with UI mode
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (shows browser)
```bash
npm run test:e2e:headed
```

### Debug tests
```bash
npm run test:e2e:debug
```

## Test Structure

Tests are located in the `e2e/` directory:

- `example.spec.ts` - Basic page load and navigation tests
- `auth.spec.ts` - Authentication flow tests (login, registration)
- `donor.spec.ts` - Donor dashboard functionality tests
- `ngo.spec.ts` - NGO dashboard functionality tests

## Configuration

Playwright configuration is in `playwright.config.ts`:

- **Test directory**: `./e2e`
- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium, Firefox, WebKit
- **Auto-start**: Dev server starts automatically before tests

## Writing New Tests

Create a new `.spec.ts` file in the `e2e/` directory:

```typescript
import { test, expect } from '@playwright/test';

test('your test name', async ({ page }) => {
  await page.goto('/your-page');
  await expect(page).toHaveURL(/your-page/);
  // Add your test assertions
});
```

## Key Features

- **Automatic server startup**: The dev server starts automatically before tests run
- **Cross-browser testing**: Tests run on Chromium, Firefox, and WebKit
- **Parallel execution**: Tests run in parallel for faster feedback
- **Trace on retry**: Automatic trace capture on test failures
- **HTML reports**: Detailed HTML reports after test runs

## Best Practices

1. **Use descriptive test names** that explain what is being tested
2. **Group related tests** using `test.describe()`
3. **Use page objects** for complex page interactions
4. **Wait for elements** before interacting with them
5. **Use assertions** to verify expected behavior
6. **Keep tests independent** - each test should be able to run alone

## Viewing Test Reports

After running tests, an HTML report is generated in `playwright-report/index.html`. Open it to view:
- Test results
- Screenshots of failures
- Video recordings
- Trace files

## CI/CD Integration

For CI/CD pipelines, set the `CI` environment variable to:
- Disable parallel execution
- Enable retries
- Use existing server if available
