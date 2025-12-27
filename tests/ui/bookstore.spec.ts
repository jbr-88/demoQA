import { test, expect } from '@playwright/test'
import { BookStorePage } from '../../pages/BookStorePage'
import { BookDetailPage } from '../../pages/BookDetailPage'
import { ProfilePage } from '../../pages/ProfilePage'
import { LoginPage } from '../../pages/LoginPage'

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

        await expect(page).toHaveURL(/9781449325862/);
    });

    test('TC-09 Add book to collection', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('testuser01', 'Test@12345');
        await expect(page).toHaveURL(/profile/);
        
        
        const store = new BookStorePage(page);
        const detail = new BookDetailPage(page);

        await store.goto();
        await store.openBook('Git Pocket Guide');
        await detail.addToCollection();

        await expect(store.booksTable).toContainText('Git');
    });

    test('TC-10 Delete book from collection', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const store = new BookStorePage(page);
        const detail = new BookDetailPage(page);
        await loginPage.goto();
        await loginPage.login('testuser01', 'Test@12345');
        await expect(page).toHaveURL(/profile/);
        await store.goto();
        await store.openBook('Git Pocket Guide');
        await detail.addToCollection();
        await expect(store.booksTable).toContainText('Git');

        const profilePage = new ProfilePage(page);
        
        await page.goto('/profile');
        await profilePage.deleteButtons.first().click();
        await page.locator('#closeSmallModal-ok').click();

        await expect(store.booksTable).not.toContainText('Git');
    });

    test('TC-11 Search book by title', async ({ page }) => {
        const store = new BookStorePage(page);

        await store.goto();
        await store.search('Git');

        await expect(store.booksTable).toContainText('Git');
    });

    test('TC-12 Search with no results', async ({ page }) => {
        const store = new BookStorePage(page);

        await store.goto();
        await store.search('XYZ123');

        await expect(store.booksTable).not.toContainText('XYZ123');
    });

    test('TC-13 Access profile when authenticated', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('testuser01', 'Test@12345');
        await expect(page).toHaveURL(/profile/);
        
        const profilePage = new ProfilePage(page);

        await page.goto('/profile');

        await expect(profilePage.booksTable).toBeVisible();
        await expect(loginPage.logoutButton).toBeVisible();
        await expect(page.getByText('TestUser01')).toBeVisible();
    });

    test('TC-14 Access profile without authentication', async ({ page }) => {
        const profilePage = new ProfilePage(page);
        
        await page.goto('/profile');

        await expect(profilePage.notLoggedMessage).toHaveText('Currently you are not logged into the Book Store application, please visit the login page to enter or register page to register yourself.');
    });

    test('TC-15 Delete all books', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const store = new BookStorePage(page);
        const detail = new BookDetailPage(page);
        await loginPage.goto();
        await loginPage.login('testuser01', 'Test@12345');
        await expect(page).toHaveURL(/profile/);
        await store.goto();
        await store.openBook('Git Pocket Guide');
        await detail.addToCollection();
        await expect(store.booksTable).toContainText('Git');

        const profilePage = new ProfilePage(page);
        
        await page.goto('/profile');
        await profilePage.deleteAllBooks();

        await expect(profilePage.booksTable).not.toContainText('Git');
    });

    test('TC-16 Cancel delete all books', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const store = new BookStorePage(page);
        const detail = new BookDetailPage(page);
        await loginPage.goto();
        await loginPage.login('testuser01', 'Test@12345');
        await expect(page).toHaveURL(/profile/);
        await store.goto();
        await store.openBook('Git Pocket Guide');
        await detail.addToCollection();
        await expect(store.booksTable).toContainText('Git');

        const profilePage = new ProfilePage(page);
        
        await page.goto('/profile');
        await profilePage.deleteAllBooks();
        await page.locator('#closeSmallModal-cancel').click();

        await expect(profilePage.booksTable).toContainText('Git');
    });

    test('TC-17 Pagination works', async ({ page }) => {
        const store = new BookStorePage(page);
        await store.goto();
        await store.pageSizeSelect.selectOption('5');
        
        await store.paginationNext.click();

        await expect(store.booksTable).toBeVisible();
    });

    test('TC-18 Change page size', async ({ page }) => {
        const store = new BookStorePage(page);

        await store.goto();
        await store.pageSizeSelect.selectOption('5');
        const rows = page.locator('.rt-tbody .rt-tr-group .rt-tr:not(.rt-tr.-padRow)');

        await expect(rows).toHaveCount(5);

    });

    test('TC-19 Sort by title', async ({ page }) => {
        const store = new BookStorePage(page);

        await store.goto();
        await page.locator('.rt-th:has-text("Title")').click();
        const titleCells = page.locator('.rt-tbody .rt-tr-group .rt-tr:not(.rt-tr.-padRow) .rt-td:nth-child(2)');
        const titles = (await titleCells.allTextContents()).map(t => t.trim());
        const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
        
        expect(titles).toEqual(sortedTitles);
    });

    test('TC-20 Session persists after refresh', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('testuser01', 'Test@12345');
        await expect(page).toHaveURL(/profile/);
        
        await page.reload();

        await expect(page).toHaveURL(/profile/);
        await expect(loginPage.logoutButton).toBeVisible();
        await expect(page.getByText('TestUser01')).toBeVisible();
    });

    test('TC-21 Access Book Store without login', async ({ page }) => {
        const store = new BookStorePage(page);

        await store.goto();

        await expect(store.booksTable).toBeVisible();
    });

    test('TC-22 Add book without authentication', async ({ page }) => {
        const store = new BookStorePage(page);
        const detail = new BookDetailPage(page);

        await store.goto();
        await store.openBook('Git Pocket Guide');
        
        await expect(detail.addButton).not.toBeVisible();
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