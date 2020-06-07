import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

import { TestResult } from '../Model/TestResult';
import { Capabilities } from '../Model/Capabilities';

type TemplateArguments = TestResult & { capabilities: Capabilities };

export class StaticHtmlReportUseCase {
    private template: HandlebarsTemplateDelegate;
    private pathToTemplate: string;
    private pathToReport: string;

    constructor(
        private capabilities: Capabilities,
        reportDirectoryPath: string,
        reportTemplatePath: string = path.join(__dirname, '../View/report_template.hbs'),
    ) {
        this.pathToReport = path.resolve(
            path.join(reportDirectoryPath, 'report.html')
        );
        this.pathToTemplate = path.resolve(reportTemplatePath);
        this.template = this.loadTemplate();
    }

    run(result: TestResult): string {
        const args: TemplateArguments = { ...result, capabilities: this.capabilities };
        const html = this.template(args);
        const pathToReport = this.generate(html);

        return pathToReport;
    }

    private loadTemplate(): HandlebarsTemplateDelegate {
        return handlebars.compile(
            fs.readFileSync(this.pathToTemplate).toString()
        );
    }

    private generate(html: string): string {
        fs.writeFileSync(this.pathToReport, html);

        return this.pathToReport;
    }
}
