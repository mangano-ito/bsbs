import { Scenario } from "./Scenario";

export type BackstopViewport = {label: string, width: number, height: number};

export interface BackstopTest {
    "id": string;
    "viewports": BackstopViewport[];
    "onBeforeScript"?: string,
    "onReadyScript"?: string,
    "scenarios": Scenario[];
}
