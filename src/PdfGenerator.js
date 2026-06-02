import React, { forwardRef } from 'react';
import { Heart, MapPin } from 'lucide-react';
import { IMAGES } from './components';

/* ── Static confetti dots for PDF (matches web FallingConfetti colours/shapes) ── */
const CONFETTI = [
  { x:4,  y:6,  s:4, t:'diamond' }, { x:12, y:14, s:3, t:'circle'  },
  { x:22, y:3,  s:5, t:'square'  }, { x:35, y:10, s:3, t:'diamond' },
  { x:48, y:7,  s:4, t:'circle'  }, { x:60, y:4,  s:3, t:'square'  },
  { x:72, y:11, s:5, t:'diamond' }, { x:83, y:5,  s:3, t:'circle'  },
  { x:92, y:9,  s:4, t:'square'  }, { x:96, y:18, s:3, t:'diamond' },
  { x:8,  y:28, s:3, t:'circle'  }, { x:18, y:38, s:4, t:'diamond' },
  { x:88, y:32, s:3, t:'square'  }, { x:94, y:44, s:4, t:'circle'  },
  { x:5,  y:55, s:3, t:'diamond' }, { x:97, y:60, s:3, t:'square'  },
  { x:3,  y:72, s:4, t:'circle'  }, { x:95, y:74, s:3, t:'diamond' },
  { x:7,  y:84, s:3, t:'square'  }, { x:92, y:86, s:4, t:'circle'  },
  { x:15, y:92, s:5, t:'diamond' }, { x:30, y:95, s:3, t:'square'  },
  { x:50, y:97, s:4, t:'circle'  }, { x:68, y:94, s:3, t:'diamond' },
  { x:82, y:91, s:5, t:'square'  }, { x:42, y:88, s:3, t:'circle'  },
  { x:57, y:82, s:4, t:'diamond' }, { x:75, y:75, s:3, t:'square'  },
  { x:25, y:68, s:3, t:'circle'  }, { x:40, y:45, s:4, t:'diamond' },
];

const PdfConfetti = () => (
  <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:1 }}>
    {CONFETTI.map((p, i) => (
      <div key={i} style={{
        position:'absolute', left:`${p.x}%`, top:`${p.y}%`,
        width:p.s, height:p.s,
        backgroundColor:'#b38728',
        borderRadius: p.t==='circle' ? '50%' : '0',
        transform: p.t==='diamond' ? 'rotate(45deg)' : 'none',
        opacity: 0.55,
      }} />
    ))}
  </div>
);

/* ── Floral corner (static, no motion) ── */
const PdfFloralCorner = ({ rot, style }) => (
  <svg viewBox="0 0 120 120" style={{ position:'absolute', width:96, height:96, pointerEvents:'none', transform:`rotate(${rot}deg)`, ...style }}>
    <path d="M5,5 C60,5 70,70 110,110" stroke="#1e3a8a" strokeWidth="1.5" fill="none" />
    <path d="M18,5 C60,18 80,70 110,95" stroke="#b38728" strokeWidth="1" fill="none" opacity="0.7" />
    <path d="M5,18 C18,60 70,80 95,110" stroke="#b38728" strokeWidth="0.8" fill="none" opacity="0.5" />
    <circle cx="110" cy="110" r="4" fill="#b38728" />
    <circle cx="95"  cy="110" r="2.5" fill="#b38728" opacity="0.6" />
    <circle cx="110" cy="95"  r="2.5" fill="#b38728" opacity="0.6" />
  </svg>
);

/* ── Gold star divider ── */
const PdfGoldDivider = () => (
  <div style={{ display:'flex', alignItems:'center', width:'100%', margin:'14px 0' }}>
    <div style={{ flex:1, height:1, background:'linear-gradient(to right, transparent, #b38728)' }} />
    <svg width="26" height="26" viewBox="0 0 28 28" style={{ margin:'0 8px' }}>
      <path d="M14 2 L16 12 L26 14 L16 16 L14 26 L12 16 L2 14 L12 12 Z" fill="#b38728" opacity="0.85" />
      <circle cx="14" cy="14" r="3" fill="#f8f5f0" />
    </svg>
    <div style={{ flex:1, height:1, background:'linear-gradient(to left, transparent, #b38728)' }} />
  </div>
);

/* ── Arch SVG (same as FatemiArchSVG) ── */
const PdfArch = () => (
  <svg viewBox="0 0 400 600" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
    <path d="M 10,600 L 10,150 Q 10,10 200,10 Q 390,10 390,150 L 390,600" fill="none" stroke="#b38728" strokeWidth="2" />
    <path d="M 30,600 L 30,160 Q 30,30 200,30 Q 370,30 370,160 L 370,600" fill="none" stroke="#b38728" strokeWidth="1" opacity="0.4" />
  </svg>
);

