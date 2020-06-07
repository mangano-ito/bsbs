import { WebDriver } from "selenium-webdriver";

import { BackstopHelper } from "../Helper/BackstopHelper";
import { Scenario } from "../Model/Scenario";
import { ImageArtifactRepository } from "../Repository/ImageArtifactRepository";
import { setCookie } from "./SetCookieUseCase";
import { goPageUseCase } from "./GoPageUseCase";
import { readySelectorUseCase } from "./ReadySelectorUseCase";
import { fillSelectorUseCase } from "./FillSelectorUseCase";
import { removeSelectorUseCase } from "./RemoveSelectorUseCase";
import { captureElementsUseCase } from "./CaptureElementsUseCase";

export async function keyPressUseCase(driver: WebDriver, scenario: Scenario) {
    const helper = new BackstopHelper(driver);
    for (const selector of (scenario.keyPressSelectors || [])) {
        console.log(`sending keypress...: ${selector.selector} <= ${selector.keyPress}`);
        await helper.keyPress(selector.selector, selector.keyPress);
        await postInteractionWaitUseCase(driver, scenario);
    }
}

export async function clickUseCase(driver: WebDriver, scenario: Scenario) {
    const helper = new BackstopHelper(driver);
    const selector = scenario.clickSelector;
    if (!selector) {
        return;
    }
    console.log(`sending click...: ${selector}`);
    await helper.click(selector);
    await postInteractionWaitUseCase(driver, scenario);
}

export async function delayUseCase(driver: WebDriver, scenario: Scenario) {
    const wait = scenario.delay;
    if (wait) {
        console.log(`wait...: ${wait} msec.`);
        await new Promise(resolve => setTimeout(resolve, wait));
    }  
}

export async function postInteractionWaitUseCase(driver: WebDriver, scenario: Scenario) {
    const wait = scenario.postInteractionWait;
    if (wait) {
        console.log(`wait...: ${wait} msec.`);
        await new Promise(resolve => setTimeout(resolve, wait));
    }
}

export async function hideSelectorUseCase(driver: WebDriver, scenario: Scenario) {
    const helper = new BackstopHelper(driver);
    for (const selector of scenario.hideSelectors || []) {
        console.log(`hiding elements...: ${selector}`);
        const el = await helper.querySelector(selector);
        await driver.executeScript('arguments[0].style.visibility = "hidden"', el);
    }
}

export async function scrollSelectorUseCase(driver: WebDriver, scenario: Scenario) {
    const helper = new BackstopHelper(driver);
    const selector = scenario.scrollToSelector;
    if (!selector) {
        return;
    }
    console.log(`scroll to elements...: ${selector}`);
    const el = await helper.querySelector(selector);
    await driver.executeScript('arguments[0].scrollIntoView()', el);
}

export class BackstopScenarioRunner {
    private helper: BackstopHelper;

    constructor(
        private driver: WebDriver,
        private scenario: Scenario,
        private repo: ImageArtifactRepository,
    ) {
        this.helper = new BackstopHelper(driver);
    }

    async run(url: string) {
        await setCookie(this.driver, this.scenario);
        await goPageUseCase(url, this.helper);
        await delayUseCase(this.driver, this.scenario);
        await readySelectorUseCase(this.scenario, this.helper);

        await scrollSelectorUseCase(this.driver, this.scenario);
        await keyPressUseCase(this.driver, this.scenario);
        await clickUseCase(this.driver, this.scenario);

        await fillSelectorUseCase(this.scenario, this.helper);
        await hideSelectorUseCase(this.driver, this.scenario)
        await removeSelectorUseCase(this.scenario, this.helper);

        await captureElementsUseCase(this.scenario, this.helper, this.repo);
    }
}
