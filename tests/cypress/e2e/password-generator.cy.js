describe('Password Generator E2E Tests', () => {
  const digitsPattern = /[0-9]/;
  const symbolsPattern = /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/;

  beforeEach(() => {
    // Intercept API calls to backend
    cy.intercept('POST', '**/genera-password').as('generatePasswordRequest');

    // Visit frontend application and stub clipboard API
    cy.visit('/', {
      onBeforeLoad(win) {
        if (!win.navigator.clipboard) {
          win.navigator.clipboard = {};
        }
        cy.stub(win.navigator.clipboard, 'writeText').as('writeClipboardText').resolves();
      },
    });

    // Enable Flutter accessibility mode to access the semantics tree in DOM
    cy.enableFlutterAccessibility();
  });

  it('generates a password with exact length, at least one number and one symbol', () => {
    const targetLength = 20;

    // 1. Select 'Includi Numeri'
    cy.toggleCheckbox('Includi Numeri', true);

    // 2. Select 'Includi Simboli'
    cy.toggleCheckbox('Includi Simboli', true);

    // 3. Set 'Lunghezza'
    cy.setLength(targetLength);

    // 4. Click 'Genera Password'
    cy.clickGeneratePassword();

    // 5. Verify the API request and response
    cy.wait('@generatePasswordRequest').then((interception) => {
      const requestPayload = typeof interception.request.body === 'string'
        ? JSON.parse(interception.request.body)
        : interception.request.body;

      expect(requestPayload.length).to.equal(targetLength);
      expect(requestPayload.number).to.be.true;
      expect(requestPayload.symbol).to.be.true;

      const generatedPassword = interception.response.body.password;
      expect(generatedPassword).to.have.length(targetLength);
      expect(generatedPassword).to.match(digitsPattern, 'must contain at least one digit');
      expect(generatedPassword).to.match(symbolsPattern, 'must contain at least one symbol');
    });

    // 6. Verify password on screen via the copy button and clipboard
    cy.clickCopyPassword();

    cy.get('@writeClipboardText').should('have.been.calledOnce').then((stub) => {
      const copiedPassword = stub.getCall(0).args[0];
      expect(copiedPassword).to.have.length(targetLength);
      expect(copiedPassword).to.match(digitsPattern, 'screen password contains at least one digit');
      expect(copiedPassword).to.match(symbolsPattern, 'screen password contains at least one symbol');
    });

    // 7. Verify UI feedback snackbar appears on screen
    cy.contains('flt-semantics', 'Password copiata negli appunti!').should('be.visible');
  });

  it('generates a default 16-character password with numbers and symbols', () => {
    const defaultLength = 16;

    // Both checkboxes are checked by default
    cy.get('flt-semantics[role="checkbox"][aria-label="Includi Numeri"]')
      .should('have.attr', 'aria-checked', 'true');
    cy.get('flt-semantics[role="checkbox"][aria-label="Includi Simboli"]')
      .should('have.attr', 'aria-checked', 'true');

    // Click 'Genera Password' directly
    cy.clickGeneratePassword();

    cy.wait('@generatePasswordRequest').then((interception) => {
      const generatedPassword = interception.response.body.password;
      expect(generatedPassword).to.have.length(defaultLength);
      expect(generatedPassword).to.match(digitsPattern);
      expect(generatedPassword).to.match(symbolsPattern);
    });

    // Verify copy button is now visible
    cy.contains('flt-semantics[role="button"]', 'Copia password').should('be.visible');
  });

  it('generates a password with numbers only when symbols are excluded', () => {
    const targetLength = 14;

    cy.setLength(targetLength);
    cy.toggleCheckbox('Includi Numeri', true);
    cy.toggleCheckbox('Includi Simboli', false);

    cy.clickGeneratePassword();

    cy.wait('@generatePasswordRequest').then((interception) => {
      const requestPayload = typeof interception.request.body === 'string'
        ? JSON.parse(interception.request.body)
        : interception.request.body;

      expect(requestPayload.length).to.equal(targetLength);
      expect(requestPayload.number).to.be.true;
      expect(requestPayload.symbol).to.be.false;

      const generatedPassword = interception.response.body.password;
      expect(generatedPassword).to.have.length(targetLength);
      expect(generatedPassword).to.match(digitsPattern, 'must contain at least one digit');
      expect(generatedPassword).to.not.match(symbolsPattern, 'must not contain any symbols');
    });

    cy.clickCopyPassword();
    cy.get('@writeClipboardText').should('have.been.called').then((stub) => {
      const copiedPassword = stub.lastCall.args[0];
      expect(copiedPassword).to.have.length(targetLength);
      expect(copiedPassword).to.match(digitsPattern);
      expect(copiedPassword).to.not.match(symbolsPattern);
    });
  });

  it('generates a password with symbols only when numbers are excluded', () => {
    const targetLength = 12;

    cy.setLength(targetLength);
    cy.toggleCheckbox('Includi Numeri', false);
    cy.toggleCheckbox('Includi Simboli', true);

    cy.clickGeneratePassword();

    cy.wait('@generatePasswordRequest').then((interception) => {
      const requestPayload = typeof interception.request.body === 'string'
        ? JSON.parse(interception.request.body)
        : interception.request.body;

      expect(requestPayload.length).to.equal(targetLength);
      expect(requestPayload.number).to.be.false;
      expect(requestPayload.symbol).to.be.true;

      const generatedPassword = interception.response.body.password;
      expect(generatedPassword).to.have.length(targetLength);
      expect(generatedPassword).to.not.match(digitsPattern, 'must not contain digits');
      expect(generatedPassword).to.match(symbolsPattern, 'must contain at least one symbol');
    });

    cy.clickCopyPassword();
    cy.get('@writeClipboardText').should('have.been.called').then((stub) => {
      const copiedPassword = stub.lastCall.args[0];
      expect(copiedPassword).to.have.length(targetLength);
      expect(copiedPassword).to.not.match(digitsPattern);
      expect(copiedPassword).to.match(symbolsPattern);
    });
  });
});
