import { tool } from "ai";
import z from "zod";


export const unsplashTool = tool({
    description: "Search for images on Unsplash based on a query and orientation.",
    inputSchema: z.object({
        query: z.string().describe("A search query to find relevant images on Unsplash."),
        orientation: z.enum(["landscape", "portrait", "squarish"]).default("landscape"),
    }),
    execute: async ({ query, orientation }) => {
        try {
            const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=${orientation}&per_page=1&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
            );
            const {results} = await res.json();
            return results?.[0]?.urls?.regular || "No image found.";
        } catch {
            return "";
        }
    },
})