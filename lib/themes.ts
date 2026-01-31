export interface ThemeType {
    id: string;
    name: string;
    style: string;
};

export const FONT_VARIABLES = `
    --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --font-secondary: 'Inter', system-ui, sans-serif;
    --font-mono: 'Fira Code', 'Courier New', monospace;
`;

export const BASE_VARIABLE = `
${FONT_VARIABLES}
    --border-radius: 8px;
    --transition: all 0.3s ease;
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
`;

export const OCEAN_BREEZE_THEME = `
${BASE_VARIABLE}
    --bg-primary: #E8F4F8;
    --bg-secondary: #D1E9F1;
    --bg-accent: #B8DEEA;
    --text-primary: #0A4A5C;
    --text-secondary: #1A6B7F;
    --text-accent: #2B8CA3;
    --border-color: #7FC4D6;
    --primary: #4A9BC7;
    --secondary: #6BB3D1;
    --accent: #8CC8DB;
    --success: #4EC9B0;
    --warning: #FFB84D;
    --error: #FF6B6B;
`;

export const NETFILX_COLOR_THEME = `
${BASE_VARIABLE}
    --bg-primary: #000000;
    --bg-secondary: #141414;
    --bg-accent: #1F1F1F;
    --text-primary: #FFFFFF;
    --text-secondary: #B3B3B3;
    --text-accent: #808080;
    --border-color: #333333;
    --primary: #E50914;
    --secondary: #F40612;
    --accent: #FF0A16;
    --success: #46D369;
    --warning: #FFA500;
    --error: #E50914;
`;

export const ACID_LIME_THEME = `
${BASE_VARIABLE}
    --bg-primary: #0A0A0A;
    --bg-secondary: #141414;
    --bg-accent: #1F1F1F;
    --text-primary: #39FF14;
    --text-secondary: #7FFF00;
    --text-accent: #ADFF2F;
    --border-color: #32CD32;
    --primary: #39FF14;
    --secondary: #7FFF00;
    --accent: #ADFF2F;
    --success: #00FF00;
    --warning: #FFFF00;
    --error: #FF0000;
`;

export const PURPLE_YELLOW_THEME = `
${BASE_VARIABLE}
    --bg-primary: #2D1B4E;
    --bg-secondary: #3D2B5E;
    --bg-accent: #4D3B6E;
    --text-primary: #FFD700;
    --text-secondary: #FFED4E;
    --text-accent: #FFF8DC;
    --border-color: #9370DB;
    --primary: #9370DB;
    --secondary: #BA55D3;
    --accent: #DA70D6;
    --success: #32CD32;
    --warning: #FFD700;
    --error: #FF6347;
`;

export const GREEN_LIME_THEME = `
${BASE_VARIABLE}
    --bg-primary: #1A3A2A;
    --bg-secondary: #2A4A3A;
    --bg-accent: #3A5A4A;
    --text-primary: #90EE90;
    --text-secondary: #98FB98;
    --text-accent: #ADFF2F;
    --border-color: #32CD32;
    --primary: #32CD32;
    --secondary: #00FF7F;
    --accent: #7FFF00;
    --success: #00FF00;
    --warning: #FFD700;
    --error: #FF4500;
`;

export const TEAL_CORAL_THEME = `
${BASE_VARIABLE}
    --bg-primary: #0F4C3A;
    --bg-secondary: #1F5C4A;
    --bg-accent: #2F6C5A;
    --text-primary: #FF7F50;
    --text-secondary: #FF6347;
    --text-accent: #FF4500;
    --border-color: #40E0D0;
    --primary: #40E0D0;
    --secondary: #48D1CC;
    --accent: #00CED1;
    --success: #20B2AA;
    --warning: #FF7F50;
    --error: #FF6347;
`;

