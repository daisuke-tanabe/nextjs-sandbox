"use client";

import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/primitives";
import { type Post } from "@/types";

type Props = {
  posts: Post[];
};

export function PostCardGroup({ posts }: Props) {
  return (
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
  );
}
