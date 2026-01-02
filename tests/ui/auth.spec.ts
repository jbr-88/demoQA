import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { RegisterPage } from '../../pages/RegisterPage'

test.describe('Authentication UI tests', () => {

    test('TC-02 Registration with empty mandatory fields', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await page.goto('/register');
        await registerPage.registerButton.click({ timeout: 10000});
        
        await expect(registerPage.firstName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerPage.lastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerPage.username).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerPage.password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TC-04 Successful login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('testuser01', 'Test@12345');

        await expect(page).toHaveURL(/profile/);
        await expect(loginPage.logoutButton).toBeVisible();
        await expect(page.getByText('TestUser01')).toBeVisible();
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
        await expect(page).toHaveURL(/profile/);

        await loginPage.logoutButton.click();

        await expect(page).toHaveURL(/login/);
    });
});