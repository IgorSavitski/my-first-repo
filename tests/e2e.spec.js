import { test, expect } from "@playwright/test";
import { LoginPage } from "../PageObjects/LoginPage.js";
import { InventoryPage } from "../PageObjects/InventoryPage.js";
import { CartPage } from "../PageObjects/CartPage.js";
import { CheckoutStepOnePage } from "../PageObjects/CheckoutStepOnePage.js";
import { CheckoutStepTwoPage } from "../PageObjects/CheckoutStepTwoPage.js";
import { CheckoutCompletePage } from "../PageObjects/CheckoutCompletePage.js";

test.describe("End-to-End Purchase Flow", () => {
  test("should complete a purchase successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.open();

    await loginPage.login(
      "standard_user",
      "secret_sauce"
    );

    await expect(inventoryPage.getPageTitle()).toHaveText("Products");

    await inventoryPage.sortByPriceHighToLow();
    await inventoryPage.addToCartButtons.nth(0).click();
    
    await inventoryPage.openCart();

    expect(cartPage.cartList.nth(0).locator('.inventory_item_name')).toHaveText('Sauce Labs Fleece Jacket');

    await cartPage.goToCheckout();

    await expect(checkoutStepOnePage.page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-one.html"
    );

    await checkoutStepOnePage.fillUserInfo("Test", "User", "12345");

    await checkoutStepOnePage.pressContinueButton();

    await checkoutStepTwoPage.finishCheckout();

    await expect(checkoutCompletePage.getCompletionMessage()).toBeVisible();
  });
});
