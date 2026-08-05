import content from './content.json';

const font =
  'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';

const accents = ['#7C3AED', '#0EA5E9', '#F97316', '#10B981', '#E11D48', '#6366F1', '#14B8A6', '#F59E0B'];

function Paragraphs({ text }) {
  if (!text) return null;
  const parts = String(text).split(/\n\s*\n/).filter((p) => p.trim() !== '');
  return parts.map((p, i) => (
    <p key={i} style={{ margin: '0 0 1rem', lineHeight: 1.75, fontSize: '1.02rem' }}>
      {p.trim()}
    </p>
  ));
}

function Section({ section, index }) {
  const items = Array.isArray(section.items) ? section.items : [];
  const accent = accents[index % accents.length];

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.92)',
        borderRadius: 28,
        padding: 'clamp(1.4rem, 4vw, 2.4rem)',
        boxShadow: '0 24px 70px -42px rgba(15, 23, 42, 0.55)',
        border: '1px solid rgba(226, 232, 240, 0.95)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '0 auto auto 0',
          width: 7,
          height: '100%',
          background: accent,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: -44,
          top: -44,
          width: 150,
          height: 150,
          borderRadius: '999px',
          background: `${accent}22`,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
        <span
          style={{
            display: 'inline-grid',
            placeItems: 'center',
            width: 42,
            height: 42,
            borderRadius: 14,
            background: accent,
            color: '#fff',
            fontWeight: 900,
            boxShadow: `0 14px 30px -16px ${accent}`,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        {section.heading && (
          <h2 style={{ fontSize: 'clamp(1.35rem, 3vw, 2rem)', margin: 0, color: '#111827', letterSpacing: '-0.04em' }}>
            {section.heading}
          </h2>
        )}
      </div>

      <div style={{ color: '#334155' }}>
        <Paragraphs text={section.body} />
      </div>

      {items.length > 0 && (
        <ul
          style={{
            margin: '1.2rem 0 0',
            padding: 0,
            listStyle: 'none',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {items.map((item, i) => (
            <li
              key={i}
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 16,
                padding: '0.85rem 0.95rem',
                color: '#1E293B',
                lineHeight: 1.55,
                fontSize: '0.97rem',
              }}
            >
              <span style={{ color: accent, fontWeight: 900, marginRight: 8 }}>◆</span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function App() {
  const sections = Array.isArray(content.sections) ? content.sections : [];

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: font,
        background:
          'radial-gradient(circle at top left, #E0F2FE 0, transparent 34%), radial-gradient(circle at top right, #FCE7F3 0, transparent 30%), linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)',
        color: '#1E293B',
      }}
    >
      <header
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #111827 0%, #312E81 48%, #0F766E 100%)',
          color: '#fff',
          padding: 'clamp(4rem, 12vw, 7.5rem) 1.5rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.18,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />
        <div style={{ position: 'relative', maxWidth: 940, margin: '0 auto' }}>
          <p
            style={{
              display: 'inline-block',
              margin: '0 0 1rem',
              padding: '0.45rem 0.8rem',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.14)',
              border: '1px solid rgba(255,255,255,0.22)',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: '0.78rem',
            }}
          >
            Audience-Based Design Guide
          </p>
          <h1
            style={{
              fontSize: 'clamp(2.7rem, 8vw, 5.8rem)',
              margin: 0,
              lineHeight: 0.95,
              letterSpacing: '-0.08em',
            }}
          >
            {content.title}
          </h1>
          {content.tagline && (
            <p
              style={{
                fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)',
                opacity: 0.94,
                maxWidth: 760,
                margin: '1.4rem auto 0',
                lineHeight: 1.6,
              }}
            >
              {content.tagline}
            </p>
          )}
        </div>
      </header>

      <main
        style={{
          maxWidth: 1100,
          margin: '-2.8rem auto 0',
          padding: '0 1.5rem clamp(2.5rem, 7vw, 5rem)',
          display: 'grid',
          gap: 'clamp(1rem, 3vw, 1.5rem)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {sections.map((section, i) => (
          <Section key={i} section={section} index={i} />
        ))}
      </main>

      {content.footer && (
        <footer
          style={{
            textAlign: 'center',
            padding: '2rem 1.5rem 2.5rem',
            color: '#475569',
            fontSize: '0.95rem',
            borderTop: '1px solid rgba(148, 163, 184, 0.35)',
          }}
        >
          {content.footer}
        </footer>
      )}
    </div>
  );
}