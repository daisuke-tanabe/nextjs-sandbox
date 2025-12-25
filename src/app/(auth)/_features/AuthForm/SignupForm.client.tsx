"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Input, Label } from "@/components/primitives";
import { signIn, signUp } from "@/lib/auth-client";

import { AuthCard } from "./AuthCard.client";
import { SocialLoginButtons } from "./SocialLoginButtons.client";

const signupSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setError(null);
    setLoading(true);

    try {
      const result = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      if (result.error) {
        setError(result.error.message ?? "サインアップに失敗しました");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("予期しないエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      setError("Google ログインに失敗しました");
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="アカウント作成"
      description="新しいアカウントを作成してください"
      error={error}
      footer={
        <>
          <SocialLoginButtons onGoogleClick={handleGoogleSignIn} disabled={loading} />
          <div className="text-center text-sm">
            <p>
              既にアカウントをお持ちの方は{" "}
              <a href="/login" className="text-primary underline-offset-4 hover:underline">
                ログイン
              </a>
            </p>
          </div>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">名前</Label>
          <Input id="name" type="text" {...register("name")} />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">パスワード</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "処理中..." : "アカウント作成"}
        </Button>
      </form>
    </AuthCard>
  );
}
