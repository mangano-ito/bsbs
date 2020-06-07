import { BackstopHelper } from "../Helper/BackstopHelper";

export async function goPageUseCase(url: string, helper: BackstopHelper) {
    await helper.go(url);
    console.log('driver navigated to the page.');
}
