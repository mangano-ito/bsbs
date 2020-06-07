import { Scenario } from "../Model/Scenario";
import { BackstopHelper } from "../Helper/BackstopHelper";

export async function fillSelectorUseCase(scenario: Scenario, helper: BackstopHelper) {
    for (const fillSelector of scenario.fillSelectors || []) {
        console.log(`filling elements...: ${fillSelector}`);
        await helper.fillElement(fillSelector);
    }
}
