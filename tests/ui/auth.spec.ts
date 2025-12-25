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

    test('TC-05 Login with invalid user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('fakeuser', 'Test@12345');

        await expect(loginPage.errorMessage).toHaveText('Invalid username or password!');
    });
});