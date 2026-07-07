import { useGlossary } from "./GlossaryContext";
import { X, BookOpen, Sparkles, Database, AlertTriangle, ArrowRight, Brain, Milestone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function GlossarySidebar() {
  const { isOpen, termData, isLoading, error, openTerm, closeGlossary } = useGlossary();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeGlossary}
            className="fixed inset-0 bg-slate-950/80 z-40 backdrop-blur-[2px]"
          />

          {/* Fly-out Sidebar Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-[#070840] border-l border-[#33ccff]/20 z-50 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Background glowing ambient light */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#33ccff]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Header section */}
            <div className="p-6 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40 relative z-10">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#33ccff]" />
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
                  Yeedem Terminology Glossary
                </span>
              </div>
              <button
                onClick={closeGlossary}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
                title="Close Sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content section */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 relative z-10 scrollbar-thin">
              {isLoading ? (
                /* Beautiful Skeleton Loader */
                <div className="space-y-6 py-4 animate-pulse">
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-slate-800 rounded" />
                    <div className="h-8 w-4/5 bg-slate-800 rounded" />
                  </div>
                  <div className="space-y-3 pt-4">
                    <div className="h-3 w-full bg-slate-800 rounded" />
                    <div className="h-3 w-5/6 bg-slate-800 rounded" />
                    <div className="h-3 w-4/5 bg-slate-800 rounded" />
                  </div>
                  <div className="space-y-2 pt-6">
                    <div className="h-4 w-32 bg-slate-800 rounded" />
                    <div className="h-20 w-full bg-slate-800/40 rounded-xl" />
                  </div>
                </div>
              ) : termData ? (
                <div className="space-y-6">
                  {/* Category and Difficulty metadata badges */}
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono font-extrabold uppercase bg-[#33ccff]/10 border border-[#33ccff]/30 text-[#33ccff] px-2.5 py-1 rounded">
                      {termData.category}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-extrabold uppercase px-2.5 py-1 rounded border ${
                        termData.difficulty === "Core"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : termData.difficulty === "Intermediate"
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                          : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                      }`}
                    >
                      {termData.difficulty} Priority
                    </span>
                  </div>

                  {/* Main Term Title */}
                  <div>
                    <h3 className="text-2xl font-extrabold text-white font-display tracking-tight">
                      {termData.term}
                    </h3>
                    <div className="h-0.5 w-16 bg-[#33ccff] mt-2 rounded" />
                  </div>

                  {/* Definition Core Block */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold">
                      Operational Definition
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed font-sans">
                      {termData.definition}
                    </p>
                  </div>

                  {/* Context in Yeedem Network */}
                  <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 space-y-2 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                      <Brain className="w-12 h-12 text-[#33ccff]" />
                    </div>
                    <h4 className="text-[10px] font-mono text-[#33ccff] uppercase tracking-widest font-extrabold flex items-center space-x-1.5">
                      <Milestone className="w-3.5 h-3.5" />
                      <span>Ecosystem Context</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {termData.contextualApplication}
                    </p>
                  </div>

                  {/* Dynamic related terms cross-linking */}
                  {termData.relatedTerms && termData.relatedTerms.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold mb-3">
                        Related Infrastructure Concepts
                      </h4>
                      <div className="space-y-2">
                        {termData.relatedTerms.map((relTerm, idx) => (
                          <button
                            key={idx}
                            onClick={() => openTerm(relTerm, `Related concept in sidebar: ${termData.term}`)}
                            className="w-full text-left p-3 rounded-lg bg-slate-950/30 border border-slate-900 hover:border-[#33ccff]/30 hover:bg-[#33ccff]/5 text-xs text-slate-300 hover:text-[#33ccff] flex items-center justify-between transition-all group cursor-pointer"
                          >
                            <span className="font-mono font-medium">{relTerm}</span>
                            <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-[#33ccff] group-hover:translate-x-0.5 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Handle secondary alerts/errors if backend returned cache */}
                  {error && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-start space-x-2 text-xs text-amber-300">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                  <p className="text-xs text-slate-400">Select a glossary term to view its definition.</p>
                </div>
              )}
            </div>

            {/* Footer with AI generation metadata */}
            <div className="p-4 bg-slate-950/80 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {termData?.isAiGenerated ? (
                  <>
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#33ccff] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#33ccff]"></span>
                    </div>
                    <span className="text-[#33ccff] font-bold flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 mr-0.5" />
                      <span>Compiled Live by Gemini AI</span>
                    </span>
                  </>
                ) : (
                  <>
                    <Database className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Served via Yeedem Local Cache</span>
                  </>
                )}
              </div>
              <span>SECURE COMPILER</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
