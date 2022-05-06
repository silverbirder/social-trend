import ReactDOM from "react-dom/client";
import App from "./App";
import { OEmbed } from "@silverbirder/o-embed";

window.customElements.define("o-embed", OEmbed);

export class SnsContents extends HTMLElement {
  root: ReactDOM.Root | undefined;
  static get observedAttributes() {
    return ["ids"];
  }

  attributeChangedCallback() {
    const ids = this.getAttribute("ids") as string;
    const props = { ids: ids };
    if (this.root) {
      this.root.render(<App {...props} />);
    }
  }

  connectedCallback() {
    if (!this.hasAttribute("ids")) {
      throw new Error("Nothing attributes: ids");
    }
    const ids = this.getAttribute("ids") as string;
    const props = { ids: ids };
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);
    this.root = ReactDOM.createRoot(mountPoint as HTMLElement);
    this.root.render(<App {...props} />);
  }
}
