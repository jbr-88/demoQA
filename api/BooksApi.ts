import { APIRequestContext, expect } from "@playwright/test";

export class BooksApi {
    constructor(private request: APIRequestContext) {}

    getBooks() {
        return this.request.get('/BookStore/v1/Books');
    }

    addBooks(token: string, body: any) {
        return this.request.post('/BookStore/v1/Books', {
            headers: { Authorization: `Bearer ${token}` },
            data: body
        });
    }

    deleteBook(token: string, body: any) {
        return this.request.delete('/BookStore/v1/Books', {
            headers: { Authorization: `Bearer ${token}` },
            data: body
        });
    }
}