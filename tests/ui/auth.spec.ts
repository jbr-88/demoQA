import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { RegisterPage } from '../../pages/RegisterPage'

test.describe('Authentication UI tests', () => {

    test('TC-01 Successful user registration', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registerPage = new RegisterPage(page);

        await loginPage.goto();
        await loginPage.newUserButton.click();
        await registerPage.register({
            firstName: 'Test',
            lastName: 'User',
            username: 'testuser01',
            password: 'Test@12345'
        });

        await expect(registerPage.resultMessage).toContainText('User Created');
    });

    test('TC-02 Registration with empty mandatory fields', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await page.goto('/register');
        await registerPage.registerButton.click();
        
        await expect(registerPage.resultMessage).toBeVisible();
    });

    test('TC-03 Registration with invalid password', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await page.goto('/register');
        await registerPage.register({
            firstName: 'Test',
            lastName: 'User',
            username: 'invalidpass',
            password: '1234'
        });

        await expect(registerPage.resultMessage).toContainText('Password');
    });

    test('TC-04 Successful login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('testuser01', 'Test@12345');

        await expect(page).toHaveURL(/profile/);
    });

    test('TC-05 Login with invalid user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('fakeuser', 'Test@12345');

        await expect(loginPage.errorMessage).toHaveText('Invalid username or password!');
    });

    test('TC-06 Logout', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('testuser01', 'Test@12345');
        await page.locator('#submit').click();

        await expect(page).toHaveURL(/login/);
    });
});