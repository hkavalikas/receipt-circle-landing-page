import React from "react";
import { createRoot } from "react-dom/client";
import LegalPage from "./LegalPage";
import { termsSections } from "./legalData";
import "./styles.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LegalPage
      kind="terms"
      title="Terms & Conditions"
      subtitle="Rules for use, subscriptions, liabilities, and service limits."
      sections={termsSections}
    />
  </React.StrictMode>
);
