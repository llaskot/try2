export class BasePage {

    // ELEMENTS :

    networksPopup = () => {
        return cy.get('w3m-modal').shadow().find('w3m-router').shadow().find('w3m-networks-view')
            .shadow().find('wui-card-select').shadow();
    }

    hederBtn = () => {
        return cy.get('header').find('[class="hidden items-center gap-2 lg:flex"]')
    }

    // METHODS:
    checkHeaderButtonSouldHaveText = (text) => {
        this.hederBtn().should('have.text', text)
        return this
    }


    headerBtnClick = () => {
        this.hederBtn().click()
        return this
    }


    checkPopupContainsNetwork = (text) => {
        this.networksPopup().should('contain.text', text);
        return this
    }


    popupNetworkClick = (text) => {
        this.networksPopup().contains(text).click();
        return this
    }




}