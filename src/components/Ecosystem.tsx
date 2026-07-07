import { useState } from "react";
import { ECOSYSTEM_PILLARS } from "../data";
import { ChevronRight, Cpu, DollarSign, ShieldAlert, Zap, Globe, MessageSquareCode } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Ecosystem() {
  const [selectedId, setSelectedId] = useState<string>("fintech");

  const getPillarIcon = (id: string) => {
    switch (id) {
      case "fintech":
        return <DollarSign className="w-5 h-5 text-[#33ccff]" />;
      case "regtech":
        return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      case "climatetech":
        return <Zap className="w-5 h-5 text-emerald-400" />;
      case "connectivity":
        return <Globe className="w-5 h-5 text-sky-400" />;
      case "ai-automation":
        return <MessageSquareCode className="w-5 h-5 text-purple-400" />;
      default:
        return <Cpu className="w-5 h-5 text-slate-400" />;
    }
  };

  const activePillar = ECOSYSTEM_PILLARS.find((p) => p.id === selectedId) || ECOSYSTEM_PILLARS[0];

  return (
    <section id="ecosystem" className="py-24 bg-slate-950/40 border-t border-slate-900 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#33ccff]/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#33ccff] bg-[#33ccff]/5 px-3 py-1 rounded-full border border-[#33ccff]/10">
            Pillars of Operation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-4">
            The Five-Pillar Operational Ecosystem
          </h2>
          <p className="mt-4 text-slate-400 font-sans">
            Engineered to bridge informal trade bottlenecks and bring critical infrastructure to the next billion enterprise users offline.
          </p>
        </div>

        {/* Modular Tabs and Detailed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Vertical Selection Rail */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {ECOSYSTEM_PILLARS.map((pillar) => {
              const isSelected = selectedId === pillar.id;
              return (
                <button
                  key={pillar.id}
                  id={`pillar-tab-${pillar.id}`}
                  onClick={() => setSelectedId(pillar.id)}
                  className={`flex items-center justify-between p-4.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#070840] border-[#33ccff]/40 shadow-md shadow-[#33ccff]/5"
                      : "bg-slate-900/40 border-slate-800 hover:bg-slate-900/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-mono text-[#33ccff]/60 font-bold">
                      {pillar.number}
                    </span>
                    <div className={`p-2.5 rounded-lg ${isSelected ? "bg-[#33ccff]/10" : "bg-slate-950"}`}>
                      {getPillarIcon(pillar.id)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm tracking-wide">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      isSelected ? "text-[#33ccff] translate-x-1" : "text-slate-600"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Interactive Core Display Card */}
          <div className="lg:col-span-7 bg-[#070840] border border-[#33ccff]/20 rounded-2xl p-6 sm:p-8 min-h-[460px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#33ccff]/5 rounded-full blur-[60px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  {/* Card Header metadata */}
                  <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className="bg-[#33ccff]/10 p-2.5 rounded-lg">
                        {getPillarIcon(activePillar.id)}
                      </div>
                      <div>
                        <span className="text-xs font-mono uppercase text-[#33ccff] tracking-widest font-semibold">
                          PILLAR {activePillar.number}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">
                          {activePillar.title}
                        </h3>
                      </div>
                    </div>
                    <div className="hidden sm:block text-right">
                      <span className="text-xs font-mono text-slate-500 uppercase">Architecture Status</span>
                      <div className="text-xs font-semibold text-emerald-400 flex items-center justify-end space-x-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>Active Deployment</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Description */}
                  <div className="mt-6">
                    <p className="text-[#33ccff] text-xs font-mono font-medium uppercase tracking-wide">
                      {activePillar.subtitle}
                    </p>
                    <p className="text-slate-300 font-sans mt-2.5 leading-relaxed text-sm sm:text-base">
                      {activePillar.description}
                    </p>
                  </div>

                  {/* Technical Specifications Checklist */}
                  <div className="mt-6">
                    <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold mb-3">
                      Engineering Specs:
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activePillar.technicalSpecs.map((spec, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-slate-400">
                          <span className="text-[#33ccff] font-mono mt-0.5">▪</span>
                          <span className="font-sans leading-normal">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Key Metrics Footnote */}
                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 bg-slate-950/60 px-4 py-3 rounded-xl border border-slate-800 w-full sm:w-auto">
                    <div className="text-2xl font-extrabold text-[#33ccff] font-mono leading-none">
                      {activePillar.impactMetric}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {activePillar.impactLabel}
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-500 font-mono text-center sm:text-right w-full sm:w-auto">
                    Security Standard: SHA-256 Ledger Autonomy
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
