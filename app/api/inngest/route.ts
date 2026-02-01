import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { helloWorld } from "../../../inngest/functions/helloWorld";
import { generateImage } from "ai";
import { generateScreens } from "../../../inngest/functions/generateScreens";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    helloWorld, 
    generateScreens,
  ],
});