import { type SearchParams, searchParamsCache } from "@/lib/searchParams";

import { PostGrid } from "./_features/PostGrid";

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { page } = await searchParamsCache.parse(searchParams);

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Today&#39;s News Summary</h1>
        <p className="text-md text-muted-foreground">最新のテクノロジーとデザインに関する記事をお届けします</p>
      </div>

      <section>
        <PostGrid page={page} />
      </section>
    </main>
  );
}
