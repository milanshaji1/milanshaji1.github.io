import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { MotionOKProvider } from "./motion-ok.jsx";
import "./global.css";

const app = (
  <React.StrictMode>
    <MotionOKProvider>
      <App />
    </MotionOKProvider>
  </React.StrictMode>
);
const root = document.getElementById("root");
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
