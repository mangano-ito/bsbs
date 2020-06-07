import { WebDriver } from "selenium-webdriver";
import { Scenario } from '../Model/Scenario';
import { loadConfig } from '../Helper/ConfigLoader';

interface Cookie {
    name: string;
    value: string;
    domain?: string;
    path?: string;
    expirationDate?: number;
    hostOnly?: boolean;
    httpOnly?: boolean;
    secure?: boolean;
    session?: boolean;
    sameSite?: string;
}

export async function setCookie(driver: WebDriver, scenario: Scenario) {
    const cookiePath = scenario.cookiePath;
    if (!cookiePath) {
        return;
    }
    const cookies: Cookie[] = loadConfig(cookiePath);
    const promises = cookies.map(cookie => driver.manage().addCookie({ ...cookie, expiry: cookie.expirationDate }));
    await Promise.all(promises);
}
