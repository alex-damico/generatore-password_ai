# Password Generator - End-to-End Test Suite

This directory contains the End-to-End (E2E) test suite for the **Password Generator** web application, built with **Cypress.js** and configured specifically for **Flutter Web**.

---

## Architecture & Project Conventions

All code and tests are written in **English**, while end-user UI labels and strings strictly follow the **Italian** specifications defined in `AGENTS.md`:

- **Checkbox Numbers:** `"Includi Numeri"`
- **Checkbox Symbols:** `"Includi Simboli"`
- **Input Field Length:** `"Lunghezza"`
- **Button Generate Password:** `"Genera Password"`
- **Button Copy Password:** `"Copia password"`
- **SnackBar Confirmation:** `"Password copiata negli appunti!"`

### Flutter Web Semantics & Accessibility
Flutter Web compiles UI onto a CanvasKit / WebGL canvas. In order for browser automation tools like Cypress to find and interact with form fields, buttons, and text, Flutter exposes an accessibility semantics tree in the DOM. 

A dedicated Cypress custom command (`cy.enableFlutterAccessibility()`) activates this mode at the beginning of tests by clicking `flt-semantics-placeholder`, ensuring that semantic elements (`role="button"`, `role="checkbox"`, and `input[aria-label="Lunghezza"]`) are ready in the DOM.

---

## Directory Structure

```
tests/
├── cypress/
│   ├── e2e/
│   │   └── password-generator.cy.js   # Main E2E test suite
│   └── support/
│       ├── commands.js                # Custom Cypress commands for Flutter Web
│       └── e2e.js                     # Global configuration and hooks
├── cypress.config.js                  # Cypress configuration (baseUrl: http://localhost:3000)
├── package.json                       # Dependencies and test runner scripts
└── README.md                          # Documentation
```

---

## Test Scenarios Covered

1. **Custom Length with Numbers and Symbols:**
   - Selects `"Includi Numeri"`.
   - Selects `"Includi Simboli"`.
   - Types custom length (e.g. `20`) into `"Lunghezza"`.
   - Clicks `"Genera Password"`.
   - Asserts API contract and request payload (`{ length: 20, number: true, symbol: true }`).
   - Asserts generated password has exact length of 20 and contains at least one number and one symbol.
   - Clicks `"Copia password"` and verifies clipboard content matches screen password.
   - Verifies the `"Password copiata negli appunti!"` confirmation SnackBar appears on screen.

2. **Default 16-character Generation:**
   - Verifies default checkbox states (`"Includi Numeri"` and `"Includi Simboli"` checked by default).
   - Generates default password and validates length and character pool.

3. **Numbers Only (Symbols Excluded):**
   - Unchecks `"Includi Simboli"`.
   - Validates that the generated password contains numbers and letters, but zero symbols.

4. **Symbols Only (Numbers Excluded):**
   - Unchecks `"Includi Numeri"`.
   - Validates that the generated password contains symbols and letters, but zero digits.

---

## Prerequisites

1. **Backend Running:**
   The .NET API backend must be running on port `5000`:
   ```bash
   dotnet run --project ../backend
   ```

2. **Frontend Built:**
   The Flutter web bundle should be compiled:
   ```bash
   cd ../frontend && fvm flutter build web
   ```

---

## Running the Tests

From the `tests/` directory:

### Run automated E2E tests (starts frontend and runs Cypress)
```bash
npm run test:e2e
```

### Run Cypress headless against an already running frontend
If the frontend is already running on `http://localhost:3000`:
```bash
npm run cy:run
```

### Open Cypress Interactive Test Runner
```bash
npm run cy:open
```

### Custom Frontend URL / Port
You can override the target URL using the `CYPRESS_BASE_URL` environment variable:
```bash
CYPRESS_BASE_URL=http://localhost:8080 npm run cy:run
```
