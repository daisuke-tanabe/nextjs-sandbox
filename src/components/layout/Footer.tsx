export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} Media. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
