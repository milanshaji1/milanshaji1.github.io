import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { MotionOKProvider } from "./motion-ok.jsx";

export function render() {
  return renderToString(
    <React.StrictMode>
      <MotionOKProvider><App /></MotionOKProvider>
    </React.StrictMode>
  );
}
