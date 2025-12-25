import { Page, Locator} from '@playwright/test'

export class BookStorePage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly booksTable: Locator;
    readonly paginationNext: Locator;
    readonly pageSizeSelect: Locator;

    constructor(page:Page) {
        this.page = page;
        this.searchBox = page.locator('#searchBox');
        this.booksTable = page.locator('.rt-table');
        this.paginationNext = page.locator('button:-has-text("Next")');
        this.pageSizeSelect = page.locator('select[aria-label="rows per page"]');
    }

    async goto() {
        await this.page.goto('/books');
    }

    async search(text: string) {
        await this.searchBox.fill(text);
    }

    async openBook(title: string) {
        await this.page.locator(`a:text("${title}")`).click();
    }
}