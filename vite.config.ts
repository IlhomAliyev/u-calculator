import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const paths = {
  src: path.resolve(__dirname, "src"),
  html: path.resolve(__dirname, "src", "assets", "html"),
  build: path.resolve(__dirname, "build"),
};

export default defineConfig({
  plugins: [react(), svgr()],
  server: { port: 3000 },
  resolve: {
    alias: {
      "@": paths.src,
    },
  },
});
