import content from './content.json';

const audiences = [
  'Foundation',
  'General',
  'Beginner',
  'Creative',
  'Business',
  'Older Adults',
  'Accessible',
  'Expert',
  'Lesson',
];

const accents = ['#C4B5FD', '#67E8F9', '#FDBA74', '#86EFAC', '#FDA4AF', '#A5B4FC', '#5EEAD4', '#FDE68A'];

function Paragraphs({ text }) {
  if (!text) return null;
  return String(text)
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((paragraph, index) => (
      <p className="paragraph" key={index}>
        {paragraph.trim()}
      </p>
    ));
}

function Section({ section, index }) {
  const items = Array.isArray(section.items) ? section.items : [];
  const accent = accents[index % accents.length];
  const label = audiences[index] || `Layer ${index + 1}`;
  const style = section.exampleStyle;

  return (
    <article className="section-card" style={{ '--accent': accent }}>
      <div className="section-topline">
        <span className="section-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="section-label">{label}</span>
      </div>

      <div className="section-layout">
        <div>
          <h2>{section.heading}</h2>
          <div className="copy">
            <Paragraphs text={section.body} />
          </div>

          {style && (
            <div className="style-callout">
              <p className="style-kicker">Example Design Style</p>
              <h3>{style.name}</h3>
              <p>{style.description}</p>
              <p className="style-why">Why it fits: {style.why}</p>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="signal-box">
            <p className="signal-title">Design signals</p>
            <ul>
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

export default function App() {
  const sections = Array.isArray(content.sections) ? content.sections : [];
  const featured = sections.slice(1, 8);

  return (
    <div className="site-shell">
      <style>{`
        :root { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #E5E7EB; background: #070A12; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #070A12; }
        .site-shell { min-height: 100vh; background: radial-gradient(circle at 12% 8%, rgba(124, 58, 237, 0.42), transparent 30%), radial-gradient(circle at 88% 0%, rgba(20, 184, 166, 0.35), transparent 28%), radial-gradient(circle at 55% 45%, rgba(249, 115, 22, 0.12), transparent 32%), linear-gradient(180deg, #070A12 0%, #0F172A 45%, #080B13 100%); overflow-x: hidden; }
        .hero { position: relative; padding: clamp(4rem, 10vw, 7rem) 1.25rem 3rem; }
        .hero::before { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0.16; background-image: linear-gradient(rgba(255,255,255,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.22) 1px, transparent 1px); background-size: 58px 58px; mask-image: linear-gradient(to bottom, black, transparent 82%); }
        .hero-inner { position: relative; max-width: 1180px; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(310px, .8fr); gap: clamp(2rem, 5vw, 4rem); align-items: center; }
        .eyebrow { display: inline-flex; align-items: center; gap: .55rem; margin: 0 0 1.2rem; padding: .55rem .8rem; border: 1px solid rgba(255,255,255,.18); background: rgba(255,255,255,.07); border-radius: 999px; color: #CCFBF1; text-transform: uppercase; letter-spacing: .14em; font-size: .72rem; font-weight: 800; backdrop-filter: blur(14px); }
        .eyebrow-dot { width: .55rem; height: .55rem; border-radius: 50%; background: #2DD4BF; box-shadow: 0 0 28px #2DD4BF; }
        h1 { margin: 0; max-width: 860px; color: #FFFFFF; font-size: clamp(3.4rem, 9vw, 8.2rem); line-height: .82; letter-spacing: -.1em; text-wrap: balance; }
        .tagline { max-width: 760px; margin: 1.5rem 0 0; color: #CBD5E1; font-size: clamp(1.05rem, 2vw, 1.35rem); line-height: 1.7; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 2rem; }
        .pill { display: inline-flex; align-items: center; border-radius: 999px; padding: .8rem 1rem; font-weight: 800; text-decoration: none; color: #08111F; background: #FFFFFF; box-shadow: 0 18px 40px rgba(255,255,255,.12); }
        .pill.secondary { color: #E2E8F0; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.16); box-shadow: none; }
        .visual-panel { position: relative; padding: 1rem; border-radius: 34px; background: linear-gradient(145deg, rgba(255,255,255,.2), rgba(255,255,255,.05)); border: 1px solid rgba(255,255,255,.16); box-shadow: 0 40px 120px rgba(0,0,0,.38); backdrop-filter: blur(20px); }
        .visual-panel-grid { display: grid; grid-template-columns: 1.15fr .85fr; grid-template-rows: 150px 110px 120px; gap: .85rem; }
        .tile { border-radius: 24px; padding: 1rem; background: rgba(15, 23, 42, .72); border: 1px solid rgba(255,255,255,.12); overflow: hidden; position: relative; }
        .tile strong { display: block; color: white; font-size: 1.05rem; letter-spacing: -.03em; }
        .tile span { display: block; color: #94A3B8; margin-top: .35rem; font-size: .82rem; line-height: 1.4; }
        .tile-large { grid-row: span 2; background: linear-gradient(150deg, rgba(124,58,237,.9), rgba(45,212,191,.5)); }
        .tile-wide { grid-column: span 2; background: linear-gradient(120deg, rgba(255,255,255,.12), rgba(251,191,36,.22)); }
        .tile::after { content: ''; position: absolute; width: 100px; height: 100px; border-radius: 50%; right: -35px; bottom: -35px; background: rgba(255,255,255,.16); }
        .overview { max-width: 1180px; margin: 0 auto; padding: 1rem 1.25rem 2rem; }
        .overview-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .mini-card { min-height: 150px; border-radius: 24px; padding: 1.1rem; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); backdrop-filter: blur(12px); }
        .mini-card p:first-child { margin: 0; color: #FFFFFF; font-weight: 900; letter-spacing: -.04em; font-size: 1.2rem; }
        .mini-card p:last-child { margin: .65rem 0 0; color: #AAB6CA; line-height: 1.55; font-size: .92rem; }
        .content-area { max-width: 1180px; margin: 0 auto; padding: 1rem 1.25rem clamp(3rem, 8vw, 6rem); display: grid; gap: 1.2rem; }
        .section-card { position: relative; overflow: hidden; border-radius: 32px; padding: clamp(1.4rem, 4vw, 2.4rem); background: linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.04)), rgba(15,23,42,.72); border: 1px solid rgba(255,255,255,.12); box-shadow: 0 30px 80px rgba(0,0,0,.28); }
        .section-card::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 7px; background: var(--accent); }
        .section-card::after { content: ''; position: absolute; width: 240px; height: 240px; border-radius: 999px; right: -90px; top: -90px; background: color-mix(in srgb, var(--accent), transparent 78%); filter: blur(2px); }
        .section-topline { position: relative; z-index: 1; display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.2rem; }
        .section-number { color: var(--accent); font-weight: 950; letter-spacing: -.06em; font-size: clamp(2rem, 5vw, 4rem); line-height: 1; }
        .section-label { color: #0B1220; background: var(--accent); border-radius: 999px; padding: .55rem .85rem; font-size: .76rem; text-transform: uppercase; letter-spacing: .12em; font-weight: 950; }
        .section-layout { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, .72fr); gap: clamp(1.4rem, 4vw, 2.4rem); align-items: start; }
        h2 { margin: 0 0 1rem; color: #FFFFFF; font-size: clamp(2rem, 5vw, 4.2rem); line-height: .95; letter-spacing: -.08em; text-wrap: balance; }
        .copy { max-width: 720px; color: #CBD5E1; }
        .paragraph { margin: 0 0 1rem; line-height: 1.75; font-size: 1.02rem; }
        .style-callout { margin-top: 1.35rem; padding: 1.05rem; border-radius: 22px; background: linear-gradient(135deg, color-mix(in srgb, var(--accent), transparent 84%), rgba(255,255,255,.055)); border: 1px solid color-mix(in srgb, var(--accent), transparent 55%); }
        .style-kicker { margin: 0 0 .45rem; color: var(--accent); font-size: .76rem; font-weight: 950; letter-spacing: .14em; text-transform: uppercase; }
        .style-callout h3 { margin: 0 0 .55rem; color: #FFFFFF; font-size: clamp(1.35rem, 3vw, 2rem); letter-spacing: -.05em; }
        .style-callout p { margin: 0 0 .7rem; color: #D6E0EF; line-height: 1.6; }
        .style-callout p:last-child { margin-bottom: 0; }
        .style-why { color: #FFFFFF !important; font-weight: 650; }
        .signal-box { border-radius: 24px; padding: 1rem; background: rgba(2,6,23,.55); border: 1px solid rgba(255,255,255,.12); }
        .signal-title { margin: 0 0 .8rem; color: var(--accent); font-weight: 950; letter-spacing: .08em; text-transform: uppercase; font-size: .78rem; }
        ul { list-style: none; padding: 0; margin: 0; display: grid; gap: .7rem; }
        li { display: grid; grid-template-columns: 2.2rem 1fr; gap: .7rem; color: #DCE5F4; line-height: 1.5; font-size: .95rem; padding: .78rem; border-radius: 16px; background: rgba(255,255,255,.055); border: 1px solid rgba(255,255,255,.08); }
        li span { color: var(--accent); font-weight: 950; }
        footer { max-width: 1180px; margin: 0 auto; padding: 2rem 1.25rem 3rem; color: #94A3B8; border-top: 1px solid rgba(255,255,255,.12); text-align: center; }
        @media (max-width: 900px) { .hero-inner, .section-layout { grid-template-columns: 1fr; } .overview-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .overview-grid { grid-template-columns: 1fr; } .visual-panel-grid { grid-template-columns: 1fr; grid-template-rows: auto; } .tile-large, .tile-wide { grid-column: auto; grid-row: auto; min-height: 130px; } .section-topline { align-items: flex-start; flex-direction: column; } }
      `}</style>

      <header className="hero">
        <div className="hero-inner">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" /> Visual hierarchy by audience</p>
            <h1>{content.title}</h1>
            {content.tagline && <p className="tagline">{content.tagline}</p>}
            <div className="hero-actions">
              <a className="pill" href="#guide">Explore the guide</a>
              <a className="pill secondary" href="#audiences">Compare audiences</a>
            </div>
          </div>

          <aside className="visual-panel" aria-label="Visual hierarchy preview">
            <div className="visual-panel-grid">
              <div className="tile tile-large"><strong>Attention</strong><span>Big idea first. Details after.</span></div>
              <div className="tile"><strong>Contrast</strong><span>Priority becomes visible.</span></div>
              <div className="tile"><strong>Spacing</strong><span>Relationships become clear.</span></div>
              <div className="tile tile-wide"><strong>Audience Fit</strong><span>The same message changes depending on who is looking.</span></div>
            </div>
          </aside>
        </div>
      </header>

      <section className="overview" id="audiences">
        <div className="overview-grid">
          {featured.map((section) => (
            <div className="mini-card" key={section.heading}>
              <p>{section.heading}</p>
              <p>{section.exampleStyle?.name || 'Audience style'} — {String(section.body || '').split('\n')[0].slice(0, 95)}...</p>
            </div>
          ))}
        </div>
      </section>

      <main className="content-area" id="guide">
        {sections.map((section, index) => (
          <Section section={section} index={index} key={section.heading || index} />
        ))}
      </main>

      {content.footer && <footer>{content.footer}</footer>}
    </div>
  );
}