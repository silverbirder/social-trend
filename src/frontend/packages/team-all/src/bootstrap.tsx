import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

(async () => {
  //@ts-ignore
  await import("content/XContent");
  //@ts-ignore
  await import("search/XSearch");

  // ✅ correct ID passed
  const rootElement = document.getElementById("root");
  const root = createRoot(rootElement as HTMLElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
})();
