import { type Metadata } from "next";

import { type SearchParams, searchParamsCache } from "@/lib/searchParams";

import { PostList } from "./_features/PostList";

export const metadata: Metadata = {
  title: "記事一覧 | Media",
  description: "すべての記事を一覧で表示します",
};

export default async function PostsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { page } = await searchParamsCache.parse(searchParams);

  return <PostList page={page} />;
}
