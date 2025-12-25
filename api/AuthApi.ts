import { APIRequestContext, expect } from "@playwright/test";

export class AuthApi {
    constructor(private request: APIRequestContext) {}

    async login(username: string, password: string) {
        const response = await this.request.post('/Account/v1/Login', {
            data: {
                userName: username,
                password
            }
        });
        return response;
    }

    async createUser(username: string, password: string) {
        return await this.request.post('/Account/v1/User', {
            data: {
                userName: username,
                password
            }
        });
    }
}