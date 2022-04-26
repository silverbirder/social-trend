import ReactDOM from "react-dom/client";
import App from "./App";

export class XContent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);
    const root = ReactDOM.createRoot(mountPoint as HTMLElement);
    root.render(<App />);
  }
}
