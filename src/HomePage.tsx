import { useEffect, useState } from "react";

type ScreenStory = {
  id: string;
  nav: string;
  title: string;
  subtitle: string;
  path: string;
  replaceHint: string;
  stat: string;
  bullets: string[];
  tags: string[];
  featureCards: { title: string; copy: string }[];
};

const stories: ScreenStory[] = [
  {
    id: "home",
    nav: "01",
    title: "Home",
    subtitle: "See what needs action and jump back in fast.",
    path: "screens/screen-02-home.webp",
    replaceHint: "public/screens/screen-02-home.webp",
    stat: "Everything in one clear place",
    bullets: [
      "Pending and completed splits are easy to spot at a glance.",
      "Quick actions help you start a new split in seconds.",
      "Friend invites and updates show up where you already are."
    ],
    tags: ["Home Feed", "Quick Start", "Recent Activity"],
    featureCards: [
      {
        title: "One Calm Dashboard",
        copy: "See what is pending, what is finished, and what needs your attention in one place."
      },
      {
        title: "Fast Daily Use",
        copy: "Start new splits quickly without hunting through multiple screens."
      },
      {
        title: "Clear Next Step",
        copy: "The app keeps your next action obvious, even when you are juggling multiple receipts."
      }
    ]
  },
  {
    id: "social",
    nav: "02",
    title: "Connections",
    subtitle: "Split with people you know, not random contacts.",
    path: "screens/screen-03-connections.webp",
    replaceHint: "public/screens/screen-03-connections.webp",
    stat: "Built for real friend groups",
    bullets: [
      "Find friends by username or email and send quick invites.",
      "Accept, decline, and manage who can interact with you.",
      "Add guest profiles when friends are not on the app yet."
    ],
    tags: ["Friend Invites", "Guest Profiles", "Privacy Controls"],
    featureCards: [
      {
        title: "Split With Real People",
        copy: "Build your trusted circle once, then reuse it every time you split."
      },
      {
        title: "Stay In Control",
        copy: "Handle requests your way with accept, decline, and block options."
      },
      {
        title: "Guests Welcome",
        copy: "If someone is not on ReceiptCircle yet, you can still include them using a guest profile."
      }
    ]
  },
  {
    id: "capture",
    nav: "03",
    title: "Receipt Details",
    subtitle: "Turn a photo into a split you can trust.",
    path: "screens/screen-01-receipt-details.webp",
    replaceHint: "public/screens/screen-01-receipt-details.webp",
    stat: "From photo to ready-to-share split",
    bullets: [
      "Snap a receipt and start from pre-filled items.",
      "Adjust names, prices, and who owes what in plain steps.",
      "Finalize only when everything looks right."
    ],
    tags: ["Receipt Scan", "Easy Edits", "Draft First"],
    featureCards: [
      {
        title: "Photo To Draft",
        copy: "Start with a receipt photo and move straight into an editable split."
      },
      {
        title: "Edit Without Friction",
        copy: "Fine-tune items and shares in simple, readable steps."
      },
      {
        title: "Finalize Confidently",
        copy: "Lock the split only when totals and participants look exactly right."
      }
    ]
  }
];

