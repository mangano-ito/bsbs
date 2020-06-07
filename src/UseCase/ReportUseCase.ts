import open from 'open';

import { ImageArtifactRepository } from "../Repository/ImageArtifactRepository";
import { BackstopTest } from "../Model/BackstopTest";
import { Comparator } from "../Helper/Comparator";
import { ResultGenerateUseCase } from "./ResultGenerateUseCase";
import { StaticHtmlReportUseCase } from "./StaticHtmlReportUseCase";
import { Result } from '../Model/Result';

export class ReportUseCase {
    private comparator = new Comparator();
    private generate: ResultGenerateUseCase;

    constructor(
        private referenceImageRepo: ImageArtifactRepository,
        private testImageRepo: ImageArtifactRepository,
        private differenceImageRepo: ImageArtifactRepository,
        private reporter: StaticHtmlReportUseCase,
    ) {
        this.generate = new ResultGenerateUseCase(
            this.referenceImageRepo,
            this.testImageRepo,
            this.differenceImageRepo,
            this.comparator,
        );
    }

    async run(test: BackstopTest): Promise<Result> {
        const result = await this.generate.run(test);
        const pathToReport = this.reporter.run(result);
        open(pathToReport);

        return result.failedCount <= 0 ? Result.OK : Result.FAILED;
    }
}
