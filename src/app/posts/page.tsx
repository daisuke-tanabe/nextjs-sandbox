import { type Metadata } from "next";

import { PostList } from "./_features/PostList";

export const metadata: Metadata = {
  title: "記事一覧 | Media",
  description: "すべての記事を一覧で表示します",
};

export default function PostsPage() {
  return <PostList />;
}
