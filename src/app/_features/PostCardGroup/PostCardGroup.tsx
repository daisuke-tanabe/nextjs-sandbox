import { cmsApi } from "@/lib/server";
import { type CmsGetPostsResult } from "@/types";

import { PostCardGroup as PostCardGroupClient } from "./PostCardGroup.client";

const LIMIT = 10;

type Props = {
  page?: number;
};

export async function PostCardGroup({ page = 1 }: Props) {
  const offset = (page - 1) * LIMIT;
  const { contents: posts, totalCount } = await cmsApi.get<CmsGetPostsResult>(`/posts?limit=${LIMIT}&offset=${offset}`);

  return <PostCardGroupClient posts={posts} totalCount={totalCount} page={page} />;
}
