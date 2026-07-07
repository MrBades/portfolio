import { CASE_STUDIES } from "../data";
import { ExternalLink, Layers, CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import GlossaryTerm from "./GlossaryTerm";

function renderTextWithGlossary(text: string) {
  const keywords = [
    { word: "double-entry accounting", term: "Double-Entry Ledger" },
    { word: "double-entry ledger", term: "Double-Entry Ledger" },
    { word: "Local Fuse Parser", term: "Local Fuse Parser" },
    { word: "Local Fuse Engine", term: "Local Fuse Parser" },
    { word: "IndexedDB", term: "IndexedDB" },
    { word: "offline-first", term: "IndexedDB" },
    { word: "deterministic tax calculation", term: "RegTech Rails" },
    { word: "satellite hardware fleet", term: "Starlink" },
    { word: "Low-Bandwidth GraphQL", term: "Low-Bandwidth GraphQL" },
    { word: "GraphQL", term: "Low-Bandwidth GraphQL" },
    { word: "microservices", term: "Local Fuse Parser" },
    { word: "packet transmission efficiency", term: "Starlink" }
  ];

  const sortedKeywords = [...keywords].sort((a, b) => b.word.length - a.word.length);
  const pattern = sortedKeywords.map(k => k.word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
  if (!pattern) return text;

  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const match = sortedKeywords.find(k => k.word.toLowerCase() === part.toLowerCase());
    if (match) {
      return (
        <GlossaryTerm key={index} term={match.term}>
          {part}
        </GlossaryTerm>
      );
    }
    return part;
  });
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 bg-[#070840]/60 relative border-t border-slate-900">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#33ccff]/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#33ccff] bg-[#33ccff]/5 px-3 py-1 rounded-full border border-[#33ccff]/10">
            Live Deployments
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-4">
            Proven Global Implementations
          </h2>
          <p className="mt-4 text-slate-400 font-sans">
            Real engineering traction deployed across emerging markets, remote workspaces, and high-performance networks.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              id={`case-card-${study.id}`}
              className="bg-slate-950/70 border border-slate-800/80 hover:border-[#33ccff]/30 rounded-2xl flex flex-col justify-between overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-[#33ccff]/5 hover:-translate-y-1"
            >
              <div className="p-6">
                
                {/* Header Metadata */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-900">
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-[#33ccff]" />
                    <span className="text-[10px] font-mono uppercase text-[#33ccff] tracking-widest font-semibold">
                      Live App Integration
                    </span>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[9px] font-mono text-emerald-400 uppercase">Operational</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white font-display tracking-tight mt-2 group-hover:text-[#33ccff] transition-colors">
                  {study.title}
                </h3>
                                <p className="text-xs text-[#33ccff] font-mono mt-1">
                  {renderTextWithGlossary(study.subtitle)}
                </p>

                <p className="text-sm text-slate-300 mt-3 font-sans leading-relaxed">
                  {renderTextWithGlossary(study.description)}
                </p>

                {/* Tech Badges */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {study.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-0.5 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Core Features */}
                <div className="mt-5 pt-4 border-t border-slate-900">
                  <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold mb-2">
                    Infrastructure Modules:
                  </h4>
                  <ul className="space-y-1.5">
                    {study.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#33ccff] shrink-0 mt-0.5" />
                        <span>{renderTextWithGlossary(feature)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Card Footer Metric & Link */}
              <div className="bg-[#070840]/40 border-t border-slate-900 p-5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block leading-none">
                      {study.metrics.label}
                    </span>
                    <span className="text-sm font-extrabold text-white font-mono mt-0.5 block">
                      {study.metrics.value}
                    </span>
                  </div>
                </div>

                <a
                  href={study.deploymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 bg-[#33ccff]/10 hover:bg-[#33ccff] text-[#33ccff] hover:text-[#070840] font-bold text-xs font-mono py-2 px-3.5 rounded-lg transition-all border border-[#33ccff]/30 cursor-pointer"
                >
                  <span>Launch Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
