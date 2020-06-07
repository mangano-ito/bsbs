import { Capabilities } from "../Model/Capabilities";
import { loadConfig } from "../Helper/ConfigLoader";

export function loadCapabilities(
    pathToFile: string,
    browserStackUser: string | undefined,
    browserStackKey: string | undefined,
    browserStackUseLocal = false,
    name: string | undefined,
): Capabilities {
    const capabilities = loadConfig<Capabilities>(pathToFile);
    capabilities['browserstack.user'] = browserStackUser || capabilities['browserstack.user'];
    capabilities['browserstack.key'] = browserStackKey || capabilities['browserstack.key'];
    capabilities['browserstack.local'] = browserStackUseLocal || capabilities['browserstack.local'];
    capabilities['name'] = name || capabilities['name'];

    return capabilities;
}
