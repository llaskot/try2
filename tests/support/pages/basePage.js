export class BasePage {


    checkHeaderButtonSouldHaveText = (text) => {
        cy.get('header').find('[class="hidden items-center gap-2 lg:flex"]')
        .should('have.text', text)
        return this
    }


    headerBtnClick = () => {
        cy.get('header').find('[class="hidden items-center gap-2 lg:flex"]').click()
        return this
    }


    checkPopupContainsNetwork = (text) => {
        cy.get('w3m-modal').shadow().find('w3m-router').shadow().find('w3m-networks-view').shadow().find('wui-card-select').shadow().should('contain.text', text);
        return this
    }
    
    
    popupNetworkClick = (text) => {
        cy.get('w3m-modal').shadow().find('w3m-router').shadow().find('w3m-networks-view').shadow().find('wui-card-select').shadow().contains(text).click();
        return this
    }


}