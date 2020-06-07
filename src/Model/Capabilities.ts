export interface Capabilities {
    'browserName': string,
    'browser_version': string,
    'os': string,
    'os_version': string,
    'resolution': string,
    'browserstack.user': string,
    'browserstack.key': string,
    'browserstack.console'?: ('disable' | 'errors' | 'warnings' | 'info' | 'verbose'),
    'browserstack.local'?: boolean;
    'browserstack.localIdentifier'?: string;
    'name': string,
};
