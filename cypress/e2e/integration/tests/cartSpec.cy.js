import CartPage from '../pages/cartPage';
import LoginPage from '../pages/loginPage';

describe('Cart Test', () => {
    const baseUrl = Cypress.config('baseUrl');
    beforeEach(() => {
        cy.visit(baseUrl);
        cy.fixture('user').then((users) => {
            const user = users.users[0];
          cy.get(LoginPage.inpUsername).type(user.username);
          cy.get(LoginPage.inpPassword).type(user.password);
          cy.get(LoginPage.btnLogin).click();
          });
      });

    it('Validate number of items in cart', () => {
        // assertions
        cy.url().should('eq', baseUrl + 'inventory.html');
        cy.get(CartPage.icnItemCount).should('not.exist');

        // actions
        cy.get(CartPage.btnAddToCartBikeLight).click();

        // assertions
        cy.get(CartPage.icnItemCount).should('have.text',1);

        // actions
        cy.get(CartPage.btnAddToCartOnesie).click();
 
        // assertions
        cy.get(CartPage.icnItemCount).should('have.text',2);

        // actions
        cy.get(CartPage.btnAddToCartRedTShirt).click();
 
        // assertions
        cy.get(CartPage.icnItemCount).should('have.text',3);

        // actions
        cy.get(CartPage.btnCart).click();

        // assertions
        cy.url().should('eq', baseUrl + 'cart.html');
        cy.get(CartPage.lblPageTitle).should('have.text','Your Cart')
        CartPage.countCartItems();
    });

    it('Remove 1 item and assert number of items in cart', () => {
        // assertions
        cy.url().should('eq', baseUrl + 'inventory.html');
        cy.get(CartPage.icnItemCount).should('not.exist');

        // actions
        cy.get(CartPage.btnAddToCartBikeLight).click();

        // assertions
        cy.get(CartPage.icnItemCount).should('have.text',1);

        // actions
        cy.get(CartPage.btnAddToCartOnesie).click();
 
        // assertions
        cy.get(CartPage.icnItemCount).should('have.text',2);

        // actions
        cy.get(CartPage.btnAddToCartRedTShirt).click();
 
        // assertions
        cy.get(CartPage.icnItemCount).should('have.text',3);

        // actions
        cy.get(CartPage.btnCart).click();

        // assertions
        cy.url().should('eq', baseUrl + 'cart.html');
        cy.get(CartPage.lblPageTitle).should('have.text','Your Cart')
        CartPage.countCartItems();

        // actions
        cy.get(CartPage.btnRemoveToCartRedTShirt).click();

        // assertions
        cy.get(CartPage.icnItemCount).should('have.text',2);
        CartPage.countCartItems();
    });

});
