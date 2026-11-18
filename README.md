# Password Generator

A full-stack password generator application featuring a cryptographically secure **.NET Minimal API** backend, a modern **Flutter Web** frontend, and end-to-end tests powered by **Cypress.js**.

---

## Features

- **Cryptographically Secure:** Generates random passwords using .NET's `RandomNumberGenerator` with Fisher-Yates shuffle.
- **Customizable:** Choose password length and toggle inclusion of digits and special characters.
- **Modern Responsive UI:** Clean Material 3 interface built with Flutter Web, including one-click clipboard copying.
- **Interactive API Documentation:** Built-in OpenAPI specification with Scalar UI.
- **Automated E2E Testing:** End-to-end browser tests verifying UI and API integration.

---

## Tech Stack & Architecture

```
generatore-password_ai/
├── backend/       # REST API built with .NET (Minimal API)
├── frontend/      # User interface built with Flutter Web
└── tests/         # End-to-end test suite using Cypress
```

- **Backend:** .NET 11, ASP.NET Core Minimal API, Scalar OpenAPI Reference
- **Frontend:** Flutter Web (Dart), Material 3, FVM (Flutter Version Management)
- **E2E Testing:** Cypress 16+, Node.js

---

## API Specification

### Endpoint: `POST /genera-password`

Generates a random password according to the specified options.

#### Request Body (`application/json`)
```json
{
  "length": 16,
  "number": true,
  "symbol": true
}
```

| Field | Type | Default | Description |
|---|---|---|---|
| `length` | `integer` | `16` | Length of the generated password (minimum 1) |
| `number` | `boolean` | `true` | Whether to include numbers (`0-9`) |
| `symbol` | `boolean` | `true` | Whether to include special symbols (`!@#$%^&*...`) |

#### Response (`application/json`)
```json
{
  "password": "rX9!aK2#vQ8$mL1@"
}
```

#### Interactive Documentation
When running the backend locally, interactive API documentation is available via Scalar:
- **Scalar UI:** [http://localhost:5000/scalar/v1](http://localhost:5000/scalar/v1)
- **OpenAPI Schema:** [http://localhost:5000/openapi/v1.json](http://localhost:5000/openapi/v1.json)

---

## Prerequisites

Ensure you have the following installed on your machine:
- [.NET SDK](https://dotnet.microsoft.com/) (.NET 11 supported)
- [Flutter SDK](https://flutter.dev/) with [FVM](https://fvm.app/)
- [Node.js](https://nodejs.org/) (v18+) & `npm`
- Google Chrome (for web debugging and Cypress tests)

---

## Getting Started & Verifying Tests

To run the application or verify that end-to-end tests are passing, open **three separate terminal windows** and follow the sequence below:

### 1. Terminal 1: Run the Backend (.NET)

Navigate to the `backend` directory and start the ASP.NET Core server:

```bash
cd backend
dotnet restore
dotnet run
```

The API will listen at `http://localhost:5000` with CORS enabled.

---

### 2. Terminal 2: Run the Frontend (Flutter Web)

In a second terminal window, start Flutter Web on port `3000`:

```bash
cd frontend
fvm flutter pub get
fvm flutter run -d web-server --web-port 3000
```

> **Tip:** Using `-d web-server` starts the web server on `http://localhost:3000` without opening an extra Chrome window. This is recommended when running Cypress tests, as Cypress launches its own browser instance. For manual development and preview, you can use `-d chrome` instead.

---

### 3. Terminal 3: Run End-to-End Tests (Cypress)

Once both the backend (port `5000`) and frontend (port `3000`) are active, open a third terminal window to run the tests:

```bash
cd tests
npm install   # Run once if dependencies are not yet installed
```

Choose one of the execution modes:

```bash
# Option A: Headless mode directly in the terminal (recommended for quick verification)
npx cypress run

# Option B: Interactive Cypress Test Runner UI
npx cypress open
```

---

## Project Conventions

- **Code Language:** All backend and frontend code (classes, methods, variables, and documentation) is written in **English**.
- **User Interface Language:** User-facing strings and labels in the UI are localized in **Italian**:
  - Length input: `"Lunghezza"`
  - Numbers checkbox: `"Includi Numeri"`
  - Symbols checkbox: `"Includi Simboli"`
  - Submit button: `"Genera Password"`
