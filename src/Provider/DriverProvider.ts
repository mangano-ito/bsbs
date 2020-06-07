import webdriver from 'selenium-webdriver';
import { Capabilities } from '../Model/Capabilities';

export function provideDriver(capabilities: Capabilities): webdriver.WebDriver {
    const SERVER = 'http://hub-cloud.browserstack.com/wd/hub';
    const driver = new webdriver.Builder().
        usingServer(SERVER).
        withCapabilities(capabilities).
        build();

    return driver;
}
