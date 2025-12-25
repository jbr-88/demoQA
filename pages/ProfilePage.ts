import { Page, Locator} from '@playwright/test'

export class ProfilePage {
    readonly page: Page;
    readonly deleteAllButton: Locator;
    readonly deleteButtons: Locator;
    readonly booksTable: Locator;

    constructor(page:Page) {
        this.page = page;
        this.deleteAllButton = page.locator('button:text("Delete All Books")');
        this.deleteButtons = page.locator('button:text("Delete")');
        this.booksTable = page.locator('.rt-table');
    }

    async goto() {
        await this.page.goto('/profile');
    }

    async deleteAllBooks() {
        await this.deleteAllButton.click();
        await this.page.locator('#closeSmallModal-ok').click();
    }
}