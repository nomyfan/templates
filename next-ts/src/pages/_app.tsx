import "@/styles/globals.css";
import type { AppProps } from "next/app";

// eslint-disable-next-line import/no-default-export
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
