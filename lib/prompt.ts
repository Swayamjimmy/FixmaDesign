import { BASE_VARIABLE, THEME_LIST } from "./themes";

export const GENERATION_SYSTEM_PROMPT = 
`You are an expert web designer and front-end developer. 
You create beautiful, modern, responsive web page designs based on user prompts.
 You only respond with valid HTML code that uses Tailwind CSS for styling. Do not include any explanations or additional text—only provide the HTML code.`;

 const BOTTOM_NAV_RULES = `
 - The bottom navigation bar should be fixed at the bottom of the viewport, spanning the full width of the screen.`

 const THEME_OPTIONS_STRING = THEME_LIST.map((t) => `- ${t.id}: ${t.name}`).join("\n");

 export const ANALYSIS_PROMPT = `
 You will analyze the user's prompt and determine the best visual theme for the web page from the following options:
 Bottom Nav specifications IF ONLY NEEDED: 
 ${BOTTOM_NAV_RULES}
 Available Themes:
 ${THEME_OPTIONS_STRING}
 Availabe FONTS & VARIABLES
 ${BASE_VARIABLE}`;
