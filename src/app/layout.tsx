import "./globals.css";

import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { type ReactNode } from "react";

import { Footer, Header } from "@/components/layout";

import { CustomQueryClientProvider } from "./_providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Media",
  description: "モダンなメディアサイト",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}>
        <CustomQueryClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CustomQueryClientProvider>
      </body>
    </html>
  );
}
