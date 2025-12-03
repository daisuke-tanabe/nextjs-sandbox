import { type Metadata } from "next";

import { cmsApi } from "@/lib/server";
import { type CmsGetPostResult, type CmsGetPostsResult } from "@/types";

import { PostDetail } from "./_features/PostDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const { contents } = await cmsApi.get<CmsGetPostsResult>("/posts?fields=id");
  return contents.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const post = await cmsApi.get<CmsGetPostResult>(`/posts/${id}`);
    return {
      title: `${post.title} | Media`,
      description: post.description || post.title,
    };
  } catch {
    return {
      title: "記事が見つかりません | Media",
    };
  }
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;

  return <PostDetail id={id} />;
}
