import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req:Request) {
    try {
        const {userId} = await req.json();

        const posts = await prisma.post.findMany({
            where: { authorId: userId},
            orderBy:{createdAt: "desc"},
        });

        return NextResponse.json(posts);

    } catch (error) {
        console.error('FETCH USER POSTS ERROR', error);
        return NextResponse.json({error: "Internal Server Error"}, {status:500});
    }
    
}