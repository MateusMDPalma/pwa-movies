import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/pwa-movies/", // 👈 nome do repositório no GitHub
});
