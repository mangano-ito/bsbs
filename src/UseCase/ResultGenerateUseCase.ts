import { ImageArtifactRepository } from "../Repository/ImageArtifactRepository";
import { Comparator } from "../Helper/Comparator";
import { BackstopTest } from "../Model/BackstopTest";
import { ScenarioResult } from "../Model/ScenarioResult";
import { TestResult } from "../Model/TestResult";

export class ResultGenerateUseCase {
    constructor(
        private referenceImageRepo: ImageArtifactRepository,
        private testImageRepo: ImageArtifactRepository,
        private differenceImageRepo: ImageArtifactRepository,
        private comparator: Comparator,
    ) {}

    async run(test: BackstopTest): Promise<TestResult> {
        const scenarioResults: ScenarioResult[] = [];
        let failedCount = 0;
        let passedCount = 0;

        for (const scenario of test.scenarios) {
            const {label} = scenario;
            for (const [index, selector] of (scenario.selectors || []).entries()) {
                const referenceImage = this.referenceImageRepo.load(label, index);
                const referenceImagePath = this.referenceImageRepo.generateFilePath(label, index);
                const testImage = this.testImageRepo.load(label, index);
                const testImagePath = this.testImageRepo.generateFilePath(label, index);
                const differenceImage = await this.comparator.diff(referenceImage, testImage);
                const percent = await this.comparator.compare(referenceImage, testImage);
                const matched = percent < (scenario.misMatchThreshold || 0.00000000001);
                const differenceImagePath = this.differenceImageRepo.save(label, index, differenceImage);

                const scenarioResult: ScenarioResult = {
                    label,
                    index,
                    selector,
                    referenceUrl: scenario.referenceUrl,
                    testUrl: scenario.url,
                    matched,
                    percent,
                    referenceImagePath,
                    testImagePath,
                    differenceImagePath,
                };
                scenarioResults.push(scenarioResult);

                if (matched) {
                    passedCount++;
                } else {
                    failedCount++;
                }
            }
        }
        
        return {
            id: test.id,
            passedCount,
            failedCount,
            scenarios: scenarioResults,
        };
    }
}
