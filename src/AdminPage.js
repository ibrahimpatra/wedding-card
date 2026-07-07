import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Hardcoded password ─────────────────────────────────────────── */
const ADMIN_PASSWORD = '26786';

/* ── All route data ─────────────────────────────────────────────── */
const SPECIAL = [
  { route: '/',    tag: 'Default',         desc: 'Nikah only — no count. Safe to share publicly.' },
  { route: '/NB',  tag: 'No Buttons',      desc: 'All UI hidden. Use for clean screenshots.' },
  { route: '/i',   tag: 'Majlis, no count',desc: 'Majlis only visible, no invitee count shown.' },
  { route: '/ip',  tag: 'Both, no count',  desc: 'Majlis + Nikah visible, no invitee count shown.' },
];

const NIKAH_ONLY = [
  { route: '/1p', count: '1' },
  { route: '/2p', count: '2' },
  { route: '/ap', count: 'All' },
];

const MAJLIS_ONLY = [
  { route: '/1i', count: '1' },
  { route: '/2i', count: '2' },
  { route: '/ai', count: 'All' },
];

const BOTH = [
  { route: '/11ip', m: '1',   n: '1'   },
  { route: '/12ip', m: '1',   n: '2'   },
  { route: '/1aip', m: '1',   n: 'All' },
  { route: '/21ip', m: '2',   n: '1'   },
  { route: '/22ip', m: '2',   n: '2'   },
  { route: '/2aip', m: '2',   n: 'All' },
  { route: '/a1ip', m: 'All', n: '1'   },
  { route: '/a2ip', m: 'All', n: '2'   },
  { route: '/aaip', m: 'All', n: 'All' },
];

const EVENT_PAGES = [
  {
    slug: 'mehendi', name: 'Mehendi Jaman',
    host: 'Sarrah Ben & Saifuddin Bhai Patrawala',
    date: '17th August 2026', time: 'Evening', venue: 'Hatimi Hills',
  },
  {
    slug: 'mamamusala', name: 'Mama Musala',
    host: 'Lakdawala Family',
    date: '18th August 2026', time: 'Morning', venue: 'Hatimi Hills',
  },
  {
    slug: 'majlis', name: 'Majlis',
    host: 'Sarrah Ben & Saifuddin Bhai Patrawala',
    date: '18th August 2026', time: 'Evening', venue: 'Fakhri Manzil, Pune',
  },
  {
    slug: 'nikah', name: 'Nikah Darees',
    host: 'Sarrah Ben & Saifuddin Bhai Patrawala',
    date: '19th August 2026', time: '', venue: 'Fakhri Manzil, Pune',
    extra: 'Nikah solemnized by Syedna Mufaddal Saifuddin (TUS) at Saifee Mahal, Mumbai',
  },
];

/* ── Helpers ─────────────────────────────────────────────────────── */
const go = (route) => window.open(route, '_blank');

const Pill = ({ route, children, dim }) => (
  <motion.button
    whileHover={{ scale: 1.06, y: -1 }}
    whileTap={{ scale: 0.96 }}
    onClick={() => go(route)}
    style={{
      background: dim ? 'rgba(179,135,40,0.13)' : '#1e3a8a',
      border: '1px solid #b38728',
      color: dim ? '#7a5a10' : '#f0c040',
      fontFamily: "'Cinzel', serif",
      fontSize: 11,
      fontWeight: 700,
      padding: '5px 14px',
      borderRadius: 20,
      cursor: 'pointer',
      letterSpacing: '0.04em',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      whiteSpace: 'nowrap',
    }}
  >
    {children || route}
  </motion.button>
);

const SectionHead = ({ title, sub }) => (
  <div style={{ marginBottom: 18 }}>
    <p style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '0.28em',
                 textTransform: 'uppercase', color: '#b38728', marginBottom: 4 }}>
      {title}
    </p>
    {sub && <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                         fontSize: 13, color: '#0a192f', opacity: 0.55 }}>{sub}</p>}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
      <div style={{ flex: 1, height: 1, background: '#f0daa0' }} />
      <div style={{ width: 7, height: 7, background: '#b38728', transform: 'rotate(45deg)' }} />
      <div style={{ flex: 1, height: 1, background: '#f0daa0' }} />
    </div>
  </div>
);

const Card = ({ children }) => (
  <div style={{ background: 'white', border: '1px solid #f0daa0', borderRadius: 10,
                padding: '18px 20px', boxShadow: '0 2px 12px rgba(30,58,138,0.07)' }}>
    {children}
  </div>
);

