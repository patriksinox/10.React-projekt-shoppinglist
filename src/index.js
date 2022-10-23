import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Popis from "./Popis";
import Footer from "./Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Popis />
    <App />
    <Footer />
  </React.StrictMode>
);
