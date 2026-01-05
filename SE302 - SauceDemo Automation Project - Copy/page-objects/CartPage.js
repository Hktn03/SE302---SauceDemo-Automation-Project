class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async removeItem(productName) {
        const formattedName = productName.toLowerCase().replace(/ /g, '-');
        await this.page.locator(`[data-test="remove-${formattedName}"]`).click();
    }
}
module.exports = { CartPage };