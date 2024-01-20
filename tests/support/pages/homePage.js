///<reference types="Cypress" />
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
    connectWalletBtnClick = () => {
        cy.contains('Connect Wallet').scrollIntoView().click()
        return this
    }

    walletSelect = (text) => {
        cy.get('w3m-modal').shadow().find('w3m-router').shadow()
        .find('w3m-connect-view').shadow().find('wui-list-wallet').shadow().contains(text).click()
        return this
    }

    checkCreatingFlowsAvailability = () => {
        cy.get('[class*="bg-card text-card-foreground"]').should('exist').and('be.visible').and('not.be.disabled')
        return this
    }


}