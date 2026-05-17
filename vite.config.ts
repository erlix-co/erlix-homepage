import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/** Static HTML under public/ (bcc-alert, sms-sender, …) — avoid SPA fallback to React index. */
function publicHtmlPages(): Plugin {
  const routes: Record<string, string> = {
    "/bcc-alert": "/bcc-alert/index.html",
    "/bcc-alert/": "/bcc-alert/index.html",
    "/sms-sender": "/sms-sender/index.html",
    "/sms-sender/": "/sms-sender/index.html",
    "/privacy-policy": "/privacy-policy/index.html",
    "/privacy-policy/": "/privacy-policy/index.html",
  };

  return {
    name: "public-html-pages",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const path = req.url?.split("?")[0] ?? "";
        const target = routes[path];
        if (target) {
          req.url = target;
        }
        next();
      });
    },
  };
}

const addinProxy = {
  "/bcc-alert-addin": {
    target: "https://erlix.net",
    changeOrigin: true,
  },
};

export default defineConfig({
  plugins: [react(), publicHtmlPages()],
  server: { proxy: addinProxy },
  preview: { proxy: addinProxy },
});
