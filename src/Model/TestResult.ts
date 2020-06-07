import { ScenarioResult } from "./ScenarioResult";

export interface TestResult {
    id: string;
    passedCount: number;
    failedCount: number;
    scenarios: ScenarioResult[];
}
