import React, { forwardRef } from 'react';
import { Heart } from 'lucide-react';
import { IMAGES, COLORS } from './components';

const PdfGenerator = forwardRef(({ t, isArabic }, ref) => {
  // A4 size fixed pixel dimensions for high-quality capture
  const A4_WIDTH = '794px';
  const A4_HEIGHT = '1123px';
  
  const fontTitle = isArabic ? 'font-arabic' : 'font-calligraphy';
  const fontBody = isArabic ? 'font-arabic' : 'font-serif';

  // Reusable PDF Frame Component to ensure uniform design on both pages
  const PdfFrame = () => (
    <>
      {/* 1. Arabesque Pattern Background */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('${IMAGES.borderPattern}')`, backgroundRepeat: 'repeat' }}></div>
      
      {/* 2. Main Double Gold Border */}
      <div className="absolute inset-8 border-[3px] border-[#b38728] rounded-sm pointer-events-none z-20"></div>
      <div className="absolute inset-10 border-[1px] border-[#b38728] opacity-40 rounded-sm pointer-events-none z-20"></div>

      {/* 3. Static Floral Corners (Uniform on all pages) */}
      {[0, 90, 180, 270].map((rot) => (
        <svg 
          key={rot}
          viewBox="0 0 100 100" 
          className="absolute w-32 h-32 z-30 opacity-80" 
          style={{ 
            transform: `rotate(${rot}deg)`,
            top: rot === 0 || rot === 90 ? '20px' : 'auto',
            bottom: rot === 180 || rot === 270 ? '20px' : 'auto',
            left: rot === 0 || rot === 270 ? '20px' : 'auto',
            right: rot === 90 || rot === 180 ? '20px' : 'auto',
          }}
        >
          <path d="M10,10 C50,10 60,60 90,90" stroke="#1e3a8a" strokeWidth="2" fill="none" />
          <circle cx="90" cy="90" r="3" fill="#b38728" />
          <path d="M20,20 C50,20 30,80 80,80" stroke="#b38728" strokeWidth="1.5" fill="none" />
        </svg>
      ))}
    </>
  );

  const pageContainerStyle = {
    width: A4_WIDTH,
    height: A4_HEIGHT,
    backgroundColor: '#f8f5f0',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
      <div ref={ref}>
        
        {/* --- PDF PAGE 1: THE ROYAL COVER --- */}
        <div style={pageContainerStyle}>
           <PdfFrame />
           
           <div className="flex-1 flex flex-col items-center justify-center w-full p-20 z-10 text-center">
              <img 
                 src={IMAGES.bismillah}
                 alt="Bismillah" 
                 className="h-24 mb-12"
                 style={{ filter: 'brightness(0) saturate(100%) invert(56%) sepia(35%) saturate(735%) hue-rotate(6deg) brightness(92%) contrast(89%)' }}
              />

              <p className="text-[#b38728] font-bold uppercase tracking-[0.4em] mb-10 text-sm">
                In the Name of Allah, The Most Gracious, The Most Merciful
              </p>
              
              <div className="space-y-4">
                <h1 className={`text-[#1e3a8a] text-9xl ${fontTitle}`}>{t.groom_name}</h1>
                <div className="flex items-center justify-center gap-6 py-4">
                   <div className="h-[1px] w-12 bg-[#b38728]"></div>
                   <Heart size={40} fill="#b38728" className="text-[#b38728]" />
                   <div className="h-[1px] w-12 bg-[#b38728]"></div>
                </div>
                <h1 className={`text-[#1e3a8a] text-9xl ${fontTitle}`}>{t.bride_name}</h1>
              </div>

              <div className="mt-20">
                <div className="text-[#1e3a8a] uppercase tracking-[0.2em] font-bold border-y-2 border-[#b38728] py-4 px-16 text-2xl">
                   {t.events[0]?.date}
                </div>
              </div>
           </div>
        </div>

        {/* --- PDF PAGE 2: THE FORMAL INVITATION --- */}
        <div style={pageContainerStyle}>
            <PdfFrame />
            
            <div className="w-full h-full flex flex-col items-center pt-24 pb-16 px-20 z-10 relative">
                
                {/* Spiritual Message */}
                <div className="bg-[#b38728]/5 p-8 rounded-lg border border-[#b38728]/20 mb-10">
                  <p className={`text-[#1e3a8a] text-center leading-relaxed ${fontBody} text-lg italic`}>
                      "{t.spiritual_body}"
                  </p>
                </div>

                {/* Invite Line */}
                <p className="text-[#b38728] uppercase tracking-[0.3em] font-bold text-xs mb-6">
                  {t.invite_line}
                </p>

                <div className="flex items-center gap-6 mb-10">
                    <span className={`text-[#1e3a8a] text-6xl ${fontTitle}`}>{t.groom_name}</span>
                    <span className="text-[#b38728] text-3xl font-serif">&</span>
                    <span className={`text-[#1e3a8a] text-6xl ${fontTitle}`}>{t.bride_name}</span>
                </div>

                {/* Nikah Location Badge */}
                <div className="bg-[#1e3a8a] text-white px-10 py-3 rounded-sm shadow-lg border-b-4 border-[#b38728] mb-12 text-center">
                    <p className="text-sm uppercase tracking-widest font-bold">{t.nikah_loc}</p>
                </div>

                {/* Events Section */}
                <div className="w-full border-t border-b border-[#b38728]/30 py-8 mb-8 relative">
                    <h2 className={`text-[#1e3a8a] text-4xl mb-8 text-center ${fontTitle}`}>{t.events_title}</h2>
                    <div className="flex flex-col gap-4">
                        {t.events.map((evt, i) => (
                        <div key={i} className="flex justify-between items-center bg-white border-l-4 border-[#b38728] p-5 rounded shadow-sm">
                            <div>
                                <p className={`text-[#1e3a8a] text-2xl font-bold ${fontBody}`}>{evt.title}</p>
                                <p className="text-[#0a192f]/60 text-sm uppercase tracking-wide mt-1">{evt.loc}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[#b38728] font-bold text-lg">{evt.date}</p>
                                <p className="text-[#0a192f]/60 text-xs">{evt.time}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Footer Compliments */}
                <div className="mt-auto text-center">
                    <p className="text-[#b38728] text-xs uppercase tracking-widest mb-4 font-bold">With Best Compliments From:</p>
                    <div className="flex justify-center flex-wrap gap-x-8 gap-y-2">
                        {t.family_list.map((name, idx) => (
                        <span key={idx} className={`text-[#1e3a8a] text-xl ${fontTitle}`}>{name}</span>
                        ))}
                    </div>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
});

export default PdfGenerator;