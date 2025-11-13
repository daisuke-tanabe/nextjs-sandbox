import { QueryClient, QueryClientProvider as ClientProvider } from '@tanstack/react-query';
import {PropsWithChildren} from "react";

const queryClient = new QueryClient();

export function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <ClientProvider client={queryClient}>
      {children}
    </ClientProvider>
  )
}