import { BackstopTest } from "../Model/BackstopTest";
import { loadConfig } from '../Helper/ConfigLoader';

export function loadBackstopJSTest(filter: RegExp, pathToTest: string): BackstopTest {
    const test = loadConfig<BackstopTest>(pathToTest);
    const scenarios = test.scenarios.filter(scenario => filter.test(scenario.label));

    return { ...test, scenarios };
}
