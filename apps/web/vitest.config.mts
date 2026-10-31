import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const src = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^#\/(.*)$/, replacement: `${src}/$1` },
      { find: /^@\/(.*)$/, replacement: `${src}/$1` },
    ],
  },
  test: {
    environment: "jsdom",
  },
});
