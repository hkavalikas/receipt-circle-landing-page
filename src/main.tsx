import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./HomePage";
import "./styles.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
