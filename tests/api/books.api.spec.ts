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

    test('TC-29 Add book to user', async ({ request }) => {
        const response = await request.post('/BookStore/v1/Books');

        expect([200, 201]).toContain(response.status());
    });

    test('TC-30 Delete book', async ({ request }) => {
        const response = await request.delete('/BookStore/v1/Books');

        expect(response.status()).toBe(204);
    });

    test('TC-31 Request without token', async ({ request }) => {
        const response = await request.post('/BookStore/v1/Books');

        expect(response.status()).toBe(401);
    });

    test('TC-38 Add multiple books', async ({ request }) => {
        const response = await request.post('/BookStore/v1/Books');

        expect(response.status()).toBe(201);
    });

    test('TC-39 Add duplicated book', async ({ request }) => {
        const response = await request.post('/BookStore/v1/Books');

        expect(response.status()).toBe(400);
    });

    test('TC-41 Invalid token', async ({ request }) => {
        const response = await request.post('/BookStore/v1/Books', {
            headers: { Authorization: 'Bearer invalid' }
        });
        expect(response.status()).toBe(401);
    });

    test('TC-42 Invalid HTTP method', async ({ request }) => {
        const response = await request.put('/BookStore/v1/Books');

        expect(response.status()).toBe(405);
    });
});