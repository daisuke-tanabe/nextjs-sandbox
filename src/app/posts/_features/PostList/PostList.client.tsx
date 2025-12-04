"use client";

import Link from "next/link";

import { Separator } from "@/components/primitives";
import { type Post } from "@/types";

type Props = {
  posts: Post[];
  totalCount: number;
};

export function PostList({ posts, totalCount }: Props) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold">記事一覧</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">{totalCount}件の記事</p>
      </header>

      <div className="grid gap-8">
        {posts.map((post, index) => (
          <article key={post.id} className="group">
            <Link href={`/posts/${post.id}`} className="block">
              <time className="text-sm text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="mt-2 text-xl font-semibold group-hover:text-muted-foreground">{post.title}</h2>
              {post.description && <p className="mt-3 text-muted-foreground">{post.description}</p>}
              <span className="mt-4 inline-block text-sm font-medium">続きを読む →</span>
            </Link>
            {index < posts.length - 1 && <Separator className="mt-8" />}
          </article>
        ))}
      </div>
    </div>
  );
}
