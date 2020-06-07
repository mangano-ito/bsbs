import { WebDriver, By, WebElement, until } from "selenium-webdriver";
import { cropBase64Blob } from "../UseCase/CropUseCase";
import { Base64Image } from "../Model/Base64Image";

export class BackstopHelper {
    constructor(private driver: WebDriver) {}

    async go(url: string) {
        await this.driver.get(url);
    }

    async awaitElementReady(selector: string) {
        const locator = By.css(selector);
        const condition = until.elementLocated(locator);
        await this.driver.wait(condition, 30000, 'waiting for readySelector');
    }

    async fillElement(selector: string) {
        const el = await this.querySelector(selector);
        await this.driver.executeScript('arguments[0].style.visibility = "hidden"', el);
    }

    async removeElement(selector: string) {
        const el = await this.querySelector(selector);
        await this.driver.executeScript('arguments[0].style.display = "none"', el);
    }

    async click(selector: string) {
        const el = await this.querySelector(selector);
        await this.driver.executeScript('arguments[0].click()', el);
    }

    async hover(selector: string) {
        const el = await this.querySelector(selector);
        // TODO: hover
    }

    async keyPress(selector: string, value: string) {
        const el = await this.querySelector(selector);
        await el.sendKeys(value);
    }

    async querySelector(selector: string): Promise<WebElement> {
        const locator = By.css(selector);

        return this.driver.findElement(locator);
    }

    async capturePage(): Promise<Base64Image> {
        return await this.driver.takeScreenshot();
    }

    async captureElement(selector: string): Promise<Base64Image> {
        const el = await this.querySelector(selector);
        const rect = await el.getRect();
        const image = await this.capturePage();
        const croppedImage = await cropBase64Blob(image, rect.x, rect.y, rect.width, rect.height);

        return croppedImage;
    }
}
