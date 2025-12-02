import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerServiceWorker } from "./lib/pwa";
import { ThemeProvider } from "./components/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="dark" storageKey="alaska-news-theme">
    <App />
  </ThemeProvider>
);

// Register service worker for PWA functionality
registerServiceWorker();
