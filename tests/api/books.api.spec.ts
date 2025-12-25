import { test, expect } from '@playwright/test'
import { BooksApi } from '../../api/BooksApi'

test.describe('Books API tests', () => {

    test('TC-28 Get books list', async ({ request }) => {
        const api = new BooksApi(request);

        const response = await api.getBooks();
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.books.lenght).toBeGreaterThan(0);
    });

    test('TC-31 Request without token', async ({ request }) => {
        const response = await request.post('/BookStore/v1/Books');

        expect(response.status()).toBe(401);
    });

    test('TC-42 Invalid HTTP method', async ({ request }) => {
        const response = await request.put('/BookStore/v1/Books');

        expect(response.status()).toBe(405);
    });
});