import Image from "next/image";
import { cmsApi } from "@/lib/server";
import { type CmsGetPostsResult } from "@/types";

export default async function Home() {
  const postsResult = await cmsApi.get<CmsGetPostsResult>('/posts');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert mb-32"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Posts
          </h1>
          <div>
            {postsResult.contents.map(({ id, title }) => (
              <p key={id} className="text-zinc-600 dark:text-zinc-400">{title}</p>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
