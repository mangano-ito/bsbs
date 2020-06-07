import jimp from 'jimp';

export async function cropBase64Blob(
    base64blob: string,
    x: number,
    y: number,
    width: number,
    height: number,
): Promise<string> {
    const buffer = Buffer.from(base64blob, 'base64');
    const image = await jimp.read(buffer);
    image.crop(x, y, width, height);

    return image.getBase64Async('image/png');
}
