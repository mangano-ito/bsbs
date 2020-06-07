import { WebDriver } from "selenium-webdriver";
import { BackstopTest } from "../Model/BackstopTest";
import { BackstopScenarioRunner } from "./BackstopScenarioRunner";
import { ImageArtifactRepository } from "../Repository/ImageArtifactRepository";
import { Result } from "../Model/Result";

export class RunTestUseCase {
    constructor(
        private driver: WebDriver,
        private test: BackstopTest,
        private repo: ImageArtifactRepository
    ) {}

    async run(): Promise<Result> {
        let failed = false;
        for (const scenario of this.test.scenarios) {
            const {url} = scenario;
            console.log(`starting test on test: ${url}`);
            try {
                await new BackstopScenarioRunner(this.driver, scenario, this.repo).run(url);
            } catch (e) {
                console.error(e);
                failed = true;
                continue;
            }
            console.log('done');
        }
        this.driver.quit();

        return failed ? Result.FAILED : Result.FAILED;
    }
}
