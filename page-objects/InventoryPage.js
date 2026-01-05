class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryList = page.locator('.inventory_list');
        this.sortDropdown = page.locator('[data-test="product_sort_container"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
        //Menu
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.resetLink = page.locator('#reset_sidebar_link');
    }

    async addItemToCart(productName) {
        const formattedName = productName.toLowerCase().replace(/ /g, '-');
        await this.page.locator(`[data-test="add-to-cart-${formattedName}"]`).click();
    }

    async sortProducts(option) {
        await this.sortDropdown.selectOption(option);
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutLink.click();
    }
}
module.exports = { InventoryPage };