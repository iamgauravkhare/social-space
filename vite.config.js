import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["date-fns"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/config/testSetup.jsx"],
  },
});
