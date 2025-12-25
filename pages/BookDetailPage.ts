import { Page, Locator} from '@playwright/test'

export class BookDetailPage {
    readonly page: Page;
    readonly addButton: Locator;
    readonly backButton: Locator;

    constructor(page:Page) {
        this.page = page;
        this.addButton = page.locator('button:text("Add To Your Collection")');
        this.backButton = page.locator('button:text("Back To Book Store")');
    }

    async addToCollection() {
        await this.addButton.click();
    }

    async backToStore() {
        await this.backButton.click();
    }
}