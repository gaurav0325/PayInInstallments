describe('BNPL Flow', () => {
  beforeEach(() => {
    cy.visit('/models/bnpl')
  })

  it('completes the full BNPL journey', () => {
    // Step 1: Payment method selection
    cy.contains('Choose your payment method')
    cy.contains('Pay in instalments').should('be.visible')
    cy.get('input[type="radio"][value="instalments"]').check()
    cy.contains('Continue with selected method').click()

    // Step 2: Plan selection
    cy.contains('Choose your instalment plan')
    cy.contains('You will be redirected to our partner')
    
    // Select 3 months plan
    cy.contains('3 months').click()
    cy.contains('Promo 0% APR').should('be.visible')
    cy.get('input[type="radio"][value="promo0"]').should('be.checked')
    cy.contains('Continue').click()

    // Step 3: Identity verification
    cy.contains('Identity verification')
    
    // Select DNI and fill form
    cy.get('select').first().select('DNI')
    cy.get('input[placeholder="12345678Z"]').type('12345678Z')
    cy.get('input[placeholder="+34 612345678"]').type('+34600123456')
    cy.contains('Continue').click()

    // Provider redirect simulation
    cy.contains('Redirecting to Klarna')
    
    // Wait for redirect to complete and confirmation page
    cy.contains('Payment plan confirmed', { timeout: 10000 })
    cy.contains('Your BNPL instalment plan has been approved')
  })

  it('shows business rules and key attributes', () => {
    // Check business rules section
    cy.contains('Business rules and eligibility')
    cy.contains('Market: Spain')
    cy.contains('Return journey')
    cy.contains('Minimum basket €45')
    cy.contains('Spanish residency with DNI/NIE')

    // Check key attributes table
    cy.contains('Key attributes')
    cy.contains('Who funds')
    cy.contains('BNPL provider')
    cy.contains('Credit risk')
    cy.contains('Provider bears full credit risk')
  })

  it('displays flight summary correctly', () => {
    cy.get('aside').within(() => {
      cy.contains('Your purchase summary')
      cy.contains('Madrid MAD → Palma PMI')
      cy.contains('Return')
      cy.contains('€180.00')
      cy.contains('This is a simulation')
    })
  })

  it('shows terms and conditions panel', () => {
    cy.contains('Terms and conditions').click()
    cy.contains('BNPL Terms & Conditions')
    cy.contains('This is a demo', { timeout: 5000 })
  })

  it('handles navigation between steps', () => {
    // Start flow
    cy.get('input[type="radio"][value="instalments"]').check()
    cy.contains('Continue with selected method').click()
    
    // Verify progress steps
    cy.get('ol').within(() => {
      cy.contains('Select plan')
      cy.contains('Details and verification')
      cy.contains('Payment and 3D Secure')
      cy.contains('Confirmation')
    })
  })
})

describe('BNPL Form Validation', () => {
  beforeEach(() => {
    cy.visit('/models/bnpl')
    // Navigate to identity form
    cy.get('input[type="radio"][value="instalments"]').check()
    cy.contains('Continue with selected method').click()
    cy.contains('Continue').click()
  })

  it('validates DNI format', () => {
    cy.get('select').first().select('DNI')
    cy.get('input[placeholder="12345678Z"]').type('invalid')
    cy.get('input[placeholder="+34 612345678"]').type('+34600123456')
    
    // Continue button should be disabled
    cy.get('button').contains('Continue').should('be.disabled')
    
    // Fix DNI
    cy.get('input[placeholder="12345678Z"]').clear().type('12345678Z')
    cy.get('button').contains('Continue').should('not.be.disabled')
  })

  it('validates NIE format', () => {
    cy.get('select').first().select('NIE')
    cy.get('input[placeholder="X1234567L"]').type('X1234567L')
    cy.get('input[placeholder="+34 612345678"]').type('+34600123456')
    
    cy.get('button').contains('Continue').should('not.be.disabled')
  })

  it('validates Spanish mobile format', () => {
    cy.get('select').first().select('DNI')
    cy.get('input[placeholder="12345678Z"]').type('12345678Z')
    cy.get('input[placeholder="+34 612345678"]').type('invalid phone')
    
    cy.get('button').contains('Continue').should('be.disabled')
    
    // Fix mobile
    cy.get('input[placeholder="+34 612345678"]').clear().type('+34600123456')
    cy.get('button').contains('Continue').should('not.be.disabled')
  })
})