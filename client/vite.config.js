import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // URL твого серверу
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
