class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('.complete-header');
    }

    async fillInformation(fname, lname, zip) {
        await this.firstName.fill(fname);
        await this.lastName.fill(lname);
        await this.postalCode.fill(zip);
        await this.continueButton.click();
    }
}
module.exports = { CheckoutPage };