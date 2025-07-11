import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, content, imageUrl, userId } = await req.json();

    const post = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        authorId: userId,
      },
    });

    return NextResponse.json({ message: 'Post Created', post });
  } catch (error) {
    console.error('CREATE POST ERROR:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
