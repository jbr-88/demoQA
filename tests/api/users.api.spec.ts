import { test, expect } from '@playwright/test'

test.describe('Users API tests', () => {

    test('TC-34 Get user data', async ({ request }) => {
        const response = await request.get('/Account/v1/User/valid-id');

        expect(response.status()).toBe(200);
    });

    test('TC-35 Access user without authorization', async ({ request }) => {
        const response = await request.get('/Account/v1/User/invalid-id');

        expect(response.status()).toBe(401);
    });

    test('TC-36 Delete user', async ({ request }) => {
        const response = await request.delete('/Account/v1/User/valid-id');

        expect(response.status()).toBe(204);
    });

    test('TC-37 Delete non-existing user', async ({ request }) => {
       const response = await request.delete('/Account/v1/User/invalid-id');

        expect(response.status()).toBe(404);
    });

    test('TC-40 Get user books', async ({ request }) => {
        const response = await request.get('/Account/v1/User/valid-id');

        expect(response.status()).toBe(200);
    });
});