import { BackstopTest } from "./BackstopTest";
import { Capabilities } from "./Capabilities";

export enum Mode {
    REFERENCE = 'reference',
    TEST      = 'test',
    REPORT    = 'report',
}
export const AVAILABLE_MODES = new Set(Object.values(Mode));

export interface Options {
    mode: Mode;
    //filter: RegExp;

    backstopTest: BackstopTest,
    capabilities: Capabilities,

    artifactReferencePath:  string;
    artifactTestPath:       string;
    artifactDifferencePath: string;
    artifactReportPath:     string;
}
