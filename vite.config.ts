import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ command, mode }) => {
  const repoName = process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/Nagrik-GPT-Gov-Side-/';

  return {
    base: command === 'serve' ? '/' : repoName,

    server: {
      host: "::",
      port: 8080,
    },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Mock mode entry point
  ...(mode === "mock" && {
    define: {
      'import.meta.env.VITE_MOCK_MODE': JSON.stringify('true'),
    },
  }),
  };
});
