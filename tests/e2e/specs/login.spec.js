///<reference types="Cypress" />

describe('Redduck critical path tests', () => {

    
    
    it('Connect through browser wallet test', () =>{
      cy.visit('/')
      .contains('Connect Wallet').scrollIntoView().click()
      .get('w3m-modal').shadow().find('w3m-router').shadow()
       .find('w3m-connect-view').shadow().find('[name="Browser Wallet"]').click()
      cy.acceptMetamaskAccess().should("be.true").wait(5000);
      })
  
  })