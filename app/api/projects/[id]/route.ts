import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse, userAgent } from "next/server";
import { useContext } from "react";
import prisma from "../../../../lib/prisma";


export async function GET(
    req: NextRequest,
    {params}: {params: Promise<{id:string}>}
) {
    try {
        const {id} = await params;
        const session = await getKindeServerSession();
        const user = await session.getUser();
        if(!user) throw new Error("Unauthorised");

        const project = await prisma.project.findFirst({
            where: {
                userId: user.id,
                id: id,
            },
            include: {
                frames: true,
            },
        });

        if(!project) {
            return NextResponse.json(
                {
                    error: "Project not found",
                },
                {status: 404}
            );
        }
        return NextResponse.json(project);
    } catch (error) {
        console.log(error)
         return NextResponse.json(
            {
                error: "Fail to fetch project"
            },
            {status: 500}
         );
    }
}

export async function POST(request: Request, {params}: {params: Promise<{id:string}>}){
    try{
        const {id} = await params;
       const {prompt} = await request.json();
       const session = await getKindeServerSession();
       const user = await session.getUser();

       if(!user) throw new Error("Unauthorised")
       if(!prompt) throw new Error("Missing Prompt");

       const userId = user.id;
       const project = await prisma.project.findFirst({
        where: {
            id,
            userId: userId,
        },
        include: {
            frames: true,
        },
       });

       if(!project){
        throw new Error("Project not found");
       }


       //Trigger the Inngest
        try {
            await inngest.send({
                   name: "ui/generate.screens",
                   data: {
                       userId,
                       projectId: id,
                       prompt,
                       frames: project.frames,
                       theme: project.theme,
       },
     }); 
        } catch (error) {
            console.error("Error sending Inngest event:", error);
        }

       return NextResponse.json({
        success: true,
       });
    } catch (error) {
        console.log("Error occured", error)
        return NextResponse.json(
            {
                error: "Failed to generate frames",
            },
            {status: 500}
        );
    }
}