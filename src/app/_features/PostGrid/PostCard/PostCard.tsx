import NextLink from "next/link";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/primitives";

export type PostCardProps = {
  id: string;
  title: string;
  summary?: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
  publishedAt: string;
};

export function PostCard({ id, title, summary, thumbnail, publishedAt }: PostCardProps) {
  return (
    <Card
      asChild
      className={`gap-4 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group pt-0 pb-4`}
    >
      <NextLink key={id} href={`/posts/${id}`}>
        <div className={`h-32 relative w-full overflow-hidden bg-muted`}>
          <img
            src="/480_480.png"
            alt="dummy thumbnail"
            width={thumbnail?.width}
            height={thumbnail?.height}
            className={`h-full w-full object-cover object-center`}
          />
        </div>
        <CardHeader className="gap-0 px-4">
          <CardTitle className="text-md text-wrap font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 px-4">
          <CardDescription className="text-sm line-clamp-2">{summary}</CardDescription>
        </CardContent>
        <CardFooter className="px-4 justify-between mt-auto">
          <time className="text-xs font-medium text-muted-foreground tracking-wide">
            {new Date(publishedAt).toLocaleDateString("ja-JP")}
          </time>
          <div className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-muted-foreground uppercase tracking-wide">
            カテゴリー
          </div>
        </CardFooter>
      </NextLink>
    </Card>
  );
}
