'use client';

import {useQuery} from "@tanstack/react-query";
import {fetcher} from "@/lib";

export function ClientComponent() {
  const { data, isPending, isError, error } = useQuery<{ status: string; method: string; }>({
    queryKey: ["test"],
    queryFn: () => fetcher.get<{ status: string; method: string; }>("/test")
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return <div>result: {data.status} - {data.method}</div>
}