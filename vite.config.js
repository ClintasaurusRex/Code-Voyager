import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "three-stdlib"],
          react: ["react", "react-dom"],
          drei: ["@react-three/drei"],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
});
