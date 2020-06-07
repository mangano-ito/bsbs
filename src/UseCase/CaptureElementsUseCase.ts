import { Scenario } from "../Model/Scenario";
import { BackstopHelper } from "../Helper/BackstopHelper";
import { ImageArtifactRepository } from "../Repository/ImageArtifactRepository";
import { captureElementUseCase } from "./CaptureElementUseCase";

export async function captureElementsUseCase(scenario: Scenario, helper: BackstopHelper, repo: ImageArtifactRepository) {
    const {label} = scenario;
    for (const [index, selector] of (scenario.selectors || []).entries()) {
        await captureElementUseCase(selector, label, index, helper, repo);
    }
}
