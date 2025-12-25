import { type Metadata } from "next";

import { LoginForm } from "../_features/AuthForm";

export const metadata: Metadata = {
  title: "ログイン | Media",
  description: "アカウントにログインしてください",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
