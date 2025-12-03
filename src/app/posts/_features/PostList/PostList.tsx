import { cmsApi } from "@/lib/server";
import { type CmsGetPostsResult } from "@/types";

import { PostList as PostListClient } from "./PostList.client";

export async function PostList() {
  const { contents: posts, totalCount } = await cmsApi.get<CmsGetPostsResult>("/posts");

  return <PostListClient posts={posts} totalCount={totalCount} />;
}
