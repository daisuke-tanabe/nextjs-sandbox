import { cmsApi } from "@/lib/server";
import { type CmsGetPostsResult } from "@/types";

import { PostGridClient } from "./PostGrid.client";

const LIMIT = 10;

export type PostGridProps = {
  page?: number;
};

export async function PostGrid({ page = 1 }: PostGridProps) {
  const offset = (page - 1) * LIMIT;
  const { contents: postsResult, totalCount } = await cmsApi.get<CmsGetPostsResult>(
    `/posts?limit=${LIMIT}&offset=${offset}`,
  );

  return <PostGridClient posts={postsResult} totalCount={totalCount} page={page} />;
}
