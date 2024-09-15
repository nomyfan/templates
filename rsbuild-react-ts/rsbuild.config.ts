import type { RsbuildConfig } from "@rsbuild/core";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig(({ env }) => {
  const isProd = env === "production";

  return {
    plugins: [pluginReact()],
    performance: {
      removeConsole: ["log", "info", "table", "group"],
    },
    html: {
      title: "Rsbuild + React + TS",
      crossorigin: isProd ? "anonymous" : false,
    },
    security: {
      sri: {
        enable: isProd,
        algorithm: "sha384",
      },
    },
  } satisfies RsbuildConfig;
});
