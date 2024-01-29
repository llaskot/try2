///<reference types="Cypress" />
import { HomePage } from "../../support/pages/homePage";
// import { test, expect } from '@playwright/test';


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
      .checkPopupContainsNetwork('Ethereum')
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
      .checkPopupContainsNetwork('Ethereum2')
      .popupNetworkClick('Ethereum')
    cy.allowMetamaskToSwitchNetwork().should('be.true')
    homePage.checkHeaderButtonSouldHaveText('0x685c...04AE')
  })

  it.skip('SSS', () => {
    cy.visit('/')
    homePage.headerBtnClick()
      .walletSelect('Coinbase')
    cy.get('button').contains('Install').click().initPlaywright().should('be.true');
    // page.locator('xpath=//button[@jsname]').click()

    cy.wait(5000)

    // cy.acceptMetamaskAccess()
    // homePage.checkHeaderButtonSouldHaveText('Wrong Network')
    //   .checkCreatingFlowsAvailability()
    //   .headerBtnClick()
    //   .checkPopupContainsNetwork('Ethereum')
    //   .popupNetworkClick('Ethereum')
    // cy.allowMetamaskToSwitchNetwork().should('be.true')
    // homePage.checkHeaderButtonSouldHaveText('0x685c...04AE')
  })
})