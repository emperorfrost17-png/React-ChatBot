import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Dev server proxy:
  // Any request starting with /api will be forwarded to the backend
  // server at http://localhost:3000, so the front-end can call
  // /api/... without CORS problems during development.
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
      '/images': {
        target: "http://localhost:3000"
      }
    },
  },
});
