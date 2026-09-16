import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// Served from GitHub Pages at /hologram-brand-kit/
export default defineConfig({
  base: "/hologram-brand-kit/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@/registry": r("../vendor/shadcn-ui/registry"),
      "@/lib": r("../vendor/shadcn-ui/registry/new-york-v4/lib"),
    },
  },
});
