import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import type { ConfigEnv } from 'vite';
import react from "@vitejs/plugin-react";
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from "vite-tsconfig-paths";

const config = (configEnv: ConfigEnv) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(configEnv.mode, process.cwd(), '') };

  return defineConfig({
    plugins: [
      react(),
      eslint(),
      tsconfigPaths(),
    ],

  });
};

export default config;