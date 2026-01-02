import { Page, Locator} from '@playwright/test'

export class ProfilePage {
    readonly page: Page;
    readonly deleteAllButton: Locator;
    readonly deleteButtons: Locator;
    readonly booksTable: Locator;
    readonly notLoggedMessage: Locator

    constructor(page:Page) {
        this.page = page;
        this.deleteAllButton = page.getByRole('button', { name: 'Delete All Books' });
        this.deleteButtons = page.locator('button:text("Delete")');
        this.booksTable = page.locator('.rt-table');
        this.notLoggedMessage = page.getByText('Currently you are not logged');
    }

    async goto() {
        await this.page.goto('/profile');
    }

    async deleteAllBooks() {
        await this.deleteAllButton.click();
        await this.page.locator('#closeSmallModal-ok').click();
    }
}