/* ── Shared page frame ── */
const PAGE = { width:'794px', height:'1123px', backgroundColor:'#fdfbf7', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', fontFamily:"'Cinzel', serif" };
const BORDER_OUTER = { position:'absolute', inset:16, border:'2px solid #b38728', borderRadius:2, pointerEvents:'none', zIndex:5 };
const BORDER_INNER = { position:'absolute', inset:22, border:'1px solid #b38728', borderRadius:2, pointerEvents:'none', zIndex:5, opacity:0.35 };
const ARABESQUE   = { position:'absolute', inset:0, opacity:0.08, backgroundImage:`url('${IMAGES.borderPattern}')`, backgroundRepeat:'repeat', zIndex:0 };

const PdfGenerator = forwardRef(({ t, isArabic }, ref) => {
  const cal = isArabic ? "'Amiri', serif" : "'Great Vibes', cursive";
  const ser = isArabic ? "'Amiri', serif" : "'Playfair Display', serif";

  return (
    <div style={{ position:'fixed', left:'-9999px', top:0 }}>
      <div ref={ref}>

        {/* ════════════════════════════════════
            PAGE 1 — COVER
        ════════════════════════════════════ */}
        <div style={PAGE}>
          <div style={ARABESQUE} />
          <div style={BORDER_OUTER} />
          <div style={BORDER_INNER} />
          <PdfConfetti />
          <PdfFloralCorner rot={0}   style={{ top:16,    left:16    }} />
          <PdfFloralCorner rot={90}  style={{ top:16,    right:16   }} />
          <PdfFloralCorner rot={180} style={{ bottom:16, right:16   }} />
          <PdfFloralCorner rot={270} style={{ bottom:16, left:16    }} />
          <PdfArch />

          <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%', height:'100%', padding:'80px 60px', textAlign:'center', gap:0 }}>

            {/* Tagline */}
            <p style={{ color:'#b38728', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', fontSize:11, marginBottom:28, fontFamily:"'Cinzel', serif" }}>
              ✦ &nbsp; The Wedding Celebration Of &nbsp; ✦
            </p>

            {/* Heart logo */}
            <img src="/logo-heart.png" alt="Ibrahim & Zenab" style={{ width:240, height:'auto', marginBottom:20, filter:'drop-shadow(0 0 18px rgba(179,135,40,0.4))' }} crossOrigin="anonymous" />

            {/* Divider with heart */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <div style={{ height:1, width:56, background:'#b38728' }} />
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" fill="#b38728"/></svg>
              <div style={{ height:1, width:56, background:'#b38728' }} />
            </div>

            {/* Names */}
            <h1 style={{ fontFamily:cal, fontSize:72, color:'#1e3a8a', margin:0, lineHeight:1.1 }}>
              {t.groom_name} &amp; {t.bride_name}
            </h1>

            {/* Date */}
            <div style={{ marginTop:36, borderTop:'2px solid #b38728', borderBottom:'2px solid #b38728', padding:'12px 48px' }}>
              <p style={{ color:'#1e3a8a', fontFamily:"'Cinzel', serif", fontSize:18, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', margin:0 }}>
                {t.events[0]?.date}
              </p>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════
            PAGE 2 — INVITATION
        ════════════════════════════════════ */}
        <div style={PAGE}>
          <div style={ARABESQUE} />
          <div style={BORDER_OUTER} />
          <div style={BORDER_INNER} />
          <PdfConfetti />
          <PdfFloralCorner rot={0}   style={{ top:16,    left:16    }} />
          <PdfFloralCorner rot={90}  style={{ top:16,    right:16   }} />
          <PdfFloralCorner rot={180} style={{ bottom:16, right:16   }} />
          <PdfFloralCorner rot={270} style={{ bottom:16, left:16    }} />

          <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', width:'100%', height:'100%', padding:'72px 72px 60px', textAlign:'center' }}>

            {/* Bismillah */}
            <img src={IMAGES.bismillah} alt="Bismillah" crossOrigin="anonymous"
              style={{ height:60, objectFit:'contain', marginBottom:20,
                filter:'brightness(0) saturate(100%) invert(56%) sepia(35%) saturate(735%) hue-rotate(6deg) brightness(92%) contrast(89%)' }} />

            {/* Spiritual box */}
            <div style={{ background:'rgba(179,135,40,0.05)', border:'1px solid rgba(179,135,40,0.2)', borderRadius:8, padding:'20px 28px', marginBottom:10, width:'100%' }}>
              <p style={{ fontFamily:ser, fontSize:15, color:'#1e3a8a', fontStyle:'italic', lineHeight:1.75, margin:0 }}>
                {t.spiritual_body}
              </p>
            </div>

            <PdfGoldDivider />

            {/* Invite line */}
            <p style={{ fontFamily:ser, fontSize:13, color:'#b38728', fontWeight:700, letterSpacing:'0.06em', lineHeight:1.65, marginBottom:18, fontStyle:'italic' }}>
              {t.invite_line}
            </p>

            {/* Groom */}
            <h1 style={{ fontFamily:cal, fontSize:64, color:'#1e3a8a', margin:0, lineHeight:1 }}>
              {t.groom_name}
            </h1>

            {/* & */}
            <div style={{ display:'flex', alignItems:'center', gap:8, margin:'8px 0' }}>
              <div style={{ height:1, width:20, background:'rgba(179,135,40,0.5)' }} />
              <span style={{ fontFamily:ser, fontSize:22, color:'#b38728', fontStyle:'italic' }}>&amp;</span>
              <div style={{ height:1, width:20, background:'rgba(179,135,40,0.5)' }} />
            </div>

            {/* Bride */}
            <h1 style={{ fontFamily:cal, fontSize:64, color:'#1e3a8a', margin:0, lineHeight:1 }}>
              {t.bride_name}
            </h1>

            {/* Bride parents */}
            <p style={{ fontFamily:ser, fontSize:13, color:'#b38728', fontWeight:700, fontStyle:'italic', letterSpacing:'0.05em', margin:'12px 0 0' }}>
              {t.bride_parents_line}
            </p>

            <PdfGoldDivider />

            {/* Nikah location badge */}
            <div style={{ background:'#1e3a8a', color:'white', borderRadius:4, border:'1px solid #b38728', padding:'12px 28px', boxShadow:'0 4px 16px rgba(179,135,40,0.25)', width:'100%' }}>
              <p style={{ fontFamily:"'Cinzel', serif", fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', margin:0 }}>
                <span style={{ color:'#b38728', marginRight:8 }}>✦</span>
                {t.nikah_loc}
              </p>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════
            PAGE 3 — EVENTS & FAMILY
        ════════════════════════════════════ */}
        <div style={PAGE}>
          <div style={ARABESQUE} />
          <div style={BORDER_OUTER} />
          <div style={BORDER_INNER} />
          <PdfConfetti />
          <PdfFloralCorner rot={0}   style={{ top:16,    left:16    }} />
          <PdfFloralCorner rot={90}  style={{ top:16,    right:16   }} />
          <PdfFloralCorner rot={180} style={{ bottom:16, right:16   }} />
          <PdfFloralCorner rot={270} style={{ bottom:16, left:16    }} />

          <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', width:'100%', height:'100%', padding:'72px 72px 60px', textAlign:'center' }}>

            {/* Events title */}
            <h2 style={{ fontFamily:cal, fontSize:52, color:'#1e3a8a', margin:'0 0 4px' }}>
              {t.events_title}
            </h2>

            <PdfGoldDivider />

            {/* Event cards */}
            <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:14, marginBottom:8 }}>
              {t.events.map((evt, i) => (
                <div key={i} style={{ display:'flex', alignItems:'stretch', background:'white', border:'1px solid rgba(179,135,40,0.25)', borderRadius:8, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
                  {/* Blue date box */}
                  <div style={{ background:'#1e3a8a', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:88, padding:'18px 14px', position:'relative', overflow:'hidden' }}>
                    <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle, rgba(179,135,40,0.25) 0%, transparent 70%)' }} />
                    <span style={{ fontFamily:ser, fontSize:18, fontWeight:700, color:'#f0c040', letterSpacing:'0.03em', lineHeight:1.3, position:'relative', zIndex:1, textAlign:'center' }}>
                      {evt.date}
                    </span>
                  </div>
                  {/* Right: title + venue */}
                  <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', textAlign:'left', padding:'18px 24px', flex:1 }}>
                    <h3 style={{ fontFamily:ser, fontSize:22, fontWeight:700, color:'#1e3a8a', margin:'0 0 6px', lineHeight:1.2 }}>
                      {evt.title}
                    </h3>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#b38728"/>
                      </svg>
                      <span style={{ fontFamily:ser, fontSize:13, fontWeight:700, color:'#b38728', letterSpacing:'0.02em' }}>
                        {evt.loc}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <PdfGoldDivider />

            {/* Compliments */}
            <p style={{ fontFamily:"'Cinzel', serif", fontSize:10, color:'#b38728', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.18em', margin:'0 0 18px' }}>
              {t.compliments_title}
            </p>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
              {t.family_list.map((name, idx) => {
                const isHighlight = name.toLowerCase().includes('hussaina');
                return (
                  <span key={idx} style={{
                    fontFamily: ser,
                    fontSize: isHighlight ? 15 : 13,
                    fontStyle: 'italic',
                    fontWeight: isHighlight ? 700 : 400,
                    color: isHighlight ? '#b38728' : '#1e3a8a',
                    lineHeight: 1.5,
                    letterSpacing: isHighlight ? '0.04em' : '0.01em',
                  }}>
                    {name}
                  </span>
                );
              })}
            </div>

            {/* Footer ornament */}
            <div style={{ marginTop:'auto', paddingTop:24 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ height:1, width:80, background:'linear-gradient(to right, transparent, #b38728)' }} />
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" fill="#b38728"/></svg>
                <div style={{ height:1, width:80, background:'linear-gradient(to left, transparent, #b38728)' }} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
});

PdfGenerator.displayName = 'PdfGenerator';
export default PdfGenerator;