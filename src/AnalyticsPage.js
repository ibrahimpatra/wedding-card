import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { FIREBASE_DB_URL, ANALYTICS_PASSWORD } from './analyticsConfig';

/* ── Helpers ─────────────────────────────────────────────────────── */
const fmtDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
    });
  } catch { return iso; }
};

const countBy = (arr, key) =>
  arr.reduce((acc, item) => {
    const k = item[key] || '—';
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

const sortedEntries = (obj) =>
  Object.entries(obj).sort((a, b) => b[1] - a[1]);

/* ── Sub-components ──────────────────────────────────────────────── */

const BarStat = ({ label, value, max, color = '#1e3a8a' }) => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
      <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                     fontSize: 13, color: '#0a192f' }}>{label}</span>
      <span style={{ fontFamily: "'Cinzel',serif", fontSize: 12,
                     fontWeight: 700, color: '#b38728' }}>{value}</span>
    </div>
    <div style={{ height: 6, background: 'rgba(179,135,40,0.15)', borderRadius: 3 }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.round((value / max) * 100)}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ height: '100%', background: color, borderRadius: 3 }}
      />
    </div>
  </div>
);

const StatCard = ({ title, children, accent }) => (
  <div style={{
    background: 'white', border: '1px solid #f0daa0', borderRadius: 10,
    padding: '18px 20px', boxShadow: '0 2px 12px rgba(30,58,138,0.06)',
  }}>
    <p style={{
      fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '0.25em',
      textTransform: 'uppercase', color: accent || '#b38728',
      marginBottom: 14, fontWeight: 700,
    }}>{title}</p>
    {children}
  </div>
);

/* ── Password screen ─────────────────────────────────────────────── */
const PasswordScreen = ({ onUnlock }) => {
  const [val, setVal]     = useState('');
  const [err, setErr]     = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (val === ANALYTICS_PASSWORD) { onUnlock(); }
    else {
      setErr(true); setShake(true); setVal('');
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#f0ece4', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <motion.div
        animate={shake ? { x: [-10,10,-8,8,-4,4,0] } : {}}
        transition={{ duration: 0.5 }}
        style={{ background: '#fdfbf7', border: '1.5px solid #b38728', borderRadius: 4,
                 padding: '48px 40px', width: '100%', maxWidth: 360, textAlign: 'center',
                 boxShadow: '0 8px 40px rgba(30,58,138,0.13)' }}
      >
        <motion.img src="/logo-heart.png" alt="logo" style={{ width: 68, marginBottom: 18 }}
          animate={{ filter: ['drop-shadow(0 0 4px rgba(179,135,40,0.2))','drop-shadow(0 0 16px rgba(179,135,40,0.7))','drop-shadow(0 0 4px rgba(179,135,40,0.2))'] }}
          transition={{ duration: 2.5, repeat: Infinity }} />
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'0.3em',
                    color:'#b38728', textTransform:'uppercase', marginBottom:6 }}>
          Analytics
        </p>
        <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:'1.8rem',
                    color:'#1e3a8a', marginBottom:28, lineHeight:1 }}>
          Ibrahim & Zenab
        </p>
        <input
          type="password" value={val}
          onChange={e => { setVal(e.target.value); setErr(false); }}
          onKeyDown={e => e.key === 'Enter' && attempt()}
          placeholder="Enter password"
          autoFocus
          style={{ width:'100%', padding:'11px 16px', marginBottom: err ? 8 : 16,
                   border:`1.5px solid ${err ? '#c0392b' : '#b38728'}`, borderRadius:6,
                   fontFamily:"'Playfair Display',serif", fontSize:14, background:'#fdfbf7',
                   color:'#0a192f', outline:'none', textAlign:'center', letterSpacing:'0.15em' }}
        />
        {err && <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic',
                             fontSize:12, color:'#c0392b', marginBottom:12 }}>
          Incorrect password.
        </p>}
        <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
          onClick={attempt}
          style={{ width:'100%', padding:'11px', background:'#1e3a8a', border:'1px solid #b38728',
                   borderRadius:6, color:'#f0c040', fontFamily:"'Cinzel',serif", fontSize:12,
                   fontWeight:700, letterSpacing:'0.12em', cursor:'pointer', textTransform:'uppercase' }}>
          Unlock
        </motion.button>
      </motion.div>
    </div>
  );
};

