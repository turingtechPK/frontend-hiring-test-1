import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@pages": "/src/pages",
      "@services": "/src/services",
      "@fonts/*": "/src/assets/fonts*",
      "@contexts": "/src/contexts",
      "@src": "/src",
    },
  },
});
