import { test, expect } from '@playwright/test'
import { BookStorePage } from '../../pages/BookStorePage'
import { BookDetailPage } from '../../pages/BookDetailPage'
import { ProfilePage } from '../../pages/ProfilePage'

test.describe('Book Store UI tests', () => {

    test('TC-07 View book list', async ({ page }) => {
        const store = new BookStorePage(page);

        await store.goto();

        await expect(store.booksTable).toBeVisible();
    });

    test('TC-08 View book details', async ({ page }) => {
        const store = new BookStorePage(page);

        await store.goto();
        await store.openBook('Git Pocket Guide');

        await expect(page.locator('#ISBN-wrapper')).toBeVisible();
    });

    test('TC-11 Search book by title', async ({ page }) => {
        const store = new BookStorePage(page);

        await store.goto();
        await store.search('Git');

        await expect(store.booksTable).not.toContainText('Git');
    });

    test('TC-12 Search with no results', async ({ page }) => {
        const store = new BookStorePage(page);

        await store.goto();
        await store.search('XYZ123');

        await expect(store.booksTable).not.toContainText('Git');
    });

    test('TC-13 Access profile when authenticated', async ({ page }) => {
        await page.goto('/profile');

        await expect(page.locator('.rt-table')).toBeVisible();
    });

    test('TC-14 Access profile without authentication', async ({ page }) => {
        await page.goto('/profile');

        await expect(page).toHaveURL(/login/);
    });

    test('TC-15 Delete all books', async ({ page }) => {
        const profile = new ProfilePage(page);

        await profile.goto();
        await profile.deleteAllBooks();

        await expect(profile.booksTable).not.toContainText('Git');
    });

    test('TC-16 Cancel delete all books', async ({ page }) => {
        const profile = new ProfilePage(page);

        await profile.goto();
        await profile.deleteAllButton.click();
        await page.locator('#closeSmallModal-cancel').click();

        await expect(profile.booksTable).toBeVisible();
    });

    test('TC-17 Pagination works', async ({ page }) => {
        const store = new BookStorePage(page);

        await store.goto();
        await store.paginationNext.click();

        await expect(store.booksTable).toBeVisible();
    });

    test('TC-18 Change page size', async ({ page }) => {
        const store = new BookStorePage(page);

        await store.goto();
        await store.pageSizeSelect.selectOption('5');

        await expect(store.booksTable).toBeVisible();
    });

    test('TC-19 Sort by title', async ({ page }) => {
        const store = new BookStorePage(page);

        await store.goto();
        await page.locator('.rt-th:has-text("Title")').click();

        await expect(store.booksTable).toBeVisible();
    });

    test('TC-20 Session persists after refresh', async ({ page }) => {
        await page.goto('/profile');
        await page.reload();

        await expect(page).toHaveURL(/profile/);
    });

    test('TC-21 Access Book Store without login', async ({ page }) => {
        const store = new BookStorePage(page);

        await store.goto();

        await expect(store.booksTable).toBeVisible();
    });

    test('TC-22 Add book without authentication', async ({ page }) => {
        await page.goto('/books');
        await page.locator('a:text("Git Pocket Guide")').click();
        await page.locator('button:text("Add To Your Collection")').click();

        await expect(page).toHaveURL(/login/);
    });

    test('TC-23 Back to Book Store navigation', async ({ page }) => {
        const store = new BookStorePage(page);
        const detail = new BookDetailPage(page);

        await store.goto();
        await store.openBook('Git Pocket Guide');
        await detail.backToStore();

        await expect(store.booksTable).toBeVisible();
    });

    test('TC-24 Delete individual book', async ({ page }) => {
        const profile = new ProfilePage(page);

        await profile.goto();
        await profile.deleteButtons.first().click();
        await page.locator('#closeSmallModal-ok').click();

        await expect(profile.booksTable).toBeVisible();
    });

    test('TC-25 Delete confirmation message', async ({ page }) => {
        const profile = new ProfilePage(page);

        await profile.goto();
        await profile.deleteButtons.first().click();

        await expect(page.locator('.modal-content')).toBeVisible();
    });
})