import React from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, Calendar } from 'lucide-react';
import { FloralCorner } from './components';

const Page3 = ({ t, isArabic, handleDownloadPDF, isGeneratingPdf }) => {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center p-4">
      
      <div className="relative w-full max-w-lg bg-[#fdfbf7] shadow-2xl border border-[#b38728]/30 p-6 md:p-8 rounded-sm overflow-hidden flex flex-col h-auto min-h-[500px]">
        
        <FloralCorner rotate={180} style={{ top: 0, right: 0 }} />
        <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />

        {/* Header */}
        <div className="text-center z-10 mb-6 mt-2">
            <h2 className={`text-[#1e3a8a] text-4xl ${isArabic ? 'font-arabic font-bold' : 'font-calligraphy'}`}>
              {t.events_title}
            </h2>
            <div className="w-12 h-[2px] bg-[#b38728] mx-auto mt-2"></div>
        </div>

        {/* Events List - Added Background Styling */}
        <div className="flex-1 flex flex-col gap-3 z-10 px-1 overflow-y-auto">
          {t.events.map((evt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              // ADDED BG COLOR HERE
              className="bg-white border-l-[4px] border-[#b38728] shadow-sm p-4 rounded-r-md flex justify-between items-center relative overflow-hidden"
            >
               {/* Subtle texture inside card */}
               <div className="absolute inset-0 bg-[#b38728]/5 pointer-events-none"></div>
               
               <div className="relative z-10">
                  <h3 className={`text-[#1e3a8a] text-lg font-bold ${isArabic ? 'font-arabic' : 'font-serif'}`}>
                    {evt.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[#0a192f]/60 text-[10px] uppercase tracking-wide mt-1">
                     <MapPin size={10} className="text-[#b38728]" /> {evt.loc}
                  </div>
               </div>
               <div className="text-right relative z-10">
                  <div className="text-[#b38728] font-bold text-xs bg-[#b38728]/10 border border-[#b38728]/20 px-2 py-1 rounded inline-block">
                     {evt.date}
                  </div>
                  <div className="text-[#0a192f]/40 text-[10px] mt-1">{evt.time}</div>
               </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 z-10 text-center space-y-4">
           <div>
              <p className="text-[#b38728] text-[10px] uppercase tracking-widest mb-2 font-bold">{t.compliments_title}</p>
              <div className="flex flex-wrap justify-center gap-3">
                 {t.family_list.map((name, idx) => (
                    <span key={idx} className={`text-[#1e3a8a] text-sm opacity-90 ${isArabic ? 'font-arabic' : 'font-serif italic'}`}>
                       {name}
                    </span>
                 ))}
              </div>
           </div>

           <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="group relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-[#b38728] transition duration-300 ease-out border border-[#b38728] rounded-full shadow-md hover:text-white"
           >
              <span className="absolute inset-0 w-full h-full bg-[#b38728] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                 {isGeneratingPdf ? 'Saving...' : <><Download size={14} /> {t.download_btn}</>}
              </span>
           </button>
        </div>

      </div>
    </div>
  );
};

export default Page3;