/* ── Dashboard ───────────────────────────────────────────────────── */
const Dashboard = () => {
  const [plays,   setPlays]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      if (FIREBASE_DB_URL.includes('YOUR-PROJECT')) {
        setError('FIREBASE_DB_URL not set yet — see src/analyticsConfig.js for setup instructions.');
        setLoading(false); return;
      }
      const res  = await fetch(`${FIREBASE_DB_URL}/analytics/plays.json`);
      const data = await res.json();
      const list = data
        ? Object.values(data).sort((a, b) => new Date(b.ts) - new Date(a.ts))
        : [];
      setPlays(list);
      setLastFetch(new Date().toLocaleTimeString('en-IN'));
    } catch (e) {
      setError('Could not reach database. Check FIREBASE_DB_URL in analyticsConfig.js');
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  /* ── Derived stats ── */
  const total        = plays.length;
  const byDevice     = countBy(plays, 'device');
  const byBrowser    = countBy(plays, 'browser');
  const byCity       = countBy(plays, 'city');
  const byCountry    = countBy(plays, 'country');
  const byRoute      = countBy(plays, 'route');
  const maxDevice    = Math.max(...Object.values(byDevice), 1);
  const maxBrowser   = Math.max(...Object.values(byBrowser), 1);
  const maxCity      = Math.max(...Object.values(byCity), 1);
  const maxRoute     = Math.max(...Object.values(byRoute), 1);

  /* ── Recent plays (last 30) ── */
  const recent = plays.slice(0, 30);

  const deviceColors = {
    'iPhone': '#1e3a8a', 'Android Phone': '#0d6e3f',
    'iPad': '#6b21a8', 'Android Tablet': '#7e6b00',
    'Desktop': '#9a3412', 'Other': '#374151',
  };

  return (
    <div style={{ minHeight:'100dvh', background:'#f0ece4', padding:'28px 16px 60px' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>

        {/* ── Header ── */}
        <div style={{ background:'#1e3a8a', borderRadius:'4px 4px 0 0',
                      padding:'28px 32px 22px', textAlign:'center',
                      border:'1px solid #b38728', position:'relative' }}>
          <div style={{ position:'absolute', inset:10, border:'1px solid rgba(240,192,64,0.25)',
                        borderRadius:2, pointerEvents:'none' }} />
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'0.3em',
                      color:'#b38728', textTransform:'uppercase', marginBottom:6 }}>
            ✦ Invite Analytics ✦
          </p>
          <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:'2.4rem',
                      color:'white', lineHeight:1, marginBottom:6 }}>
            Ibrahim & Zenab
          </p>
          <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic',
                      fontSize:12, color:'rgba(240,218,150,0.7)' }}>
            Who opened the invite · {lastFetch && `Last updated ${lastFetch}`}
          </p>
        </div>

        {/* ── Refresh strip ── */}
        <div style={{ background:'rgba(179,135,40,0.1)', border:'1px solid #f0daa0',
                      borderTop:'none', padding:'9px 24px', display:'flex',
                      alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:10, color:'#1e3a8a',
                         letterSpacing:'0.12em' }}>
            ibrahim-weds-zenab.web.app
          </span>
          <button onClick={fetchData} disabled={loading}
            style={{ display:'flex', alignItems:'center', gap:6, background:'none',
                     border:'1px solid #b38728', borderRadius:16, padding:'4px 14px',
                     cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:10,
                     color:'#b38728', fontWeight:700 }}>
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Loading…' : 'Refresh'}
          </button>
        </div>

        {error && (
          <div style={{ background:'#fff5f5', border:'1px solid #fca5a5', borderRadius:8,
                        padding:'14px 18px', marginBottom:16, fontFamily:"'Playfair Display',serif",
                        fontStyle:'italic', fontSize:13, color:'#991b1b' }}>
            ⚠ {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* ── Big counter ── */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',
                          gap:14, marginBottom:16 }}>
              {[
                { label:'Total Opens', value: total, color:'#1e3a8a' },
                { label:'Unique Cities', value: Object.keys(byCity).filter(c=>c!=='—').length, color:'#0d6e3f' },
                { label:'Countries', value: Object.keys(byCountry).filter(c=>c!=='—').length, color:'#6b21a8' },
                { label:'Routes Accessed', value: Object.keys(byRoute).length, color:'#9a3412' },
              ].map(({ label, value, color }) => (
                <div key={label}
                  style={{ background:'white', border:'1px solid #f0daa0', borderRadius:10,
                            padding:'18px 16px', textAlign:'center',
                            boxShadow:'0 2px 12px rgba(30,58,138,0.06)' }}>
                  <p style={{ fontFamily:"'Cinzel',serif", fontSize:32, fontWeight:700,
                               color, marginBottom:4 }}>{value}</p>
                  <p style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'0.18em',
                               textTransform:'uppercase', color:'#b38728' }}>{label}</p>
                </div>
              ))}
            </div>

            {/* ── Stats grid ── */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',
                          gap:14, marginBottom:16 }}>

              <StatCard title="Device Type">
                {sortedEntries(byDevice).map(([k,v]) => (
                  <BarStat key={k} label={k} value={v} max={maxDevice}
                    color={deviceColors[k] || '#374151'} />
                ))}
                {Object.keys(byDevice).length === 0 &&
                  <p style={{ fontStyle:'italic', fontSize:13, color:'#9ca3af' }}>No data yet</p>}
              </StatCard>

              <StatCard title="Browser">
                {sortedEntries(byBrowser).map(([k,v]) => (
                  <BarStat key={k} label={k} value={v} max={maxBrowser} color="#b38728" />
                ))}
              </StatCard>

              <StatCard title="Top Cities">
                {sortedEntries(byCity).filter(([k])=>k!=='—').slice(0,8).map(([k,v]) => (
                  <BarStat key={k} label={k} value={v} max={maxCity} color="#1e3a8a" />
                ))}
                {Object.keys(byCity).filter(c=>c!=='—').length === 0 &&
                  <p style={{ fontStyle:'italic', fontSize:13, color:'#9ca3af' }}>No location data yet</p>}
              </StatCard>

              <StatCard title="Route Accessed">
                {sortedEntries(byRoute).map(([k,v]) => (
                  <BarStat key={k} label={k} value={v} max={maxRoute} color="#0d6e3f" />
                ))}
              </StatCard>

            </div>

            {/* ── Recent plays table ── */}
            <div style={{ background:'white', border:'1px solid #f0daa0', borderRadius:10,
                          padding:'18px 20px', boxShadow:'0 2px 12px rgba(30,58,138,0.06)' }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'0.25em',
                           textTransform:'uppercase', color:'#b38728', marginBottom:14,
                           fontWeight:700 }}>
                Recent Opens {total > 30 && `(showing last 30 of ${total})`}
              </p>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', minWidth:520 }}>
                  <thead>
                    <tr style={{ borderBottom:'2px solid #f0daa0' }}>
                      {['Time','Device','Browser','OS','City','Country','Route'].map(h => (
                        <th key={h} style={{ fontFamily:"'Cinzel',serif", fontSize:8,
                                             letterSpacing:'0.18em', textTransform:'uppercase',
                                             color:'#b38728', padding:'0 10px 10px 0',
                                             textAlign:'left', fontWeight:700 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((p, i) => (
                      <tr key={i} style={{ borderBottom:'1px solid rgba(179,135,40,0.1)',
                                           background: i%2===0 ? 'transparent' : 'rgba(179,135,40,0.02)' }}>
                        {[fmtDate(p.ts), p.device, p.browser, p.os,
                          p.city, p.country, p.route].map((cell, j) => (
                          <td key={j} style={{ padding:'9px 10px 9px 0',
                                               fontFamily:"'Playfair Display',serif",
                                               fontSize:12, color:'#0a192f', verticalAlign:'middle' }}>
                            {cell || '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {recent.length === 0 && (
                      <tr><td colSpan={7} style={{ padding:'20px 0', textAlign:'center',
                                                   fontStyle:'italic', color:'#9ca3af',
                                                   fontFamily:"'Playfair Display',serif" }}>
                        No plays recorded yet. Make sure FIREBASE_DB_URL is set in analyticsConfig.js
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {loading && (
          <div style={{ textAlign:'center', padding:60, fontFamily:"'Playfair Display',serif",
                        fontStyle:'italic', color:'#b38728', fontSize:16 }}>
            Loading analytics…
          </div>
        )}

        <div style={{ marginTop:20, textAlign:'center', fontFamily:"'Cinzel',serif",
                      fontSize:9, letterSpacing:'0.2em', color:'#b38728', opacity:0.5 }}>
          IBRAHIM & ZENAB · AUGUST 2026 · ANALYTICS
        </div>
      </div>
    </div>
  );
};

/* ── Main export ─────────────────────────────────────────────────── */
const AnalyticsPage = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <motion.div key="lock" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
          <PasswordScreen onUnlock={() => setUnlocked(true)} />
        </motion.div>
      ) : (
        <motion.div key="dash" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5 }}>
          <Dashboard />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnalyticsPage;
