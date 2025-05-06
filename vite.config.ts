import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";
import VitePluginBrowserSync from "vite-plugin-browser-sync";
import FullReload from "vite-plugin-full-reload";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginBrowserSync(), FullReload(["src/**/*"])], // watch all files in src],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
