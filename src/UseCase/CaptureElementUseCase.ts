import { BackstopHelper } from "../Helper/BackstopHelper";
import { ImageArtifactRepository } from "../Repository/ImageArtifactRepository";

export async function captureElementUseCase(
    selector: string,
    label: string,
    index: number,
    helper: BackstopHelper,
    repo: ImageArtifactRepository,
) {
    console.log(`capturing elements...: ${selector}`);
    const imageBlob = await helper.captureElement(selector);
    const name = `${label}-${index}`;
    repo.save(label, index, imageBlob);
    console.log(`element image is now saved: ${name}`);
}
