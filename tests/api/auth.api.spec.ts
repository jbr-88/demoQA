import { test, expect } from '@playwright/test'
import { AuthApi } from '../../api/AuthApi'
import { saveUserId } from '../../utils/testContext';

test.describe('Auth API tests', () => {

    test('TC-26 Successful login via API', async ({ request }) => {
        const authApi = new AuthApi(request);

        const response = await authApi.login('testuser01', 'Test@12345');

        expect(response.status()).toBe(200);
    });

    test('TC-27 Login with invalid credentials', async ({ request }) => {
        const authApi = new AuthApi(request);

        const response = await authApi.login('testuser01', 'fakepass');
        const body = await response.json();

        expect(response.status()).toBe(404);
        expect(body.message).toContain('User not found!');
    });

    test('TC-32 Create user via API', async ({ request }) => {
        const authApi = new AuthApi(request);

        const response = await authApi.createUser('apiuser01', 'Api@12345');
        const body = await response.json();

        expect(response.status()).toBe(201);
        expect(body).toHaveProperty('userID');
        expect(body.userID).toBeTruthy();

        saveUserId(body.userID);
    });

    test('TC-33 Create duplicated user', async ({ request }) => {
        const authApi = new AuthApi(request);

        const response = await authApi.createUser('testuser01', 'Test@12345');
        const body = await response.json();

        expect(response.status()).toBe(406);
        expect(body.message).toContain('User exists!');
    });
});