import { OCEAN_BREEZE_THEME } from "./themes"


export function getHTMLWrapper(
    html: string,
    title = "Untitled",
    theme_style?: string,
    frameId?: string
) {
    const finalTheme = theme_style || OCEAN_BREEZE_THEME;

    return `<!DOCTYPE html>
    
    `
}