import { BASE_VARIABLE, OCEAN_BREEZE_THEME } from "./themes"


export function getHTMLWrapper(
    html: string,
    title = "Untitled",
    theme_style?: string,
    frameId?: string
) {
    const finalTheme = theme_style || OCEAN_BREEZE_THEME;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/3/3.1.0/iconify.min.js"></script>

    <style>
        :root {
            ${finalTheme}
        }
        
        *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            width: 100%;
            height: 100%;
        }
        
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--bg-primary);
            color: var(--text-primary);
            -webkit-font-smoothing: antialiased;
        }
        
        a {
            color: inherit;
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        #root {
            width: 100%;
            height: 100%;
        }
        
        * {
            scrollbar-width: thin;
        }
        
        *::-webkit-scrollbar {
            display: none;
        }
    </style>
</head>
<body>
    <div id="root">
        ${html}
    </div>
    <script>
        (() => {
            const fid = "${frameId}";
            const send = () => {
                const r = document.getElementById('root');
                const h = Math.max(r?.scrollHeight || 0, document.body.scrollHeight, 800);
                parent.postMessage({ type: 'FRAME_HEIGHT', frameId: fid, height: h }, '*');
            };
            setTimeout(send, 100);
            setTimeout(send, 500);
        })();
    </script>
</body>
</html>`
}