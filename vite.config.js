import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  build: {
    // Générer les preload hints pour les assets critiques
    modulePreload: {
      polyfill: true,
    },
    // Optimisation du CSS
    cssCodeSplit: false, // Regroupe tout le CSS dans un seul fichier
  },
});
