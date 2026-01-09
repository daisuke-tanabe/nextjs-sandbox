import Link from "next/link";

import { Separator } from "@/components/primitives";

import { UserMenu } from "./UserMenu.client";

export function Header() {
  return (
    <header className="bg-background">
      <div className="flex h-16 container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Example
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6">
            <Link href="/posts" className="text-sm text-muted-foreground hover:text-foreground">
              記事一覧
            </Link>
          </nav>
          <UserMenu />
        </div>
      </div>
      <Separator />
    </header>
  );
}
