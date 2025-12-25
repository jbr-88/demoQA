import { Page, Locator} from '@playwright/test'

export class RegisterPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly registerButton: Locator;
    readonly resultMessage: Locator;

    constructor(page:Page) {
        this.page = page;
        this.firstName = page.locator('#firstname');
        this.lastName = page.locator('#lastname');
        this.username = page.locator('#userName');
        this.password = page.locator('#password');
        this.registerButton = page.locator('#register');
        this.resultMessage = page.locator('#name');
    }

    async register(user: {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
    }) {
        await this.firstName.fill(user.firstName);
        await this.lastName.fill(user.lastName);
        await this.username.fill(user.username);
        await this.password.fill(user.password);
        await this.registerButton.click();
    }
}