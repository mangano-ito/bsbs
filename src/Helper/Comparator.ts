import jimp from 'jimp';
import { Base64Image } from '../Model/Base64Image';

export class Comparator {
    async compare(lhs: Base64Image, rhs: Base64Image): Promise<number> {
        const diff = await this.doCompare(lhs, rhs);
        
        return diff.percent;
    }

    async diff(lhs: Base64Image, rhs: Base64Image): Promise<Base64Image> {
        const diff = await this.doCompare(lhs, rhs);

        return diff.image.getBase64Async('image/png');
    }

    private async doCompare(lhs: Base64Image, rhs: Base64Image) {
        const lhsBuffer = Buffer.from(lhs, 'base64');
        const lhsImage = await jimp.read(lhsBuffer);
        const rhsBuffer = Buffer.from(rhs, 'base64');
        const rhsImage = await jimp.read(rhsBuffer);
        const diff = jimp.diff(lhsImage, rhsImage);
        
        return diff;
    }
}
