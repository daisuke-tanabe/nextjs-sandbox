import { type Metadata } from "next";

import { SignupForm } from "../_features/AuthForm";

export const metadata: Metadata = {
  title: "新規登録 | Media",
  description: "新しいアカウントを作成してください",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <SignupForm />
    </div>
  );
}
