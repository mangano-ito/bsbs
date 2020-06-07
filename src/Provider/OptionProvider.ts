import commandLineArgs from 'command-line-args';
import dotenv from 'dotenv';
import path from 'path';

import { Options, AVAILABLE_MODES } from "../Model/Options";
import { requireEnvVar, provideEnvVar } from './EnvVarProvider';
import { loadBackstopJSTest } from './BackstopTestProvider';
import { loadCapabilities } from './CapabilitiesProvider';

function validate(options: any) {
    const required = ['mode', 'capabilities', 'file'];
    for (const key of required) {
        if (!(key in options)) {
            throw new Error(`option "${key}" is required.`);
        }
    }

    const mode = options['mode'];
    if (!AVAILABLE_MODES.has(mode)) {
        throw new Error(`mode "${mode}" is invalid.`);
    }
}

export function provideOptions(): Options {
    dotenv.config();
    const optionDefinitions: commandLineArgs.OptionDefinition[] = [
        {
            name: 'mode',
            alias: 'm',
            type: String,
            defaultOption: true,
        },
        {
            name: 'filter',
            alias: 'f',
            type: String,
        },
        {
            name: 'capabilities',
            alias: 'c',
            type: String,
        },
        {
            name: 'file',
            alias: 'i',
            type: String,
        },
        {
            name: 'local',
            alias: 'l',
            type: Boolean,
        }
    ];
    const options = commandLineArgs(optionDefinitions);
    validate(options);

    const backstopTestPath = options['file'];
    const filter = new RegExp(options['filter'] || /.*/);
    const backstopTest = loadBackstopJSTest(
        filter,
        backstopTestPath,
    );
    const capabilities = loadCapabilities(
        options['capabilities'],
        requireEnvVar('BROWSERSTACK_USERNAME'),
        requireEnvVar('BROWSERSTACK_ACCESS_KEY'),
        !!options['local'],
        backstopTest.id,
    );

    const defaultArtifactsPath = path.join(process.cwd(), './artifacts/');
    const defaultArtifactReferencePath = path.join(defaultArtifactsPath, './reference/');
    const defaultArtifactTestPath = path.join(defaultArtifactsPath, './test/');
    const defaultArtifactDifferencePath = path.join(defaultArtifactsPath, './difference/');
    const defaultArtifactReportPath = defaultArtifactsPath;

    return {
        mode: options['mode'],
        backstopTest,
        capabilities,

        artifactReferencePath: provideEnvVar('ARTIFACTS_REFERENCE_PATH') || defaultArtifactReferencePath,
        artifactTestPath: provideEnvVar('ARTIFACTS_TEST_PATH') || defaultArtifactTestPath,
        artifactDifferencePath: provideEnvVar('ARTIFACTS_DIFFERENCE_PATH') || defaultArtifactDifferencePath,
        artifactReportPath: provideEnvVar('ARTIFACTS_REPORT_PATH') || defaultArtifactReportPath,
    };
}
