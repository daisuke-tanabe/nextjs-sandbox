"use client";

import Link from "next/link";

import { Separator } from "@/components/primitives";

type Props = {
  post: {
    id: string;
    title: string;
    content: string;
    summary?: string;
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
    publishedAt: string;
  };
};

export function PostDetail({ post }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <article>
        <header className="mb-8 pb-8">
          <time className="text-sm text-muted-foreground">
            {new Date(post.publishedAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">{post.title}</h1>
          {post.summary && <p className="mt-4 text-lg text-muted-foreground">{post.summary}</p>}
        </header>

        <Separator className="mb-8" />

        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Separator className="my-8" />

      <footer>
        <Link href="/posts" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          ← 記事一覧に戻る
        </Link>
      </footer>
    </div>
  );
}
