import type { ComponentType, JSX } from "react";

export function withTRPC<T>(
  Component: ComponentType<T & JSX.IntrinsicAttributes>,
) {
  const displayName =
    (Component.displayName || Component.name || "") + "TRPCWrapper";
  function TRPCWrapper(props: T & JSX.IntrinsicAttributes) {
    return <Component {...props} />;
  }
  TRPCWrapper.displayName = displayName;

  return TRPCWrapper;
}
