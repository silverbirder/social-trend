import ReactDOM from "react-dom/client";
import App from "./App";

export class TwitterContent extends HTMLElement {
  root: ReactDOM.Root | undefined;
  connectedCallback() {
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);
    this.root = ReactDOM.createRoot(mountPoint as HTMLElement);
    this.root.render(<App />);
  }
}
