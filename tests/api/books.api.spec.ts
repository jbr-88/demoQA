import { test, expect } from '@playwright/test'
import { BooksApi } from '../../api/BooksApi'
import { AuthApi } from '../../api/AuthApi'
import { getBearer, saveBearer } from '../../utils/authHelper';

test.describe('Books API tests', () => {

    test('TC-28 Get books list', async ({ request }) => {
        const api = new BooksApi(request);

        const response = await api.getBooks();
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.books).toBeTruthy();
    });

    test('TC-29 Add book to user', async ({ request }) => {
        const authApi = new AuthApi(request);
        const loginResponse = await authApi.login('testuser01', 'Test@12345');
        const generateTokenResponse = await authApi.generateToken('testuser01', 'Test@12345');
        const generateTokenBody = await generateTokenResponse.json();
        saveBearer(generateTokenBody.token);

        const response = await request.post('/BookStore/v1/Books', {
            headers: { Authorization: `Bearer ${getBearer()}` },
            data: {
                userId: '2caf2d15-b3a6-4e7d-b64c-93ce068a3d70',
                collectionOfIsbns: [
                    {
                        isbn: '9781449325862'
                    }
                ]
            }
        });

        expect(response.status()).toBe(201);
    });

    test('TC-30 Delete book', async ({ request }) => {
        const authApi = new AuthApi(request);
        const loginResponse = await authApi.login('testuser01', 'Test@12345');
        const generateTokenResponse = await authApi.generateToken('testuser01', 'Test@12345');
        const generateTokenBody = await generateTokenResponse.json();
        saveBearer(generateTokenBody.token);
        
        const response = await request.delete('/BookStore/v1/Book', {
            headers: { Authorization: `Bearer ${getBearer()}` },
            data: {
                isbn: '9781449325862',
                userId: '2caf2d15-b3a6-4e7d-b64c-93ce068a3d70'
            }
        });

        expect(response.status()).toBe(204);
    });

    test('TC-31 Request without token', async ({ request }) => {
        const response = await request.post('/BookStore/v1/Books', {
            data: {
                userId: '2caf2d15-b3a6-4e7d-b64c-93ce068a3d70',
                collectionOfIsbns: [
                    {
                        isbn: '9781449325862'
                    }
                ]
            }
        });

        expect(response.status()).toBe(401);
    });

    test('TC-38 Add multiple books', async ({ request }) => {
        const authApi = new AuthApi(request);
        const loginResponse = await authApi.login('testuser01', 'Test@12345');
        const generateTokenResponse = await authApi.generateToken('testuser01', 'Test@12345');
        const generateTokenBody = await generateTokenResponse.json();
        saveBearer(generateTokenBody.token);

        const response = await request.post('/BookStore/v1/Books', {
            headers: { Authorization: `Bearer ${getBearer()}` },
            data: {
                userId: '2caf2d15-b3a6-4e7d-b64c-93ce068a3d70',
                collectionOfIsbns: [
                    {
                        isbn: '9781449325862'
                    },
                    {
                        isbn: '9781449331818'
                    }
                ]
            }
        });

        expect(response.status()).toBe(201);
    });

    test('TC-39 Add duplicated book', async ({ request }) => {
        const authApi = new AuthApi(request);
        const loginResponse = await authApi.login('testuser01', 'Test@12345');
        const generateTokenResponse = await authApi.generateToken('testuser01', 'Test@12345');
        const generateTokenBody = await generateTokenResponse.json();
        saveBearer(generateTokenBody.token);

        const addBookResponse = await request.post('/BookStore/v1/Books', {
            headers: { Authorization: `Bearer ${getBearer()}` },
            data: {
                userId: '2caf2d15-b3a6-4e7d-b64c-93ce068a3d70',
                collectionOfIsbns: [
                    {
                        isbn: '9781449325862'
                    }
                ]
            }
        });
        const response = await request.post('/BookStore/v1/Books', {
            headers: { Authorization: `Bearer ${getBearer()}` },
            data: {
                userId: '2caf2d15-b3a6-4e7d-b64c-93ce068a3d70',
                collectionOfIsbns: [
                    {
                        isbn: '9781449325862'
                    }
                ]
            }
        });

        expect(response.status()).toBe(400);
    });

    test('TC-41 Invalid token', async ({ request }) => {
        const authApi = new AuthApi(request);
        const loginResponse = await authApi.login('testuser01', 'Test@12345');
        const generateTokenResponse = await authApi.generateToken('testuser01', 'Test@12345');
        const generateTokenBody = await generateTokenResponse.json();
        saveBearer(generateTokenBody.token);

        const response = await request.post('/BookStore/v1/Books', {
            headers: { Authorization: 'Bearer invalid' },
            data: {
                userId: '2caf2d15-b3a6-4e7d-b64c-93ce068a3d70',
                collectionOfIsbns: [
                    {
                        isbn: '9781449325862'
                    }
                ]
            }
        })
        expect(response.status()).toBe(401);
    });

    test('TC-42 Invalid HTTP method', async ({ request }) => {
        const authApi = new AuthApi(request);
        const loginResponse = await authApi.login('testuser01', 'Test@12345');
        const generateTokenResponse = await authApi.generateToken('testuser01', 'Test@12345');
        const generateTokenBody = await generateTokenResponse.json();
        saveBearer(generateTokenBody.token);
        
        const response = await request.put('/BookStore/v1/Book', {
            headers: { Authorization: `Bearer ${getBearer()}` },
            data: {
                isbn: '9781449325862',
                userId: '2caf2d15-b3a6-4e7d-b64c-93ce068a3d70'
            }
        });

        expect(response.status()).toBe(404);
    });
});