import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

export const CustomElementContext = createContext<HTMLElement>(
  document.createElement("div")
);

export class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);
    const root = ReactDOM.createRoot(mountPoint as HTMLElement);
    root.render(
      <React.StrictMode>
        <CustomElementContext.Provider value={this}>
          <App />
        </CustomElementContext.Provider>
      </React.StrictMode>
    );
  }
}
