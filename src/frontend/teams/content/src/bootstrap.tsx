import ReactDOM from "react-dom/client";
import firebase from "@firebase/app";
import "@firebase/firestore";
//@ts-ignore
import { FirestoreProvider } from "react-firestore";
import App from "./App";

export default class XContent extends HTMLElement {
  connectedCallback() {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    };
    firebase.initializeApp(firebaseConfig);
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);
    const root = ReactDOM.createRoot(mountPoint as HTMLElement);
    root.render(
      <FirestoreProvider firebase={firebase}>
        <App />
      </FirestoreProvider>
    );
  }
}

customElements.define("x-content", XContent);
