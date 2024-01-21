///<reference types="Cypress" />
import { HomePage } from "../../support/pages/homePage";


describe('Redduck critical path tests', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })
      
  afterEach(() => {
    cy.switchToMetamaskWindow()
    cy.changeMetamaskNetwork('mainnet')
    cy.changeMetamaskNetwork('sepolia')
    cy.switchToCypressWindow()
    cy.disconnectMetamaskWalletFromDapp()
  })


  it('Connect through browser wallet test', () => {
    cy.visit('/')
    homePage.connectWalletBtnClick()
      .walletSelect('Browser Wallet')
    cy.acceptMetamaskAccess()
    homePage.checkHeaderButtonSouldHaveText('Wrong Network')
      .checkCreatingFlowsAvailability()
      .headerBtnClick()
      .checkPopupContainsNetwork('Ethe2reum')
      .popupNetworkClick('Ethereum')
    cy.allowMetamaskToSwitchNetwork().should('be.true')
    homePage.checkHeaderButtonSouldHaveText('0x685c...04AE')
  });


  it('Connect through browser wallet by header btn test', () => {
    cy.visit('/')
    homePage.headerBtnClick()
      .walletSelect('Browser Wallet')
    cy.acceptMetamaskAccess()
    homePage.checkHeaderButtonSouldHaveText('Wrong Network')
      .checkCreatingFlowsAvailability()
      .headerBtnClick()
      .checkPopupContainsNetwork('Ethereum')
      .popupNetworkClick('Ethereum')
    cy.allowMetamaskToSwitchNetwork().should('be.true')
    homePage.checkHeaderButtonSouldHaveText('0x685c...04AE')
  })


})