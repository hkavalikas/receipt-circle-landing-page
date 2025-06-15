import React from "react";
import { createRoot } from "react-dom/client";
import LegalPage from "./LegalPage";
import { privacySections } from "./legalData";
import "./styles.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LegalPage
      kind="privacy"
      title="Privacy Policy"
      subtitle="How ReceiptCircle collects, uses, and protects data."
      sections={privacySections}
    />
  </React.StrictMode>
);
