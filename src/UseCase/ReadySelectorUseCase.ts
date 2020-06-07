import { Scenario } from "../Model/Scenario";
import { BackstopHelper } from "../Helper/BackstopHelper";

export async function readySelectorUseCase(scenario: Scenario, helper: BackstopHelper) {
    const selector = scenario.readySelector;
    if (!selector) {
        return;
    }
    console.log(`waiting for the element ready...: ${selector}`);
    await helper.awaitElementReady(selector);
}
