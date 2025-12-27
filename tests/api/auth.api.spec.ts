import { test, expect } from '@playwright/test'
import { AuthApi } from '../../api/AuthApi'

test.describe('Auth API tests', () => {

    test('TC-26 Successful login via API', async ({ request }) => {
        const authApi = new AuthApi(request);

        const response = await authApi.login('testuser01', 'Test@12345');
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.token).toBeTruthy();
    });

    test('TC-27 Login with invalid credentials', async ({ request }) => {
        const authApi = new AuthApi(request);

        const response = await authApi.login('fakeuser', 'fakepass');

        expect(response.status()).toBe(400);
    });

    test('TC-32 Create user via API', async ({ request }) => {
        const authApi = new AuthApi(request);

        const response = await authApi.createUser('apiuser01', 'Api@12345');

        expect(response.status()).toBe(201);
    });

    test('TC-33 Create duplicated user', async ({ request }) => {
        const authApi = new AuthApi(request);

        const response = await authApi.createUser('apiuser01', 'Api@12345');

        expect(response.status()).toBe(406);
    });

    test('TC-43 Invalid JSON format', async ({ request }) => {
        const response = await request.post('/Account/v1/Login', {
            data: '{ invalid json'
        });
        expect(response.status()).toBe(400);
    });
});