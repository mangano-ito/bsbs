import { provideOptions } from './Provider/OptionProvider';
import { provideDriver } from './Provider/DriverProvider';
import { RunReferenceUseCase } from './UseCase/RunReferenceTest';
import { showUsage } from './UseCase/ShowUsageUseCase';
import { RunTestUseCase } from './UseCase/RunTestUseCase';
import { ReportUseCase } from './UseCase/ReportUseCase';
import { StaticHtmlReportUseCase } from './UseCase/StaticHtmlReportUseCase';
import { ImageArtifactRepository } from './Repository/ImageArtifactRepository';
import { Mode } from './Model/Options';
import { Result } from './Model/Result';

async function main() {
    const options = provideOptions();
    const referenceImageRepo = new ImageArtifactRepository(options.artifactReferencePath);
    const testImageRepo = new ImageArtifactRepository(options.artifactTestPath);

    let exitCode = Result.OK;
    switch (options.mode) {
        case Mode.REFERENCE: {
            const driver = provideDriver(options.capabilities);
            const reference = new RunReferenceUseCase(driver, options.backstopTest, referenceImageRepo);
            exitCode = await reference.run();
            break;
        }
        case Mode.TEST: {
            const driver = provideDriver(options.capabilities);
            const test = new RunTestUseCase(driver, options.backstopTest, testImageRepo);
            exitCode = await test.run();
            break;
        }
        case Mode.REPORT: {
            const differenceImageRepo = new ImageArtifactRepository(options.artifactDifferencePath);
            const reporter = new StaticHtmlReportUseCase(options.capabilities, options.artifactReportPath);
            const report = new ReportUseCase(referenceImageRepo, testImageRepo, differenceImageRepo, reporter);
            exitCode = await report.run(options.backstopTest);
            break;
        }
    }
    process.exitCode = exitCode;
}

main().catch((e) => {
    console.error(e);
    showUsage();
    process.exitCode = Result.FAILED;
});
