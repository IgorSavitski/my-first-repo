import { CheckoutStepOnePage } from './CheckoutStepOnePage.js';
export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartList = page.locator('[data-test="cart-list"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }
    async goToCheckout() {
        await this.checkoutButton.click();
        return new CheckoutStepOnePage(this.page);
    }
    async goContinueShopping() {
        await this.continueShoppingButton.click();
    }
}