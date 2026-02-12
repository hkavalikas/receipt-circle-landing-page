import type { LegalSection } from "./legalData";

type LegalPageProps = {
  kind: "privacy" | "terms";
  title: string;
  subtitle: string;
  sections: LegalSection[];
};

function sectionSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function LegalSectionCards({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="legal-grid">
      {sections.map((section, index) => (
        <article
          className="legal-card"
          key={section.title}
          id={section.id ?? sectionSlug(section.title)}
        >
          <h3>
            {index + 1}. {section.title}
          </h3>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.points ? (
            <ul>
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function LegalPage({ kind, title, subtitle, sections }: LegalPageProps) {
  return (
    <main className="page page-legal" id="top">
      <header className="hero legal-hero">
        <img
          src="receiptcircle-icon.svg"
          alt="ReceiptCircle"
          width={64}
          height={64}
          className="app-icon"
        />
        <p className="eyebrow">ReceiptCircle</p>
        <h1>{title}</h1>
        <p className="lead">{subtitle}</p>
        <div className="policy-links">
          <a className="link-card" href="./">
            Back to Home
          </a>
          <a
            className={`link-card ${kind === "privacy" ? "primary" : ""}`}
            href="privacy.html"
          >
            Privacy Policy
          </a>
          <a
            className={`link-card ${kind === "terms" ? "primary" : ""}`}
            href="terms.html"
          >
            Terms &amp; Conditions
          </a>
        </div>
      </header>

      <section className="section legal">
        <div className="section-head">
          <h2>{title}</h2>
          <p>Last updated: February 12, 2026</p>
        </div>
        <LegalSectionCards sections={sections} />
      </section>
    </main>
  );
}

export default LegalPage;
