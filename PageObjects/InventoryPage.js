export class InventoryPage {
    constructor(page) {
        this.page = page
        this.pageTitle = page.locator('[data-test="title"]');
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.productsList = page.locator('//*[@data-test="inventory-list"]');
        this.addToCartButtons = page.locator('//button[text()="Add to cart"]');
    }

    async openCart() {
        await this.cartIcon.click();
    }
    async addItemToCart(itemName) {
        await this.page.locator(`/*[text()="${itemName}"]/ancestor::div[1]/following-sibling::div/button`).click();
    }
    getPageTitle() {
        return this.pageTitle;
    }
    async sortByPriceHighToLow() {
        await this.page.locator('span > select').selectOption({value : 'hilo'});
    }
}