export const LILAC_TEAL_THEME = `
${BASE_VARIABLE}
    --bg-primary: #2D1B3D;
    --bg-secondary: #3D2B4D;
    --bg-accent: #4D3B5D;
    --text-primary: #E0E6FF;
    --text-secondary: #C8D0FF;
    --text-accent: #B0BAFF;
    --border-color: #B19CD9;
    --primary: #B19CD9;
    --secondary: #C8A2C8;
    --accent: #DDA0DD;
    --success: #20B2AA;
    --warning: #FFB6C1;
    --error: #FF69B4;
`;

export const ORANGE_GRAY_THEME = `
${BASE_VARIABLE}
    --bg-primary: #2C2C2C;
    --bg-secondary: #3C3C3C;
    --bg-accent: #4C4C4C;
    --text-primary: #FF8C00;
    --text-secondary: #FFA500;
    --text-accent: #FFB347;
    --border-color: #696969;
    --primary: #FF8C00;
    --secondary: #FFA500;
    --accent: #FFB347;
    --success: #32CD32;
    --warning: #FFD700;
    --error: #DC143C;
`;

export const NEO_BRUTALISM_THEME = `
${BASE_VARIABLE}
    --bg-primary: #FFFFFF;
    --bg-secondary: #F5F5F5;
    --bg-accent: #E0E0E0;
    --text-primary: #000000;
    --text-secondary: #333333;
    --text-accent: #666666;
    --border-color: #000000;
    --primary: #FF6B6B;
    --secondary: #4ECDC4;
    --accent: #FFE66D;
    --success: #95E1D3;
    --warning: #F38181;
    --error: #AA4A44;
    --border-radius: 0px;
    --shadow-sm: 4px 4px 0px #000000;
    --shadow-md: 6px 6px 0px #000000;
    --shadow-lg: 8px 8px 0px #000000;
`;

export const GLASSMORPHISM_THEME = `
${BASE_VARIABLE}
    --bg-primary: rgba(255, 255, 255, 0.1);
    --bg-secondary: rgba(255, 255, 255, 0.15);
    --bg-accent: rgba(255, 255, 255, 0.2);
    --text-primary: #FFFFFF;
    --text-secondary: rgba(255, 255, 255, 0.9);
    --text-accent: rgba(255, 255, 255, 0.8);
    --border-color: rgba(255, 255, 255, 0.3);
    --primary: rgba(147, 51, 234, 0.8);
    --secondary: rgba(59, 130, 246, 0.8);
    --accent: rgba(236, 72, 153, 0.8);
    --success: rgba(34, 197, 94, 0.8);
    --warning: rgba(251, 191, 36, 0.8);
    --error: rgba(239, 68, 68, 0.8);
    --backdrop-blur: blur(10px);
`;

export const SWISS_STYLE_THEME = `
${BASE_VARIABLE}
    --bg-primary: #FFFFFF;
    --bg-secondary: #F8F8F8;
    --bg-accent: #F0F0F0;
    --text-primary: #000000;
    --text-secondary: #333333;
    --text-accent: #666666;
    --border-color: #000000;
    --primary: #FF0000;
    --secondary: #0000FF;
    --accent: #FFFF00;
    --success: #00FF00;
    --warning: #FFA500;
    --error: #FF0000;
    --border-radius: 0px;
    --font-primary: 'Helvetica Neue', Arial, sans-serif;
`;

export const SUNSET_THEME = `
${BASE_VARIABLE}
    --bg-primary: #FF6B6B;
    --bg-secondary: #FF8E8E;
    --bg-accent: #FFB1B1;
    --text-primary: #2C1810;
    --text-secondary: #4A2C1A;
    --text-accent: #6B3F2A;
    --border-color: #FF8E53;
    --primary: #FF6B6B;
    --secondary: #FF8E53;
    --accent: #FFB347;
    --success: #FFD93D;
    --warning: #FF8E53;
    --error: #C44536;
`;

