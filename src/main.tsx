import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { customTheme } from "./Static/theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={customTheme}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
