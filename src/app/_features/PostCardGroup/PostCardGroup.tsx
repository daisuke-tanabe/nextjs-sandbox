import { cmsApi } from "@/lib/server";
import { type CmsGetPostsResult } from "@/types";

import { PostCardGroup as PostCardGroupClient } from "./PostCardGroup.client";

type Props = {
  limit?: number;
};

export async function PostCardGroup({ limit = 5 }: Props) {
  const { contents: posts } = await cmsApi.get<CmsGetPostsResult>(`/posts?limit=${limit}`);

  return <PostCardGroupClient posts={posts} />;
}
