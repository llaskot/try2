///<reference types="Cypress" />
import { HomePage } from "../../support/pages/homePage";


describe('Redduck critical path tests', () => {
  const homePage = new HomePage();


    it('Connect through browser wallet test', () =>{
      cy.visit('/')
      homePage.connectWalletBtnClick()
              .walletSelect('Browser Wallet')
      cy.acceptMetamaskAccess().should('be.true')
      homePage.checkHeaderButtonSouldHaveText('Wrong Network')
              .checkCreatingFlowsAvailability()
              .headerBtnClick()
              .checkPopupContainsNetwork('Ethereum')
              .popupNetworkClick('Ethereum')
      cy.allowMetamaskToSwitchNetwork().should('be.true')
      homePage.checkHeaderButtonSouldHaveText('0x685c...04AE')
      })

  
  })