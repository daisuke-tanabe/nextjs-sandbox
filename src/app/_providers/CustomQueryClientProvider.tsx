"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren, useState } from "react";

export function CustomQueryClientProvider({ children }: PropsWithChildren) {
  // useStateで初期化することで、リクエストごとに独立したインスタンスを生成する
  // モジュールスコープに置くとSSR時に複数リクエスト間でキャッシュが共有される可能性がある
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
