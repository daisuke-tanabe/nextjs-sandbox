import Link from "next/link";

import { cmsApi } from "@/lib/server";
import { type CmsGetPostsResult } from "@/types";

export default async function HomePage() {
  const { contents: posts } = await cmsApi.get<CmsGetPostsResult>("/posts?limit=5");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Media</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          最新のテクノロジーとデザインに関する記事をお届けします
        </p>
      </section>

      {/* Latest Posts */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">最新の記事</h2>
          <Link
            href="/posts"
            className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            すべての記事を見る →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group rounded-lg border border-neutral-200 p-6 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
            >
              <Link href={`/posts/${post.id}`}>
                <time className="text-sm text-neutral-500 dark:text-neutral-400">
                  {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
                </time>
                <h3 className="mt-2 text-lg font-semibold group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">{post.description}</p>
                )}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
