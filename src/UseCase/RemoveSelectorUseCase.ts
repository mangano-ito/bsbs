import { Scenario } from "../Model/Scenario";
import { BackstopHelper } from "../Helper/BackstopHelper";

export async function removeSelectorUseCase(scenario: Scenario, helper: BackstopHelper) {
    for (const removeSelector of scenario.removeSelectors || []) {
        console.log(`removing elements...: ${removeSelector}`);
        await helper.removeElement(removeSelector);
    }
}
