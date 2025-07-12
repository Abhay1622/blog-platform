import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'

export async function DELETE(req: Request, {params}: {params : {id : string}}){
    try {
        const postId = params.id;

        await prisma.post.delete({
            where: {id: postId}
        });

        return NextResponse.json({message : 'Post deleted sunccessfully'});

    } catch (error) {
        console.error(error)
        return NextResponse.json({error: 'Failed to delete Post' } , {status: 500});
    }
}