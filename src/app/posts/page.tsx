import { type Metadata } from "next";

import { PostList } from "./_features/PostList";

export const metadata: Metadata = {
  title: "記事一覧 | Media",
  description: "すべての記事を一覧で表示します",
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function PostsPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  return <PostList page={currentPage} />;
}
