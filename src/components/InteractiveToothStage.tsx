import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Check, RefreshCw, Eye, ShieldCheck, Microscope } from 'lucide-react';
import { TREATMENTS } from '../data/clinicData';
import { TreatmentType } from '../types';
import { playSparkle, playPop, playSoftClick } from '../utils/soundEffects';

interface InteractiveToothStageProps {
  onSelectTreatmentForBooking: (treatmentName: string) => void;
}

export const InteractiveToothStage: React.FC<InteractiveToothStageProps> = ({
  onSelectTreatmentForBooking,
}) => {
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentType>('implants');
  const [animKey, setAnimKey] = useState(0);

  const currentInfo = TREATMENTS.find((t) => t.id === selectedTreatment) || TREATMENTS[0];

  const handleSelectTreatment = (id: TreatmentType) => {
    if (id !== selectedTreatment) {
      setSelectedTreatment(id);
      setAnimKey((prev) => prev + 1);
      playPop();
      if (id === 'whitening' || id === 'implants') {
        setTimeout(() => playSparkle(), 300);
      }
    }
  };

  const handleReplay = () => {
    setAnimKey((prev) => prev + 1);
    playPop();
    setTimeout(() => playSparkle(), 250);
  };

  return (
    <section id="interactive-stage" className="relative py-10 sm:py-16 px-3 sm:px-6 lg:px-8 overflow-hidden z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#415A77]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Title with Animated Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-10"
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#293549] bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-full mb-2.5 shadow-xs font-['Outfit',sans-serif]">
            <Microscope className="w-3.5 h-3.5 text-amber-600" />
            CLINICAL PROCEDURAL VISUALIZATION
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#293549] font-['Outfit',sans-serif] tracking-tight">
            See How Each <span className="text-[#C58B1B] font-black">Surgery & Treatment</span> Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">
            Photorealistic medical visualizations illustrating exact clinical surgical steps performed at Dr Deepals Clinic.
          </p>
        </motion.div>

        {/* Treatment Selector Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, type: 'spring', damping: 14, stiffness: 180 }}
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mb-6 sm:mb-8"
        >
          {TREATMENTS.map((treatment) => {
            const isSelected = selectedTreatment === treatment.id;
            return (
              <motion.button
                key={treatment.id}
                id={`treatment-tab-${treatment.id}`}
                onClick={() => handleSelectTreatment(treatment.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: isSelected ? 1.04 : 0.96,
                }}
                transition={{ type: 'spring', damping: 14, stiffness: 180 }}
                className={`relative px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black tracking-wider transition-all duration-300 font-['Outfit',sans-serif] cursor-pointer select-none border ${
                  isSelected
                    ? 'gold-cta-btn animate-gold-shimmer shadow-md border-amber-400 z-10 text-[#0B1528]'
                    : 'bg-[#293549] text-white hover:bg-[#364660] border-2 border-white/40 shadow-xs'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#0B1528] animate-pulse" />}
                  {treatment.name}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Central Visual Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.15, type: 'spring', damping: 16, stiffness: 200 }}
          className="relative bg-[#293549] rounded-[28px] sm:rounded-[44px] border-2 border-[#293549] ring-1 ring-white/20 shadow-[0_20px_60px_rgba(15,25,40,0.22)] p-4 sm:p-8 lg:p-10 overflow-hidden text-white"
        >
          {/* Subtle Stage Lighting */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

          {/* High-Definition Surgical Visualization Screen */}
          <div className="relative rounded-[22px] sm:rounded-[32px] overflow-hidden bg-slate-950 border-2 border-white/20 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedTreatment}-${animKey}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-[320px] sm:h-[460px] md:h-[520px] flex items-center justify-center overflow-hidden"
              >
                {/* Photorealistic Procedure Image */}
                <img
                  src={currentInfo.imageSrc}
                  alt={`${currentInfo.name} Surgical Visualization`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none pointer-events-none filter contrast-[1.05] brightness-[1.02]"
                />

                {/* Subtle cinematic gradient vignette for surgical context */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40 pointer-events-none" />

                {/* Interactive Procedural HUD Overlay */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-black uppercase font-['Outfit',sans-serif] tracking-wider shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    LIVE SURGICAL VISUALIZATION
                  </span>
                  {currentInfo.surgicalHighlight && (
                    <span className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/80 backdrop-blur-md border border-amber-300 text-slate-950 text-[10px] sm:text-xs font-black uppercase font-['Outfit',sans-serif] tracking-wider shadow-sm">
                      <Zap className="w-3 h-3" />
                      {currentInfo.surgicalHighlight}
                    </span>
                  )}
                </div>

                {/* Replay Demo Button */}
                <button
                  id="replay-animation-btn"
                  onClick={handleReplay}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 bg-black/60 hover:bg-black/80 text-white px-3.5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold backdrop-blur-md border border-white/30 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                  title="Re-focus visualization"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
                  <span>Re-Focus View</span>
                </button>

                {/* Bottom Clinical Specs Bar */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
                  <div>
                    <span className="text-[10px] sm:text-xs font-black text-amber-300 uppercase tracking-widest block font-['Outfit',sans-serif]">
                      {currentInfo.badge} · {currentInfo.duration}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-extrabold font-['Outfit',sans-serif] tracking-tight text-white drop-shadow-md">
                      {currentInfo.tagline}
                    </h3>
                  </div>

                  {/* Procedural Benefits Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {currentInfo.benefits.map((benefit, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/30 text-white"
                      >
                        <Check className="w-3 h-3 text-emerald-300" />
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Treatment Description & Action Footer */}
          <div className="mt-6 pt-6 border-t border-white/25 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-1 text-left max-w-xl">
              <h4 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                Clinical Precision at Malabar Hill
              </h4>
              <p className="text-xs sm:text-sm text-blue-50 font-medium leading-relaxed">
                {currentInfo.shortDesc}
              </p>
            </div>

            {/* Action Button */}
            <motion.button
              id="book-this-treatment-btn"
              onClick={() => onSelectTreatmentForBooking(currentInfo.name)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="inline-flex items-center justify-center gap-2 gold-cta-btn animate-gold-shimmer text-xs sm:text-sm px-7 py-3.5 sm:py-4 rounded-full shadow-xl transition-all shrink-0 font-['Outfit',sans-serif] cursor-pointer tracking-wider uppercase text-[#0B1528] font-black w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-[#0B1528]" />
              <span>Book {currentInfo.name} Consultation</span>
              <span className="text-base font-black">↗</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
