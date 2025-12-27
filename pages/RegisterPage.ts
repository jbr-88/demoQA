import { Page, Locator} from '@playwright/test'

export class RegisterPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly registerButton: Locator;

    constructor(page:Page) {
        this.page = page;
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' })
        this.username = page.getByRole('textbox', { name: 'UserName' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.registerButton = page.getByRole('button', { name: 'Register' });
    }
}