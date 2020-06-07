import path from 'path';
import fs from 'fs';

import { Base64Image } from '../Model/Base64Image';

/**
 * Artifact Repository
 * stores captured images
 */
export class ImageArtifactRepository {
    constructor(private pathToDirectory: string) {
        fs.mkdirSync(this.pathToDirectory, { recursive: true });
    }

    save(label: string, index: number, base64Image: Base64Image): string {
        const pathToImage = this.generateFilePath(label, index);
        this.saveImage(pathToImage, base64Image);

        return pathToImage;
    }

    load(label: string, index: number): Base64Image {
        const pathToImage = this.generateFilePath(label, index);
        const base64image = fs.readFileSync(pathToImage).toString('base64');

        return base64image;
    }

    generateFilePath(label: string, index: number): string {
        return path.join(this.pathToDirectory, `${label}-${index}.png`);
    }

    private saveImage(pathToImage: string, base64Image: Base64Image) {
        base64Image = base64Image.replace(/^data:image\/png;base64,/, ''),
        fs.writeFileSync(pathToImage, base64Image, 'base64');
    }
}
