import ReactDOM from "react-dom/client";
import App from "./App";

export class SnsContents extends HTMLElement {
  root: ReactDOM.Root | undefined;
  static get observedAttributes() {
    return ["ids"];
  }

  // attributeChangedCallback() {}

  connectedCallback() {
    if (!this.hasAttribute("ids")) {
      throw new Error("Nothing attributes: ids");
    }
    const ids = this.getAttribute("ids") as string;
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);
    this.root = ReactDOM.createRoot(mountPoint as HTMLElement);
    this.root.render(<App ids={ids} />);
  }
}
