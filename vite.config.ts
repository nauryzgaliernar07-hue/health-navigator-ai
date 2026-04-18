import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// Standard Vite SPA config — builds a static site that can be hosted on
// GitHub Pages, Lovable, Netlify, Vercel or any static host.
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react-router-dom"],
  },
  server: {
    host: "::",
    port: 8080,
    strictPort: false,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
