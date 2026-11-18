// ***********************************************************
// Cypress support file (loaded automatically before test files)
// ***********************************************************

import './commands';

// Prevent Cypress from failing tests on unhandled Flutter framework errors that don't affect test execution
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
