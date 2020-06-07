export interface ScenarioResult {
    label: string;
    index: number;
    selector: string;
    referenceUrl: string;
    testUrl: string;
    matched: boolean;
    percent: number;
    referenceImagePath: string;
    testImagePath: string;
    differenceImagePath: string;
}
