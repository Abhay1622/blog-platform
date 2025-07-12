'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
        imageUrl,
        userId: user.id,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Post creation failed');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8 transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Create New Post</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Give your post a catchy title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content (Markdown supported)
            </label>
            <textarea
              id="content"
              placeholder="Write your thoughts here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg h-48 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (optional)
            </label>
            <input
              id="image"
              type="text"
              placeholder="https://example.com/image.jpg "
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          {/* Image Preview */}
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="Preview" className="rounded-md w-full object-cover h-40 shadow-md" />
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.01]"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}