import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/primitive";
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
            <Link key={post.id} href={`/posts/${post.id}`}>
              <Card className="group h-full transition-colors hover:border-neutral-300 dark:hover:border-neutral-700">
                <CardHeader className="gap-1">
                  <time className="text-sm text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
                  </time>
                  <CardTitle className="text-lg group-hover:text-muted-foreground">{post.title}</CardTitle>
                </CardHeader>
                {post.description && (
                  <CardContent>
                    <CardDescription className="line-clamp-2">{post.description}</CardDescription>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
