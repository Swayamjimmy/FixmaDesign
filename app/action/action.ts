"use server"

import { openrouter } from "../../lib/openrouter";
import { generateText } from "ai";

export async function generateProjectName(prompt: string) {
    try {
        console.log("Generating project name for prompt:", prompt);
        
        if (!process.env.OPENROUTER_API_KEY) {
            console.error("OPENROUTER_API_KEY is not set");
            return "Untitled Project";
        }

        const result = await generateText({
            model: openrouter("google/gemini-2.5-flash-lite"),
            system: `You are an AI assistant that generates very very short project names based on the user's prompt.
                -Keep it under 5 words
                -Capitalize words appropriately.
                -Do not include special characters.
                -Return ONLY the project name, nothing else.`,
            prompt: `Generate a short project name (under 5 words) for: ${prompt}`,
        });

        const projectName = result.text?.trim();
        console.log("Generated project name:", projectName);
        
        if (!projectName || projectName.length === 0) {
            console.warn("Empty project name generated, using fallback");
            return "Untitled Project";
        }

        return projectName;
    } catch (error) {
        console.error("Error generating project name:", error);
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        return "Untitled Project";
    }
}