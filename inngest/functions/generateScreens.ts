import { generateObject, generateText, stepCountIs } from "ai";
import { openrouter } from "../../lib/openrouter";
import { inngest } from "../client";
import {success, z} from "zod";
import { FrameType } from "../../types/project";
import { ANALYSIS_PROMPT, GENERATION_SYSTEM_PROMPT } from "../../lib/prompt";
import prisma from "../../lib/prisma";
import { BASE_VARIABLE, THEME_LIST } from "../../lib/themes";
import { unsplashTool } from "../tool";
import { th } from "zod/v4/locales";

const AnalysisSchema = z.object({
    theme: z
    .string()
    .describe("The specific visual theme ID (e.g., 'midnight', 'ocean-breeze', 'neo-brutalis,')"),
    screens: z.array(
        z.object({
            id: z.string().describe("Unique identifier for the screen (e.g., 'home-dashboard', 'profile-settings', transaction-history'). Use kebab-case."),
            name: z.string().describe("A human-readable name for the screen (e.g., 'Home Dashboard', 'Profile Settings', 'Transaction History')."),
            purpose: z.string().describe("A brief description of the screen's purpose and primary functionalities."),
            visualDescription: z.string().describe("A detailed description of the screen's visual layout, including key UI elements, color schemes, and overall aesthetic. Describe the layput, specific data examples, component hierarchy, and physical attributes"),
        })
    ).min(1).max(4),
});


export const generateScreens = inngest.createFunction(
  { id: "generate-ui-screen" },
  { event: "ui/generate.screens" },
  async ({ event, step, publish }) => {
    const {
        userId,
        projectId,
        prompt,
        frames,
        theme: existingTheme,
    }   = event.data;
    const CHANNEL = `user-${userId}`;
    const isExistingGeneration = Array.isArray(frames) && frames.length > 0;

    await publish({
        channel: CHANNEL,
        topic: "generation.start",
        data: {
            status: "running",
            projectId: projectId,
        },
    })

    //Analyze or plan
    const analysis = await step.run("analyze-and-plan-screens", 
        async () => {

        await publish({
            channel: CHANNEL,
            topic: "analysis.start",
            data: {
                status: "analyzing",
                projectId: projectId,
            },
    })
            const contextHTML = isExistingGeneration ? frames.slice(0,4).map((frame: FrameType) => frame.htmlContent).join("\n") : "";


            const analysisPrompt = isExistingGeneration ? 
            ` 
            USER REQUEST: ${prompt}
            SELECTED THEME: ${existingTheme}
            CURRENT HTML: ${contextHTML}
            `.trim()
            : `
            USER REQUEST: ${prompt}
            `.trim();

            const {object} = await generateObject({
            model: openrouter.chat("google/gemini-2.5-flash-lite"),
            schema: AnalysisSchema,
            system: ANALYSIS_PROMPT,
            prompt: analysisPrompt,
        });

        const themeToUse = isExistingGeneration ? existingTheme : object.theme;

        if(!isExistingGeneration) {
            await prisma.project.update({
                where: { 
                    id: projectId,
                    userId: userId
                },
                data: { theme: themeToUse },
            });
        }
            await publish({
                channel: CHANNEL,
                topic: "analysis.complete",
                data: {
                    status: "generating",
                    theme: themeToUse,
                    totalScreens: object.screens.length,
                    screens: object.screens,
                    projectId: projectId,
        },
    })

        return {...object, themeToUse};
        });
    
    // Actual generation of each screen
    for(let i = 0; i < analysis.screens.length; i++) {
        const screenPlan = analysis.screens[i];
        const selectedTheme = THEME_LIST.find(
            (t) => t.id === analysis.themeToUse
        );

        const fullThemeCSS = `
        ${BASE_VARIABLE}
        ${selectedTheme?.style || ""}
        `;
        
        await step.run(`generate-screen-${i}`, async () => {
            const result = await generateText({
            model: openrouter.chat("google/gemini-2.5-flash-lite"),
            system: GENERATION_SYSTEM_PROMPT,
            tools: {
                searchUnsplash: unsplashTool,
            },
            stopWhen: stepCountIs(5),
            prompt: `
                - Screen ${i+1}/${analysis.screens.length}
                - Screen ID: ${screenPlan.id}
                - Screen Name: ${screenPlan.name}
                - Screen Purpose: ${screenPlan.purpose}
                - Visual Description: ${screenPlan.visualDescription}
                - Theme CSS: ${fullThemeCSS}

                CRITICAL REQUIREMENTS:
                1. Generate only raw HTML markup for this mobile app using tailwind CSS.
                2.All content must be inside a single root div that controls the layou.
                3.
                Generate the complete, production-ready HTML for this screen now
            `.trim(),
            });

            let finalHtml = result.text ?? "";
            const match = finalHtml.match(/<div[\s\S]*<\/div>/);
            finalHtml = match ? match[0] : finalHtml;
            finalHtml = finalHtml.replace(/```/g, "");

            const frame = await prisma.frame.create({
                data: {
                    projectId: projectId,
                    title: screenPlan.name,
                    htmlContent: finalHtml,
                },
            });
            
                await publish({
                    channel: CHANNEL,
                    topic: "frame.created",
                    data: {
                        frame: frame,
                        screenId: screenPlan.id,
                        projectId: projectId,
                    },
    })

            return { success: true, frame: frame };
        });
    }

        await publish({
        channel: CHANNEL,
        topic: "generation.complete",
        data: {
            status: "completed",
            projectId: projectId,
        },
    })
  },
);