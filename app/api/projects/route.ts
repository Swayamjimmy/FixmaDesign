import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { generateProjectName } from "../../action/action";

export async function GET(request: Request) {
    try {
       const session = await getKindeServerSession();
       const user = await session.getUser();

       if(!user) throw new Error("Unauthorised")
        const projects = await prisma.project.findMany({
    where: {
        userId: user.id,
    },
    take: 10,
    orderBy: { createdAt: "desc" },
});
    return NextResponse.json({
        success: true,
        data: projects,
    });
    } catch (error) {
        console.log("Error occured", error)
        return NextResponse.json(
            {
                error: "Failed to fetch project",
            },
            {status: 500}
        )
    }
}

export async function POST(request: Request){
    try{
       const {prompt} = await request.json();
       const session = await getKindeServerSession();
       const user = await session.getUser();

       if(!user) throw new Error("Unauthorised")
       if(!prompt) throw new Error("Missing Prompt");

       const userId = user.id
       console.log("Creating project for user:", userId, "with prompt:", prompt);
       const projectName = await generateProjectName(prompt)
       console.log("Generated project name:", projectName);
       const project = await prisma.project.create({
        data: {
            userId,
            name: projectName,
        },
       });

       //Trigger the Inngest

       return NextResponse.json({
        success: true,
        data: project,
       });
    } catch (error) {
        console.log("Error occured", error)
        return NextResponse.json(
            {
                error: "Failed to create project",
            },
            {status: 500}
        );
    }
}