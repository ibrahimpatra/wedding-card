// PdfGenerator.js
import React from 'react';
import { Heart } from 'lucide-react';

// Use the same assets passed from parent
export const PdfHiddenContent = React.forwardRef(({ t, isArabic, images, ConfettiComponent, BorderComponent, ArchComponent, FloralComponent }, ref) => {
  
  // A4 Styles: Fixed pixel width for 72/96 DPI consistency
  const pageStyle = {
    width: '794px', // A4 width at 96dpi
    height: '1123px', // A4 height at 96dpi
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f5f0',
    overflow: 'hidden',
    pageBreakAfter: 'always'
  };

  return (
    <div ref={ref}>
      {/* --- PAGE 1: COVER --- */}
      <div style={pageStyle}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${images.archPattern}')` }} />
        <ConfettiComponent isStatic={true} />
        
        <div className="h-full flex flex-col items-center justify-center p-12 relative z-10">
          <ArchComponent showInner={false} className="opacity-100" />
          <FloralComponent rotate={0} style={{ top: 0, left: 0 }} />
          <FloralComponent rotate={90} style={{ top: 0, right: 0 }} />
          <FloralComponent rotate={180} style={{ bottom: 0, right: 0 }} />
          <FloralComponent rotate={270} style={{ bottom: 0, left: 0 }} />

          <div className="text-center mt-32 z-20">
            <p className="text-[#b38728] font-bold tracking-widest uppercase text-lg mb-12">The Wedding Celebration Of</p>
            <h1 className={`text-[#1e3a8a] text-8xl my-8 ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}>{t.groom_name}</h1>
            <div className="flex justify-center items-center gap-6 my-6">
               <div className="h-[3px] bg-[#b38728] w-24"></div>
               <Heart size={40} fill="#b38728" className="text-[#b38728]" />
               <div className="h-[3px] bg-[#b38728] w-24"></div>
            </div>
            <h1 className={`text-[#1e3a8a] text-8xl my-8 ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}>{t.bride_name}</h1>
          </div>
        </div>
      </div>

      {/* --- PAGE 2: INVITE DETAILS --- */}
      <div style={pageStyle}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${images.archPattern}')` }} />
        <div className="h-full flex flex-col relative z-10 p-16">
          <BorderComponent className="absolute top-12 left-12 right-12 z-20" />
          
          <div className="mt-12 flex-1 border-4 border-[#b38728] bg-white/80 p-12 rounded-xl flex flex-col items-center justify-between shadow-sm">
            <div className="w-full text-center">
              <img src={images.bismillah} alt="Bismillah" className="h-32 mx-auto object-contain mb-8 filter-gold" />
              <p className={`text-[#0f1f4b] font-serif text-xl px-8 mt-4 leading-loose ${isArabic ? 'text-justify' : 'text-center'}`}>
                {t.spiritual_body}
              </p>
              <p className={`text-[#b38728] font-bold uppercase tracking-widest text-2xl mt-12 ${isArabic ? 'font-arabic' : 'font-serif'}`}>
                {t.invite_line}
              </p>
            </div>

            <div className="text-center py-8">
              <h1 className={`text-[#1e3a8a] text-7xl ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}>{t.groom_name}</h1>
              <p className="text-[#b38728] text-4xl my-4">&</p>
              <h1 className={`text-[#1e3a8a] text-7xl ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}>{t.bride_name}</h1>
              <p className="text-[#0a192f] text-lg font-bold uppercase tracking-wider mt-8">{t.bride_parents_line}</p>
            </div>

            <div className="w-full bg-[#1e3a8a] text-white p-6 text-center rounded-lg mt-8">
              <p className={`text-[#fcf6ba] font-semibold text-xl uppercase tracking-widest leading-relaxed`}>
                {t.nikah_loc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- PAGE 3: EVENTS --- */}
      <div style={pageStyle}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${images.archPattern}')` }} />
        <div className="h-full flex flex-col relative z-10 p-20">
          <FloralComponent rotate={180} style={{ top: 0, right: 0 }} />
          <FloralComponent rotate={270} style={{ bottom: 0, left: 0 }} />
          
          <div className="text-center mb-16">
            <h2 className={`text-[#1e3a8a] text-7xl ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}>{t.events_title}</h2>
            <div className="w-32 h-[4px] bg-[#b38728] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="flex flex-col gap-8 mt-8">
            {t.events.map((evt, i) => (
              <div key={i} className="bg-white border-l-8 border-[#b38728] p-8 shadow-sm flex items-center gap-8 rounded-r-xl">
                <div className="bg-[#1e3a8a] text-white px-6 py-4 rounded-lg font-bold text-2xl w-48 text-center shrink-0">
                  {evt.date}
                </div>
                <div>
                  <h3 className={`text-[#1e3a8a] font-bold text-4xl mb-2 ${isArabic ? 'font-arabic' : 'font-serif'}`}>{evt.title}</h3>
                  <p className="text-xl text-gray-600 flex gap-4 mt-2 font-serif uppercase tracking-wider">
                    <span>{evt.time}</span> • <span>{evt.loc}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- PAGE 4: COMPLIMENTS --- */}
      <div style={pageStyle}>
        <div className="h-full flex flex-col items-center justify-center p-20 bg-[#0a192f] text-white relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${images.borderPattern}')` }}></div>
          
          <div className="z-10 w-full border-4 border-[#b38728] p-16 rounded-xl bg-[#0a192f]/95 text-center">
            <Heart className="mx-auto text-[#b38728] mb-12" size={64} fill="#b38728" />
            <h3 className={`text-[#fcf6ba] mb-16 font-bold ${isArabic ? 'text-5xl font-arabic' : 'text-4xl font-serif uppercase tracking-widest'}`}>
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
      </div>
    </div>
  );
});