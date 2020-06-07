import fs from 'fs';
import path from 'path';

export function loadConfig<T>(pathToFile: string): T {
    const pathResolved = path.resolve(pathToFile);
    const ext = path.extname(pathToFile);
    return (ext === '.js')
        ? require(pathResolved)
        : JSON.parse(
            fs.readFileSync(pathResolved).toString()
        );
}
