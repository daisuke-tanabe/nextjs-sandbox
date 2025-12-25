"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/primitives";
import { type Post } from "@/types";

const LIMIT = 10;

type Props = {
  posts: Post[];
  totalCount: number;
  page: number;
};

function getPageHref(pageNum: number): string {
  return pageNum === 1 ? "/" : `/?page=${pageNum}`;
}

export function PostCardGroup({ posts, totalCount, page }: Props) {
  const totalPages = Math.ceil(totalCount / LIMIT);

  return (
    <div className="space-y-8">
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

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Link href={getPageHref(page - 1)} aria-disabled={page <= 1} tabIndex={page <= 1 ? -1 : undefined}>
                <PaginationPrevious className={page <= 1 ? "pointer-events-none opacity-50" : ""} />
              </Link>
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <PaginationItem key={pageNum}>
                <Link href={getPageHref(pageNum)}>
                  <PaginationLink isActive={pageNum === page}>{pageNum}</PaginationLink>
                </Link>
              </PaginationItem>
            ))}

            <PaginationItem>
              <Link
                href={getPageHref(page + 1)}
                aria-disabled={page >= totalPages}
                tabIndex={page >= totalPages ? -1 : undefined}
              >
                <PaginationNext className={page >= totalPages ? "pointer-events-none opacity-50" : ""} />
              </Link>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
