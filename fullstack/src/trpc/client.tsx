import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ComponentType, JSX } from "react";

export const queryClient = new QueryClient();

export function withTRPC<T>(
  Component: ComponentType<T & JSX.IntrinsicAttributes>,
) {
  const displayName =
    (Component.displayName || Component.name || "") + "TRPCWrapper";
  function TRPCWrapper(props: T & JSX.IntrinsicAttributes) {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...props} />
      </QueryClientProvider>
    );
  }
  TRPCWrapper.displayName = displayName;

  return TRPCWrapper;
}
