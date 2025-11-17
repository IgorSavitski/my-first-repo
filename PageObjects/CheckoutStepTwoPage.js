export class CheckoutStepTwoPage {
    constructor(page) {
        this.page = page
        this.cartList = page.locator('[data-test="cart-list"]');
        this.summaryPrice = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}