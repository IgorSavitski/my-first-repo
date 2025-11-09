const { test, expect } = require('@playwright/test');

test.describe('Авторизация на Sauce Demo', () => {

  test('Пользователь должен успешно войти в систему', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');

    await page.locator('[data-test="password"]').fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
});
