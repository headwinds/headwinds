"use client";

/**
 * BrandInfographics — a drop-in Feltron-style infographic section for the
 * Headwinds site. Renders 12 brand cards that stagger-reveal on scroll,
 * combining numeric callouts with duotone monochrome photography.
 *
 * USAGE
 *   1. Copy this file + brandData.ts into your project (e.g. /components).
 *   2. Copy /public/*.jpg into your app's /public/headwinds-infographics/.
 *   3. Install the motion library:  npm i motion
 *   4. Render <BrandInfographics /> at the bottom of your page, after the grid.
 *
 * The component is self-styled (scoped styles injected once) so it will not
 * collide with your global CSS. It inherits the Inter font already loaded by
 * the site. No Tailwind required.
 */

import { useEffect } from "react";
import { motion } from "motion/react";
import { BRANDS, type BrandInfographic } from "./brandData";

/** Where the duotone images live, relative to the public root. */
const IMG_BASE = "/headwinds-infographics";

/* ----------------------------- Animation variants ----------------------------- */

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 26, stiffness: 190 },
  },
};

const stat = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

/* --------------------------------- Card ---------------------------------- */

function BrandCard({ brand }: { brand: BrandInfographic }) {
  return (
    <motion.article className="hw-card" variants={card}>
      {/* Header: index + name + sector */}
      <header className="hw-card__head">
        <span className="hw-card__index">{brand.index}</span>
        <div className="hw-card__title">
          <h3>{brand.name}</h3>
          <p className="hw-card__sector">{brand.sector}</p>
        </div>
      </header>

      {/* Duotone photograph */}
      <div className="hw-card__media">
        <img
          src={`${IMG_BASE}/${brand.image}`}
          alt={brand.imageAlt}
          loading="lazy"
          width={1000}
          height={746}
        />
      </div>

      {/* Hero metric */}
      <div className="hw-card__hero">
        <span className="hw-card__hero-value">{brand.hero.value}</span>
        <span className="hw-card__hero-label">{brand.hero.label}</span>
      </div>

      {/* Stat row */}
      <motion.dl className="hw-card__stats" variants={container}>
        {brand.stats.map((s, i) => (
          <motion.div className="hw-stat" key={i} variants={stat}>
            <dt className="hw-stat__value">{s.value}</dt>
            <dd className="hw-stat__label">{s.label}</dd>
          </motion.div>
        ))}
      </motion.dl>

      {/* Narrative */}
      <p className="hw-card__narrative">{brand.narrative}</p>

      {/* Footer meta: agency / award / reputation */}
      <footer className="hw-card__meta">
        <div className="hw-meta-row">
          <span className="hw-meta-key">Agency</span>
          <span className="hw-meta-val">{brand.agency}</span>
        </div>
        <div className="hw-meta-row">
          <span className="hw-meta-key">Award</span>
          <span className="hw-meta-val">{brand.award}</span>
        </div>
        <div className="hw-meta-row hw-meta-row--quote">
          <span className="hw-meta-key">Public&nbsp;opinion</span>
          <span className="hw-meta-val">{brand.reputation}</span>
        </div>
      </footer>
    </motion.article>
  );
}

/* ------------------------------- Section --------------------------------- */

