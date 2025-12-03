import { notFound } from "next/navigation";

import { cmsApi } from "@/lib/server";
import { type CmsGetPostResult } from "@/types";

import { PostDetail as PostDetailClient } from "./PostDetail.client";

type Props = {
  id: string;
};

export async function PostDetail({ id }: Props) {
  let post: CmsGetPostResult;
  try {
    post = await cmsApi.get<CmsGetPostResult>(`/posts/${id}`);
  } catch {
    notFound();
  }

  return <PostDetailClient post={post} />;
}
