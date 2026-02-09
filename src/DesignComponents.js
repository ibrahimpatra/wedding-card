import React from 'react';
import { Heart, Clock, MapPin } from 'lucide-react';

// Re-using the same images for consistency
const IMAGES = {
  // Replace these with your local paths or hosted URLs if needed
  bg: "https://i.ibb.co/qLZHKxLm/download.png", 
  archPattern: "https://img.sanishtech.com/u/a9518ef80b35f2ff572ebc6f078f6f61.png",
  borderPattern: "https://www.transparenttextures.com/patterns/arabesque.png",
  bismillah: "https://i.ibb.co/PZb45z9p/Gemini-Generated-Image-8fmttb8fmttb8fmt-removebg-preview.png"
};

// --- PDF SPECIFIC SUB-COMPONENTS ---

const PdfFloralCorner = ({ rotate = 0, style }) => (
  <svg viewBox="0 0 100 100" className="absolute w-48 h-48 z-10 pointer-events-none" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M0,0 Q60,0 100,100 L0,100 Z" fill="#1e3a8a" opacity="0.1" />
    <path d="M10,10 C50,10 60,90 90,90" stroke="#1e3a8a" strokeWidth="2" fill="none" />
    <circle cx="90" cy="90" r="4" fill="#b38728" />
    <path d="M20,20 C50,20 30,80 80,80" stroke="#b38728" strokeWidth="1.5" fill="none" />
  </svg>
);

const PdfFatemiBorder = () => (
  <div className={`h-8 w-full bg-[url('${IMAGES.borderPattern}')] opacity-60 border-y-2 border-[#b38728]`}></div>
);

// --- MAIN PDF COMPONENT ---

export const PdfHiddenContent = React.forwardRef(({ t, isArabic }, ref) => {
  // A4 Dimensions in Pixels (at 96 DPI approx, but we scale up for quality)
  // We use fixed pixels here to guarantee the layout doesn't break during generation
  const styles = {
    page: { width: '794px', height: '1123px', position: 'relative', overflow: 'hidden', backgroundColor: '#f8f5f0', display: 'flex', flexDirection: 'column' },
    bgPattern: { position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: `url('${IMAGES.archPattern}')` } // Light background
  };

  return (
    <div ref={ref}>
      {[0, 1, 2, 3].map((pageId) => (
        <div key={pageId} style={styles.page}>
          {/* Static Background Layer */}
          <div style={styles.bgPattern} />
          
          {/* Corner Decorations (Present on all pages for consistency in PDF) */}
          <PdfFloralCorner rotate={0} style={{ top: 0, left: 0 }} />
          <PdfFloralCorner rotate={90} style={{ top: 0, right: 0 }} />
          <PdfFloralCorner rotate={180} style={{ bottom: 0, right: 0 }} />
          <PdfFloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />

          {/* PAGE 1: COVER */}
          {pageId === 0 && (
            <div className="h-full flex flex-col items-center justify-center p-16 relative z-10">
              <div className="border-4 border-double border-[#b38728] h-full w-full flex flex-col items-center justify-center p-8 rounded-xl">
                 <p className="text-[#b38728] font-bold tracking-widest uppercase text-xl mb-12">The Wedding Celebration Of</p>
                 <h1 className={`text-[#1e3a8a] text-8xl my-8 ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}>{t.groom_name}</h1>
                 <Heart size={40} fill="#b38728" className="text-[#b38728] my-4" />
                 <h1 className={`text-[#1e3a8a] text-8xl my-8 ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}>{t.bride_name}</h1>
              </div>
            </div>
          )}

          {/* PAGE 2: INVITE */}
          {pageId === 1 && (
            <div className="h-full flex flex-col relative z-10 p-12">
               <div className="mt-12 w-full"><PdfFatemiBorder /></div>
               
               <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <img src={IMAGES.bismillah} alt="Bismillah" className="h-24 object-contain mb-8 filter-gold" />
                  
                  <p className={`text-[#0f1f4b] font-semibold text-xl px-12 leading-loose ${isArabic ? 'text-justify' : 'text-center'}`}>
                    {t.spiritual_body}
                  </p>
                  
                  <p className="text-[#b38728] font-bold uppercase tracking-widest text-2xl mt-12 mb-8">
                    {t.invite_line}
                  </p>

                  <div className="py-8 border-y border-[#b38728]/30 w-full">
                    <h1 className={`text-[#1e3a8a] text-6xl ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}>{t.groom_name}</h1>
                    <span className="text-[#b38728] text-3xl block my-2">&</span>
                    <h1 className={`text-[#1e3a8a] text-6xl ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}>{t.bride_name}</h1>
                  </div>

                  <p className="text-[#0a192f] text-sm font-bold uppercase tracking-wider mt-8">{t.bride_parents_line}</p>
               </div>

               <div className="mb-12 w-full bg-[#1e3a8a] text-white p-6 text-center rounded-lg">
                  <p className="text-[#fcf6ba] text-xl font-bold uppercase">{t.nikah_loc}</p>
               </div>
            </div>
          )}

          {/* PAGE 3: PROGRAMS */}
          {pageId === 2 && (
            <div className="h-full flex flex-col relative z-10 p-16">
              <div className="text-center mb-16">
                <h2 className={`text-[#1e3a8a] text-7xl ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}>{t.events_title}</h2>
                <div className="w-32 h-1 bg-[#b38728] mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="flex flex-col gap-8">
                {t.events.map((evt, i) => (
                  <div key={i} className="bg-white border-l-8 border-[#b38728] p-8 shadow-md flex items-center gap-8 rounded-r-xl">
                    <div className="bg-[#1e3a8a] text-white w-24 h-24 rounded-full flex items-center justify-center font-bold text-2xl shadow-lg border-2 border-[#d4af37]">
                      {evt.date.split(' ')[0]}
                    </div>
                    <div>
                      <h3 className={`text-[#1e3a8a] font-bold text-4xl mb-2 ${isArabic ? 'font-arabic' : 'font-serif'}`}>{evt.title}</h3>
                      <div className="text-xl text-gray-600 flex gap-6 mt-2">
                        <span className="flex items-center gap-2"><Clock size={20} className="text-[#b38728]"/> {evt.time}</span>
                        <span className="flex items-center gap-2"><MapPin size={20} className="text-[#b38728]"/> {evt.loc}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 4: COMPLIMENTS */}
          {pageId === 3 && (
            <div className="h-full flex flex-col items-center justify-center p-16 bg-[#0a192f] text-white relative">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${IMAGES.borderPattern}')` }}></div>
              <div className="z-10 w-full border-4 border-[#b38728] p-16 rounded-2xl bg-[#0a192f]/95 text-center shadow-2xl">
                <Heart className="mx-auto text-[#b38728] mb-8" size={64} fill="#b38728" />
                <h3 className={`text-[#fcf6ba] mb-12 font-bold ${isArabic ? 'text-5xl font-arabic' : 'text-4xl font-serif uppercase tracking-widest'}`}>
                  {t.compliments_title}
                </h3>
                <div className="flex flex-col gap-6">
                  {t.family_list.map((name, idx) => (
                    <div key={idx} className={`text-white text-3xl opacity-90 ${isArabic ? 'font-arabic' : 'font-serif'}`}>
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});