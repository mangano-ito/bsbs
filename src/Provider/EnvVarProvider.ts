export function requireEnvVar(key: string): string {
    const value = provideEnvVar(key);
    if (!value) {
        throw new Error(`environment variable "${key}" required.`);
    }
    return value;
}

export function provideEnvVar(key: string): string | undefined {
    return process.env[key];
}