/* ── Password screen ─────────────────────────────────────────────── */
const PasswordScreen = ({ onUnlock }) => {
  const [val, setVal]     = useState('');
  const [err, setErr]     = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (val === ADMIN_PASSWORD) {
      onUnlock();
    } else {
      setErr(true);
      setShake(true);
      setVal('');
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#f0ece4', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <motion.div
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        style={{ background: '#fdfbf7', border: '1.5px solid #b38728', borderRadius: 4,
                 padding: '48px 40px', width: '100%', maxWidth: 360, textAlign: 'center',
                 boxShadow: '0 8px 40px rgba(30,58,138,0.13)' }}
      >
        {/* Logo */}
        <motion.img src="/logo-heart.png" alt="logo"
          style={{ width: 72, marginBottom: 20 }}
          animate={{ filter: ['drop-shadow(0 0 4px rgba(179,135,40,0.2))', 'drop-shadow(0 0 16px rgba(179,135,40,0.7))', 'drop-shadow(0 0 4px rgba(179,135,40,0.2))'] }}
          transition={{ duration: 2.5, repeat: Infinity }} />

        <p style={{ fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: '0.3em',
                    color: '#b38728', textTransform: 'uppercase', marginBottom: 6 }}>
          Admin Access
        </p>
        <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: '1.8rem',
                    color: '#1e3a8a', marginBottom: 28, lineHeight: 1 }}>
          Ibrahim & Zenab
        </p>

        {/* Input */}
        <input
          type="password"
          value={val}
          onChange={e => { setVal(e.target.value); setErr(false); }}
          onKeyDown={e => e.key === 'Enter' && attempt()}
          placeholder="Enter password"
          style={{
            width: '100%', padding: '11px 16px', border: `1.5px solid ${err ? '#c0392b' : '#b38728'}`,
            borderRadius: 6, fontFamily: "'Playfair Display',serif", fontSize: 14,
            background: '#fdfbf7', color: '#0a192f', outline: 'none', marginBottom: err ? 8 : 16,
            textAlign: 'center', letterSpacing: '0.15em',
          }}
          autoFocus
        />

        {err && (
          <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                      fontSize: 12, color: '#c0392b', marginBottom: 12 }}>
            Incorrect password. Try again.
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={attempt}
          style={{
            width: '100%', padding: '11px', background: '#1e3a8a',
            border: '1px solid #b38728', borderRadius: 6, color: '#f0c040',
            fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700,
            letterSpacing: '0.12em', cursor: 'pointer', textTransform: 'uppercase',
          }}
        >
          Unlock
        </motion.button>
      </motion.div>
    </div>
  );
};

