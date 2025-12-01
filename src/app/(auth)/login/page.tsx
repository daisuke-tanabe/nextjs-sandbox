import { type Metadata } from "next";

import { AuthForm } from "../_features/AuthForm.client";

export const metadata: Metadata = {
  title: "ログイン | Media",
  description: "アカウントにログインしてください",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <AuthForm mode="login" />
    </div>
  );
}
