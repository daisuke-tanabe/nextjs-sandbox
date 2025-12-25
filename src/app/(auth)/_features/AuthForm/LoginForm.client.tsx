"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Input, Label } from "@/components/primitives";
import { authClient, signIn } from "@/lib/auth-client";

import { AuthCard } from "./AuthCard.client";
import { SocialLoginButtons } from "./SocialLoginButtons.client";

const loginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setLoading(true);

    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });
      if (result.error) {
        setError(result.error.message ?? "ログインに失敗しました");
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

  const handlePasskeySignIn = async () => {
    setLoading(true);
    try {
      const result = await authClient.signIn.passkey();
      if (result?.error) {
        setError(result.error.message ?? "パスキー認証に失敗しました");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("パスキー認証に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="ログイン"
      description="アカウントにログインしてください"
      error={error}
      footer={
        <>
          <SocialLoginButtons
            onGoogleClick={handleGoogleSignIn}
            onPasskeyClick={handlePasskeySignIn}
            disabled={loading}
          />
          <div className="text-center text-sm">
            <p>
              アカウントをお持ちでない方は{" "}
              <a href="/signup" className="text-primary underline-offset-4 hover:underline">
                新規登録
              </a>
            </p>
          </div>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          {loading ? "処理中..." : "ログイン"}
        </Button>
      </form>
    </AuthCard>
  );
}
