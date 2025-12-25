import { test, expect } from '@playwright/test'

test.describe('Users API tests', () => {

    test('TC-35 Access user without authorization', async ({ request }) => {
        const response = await request.get('/Account/v1/User/invalid-id');

        expect(response.status()).toBe(401);
    });

    test('TC-37 Delete non-existing user', async ({ request }) => {
       const response = await request.delete('/Account/v1/User/invalid-id');

        expect(response.status()).toBe(404);
    });
});