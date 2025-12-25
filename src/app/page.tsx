import Link from "next/link";

import { type SearchParams, searchParamsCache } from "@/lib/searchParams";

import { PostCardGroup } from "./_features/PostCardGroup";

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { page } = await searchParamsCache.parse(searchParams);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Media</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          最新のテクノロジーとデザインに関する記事をお届けします
        </p>
      </section>

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
        <PostCardGroup page={page} />
      </section>
    </div>
  );
}
