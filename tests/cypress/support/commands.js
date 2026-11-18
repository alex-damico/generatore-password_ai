// ***********************************************
// Custom Cypress commands for Flutter Web testing
// ***********************************************

/**
 * Enables accessibility tree in Flutter Web so that semantics nodes
 * (buttons, checkboxes, inputs) are rendered into the DOM.
 */
Cypress.Commands.add('enableFlutterAccessibility', () => {
  // Wait for Flutter Web to mount the accessibility placeholder and click it
  cy.get('flt-semantics-placeholder[role="button"]', { timeout: 15000 })
    .should('exist')
    .click({ force: true });

  // Ensure semantics tree is fully mounted with the input field
  cy.get('input[aria-label="Lunghezza"]', { timeout: 15000 }).should('exist');
});

/**
 * Sets the length input field with the specified value.
 * @param {number|string} length
 */
Cypress.Commands.add('setLength', (length) => {
  cy.get('input[aria-label="Lunghezza"]', { timeout: 10000 })
    .should('exist')
    .click({ force: true })
    .clear()
    .type(String(length))
    .trigger('input')
    .trigger('change')
    .blur();
});

/**
 * Sets the checkbox state for the given Italian UI label.
 * @param {string} label - e.g. "Includi Numeri" or "Includi Simboli"
 * @param {boolean} targetState - true to check, false to uncheck
 */
Cypress.Commands.add('toggleCheckbox', (label, targetState) => {
  const expectedCheckedAttr = targetState ? 'true' : 'false';
  cy.get(`flt-semantics[role="checkbox"][aria-label="${label}"]`, { timeout: 10000 }).then(($checkbox) => {
    const isCurrentlyChecked = $checkbox.attr('aria-checked') === 'true';
    if (isCurrentlyChecked !== targetState) {
      cy.wrap($checkbox).click({ force: true });
    }
  });
  cy.get(`flt-semantics[role="checkbox"][aria-label="${label}"]`)
    .should('have.attr', 'aria-checked', expectedCheckedAttr);
});

/**
 * Clicks the "Genera Password" button.
 */
Cypress.Commands.add('clickGeneratePassword', () => {
  cy.contains('flt-semantics[role="button"]', 'Genera Password', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });
});

/**
 * Clicks the "Copia password" button and verifies clipboard text.
 */
Cypress.Commands.add('clickCopyPassword', () => {
  cy.contains('flt-semantics[role="button"]', 'Copia password', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });
});
