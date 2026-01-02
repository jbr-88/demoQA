import { test, expect } from '@playwright/test'
import { AuthApi } from '../../api/AuthApi';
import { getBearer, saveBearer } from '../../utils/authHelper';

test.describe('Users API tests', () => {

    test('TC-32 Get user data', async ({ request }) => {
        const authApi = new AuthApi(request);
        const loginResponse = await authApi.login('testuser01', 'Test@12345');
        const generateTokenResponse = await authApi.generateToken('testuser01', 'Test@12345');
        const generateTokenBody = await generateTokenResponse.json();
        saveBearer(generateTokenBody.token);
        
        const response = await request.get('/Account/v1/User/2caf2d15-b3a6-4e7d-b64c-93ce068a3d70', {
            headers: { Authorization: `Bearer ${getBearer()}` }
        });
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.userId).toContain('2caf2d15-b3a6-4e7d-b64c-93ce068a3d70');
    });

    test('TC-33 Access user without authorization', async ({ request }) => {
        const response = await request.get('/Account/v1/User/2caf2d15-b3a6-4e7d-b64c-93ce068a3d70');

        expect(response.status()).toBe(401);
    });

    test('TC-34 Delete user', async ({ request }) => {
        const authApi = new AuthApi(request);
        const loginResponse = await authApi.login('testuser01', 'Test@12345');
        const generateTokenResponse = await authApi.generateToken('testuser01', 'Test@12345');
        const generateTokenBody = await generateTokenResponse.json();
        saveBearer(generateTokenBody.token);
        
        const response = await request.delete('/Account/v1/User/apiuser14', {
            headers: { Authorization: `Bearer ${getBearer()}` }
        });
        const body = await response.json();
        console.log(body);

        expect(response.status()).toBe(200);
    });

    test('TC-35 Delete non-existing user', async ({ request }) => {
        const authApi = new AuthApi(request);
        const loginResponse = await authApi.login('testuser01', 'Test@12345');
        const generateTokenResponse = await authApi.generateToken('testuser01', 'Test@12345');
        const generateTokenBody = await generateTokenResponse.json();
        saveBearer(generateTokenBody.token);
        
        const response = await request.delete('/Account/v1/User/a41ab176-ef2f-4c71-8f28-3b30f8046a4d', {
            headers: { Authorization: `Bearer ${getBearer()}` }
        });

        expect(response.status()).toBe(401);
    });

    test('TC-38 Get user books', async ({ request }) => {
        const authApi = new AuthApi(request);
        const loginResponse = await authApi.login('testuser01', 'Test@12345');
        const generateTokenResponse = await authApi.generateToken('testuser01', 'Test@12345');
        const generateTokenBody = await generateTokenResponse.json();
        saveBearer(generateTokenBody.token);
        
        const response = await request.get('/Account/v1/User/2caf2d15-b3a6-4e7d-b64c-93ce068a3d70', {
            headers: { Authorization: `Bearer ${getBearer()}` }
        });
        const body = await response.json();
        console.log(body);

        expect(response.status()).toBe(200);
        expect(body.books).toBeTruthy();
    });
});