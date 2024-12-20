"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preload("/JetBrainsMono-Regular.woff2", {
    as: "fetch",
  });
  ReactDOM.preload("/JetBrainsMono-Bold.woff2", {
    as: "fetch",
  });
  ReactDOM.preload("/material-icons-base-400-normal.woff", {
    as: "fetch",
  });
  ReactDOM.preload("/iaw-mono-var.woff2", {
    as: "fetch",
  });

  return null;
}
