const { test, expect } = require('@playwright/test');

test.describe('Авторизация с ошибкой на Sauce Demo', () => {
  test('Должна появиться ошибка', async ({ page }) => {
    
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();

  })
})