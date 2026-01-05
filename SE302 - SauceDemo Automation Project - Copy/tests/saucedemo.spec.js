const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { InventoryPage } = require('../page-objects/InventoryPage');
const { CartPage } = require('../page-objects/CartPage');
const { CheckoutPage } = require('../page-objects/CheckoutPage');

test.describe('SauceDemo E2E Test Suite', () => {
    let loginPage, inventoryPage, cartPage, checkoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        await loginPage.navigate();
    });

    // Smoke tests
    test('Smoke 1: Successful Login', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(inventoryPage.inventoryList).toBeVisible();
    });

    test('Smoke 2: Logout Flow', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.logout();
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('Smoke 3: Add Item to Cart Badge Check', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    test('Smoke 4: Navigate to Cart Page', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.cartLink.click();
        await expect(page).toHaveURL(/cart.html/);
    });

    test('Smoke 5: Menu Sidebar Visibility', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.menuButton.click();
        await expect(inventoryPage.logoutLink).toBeVisible();
    });

    // Normal tests
    
    
    test('Normal 1: Negative - Missing Postal Code on Checkout', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.cartLink.click();
        await cartPage.checkoutButton.click();
        await checkoutPage.firstName.fill('Can');
        await checkoutPage.lastName.fill('Aysen');
        await checkoutPage.continueButton.click();
        await expect(loginPage.errorMessage).toContainText('Error: Postal Code is required');
    });

    
    test('Normal 2: Positive - Complete Purchase Flow', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCart('Sauce Labs Onesie');
        await inventoryPage.cartLink.click();
        await cartPage.checkoutButton.click();
        await checkoutPage.fillInformation('Atacan', 'Acar', '34000');
        await checkoutPage.finishButton.click();
        await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    });

    
    test('Normal 3: Positive - Inventory Reset Check', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');
        await inventoryPage.menuButton.click();
        await inventoryPage.resetLink.click();
        await expect(inventoryPage.cartBadge).not.toBeVisible();
    });

    
    test('Normal 4: Negative - Locked Out User Login', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
    });

    
    test('Normal 5: Negative - Empty Username Login', async () => {
        await loginPage.loginButton.click();
        await expect(loginPage.errorMessage).toContainText('Username is required');
    });

   
    test('Normal 6: Functional - Sort Price Low to High', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await page.selectOption('.product_sort_container', 'lohi');
        const prices = await page.$$eval('.inventory_item_price', els => 
            els.map(el => parseFloat(el.innerText.replace('$', '')))
        );
        expect(prices).toEqual([...prices].sort((a, b) => a - b));
    });

   
    test('Normal 7: Functional - Sort Name Z to A', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await page.selectOption('.product_sort_container', 'za');
        const firstProduct = await page.locator('.inventory_item_name').first().innerText();
        expect(firstProduct).toBe('Test.allTheThings() T-Shirt (Red)');
    });

    
    test('Normal 8: Positive - Multiple Items in Cart', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
        await expect(inventoryPage.cartBadge).toHaveText('2');
    });

   
    test('Normal 9: Functional - Remove Item in Cart Page', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.cartLink.click();
        await page.click('button:has-text("Remove")');
        await expect(inventoryPage.cartBadge).not.toBeVisible();
    });

    
    test('Normal 10: Functional - Cancel Checkout Flow', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCart('Sauce Labs Onesie');
        await inventoryPage.cartLink.click();
        await cartPage.checkoutButton.click();
        await page.click('#cancel');
        await expect(page).toHaveURL(/cart.html/);
    });
});