export const OCEAN_THEME = `
${BASE_VARIABLE}
    --bg-primary: #001F3F;
    --bg-secondary: #003366;
    --bg-accent: #004080;
    --text-primary: #E0F2F1;
    --text-secondary: #B2DFDB;
    --text-accent: #80CBC4;
    --border-color: #4DB6AC;
    --primary: #00897B;
    --secondary: #26A69A;
    --accent: #4DB6AC;
    --success: #66BB6A;
    --warning: #FFA726;
    --error: #EF5350;
`;

export const FOREST_THEME = `
${BASE_VARIABLE}
    --bg-primary: #1B4332;
    --bg-secondary: #2D5A3D;
    --bg-accent: #3E6B4E;
    --text-primary: #D4EDDA;
    --text-secondary: #A8D5BA;
    --text-accent: #7CB89A;
    --border-color: #52B788;
    --primary: #40916C;
    --secondary: #52B788;
    --accent: #74C69D;
    --success: #95D5B2;
    --warning: #FFB74D;
    --error: #E57373;
`;

export const LAVENDER_THEME = `
${BASE_VARIABLE}
    --bg-primary: #4A148C;
    --bg-secondary: #6A1B9A;
    --bg-accent: #8E24AA;
    --text-primary: #F3E5F5;
    --text-secondary: #E1BEE7;
    --text-accent: #CE93D8;
    --border-color: #BA68C8;
    --primary: #9C27B0;
    --secondary: #AB47BC;
    --accent: #BA68C8;
    --success: #66BB6A;
    --warning: #FFB74D;
    --error: #EF5350;
`;

export const MONOCHROME_THEME = `
${BASE_VARIABLE}
    --bg-primary: #FFFFFF;
    --bg-secondary: #F5F5F5;
    --bg-accent: #E0E0E0;
    --text-primary: #000000;
    --text-secondary: #333333;
    --text-accent: #666666;
    --border-color: #CCCCCC;
    --primary: #000000;
    --secondary: #333333;
    --accent: #666666;
    --success: #4A4A4A;
    --warning: #808080;
    --error: #B3B3B3;
`;

export const NEON_THEME = `
${BASE_VARIABLE}
    --bg-primary: #0A0A0A;
    --bg-secondary: #1A1A1A;
    --bg-accent: #2A2A2A;
    --text-primary: #00FFFF;
    --text-secondary: #00FF00;
    --text-accent: #FF00FF;
    --border-color: #00FFFF;
    --primary: #00FFFF;
    --secondary: #00FF00;
    --accent: #FF00FF;
    --success: #00FF00;
    --warning: #FFFF00;
    --error: #FF0080;
`;

export const MIDNIGHT_THEME = `
${BASE_VARIABLE}
    --bg-primary: #0D1117;
    --bg-secondary: #161B22;
    --bg-accent: #21262D;
    --text-primary: #C9D1D9;
    --text-secondary: #8B949E;
    --text-accent: #6E7681;
    --border-color: #30363D;
    --primary: #58A6FF;
    --secondary: #79C0FF;
    --accent: #A5D6FF;
    --success: #3FB950;
    --warning: #D29922;
    --error: #F85149;
`;

export const PEACH_THEME = `
${BASE_VARIABLE}
    --bg-primary: #FFF5E6;
    --bg-secondary: #FFE8CC;
    --bg-accent: #FFDBB3;
    --text-primary: #8B4513;
    --text-secondary: #A0522D;
    --text-accent: #CD853F;
    --border-color: #DEB887;
    --primary: #FF8C69;
    --secondary: #FFA07A;
    --accent: #FFB48A;
    --success: #90EE90;
    --warning: #FFD700;
    --error: #FF6347;
`;

export const GLACIER_THEME = `
${BASE_VARIABLE}
    --bg-primary: #E8F4F8;
    --bg-secondary: #D1E9F1;
    --bg-accent: #BAE0EA;
    --text-primary: #1A4A5C;
    --text-secondary: #2A5A6C;
    --text-accent: #3A6A7C;
    --border-color: #7FC4D6;
    --primary: #5BA3C7;
    --secondary: #6BB3D1;
    --accent: #7BC3DB;
    --success: #4EC9B0;
    --warning: #FFB84D;
    --error: #FF6B6B;
`;

