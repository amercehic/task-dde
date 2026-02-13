# Playwright + TypeScript Test Automation Framework

Test automation framework for [douglas.de](https://www.douglas.de/de) built with Playwright and TypeScript using the Page Object Model pattern.

## Setup

```bash
yarn install
yarn install:browsers
cp .env.example .env
```

## Scripts

| Script | Description |
|--------|-------------|
| `yarn test` | Run all tests |
| `yarn test:chromium` | Run tests on Chromium only |
| `yarn test:firefox` | Run tests on Firefox only |
| `yarn test:headed` | Run tests in headed mode |
| `yarn test:debug` | Run tests with Playwright Inspector |
| `yarn test:ui` | Open Playwright UI mode |
| `yarn report` | Open the HTML test report |
| `yarn lint` | Run ESLint |
| `yarn typecheck` | Run TypeScript type checking |
| `yarn codegen` | Open Playwright codegen |
| `yarn clean` | Remove test artifacts |

## Project Structure

```
src/
  fixtures/       # Custom test fixtures (page object injection)
  pages/          # Page Object Models
    components/   # Reusable component objects
  utils/          # Test data generation
  types/          # TypeScript interfaces and enums
tests/
  registration/   # Registration page test specs
```

## Cookie Consent

Douglas.de uses [Usercentrics](https://usercentrics.com/) CMP rendered inside a `#usercentrics-root` shadow DOM. The banner is bypassed by blocking Usercentrics network requests in the base fixture. No UI clicks, no setup project.

## Environment Configuration

```bash
# Load environment-specific config
TEST_ENV=staging yarn test
```

Loads `.env.staging` first, falls back to `.env`.

## CI/CD

GitHub Actions workflow (`.github/workflows/playwright.yml`):

1. **Lint & Type Check** — ESLint + TypeScript
2. **Playwright Tests** — runs all tests, generates HTML report
3. **Deploy Report** — publishes the HTML report to GitHub Pages (main branch only)

Set in your repo: **Variables**: `BASE_URL`

> **Note:** Enable GitHub Pages with source set to **GitHub Actions** in repo Settings > Pages.
