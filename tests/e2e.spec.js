import { test, expect } from "@playwright/test";
import { LoginPage } from "../PageObjects/LoginPage.js";

test.describe("End-to-End Purchase Flow", () => {
  test("should complete a purchase successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();

    const inventoryPage = await loginPage.login(
      "standard_user",
      "secret_sauce"
    );

    await expect(inventoryPage.getPageTitle()).toHaveText("Products");

    await inventoryPage.sortByPriceHighToLow();
    await inventoryPage.addToCartButtons.nth(0).click();
    
    const cartPage = await inventoryPage.openCart();

    expect(cartPage.cartList.nth(0).locator('.inventory_item_name')).toHaveText('Sauce Labs Fleece Jacket');

    const checkoutStepOnePage = await cartPage.goToCheckout();

    await expect(checkoutStepOnePage.page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-one.html"
    );

    await checkoutStepOnePage.fillUserInfo("Test", "User", "12345");

    const checkoutStepTwoPage = await checkoutStepOnePage.pressContinueButton();

    const checkoutCompletePage = await checkoutStepTwoPage.finishCheckout();

    await expect(checkoutCompletePage.getCompletionMessage()).toBeVisible();
  });
});