export default function BrandInfographics() {
  // Inject scoped styles once.
  useEffect(() => {
    if (document.getElementById("hw-infographics-styles")) return;
    const el = document.createElement("style");
    el.id = "hw-infographics-styles";
    el.textContent = STYLES;
    document.head.appendChild(el);
  }, []);

  return (
    <section className="hw-infographics" aria-labelledby="hw-infographics-title">
      <div className="hw-infographics__inner">
        <header className="hw-section-head">
          <div>
            <p className="hw-eyebrow">By the numbers</p>
            <h2 id="hw-infographics-title">The Brand Record</h2>
          </div>
          <p className="hw-section-note">
            Twelve brands, measured on environmental commitment, public opinion
            and creative recognition. Figures from public disclosures &amp; ratings.
          </p>
        </header>

        <motion.div
          className="hw-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {BRANDS.map((b) => (
            <BrandCard key={b.id} brand={b} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------- Styles ---------------------------------- */
/* Scoped under .hw-* class names; palette sampled from the Headwinds site.   */

const STYLES = `
.hw-infographics {
  --hw-bg: #f3eae1;
  --hw-card: #eae3d9;
  --hw-line: #d8cebf;
  --hw-taupe: #bbae9e;
  --hw-ink: #4f4d47;
  --hw-ink-strong: #34322d;
  --hw-muted: #8a8579;
  font-family: var(--font-inter, Inter, "Inter Fallback", system-ui, sans-serif);
  background: var(--hw-bg);
  color: var(--hw-ink);
  padding: clamp(3.5rem, 8vw, 7rem) 1.25rem;
  -webkit-font-smoothing: antialiased;
}
.hw-infographics * { box-sizing: border-box; }
.hw-infographics__inner { max-width: 1200px; margin: 0 auto; }

/* Section header */
.hw-section-head {
  display: flex; flex-wrap: wrap; gap: 1.5rem 2rem;
  align-items: flex-end; justify-content: space-between;
  border-bottom: 1.5px solid var(--hw-ink-strong);
  padding-bottom: 1.25rem; margin-bottom: 2.5rem;
}
.hw-eyebrow {
  font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--hw-muted); margin: 0 0 0.4rem;
}
.hw-section-head h2 {
  font-size: clamp(2rem, 4.5vw, 3.25rem); line-height: 1; margin: 0;
  font-weight: 800; letter-spacing: -0.02em; color: var(--hw-ink-strong);
}
.hw-section-note {
  font-size: 0.85rem; line-height: 1.5; color: var(--hw-muted);
  max-width: 34ch; margin: 0; text-align: right;
}

/* Grid */
.hw-grid {
  display: grid; gap: 1.25rem;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
}

/* Card */
.hw-card {
  background: var(--hw-card);
  border: 1px solid var(--hw-line);
  padding: 1.4rem 1.4rem 1.5rem;
  display: flex; flex-direction: column;
}
.hw-card__head {
  display: flex; align-items: baseline; gap: 0.85rem;
  padding-bottom: 0.9rem; border-bottom: 1px solid var(--hw-line);
}
.hw-card__index {
  font-size: 0.8rem; font-weight: 700; letter-spacing: 0.05em;
  color: var(--hw-taupe); font-variant-numeric: tabular-nums;
  line-height: 1; padding-top: 0.15rem;
}
.hw-card__title h3 {
  font-size: 1.18rem; font-weight: 800; letter-spacing: -0.01em;
  margin: 0; color: var(--hw-ink-strong); line-height: 1.1;
}
.hw-card__sector {
  font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--hw-muted); margin: 0.3rem 0 0;
}

/* Media */
.hw-card__media {
  margin: 1rem 0 0; overflow: hidden; background: var(--hw-taupe);
  aspect-ratio: 4 / 3;
}
.hw-card__media img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  filter: contrast(1.02);
}

/* Hero metric */
.hw-card__hero {
  display: flex; flex-direction: column;
  padding: 1.1rem 0 0.9rem; border-bottom: 1px solid var(--hw-line);
}
.hw-card__hero-value {
  font-size: clamp(2.4rem, 4vw, 3rem); font-weight: 800; line-height: 0.95;
  letter-spacing: -0.03em; color: var(--hw-ink-strong);
  font-variant-numeric: tabular-nums;
}
.hw-card__hero-label {
  font-size: 0.78rem; line-height: 1.35; color: var(--hw-muted);
  margin-top: 0.45rem; max-width: 32ch;
}

/* Stat row */
.hw-card__stats {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem; margin: 0.9rem 0; padding: 0;
}
.hw-stat {
  border-left: 2px solid var(--hw-taupe); padding-left: 0.55rem; min-width: 0;
}
.hw-stat__value {
  font-size: 1.05rem; font-weight: 800; color: var(--hw-ink-strong);
  line-height: 1.05; font-variant-numeric: tabular-nums;
  word-break: break-word;
}
.hw-stat__label {
  font-size: 0.66rem; line-height: 1.3; color: var(--hw-muted);
  margin: 0.3rem 0 0;
}

/* Narrative */
.hw-card__narrative {
  font-size: 0.82rem; line-height: 1.55; color: var(--hw-ink);
  margin: 0 0 1.1rem; max-width: none;
}

/* Footer meta */
.hw-card__meta { margin-top: auto; border-top: 1px solid var(--hw-line); padding-top: 0.85rem; }
.hw-meta-row {
  display: grid; grid-template-columns: 5.5rem 1fr; gap: 0.6rem;
  padding: 0.28rem 0; align-items: baseline;
}
.hw-meta-row + .hw-meta-row { border-top: 1px dotted var(--hw-line); }
.hw-meta-key {
  font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--hw-taupe); font-weight: 700;
}
.hw-meta-val { font-size: 0.74rem; line-height: 1.4; color: var(--hw-ink); }
.hw-meta-row--quote .hw-meta-val { font-style: italic; color: var(--hw-ink-strong); }

/* Responsive */
@media (max-width: 560px) {
  .hw-section-note { text-align: left; }
  .hw-grid { grid-template-columns: 1fr; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hw-card, .hw-stat { opacity: 1 !important; transform: none !important; }
}
`;
