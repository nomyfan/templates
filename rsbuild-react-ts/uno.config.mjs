import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  content: {
    filesystem: ["./src/**/*.{jsx,tsx}"],
  },
  presets: [presetUno()],
  shortcuts: {
    "flex-center": "flex items-center justify-center",
    "absolute-center":
      "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  },
});
