import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from '@firebase/app';
import '@firebase/firestore';
//@ts-ignore
import { FirestoreProvider } from 'react-firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <FirestoreProvider firebase={firebase}>
    <App />
  </FirestoreProvider>
);

reportWebVitals();
