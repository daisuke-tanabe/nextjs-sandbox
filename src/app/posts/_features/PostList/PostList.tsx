import { cmsApi } from "@/lib/server";
import { type CmsGetPostsResult } from "@/types";

import { PostList as PostListClient } from "./PostList.client";

const LIMIT = 10;

type Props = {
  page?: number;
};

export async function PostList({ page = 1 }: Props) {
  const offset = (page - 1) * LIMIT;
  const { contents: posts, totalCount } = await cmsApi.get<CmsGetPostsResult>(`/posts?limit=${LIMIT}&offset=${offset}`);

  return <PostListClient posts={posts} totalCount={totalCount} page={page} />;
}
