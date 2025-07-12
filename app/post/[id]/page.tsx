import { prisma } from '@/lib/prisma';

interface PostPageProps {
  params: { id: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: true },
  });

  if (!post) {
    return <div className="text-center mt-10 text-red-500">Post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600">
        By {post.author.name} • {new Date(post.createdAt).toLocaleString()}
      </p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post Image"
          className="my-6 rounded-lg max-h-[400px] w-full object-cover"
        />
      )}

      <div className="whitespace-pre-wrap text-lg leading-relaxed">{post.content}</div>
    </div>
  );
}