/* ── Routes dashboard ────────────────────────────────────────────── */
const Dashboard = () => (
  <div style={{ minHeight: '100dvh', background: '#f0ece4', padding: '32px 16px 60px' }}>
    <div style={{ maxWidth: 860, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ background: '#1e3a8a', borderRadius: '4px 4px 0 0', padding: '36px 36px 28px',
                    textAlign: 'center', border: '1px solid #b38728', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 10, border: '1px solid rgba(240,192,64,0.25)', borderRadius: 2, pointerEvents: 'none' }} />
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '0.3em',
                    color: '#b38728', textTransform: 'uppercase', marginBottom: 8 }}>
          ✦ Route Reference ✦
        </p>
        <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: '2.8rem',
                    color: 'white', lineHeight: 1, marginBottom: 8 }}>
          Ibrahim & Zenab
        </p>
        <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                    fontSize: 13, color: '#f0daa0', opacity: 0.8 }}>
          Click any route to open it in a new tab
        </p>
      </div>

      {/* Domain strip */}
      <div style={{ background: 'rgba(179,135,40,0.1)', border: '1px solid #f0daa0',
                    borderTop: 'none', padding: '10px 36px', textAlign: 'center',
                    fontFamily: "'Cinzel',serif", fontSize: 11, color: '#1e3a8a',
                    letterSpacing: '0.12em', marginBottom: 24 }}>
        ibrahim-weds-zenab.web.app
        <span style={{ color: '#b38728', margin: '0 10px' }}>·</span>
        All routes case-insensitive
        <span style={{ color: '#b38728', margin: '0 10px' }}>·</span>
        35 total routes
      </div>

      {/* ── Special ── */}
      <Card>
        <SectionHead title="Special Routes" sub="No invitee count — system & screenshot modes" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SPECIAL.map(({ route, tag, desc }) => (
            <div key={route} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Pill route={route} dim={route === '/' || route === '/NB'}>
                {route === '/' ? '/ (default)' : route}
              </Pill>
              <div>
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: 10, fontWeight: 700,
                                color: '#b38728', marginRight: 8 }}>{tag}</span>
                <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                                fontSize: 12, color: '#0a192f', opacity: 0.6 }}>{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ height: 16 }} />

      {/* ── Nikah only + Majlis only side by side ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <SectionHead title="Nikah Only" sub="Majlis card hidden" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {NIKAH_ONLY.map(({ route, count }) => (
              <div key={route} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Pill route={route} />
                <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                                fontSize: 12, color: '#b38728', fontWeight: 600 }}>
                  Invitees: {count}
                </span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHead title="Majlis Only" sub="Nikah card hidden" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MAJLIS_ONLY.map(({ route, count }) => (
              <div key={route} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Pill route={route} />
                <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                                fontSize: 12, color: '#b38728', fontWeight: 600 }}>
                  Invitees: {count}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ height: 16 }} />

      {/* ── Both events ── */}
      <Card>
        <SectionHead
          title="Both Events — Majlis & Nikah"
          sub="Format: /[majlis-count][nikah-count]ip — Majlis count first, Nikah second"
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 10 }}>
          {BOTH.map(({ route, m, n }) => (
            <div key={route} onClick={() => go(route)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                       padding: '8px 12px', borderRadius: 8, border: '1px solid #f0daa0',
                       background: '#fdfbf7', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(179,135,40,0.07)'}
              onMouseLeave={e => e.currentTarget.style.background = '#fdfbf7'}
            >
              <span style={{ fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700,
                              color: '#f0c040', background: '#1e3a8a', padding: '3px 10px',
                              borderRadius: 14, border: '1px solid #b38728' }}>
                {route}
              </span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 11,
                              color: '#1e3a8a', opacity: 0.7, fontStyle: 'italic' }}>
                M:{m} N:{n}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ height: 16 }} />

      {/* ── Event pages ── */}
      <Card>
        <SectionHead
          title="Single-Event Invite Pages"
          sub="Static single-page invite per ceremony. /slug opens with no count, /slug/1 /slug/2 /slug/a adds invitee count."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 14 }}>
          {EVENT_PAGES.map((ev) => (
            <div key={ev.slug}
              style={{ border: '1px solid #f0daa0', borderRadius: 10, overflow: 'hidden' }}>
              {/* Card header */}
              <div style={{ background: '#1e3a8a', padding: '12px 16px' }}>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700,
                              color: '#f0c040', letterSpacing: '0.07em', marginBottom: 2 }}>
                  {ev.name}
                </p>
                <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                              fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
                  {ev.host}
                </p>
              </div>
              {/* Card body */}
              <div style={{ padding: '12px 16px', background: 'white' }}>
                <p style={{ fontSize: 12, color: '#0a192f', opacity: 0.7, marginBottom: 2,
                             fontFamily: "'Playfair Display',serif" }}>
                  📅 <strong style={{ color: '#1e3a8a' }}>{ev.date}</strong>
                  {ev.time && <> · <strong style={{ color: '#1e3a8a' }}>{ev.time}</strong></>}
                </p>
                <p style={{ fontSize: 12, color: '#0a192f', opacity: 0.7, marginBottom: 10,
                             fontFamily: "'Playfair Display',serif" }}>
                  📍 <strong style={{ color: '#1e3a8a' }}>{ev.venue}</strong>
                </p>
                {ev.extra && (
                  <p style={{ fontSize: 10, fontStyle: 'italic', color: '#1e3a8a',
                               opacity: 0.55, marginBottom: 10,
                               fontFamily: "'Playfair Display',serif" }}>
                    {ev.extra}
                  </p>
                )}
                {/* Route pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['', '/1', '/2', '/a'].map((suffix) => {
                    const r = `/${ev.slug}${suffix}`;
                    const labels = { '': 'no count', '/1': '1 guest', '/2': '2 guests', '/a': 'all' };
                    return (
                      <motion.button key={r}
                        whileHover={{ scale: 1.07, y: -1 }} whileTap={{ scale: 0.95 }}
                        onClick={() => go(r)}
                        style={{
                          fontFamily: "'Cinzel',serif", fontSize: 10, fontWeight: 700,
                          padding: '4px 11px', borderRadius: 16, cursor: 'pointer',
                          letterSpacing: '0.04em', border: '1px solid',
                          background: suffix === '' ? '#1e3a8a' : 'rgba(30,58,138,0.08)',
                          color: suffix === '' ? '#f0c040' : '#1e3a8a',
                          borderColor: suffix === '' ? '#b38728' : 'rgba(30,58,138,0.3)',
                        }}
                      >
                        {r}
                        <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                                        fontWeight: 400, marginLeft: 5, opacity: 0.65,
                                        fontSize: 9 }}>
                          {labels[suffix]}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Footer */}
      <div style={{ marginTop: 24, textAlign: 'center', fontFamily: "'Cinzel',serif",
                    fontSize: 9, letterSpacing: '0.22em', color: '#b38728', opacity: 0.6 }}>
        IBRAHIM & ZENAB · AUGUST 2026 · PUNE, INDIA
      </div>

    </div>
  </div>
);

/* ── Main export ─────────────────────────────────────────────────── */
const AdminPage = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <motion.div key="lock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <PasswordScreen onUnlock={() => setUnlocked(true)} />
        </motion.div>
      ) : (
        <motion.div key="dash" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Dashboard />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminPage;
