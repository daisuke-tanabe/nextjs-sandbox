import { Separator } from "@/components/primitives";

export function Footer() {
  return (
    <footer className="bg-background">
      <Separator />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Media. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
