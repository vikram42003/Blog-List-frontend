import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3003",
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/testSetup.js",
    include: ["tests/**/*.test.js", "tests/**/*.test.jsx", "tests/**/*.test.ts", "tests/**/*.test.tsx"],
    exclude: ["E2E/**/*", "node_modules/**/*"],
  },
});