const ANDROID_PACKAGE_NAME = "com.receiptcircle.www";
const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`;
const ANDROID_INTENT_URL = `intent://open#Intent;scheme=receiptcircle;package=${ANDROID_PACKAGE_NAME};S.browser_fallback_url=${encodeURIComponent(
  PLAY_STORE_URL
)};end`;
const ANDROID_OPEN_PROMPT_DISMISSED_KEY = "rc_android_open_prompt_dismissed";

function PhonePreview({ story }: { story: ScreenStory }) {
  const [missing, setMissing] = useState(false);

  return (
    <article className="shot-card shot-focus">
      <div className="shot-frame shot-frame-focus">
        {missing ? (
          <div className="shot-placeholder">
            <strong>{story.title}</strong>
            <span>Drop image in:</span>
            <code>{story.replaceHint}</code>
          </div>
        ) : (
          <img
            src={story.path}
            alt={story.title}
            loading="lazy"
            onError={() => setMissing(true)}
          />
        )}
      </div>
      <h3>{story.title}</h3>
      <p>{story.subtitle}</p>
    </article>
  );
}

function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [showAndroidOpenPrompt, setShowAndroidOpenPrompt] = useState(false);
  const activeStory = stories[activeIndex] ?? stories[0];

  const openAndroidAppOrStore = () => {
    if (typeof window === "undefined") return;
    const userAgent = window.navigator.userAgent ?? "";
    if (/android/i.test(userAgent)) {
      window.location.href = ANDROID_INTENT_URL;
      return;
    }
    window.location.href = PLAY_STORE_URL;
  };

  const dismissAndroidOpenPrompt = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(ANDROID_OPEN_PROMPT_DISMISSED_KEY, "1");
    }
    setShowAndroidOpenPrompt(false);
  };

  const openFromAndroidPrompt = () => {
    dismissAndroidOpenPrompt();
    openAndroidAppOrStore();
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const userAgent = window.navigator.userAgent ?? "";
    const isAndroid = /android/i.test(userAgent);
    const isReceiptCircleSite = /(^|\.)receiptcircle\.com$/i.test(
      window.location.hostname
    );
    if (!isAndroid || !isReceiptCircleSite) return;
    const wasDismissed =
      window.sessionStorage.getItem(ANDROID_OPEN_PROMPT_DISMISSED_KEY) === "1";
    setShowAndroidOpenPrompt(!wasDismissed);
  }, []);

  useEffect(() => {
    if (isAutoPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((activeIndex + 1) % stories.length);
    }, 8500);
    return () => window.clearInterval(timer);
  }, [activeIndex, isAutoPaused]);

  return (
    <main className="page" id="top">
      {showAndroidOpenPrompt ? (
        <div className="android-open-prompt" role="dialog" aria-label="Open app prompt">
          <div className="android-open-prompt-copy">
            <strong>Open ReceiptCircle on the Play Store?</strong>
            <p>Get redirected to the Play Store or open the app.</p>
          </div>
          <div className="android-open-prompt-actions">
            <button
              type="button"
              className="android-open-prompt-btn android-open-prompt-btn-ghost"
              onClick={dismissAndroidOpenPrompt}
            >
              Not now
            </button>
            <button
              type="button"
              className="android-open-prompt-btn android-open-prompt-btn-primary"
              onClick={openFromAndroidPrompt}
            >
              Open app
            </button>
          </div>
        </div>
      ) : null}
      <header className="hero">
        <img
          src="receiptcircle-icon.svg"
          alt="ReceiptCircle"
          width={72}
          height={72}
          className="app-icon"
        />

        <p className="eyebrow">ReceiptCircle</p>
        <h1>Scan receipts and split bills.</h1>
        <p className="lead">
          Split group bills faster, with less back-and-forth.
        </p>

        <div className="link-list">
          <a className="link-card primary" href="#screens">
            See How It Works
          </a>
          <a className="link-card" href="privacy.html">
            Read Privacy Policy
          </a>
          <a className="link-card" href="terms.html">
            Read Terms &amp; Conditions
          </a>
        </div>
        <div className="store-cta">
          <p className="store-cta-label">Download for Mobile</p>
          <div className="store-badges">
            <button
              type="button"
              className="store-badge"
              disabled
              aria-disabled="true"
              title="iOS app is not available yet."
            >
              <svg className="store-icon-font" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.286 7.008c-3.216 0 -4.286 3.23 -4.286 5.92c0 3.229 2.143 8.072 4.286 8.072c1.165 -.05 1.799 -.538 3.214 -.538c1.406 0 1.607 .538 3.214 .538s4.286 -3.229 4.286 -5.381c-.03 -.011 -2.649 -.434 -2.679 -3.23c-.02 -2.335 2.589 -3.179 2.679 -3.228c-1.096 -1.606 -3.162 -2.113 -3.75 -2.153c-1.535 -.12 -3.032 1.077 -3.75 1.077c-.729 0 -2.036 -1.077 -3.214 -1.077" /><path d="M12 4a2 2 0 0 0 2 -2a2 2 0 0 0 -2 2" /></svg>
              <span className="store-badge-copy">
                <small>iOS</small>
                <strong>App Store</strong>
              </span>
              <em>Coming Soon</em>
            </button>
            <button
              type="button"
              className="store-badge store-badge-active"
              title="Open ReceiptCircle in app or get it on Google Play."
              onClick={openAndroidAppOrStore}
            >
              <svg className="store-icon-font" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 3.71v16.58a.7 .7 0 0 0 1.05 .606l14.622 -8.42a.55 .55 0 0 0 0 -.953l-14.622 -8.419a.7 .7 0 0 0 -1.05 .607l0 -.001" /><path d="M15 9l-10.5 11.5" /><path d="M4.5 3.5l10.5 11.5" /></svg>
              <span className="store-badge-copy">
                <small>Android</small>
                <strong>Google Play</strong>
              </span>
              <em>Beta</em>
            </button>
          </div>
        </div>
      </header>

      <section id="screens" className="section">
        <div className="section-head">
          <h2>See How It Works</h2>
          <p>See how easy it is to split a bill from start to finish.</p>
        </div>

        <div
          className="experience-shell"
          onMouseEnter={() => setIsAutoPaused(true)}
          onMouseLeave={() => setIsAutoPaused(false)}
          onFocusCapture={() => setIsAutoPaused(true)}
          onBlurCapture={() => setIsAutoPaused(false)}
          onTouchStart={() => setIsAutoPaused(true)}
          onTouchEnd={() => setIsAutoPaused(false)}
          onTouchCancel={() => setIsAutoPaused(false)}
        >
          <div className="experience-tabs" role="tablist" aria-label="App flow">
            {stories.map((story, index) => (
              <button
                key={story.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                className={`experience-tab ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span>{story.nav}</span>
                <strong>{story.title}</strong>
              </button>
            ))}
          </div>

          <div className="experience-layout">
            <article className="experience-copy">
              <p className="experience-kicker">{activeStory.stat}</p>
              <h3>{activeStory.title}</h3>
              <p>{activeStory.subtitle}</p>
              <ul className="experience-list">
                {activeStory.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="chip-row">
                {activeStory.tags.map((tag) => (
                  <span className="chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
            <PhonePreview key={activeStory.id} story={activeStory} />
          </div>
        </div>

        <div className="feature-grid" key={`${activeStory.id}-features`}>
          {activeStory.featureCards.map((card) => (
            <article className="feature-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="legal">
        <div className="section-head">
          <h2>Legal</h2>
          <p>Detailed documents are available on separate pages.</p>
        </div>

        <div className="policy-links">
          <a className="link-card" href="privacy.html">
            Privacy &amp; Data Policy
          </a>
          <a className="link-card" href="terms.html">
            Terms Of Use
          </a>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
