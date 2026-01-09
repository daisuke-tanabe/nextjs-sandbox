"use client";

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
    <article className="mx-auto max-w-3xl px-4 py-12">
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
  );
}
