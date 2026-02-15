import React, { forwardRef } from 'react';
import { Heart } from 'lucide-react';

const PdfGenerator = forwardRef(({ t, isArabic }, ref) => {
  // A4 size at 96 DPI is approx 794px x 1123px. 
  // We use a fixed container to ensure html2canvas captures exactly this layout.
  const A4_WIDTH = '794px';
  const A4_HEIGHT = '1123px';
  
  const commonStyles = {
    width: A4_WIDTH,
    height: A4_HEIGHT,
    backgroundColor: '#FDFBF7', // Cream
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px',
    borderBottom: '1px solid #ddd' // Just for dev visualization
  };

  const fontTitle = isArabic ? 'font-arabic' : 'font-calligraphy';
  const fontBody = isArabic ? 'font-arabic' : 'font-serif';

  return (
    <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
      <div ref={ref}>
        
        {/* --- PDF PAGE 1: COVER --- */}
        <div style={commonStyles}>
           {/* Background Pattern */}
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/arabesque.png')` }}></div>
           
           {/* Decorative Border Box */}
           <div className="w-full h-full border-[4px] border-double border-[#D4AF37] flex flex-col items-center justify-center p-12 relative z-10">
              <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/2/27/Basmala.svg" 
                 alt="Bismillah" 
                 className="h-16 mb-12 opacity-80"
                 style={{ filter: 'invert(16%) sepia(30%) saturate(1000%) hue-rotate(10deg) brightness(95%) contrast(90%)' }}
              />

              <p className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] mb-12 text-sm">The Wedding Of</p>
              
              <h1 className={`text-[#0F172A] text-8xl mb-6 ${fontTitle}`}>{t.groom_name}</h1>
              <Heart size={32} fill="#D4AF37" className="text-[#D4AF37] my-4" />
              <h1 className={`text-[#0F172A] text-8xl mt-6 ${fontTitle}`}>{t.bride_name}</h1>

              <div className="mt-16 text-[#0F172A] uppercase tracking-widest font-bold border-t border-b border-[#D4AF37] py-2 px-8">
                 {t.events[0]?.date}
              </div>
           </div>
        </div>

        {/* --- PDF PAGE 2: DETAILS & TIMELINE --- */}
        <div style={commonStyles}>
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/arabesque.png')` }}></div>

           {/* Content Wrapper */}
           <div className="w-full flex-1 flex flex-col items-center z-10 pt-8">
              
              {/* Intro Text */}
              <p className={`text-[#0F172A] text-center w-3/4 leading-loose mb-12 ${fontBody} text-lg`}>
                 {t.spiritual_body}
              </p>

              {/* Invitation Line */}
              <p className="text-[#D4AF37] font-bold uppercase tracking-[0.2em] mb-8 text-sm">{t.invite_line}</p>
              
              {/* Couple Names (Smaller) */}
              <div className="flex items-center gap-4 mb-12">
                 <span className={`text-[#0F172A] text-5xl ${fontTitle}`}>{t.groom_name}</span>
                 <span className="text-[#D4AF37] text-2xl">&</span>
                 <span className={`text-[#0F172A] text-5xl ${fontTitle}`}>{t.bride_name}</span>
              </div>

              {/* Divider */}
              <div className="w-full h-[2px] bg-[#D4AF37] opacity-30 mb-12"></div>

              {/* Events List */}
              <h2 className={`text-[#0F172A] text-4xl mb-8 ${fontTitle}`}>{t.events_title}</h2>
              <div className="w-full flex flex-col gap-6 px-12">
                 {t.events.map((evt, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-4">
                       <div>
                          <p className={`text-[#0F172A] text-2xl font-bold ${fontBody}`}>{evt.title}</p>
                          <p className="text-[#0F172A]/60 text-sm uppercase tracking-wide mt-1">{evt.loc}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[#D4AF37] font-bold text-lg">{evt.date}</p>
                          <p className="text-[#0F172A]/60 text-sm">{evt.time}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Footer */}
           <div className="mt-auto w-full text-center pb-8">
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-4 font-bold">{t.compliments_title}</p>
              <div className="flex justify-center gap-8">
                 {t.family_list.map((name, idx) => (
                    <span key={idx} className={`text-[#0F172A] text-xl ${fontTitle}`}>{name}</span>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
});

export default PdfGenerator;