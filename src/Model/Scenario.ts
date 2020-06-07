export interface Scenario {
    label: string;
    url: string;
    referenceUrl: string;

    selectors?: string[];
    readySelector?: string;
    //readyEvent?: string;
    removeSelectors?: string[];
    hideSelectors?: string[];
    fillSelectors?: string[];

    clickSelector?: string;
    //hoverSelector?: string;
    scrollToSelector?: string;
    keyPressSelectors?: {selector: string, keyPress: string}[];

    delay?: number;
    postInteractionWait?: number;

    cookiePath?: string;
    misMatchThreshold?: number;
    //requireSameDimensions?: boolean;
    //viewports?: any[];
}
