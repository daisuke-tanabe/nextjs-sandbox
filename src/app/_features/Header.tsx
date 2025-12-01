import Link from "next/link";

import { Separator } from "@/components/primitive";

export function Header() {
  return (
    <header className="bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Media
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ホーム
          </Link>
          <Link href="/posts" className="text-sm text-muted-foreground hover:text-foreground">
            記事一覧
          </Link>
        </nav>
      </div>
      <Separator />
    </header>
  );
}