export const ROSE_GOLD_THEME = `
${BASE_VARIABLE}
    --bg-primary: #FFF5F0;
    --bg-secondary: #FFE8E0;
    --bg-accent: #FFDBD0;
    --text-primary: #8B4A3C;
    --text-secondary: #A05A4C;
    --text-accent: #B56A5C;
    --border-color: #E8B4A0;
    --primary: #E8B4A0;
    --secondary: #F0C4B0;
    --accent: #F8D4C0;
    --success: #D4A574;
    --warning: #FFB84D;
    --error: #D87C6C;
`;

export const CYBER_THEME = `
${BASE_VARIABLE}
    --bg-primary: #0A0E27;
    --bg-secondary: #141829;
    --bg-accent: #1E223B;
    --text-primary: #00F5FF;
    --text-secondary: #00D9FF;
    --text-accent: #00BDFF;
    --border-color: #00A3FF;
    --primary: #00F5FF;
    --secondary: #00D9FF;
    --accent: #00BDFF;
    --success: #00FF88;
    --warning: #FFB800;
    --error: #FF0040;
`;

export const THEME_LIST: ThemeType[] = [
    {
        id: "ocean-breeze",
        name: "Ocean Breeze",
        style: OCEAN_BREEZE_THEME,
    },
    {
        id: "netflix-color",
        name: "Netflix Color",
        style: NETFILX_COLOR_THEME,
    },
    {
        id: "acid-lime",
        name: "Acid Lime",
        style: ACID_LIME_THEME,
    },
    {
        id: "purple-yellow",
        name: "Purple Yellow",
        style: PURPLE_YELLOW_THEME,
    },
    {
        id: "green-lime",
        name: "Green Lime",
        style: GREEN_LIME_THEME,
    },
    {
        id: "teal-coral",
        name: "Teal Coral",
        style: TEAL_CORAL_THEME,
    },
    {
        id: "lilac-teal",
        name: "Lilac Teal",
        style: LILAC_TEAL_THEME,
    },
    {
        id: "orange-gray",
        name: "Orange Gray",
        style: ORANGE_GRAY_THEME,
    },
    {
        id: "neo-brutalism",
        name: "Neo Brutalism",
        style: NEO_BRUTALISM_THEME,
    },
    {
        id: "glassmorphism",
        name: "Glassmorphism",
        style: GLASSMORPHISM_THEME,
    },
    {
        id: "swiss-style",
        name: "Swiss Style",
        style: SWISS_STYLE_THEME,
    },
    {
        id: "sunset",
        name: "Sunset",
        style: SUNSET_THEME,
    },
    {
        id: "ocean",
        name: "Ocean",
        style: OCEAN_THEME,
    },
    {
        id: "forest",
        name: "Forest",
        style: FOREST_THEME,
    },
    {
        id: "lavender",
        name: "Lavender",
        style: LAVENDER_THEME,
    },
    {
        id: "monochrome",
        name: "Monochrome",
        style: MONOCHROME_THEME,
    },
    {
        id: "neon",
        name: "Neon",
        style: NEON_THEME,
    },
    {
        id: "midnight",
        name: "Midnight",
        style: MIDNIGHT_THEME,
    },
    {
        id: "peach",
        name: "Peach",
        style: PEACH_THEME,
    },
    {
        id: "glacier",
        name: "Glacier",
        style: GLACIER_THEME,
    },
    {
        id: "rose-gold",
        name: "Rose Gold",
        style: ROSE_GOLD_THEME,
    },
    {
        id: "cyber",
        name: "Cyber",
        style: CYBER_THEME,
    },
];

export function parseThemeColors(style: string) {
    const colors: Record<string, string> = {};
    const matches = style.matchAll(/--([a-z-]+):\s*([^;]+)/g);
    for(const match of matches) colors[match[1]] = match[2].trim();
    return colors;
}
