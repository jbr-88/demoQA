import { test, expect } from '@playwright/test'
import { AuthApi } from '../../api/AuthApi'

test.describe('Auth API tests', () => {

    test('TC-24 Successful login via API', async ({ request }) => {
        const authApi = new AuthApi(request);

        const response = await authApi.login('testuser01', 'Test@12345');

        expect(response.status()).toBe(200);
    });

    test('TC-25 Login with invalid credentials', async ({ request }) => {
        const authApi = new AuthApi(request);

        const response = await authApi.login('testuser01', 'fakepass');
        const body = await response.json();

        expect(response.status()).toBe(404);
        expect(body.message).toContain('User not found!');
    });

    test('TC-30 Create user via API', async ({ request }) => {
        const authApi = new AuthApi(request);

        const response = await authApi.createUser('apiuser14', 'Api@12345');
        const body = await response.json();
        console.log(body);

        expect(response.status()).toBe(201);
        expect(body).toHaveProperty('userID');
        expect(body.userID).toBeTruthy();
    });

    test('TC-31 Create duplicated user', async ({ request }) => {
        const authApi = new AuthApi(request);

        const response = await authApi.createUser('testuser01', 'Test@12345');
        const body = await response.json();

        expect(response.status()).toBe(406);
        expect(body.message).toContain('User exists!');
    });
});