"use client";

import NextLink from "next/link";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/primitives";

import { PostCard, type PostCardProps } from "./PostCard";

const LIMIT = 10;

export type PostGridClientProps = {
  posts: PostCardProps[];
  totalCount: number;
  page: number;
};

function getPageHref(pageNum: number): string {
  return pageNum === 1 ? "/" : `/?page=${pageNum}`;
}

export function PostGridClient({ posts, totalCount, page }: PostGridClientProps) {
  const totalPages = Math.ceil(totalCount / LIMIT);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <NextLink href={getPageHref(page - 1)} aria-disabled={page <= 1} tabIndex={page <= 1 ? -1 : undefined}>
                <PaginationPrevious className={page <= 1 ? "pointer-events-none opacity-50" : ""} />
              </NextLink>
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <PaginationItem key={pageNum}>
                <NextLink href={getPageHref(pageNum)}>
                  <PaginationLink isActive={pageNum === page}>{pageNum}</PaginationLink>
                </NextLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <NextLink
                href={getPageHref(page + 1)}
                aria-disabled={page >= totalPages}
                tabIndex={page >= totalPages ? -1 : undefined}
              >
                <PaginationNext className={page >= totalPages ? "pointer-events-none opacity-50" : ""} />
              </NextLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
