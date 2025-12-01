import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { cmsApi } from "@/lib/server";
import { type CmsGetPostResult, type CmsGetPostsResult } from "@/types";

type Props = {
  params: Promise<{ id: string }>;
};

// 静的生成用のパスを生成
export async function generateStaticParams() {
  const { contents } = await cmsApi.get<CmsGetPostsResult>("/posts?fields=id");
  return contents.map((post) => ({ id: post.id }));
}

// 動的メタデータ
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

  let post: CmsGetPostResult;
  try {
    post = await cmsApi.get<CmsGetPostResult>(`/posts/${id}`);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <article>
        <header className="mb-8 border-b border-neutral-200 pb-8 dark:border-neutral-800">
          <time className="text-sm text-neutral-500 dark:text-neutral-400">
            {new Date(post.publishedAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">{post.title}</h1>
          {post.description && (
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">{post.description}</p>
          )}
        </header>

        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <footer className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <Link
          href="/posts"
          className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          ← 記事一覧に戻る
        </Link>
      </footer>
    </div>
  );
}
