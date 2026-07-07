import { useState } from "react";
import { ShieldCheck, Code, Globe2, Cpu, Terminal, Zap, Globe, Users } from "lucide-react";
import TeamModal from "./TeamModal";

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const roadmapItems = [
    {
      phase: "01",
      date: "2024 H1",
      title: "Ledger Core & Edge Sync",
      detail: "Developed high-fidelity double-entry financial ledger structures running on client-side IndexedDB caches. Verified via localized cryptographic checksum block chains to survive total bandwidth blackouts.",
      icon: Cpu,
    },
    {
      phase: "02",
      date: "2024 H2",
      title: "Local Fuse Natural Parser",
      detail: "Engineered low-compute structured LLM parsing schema. Successfully translates unstructured logs and messages into GAAP-ready invoice items in real-time, completely offline.",
      icon: Terminal,
    },
    {
      phase: "03",
      date: "2025 H1",
      title: "VoltEdge LiFePO4 Telemetry",
      detail: "Deployed hardware micro-boards for decentralized solar battery units. Connects battery stats, charge-cycle life, and local carbon abatement records into ledger frameworks.",
      icon: Zap,
    },
    {
      phase: "04",
      date: "2025 H2",
      title: "Distributed Network Telemetry",
      detail: "Integrated multi-terminal Starlink fleet tracking frameworks. Unmapped businesses can synchronize ledger queues precisely during satellite visibility sweeps.",
      icon: Globe,
    },
    {
      phase: "05",
      date: "2026 H1",
      title: "RegTech Compliance Automation",
      detail: "Consolidating automated VAT calculations and regional tax compliance compilers. Delivers audited double-entry validation schemas for previously unmapped retail domains.",
      icon: ShieldCheck,
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#070840] relative overflow-hidden">
      {/* Background aesthetic blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-[#33ccff]/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#33ccff]/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#33ccff] bg-[#33ccff]/5 px-3 py-1 rounded-full border border-[#33ccff]/10">
            Company Overview
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-4">
            About Yeedem
          </h2>
          <p className="mt-4 text-slate-400 font-sans">
            Engineering robust offline-first infrastructure for unmapped retail, finance, and energy sectors.
          </p>
        </div>

        {/* Company Info Card */}
        <div className="max-w-4xl mx-auto bg-slate-950/80 border border-[#33ccff]/20 rounded-2xl p-6 sm:p-10 relative">
          <div className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Yeedem is an enterprise-grade technology company engineering offline-first FinTech ledger infrastructure, RegTech compliance automation, ClimateTech energy asset management (decentralized LiFePO4 configurations), and localized AI parsing systems tailored specifically for unmapped retail sectors.
            </p>
            <p>
              Our mission is to enable operational continuity and auditability in grid-deficient environments through modular edge-computing architectures and proprietary decentralized network protocols.
            </p>
            
            <div className="pt-6 flex justify-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-[#33ccff]/10 hover:bg-[#33ccff]/20 border border-[#33ccff]/30 text-white rounded-lg transition-all flex items-center space-x-2 cursor-pointer font-bold"
              >
                <Users className="w-5 h-5 text-[#33ccff]" />
                <span>Read about the team</span>
              </button>
            </div>
          </div>
        </div>
        
        <TeamModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Technology Adoption Milestone Roadmap */}
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#33ccff] bg-[#33ccff]/5 px-3 py-1 rounded-full border border-[#33ccff]/10">
              Technology Adoption Roadmap
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-4">
              Strategic Milestones & Evolution
            </h3>
            <p className="mt-3 text-sm text-slate-400 font-sans">
              Detailing our tactical pipeline timeline as we deploy enterprise double-entry accounting models and robust telemetry edge layers.
            </p>
          </div>

          <div className="relative">
            {/* Visual indicators or scroll guidelines */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#070840] to-transparent z-10 pointer-events-none hidden md:block" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#070840] to-transparent z-10 pointer-events-none hidden md:block" />

            {/* Horizontal Timeline List */}
            <div 
              id="roadmap-timeline-scrollable"
              className="flex space-x-6 overflow-x-auto pb-6 pt-4 px-3 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent select-none"
            >
              {roadmapItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex-shrink-0 w-80 bg-slate-950/70 border border-slate-800/80 hover:border-[#33ccff]/30 rounded-2xl p-6 transition-all relative group shadow-lg"
                >
                  {/* Phase ID indicator */}
                  <div className="absolute top-6 right-6 text-2xl font-extrabold text-slate-900/80 group-hover:text-[#33ccff]/5 transition-colors font-mono">
                    {item.phase}
                  </div>

                  {/* Icon Indicator */}
                  <div className="w-10 h-10 rounded-xl bg-[#33ccff]/5 flex items-center justify-center border border-[#33ccff]/20 text-[#33ccff] mb-4 group-hover:bg-[#33ccff]/10 group-hover:border-[#33ccff]/40 transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-mono font-bold text-[#33ccff] uppercase tracking-wider block">
                    {item.date}
                  </span>
                  
                  <h4 className="text-base font-bold text-white font-display mt-1">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed font-sans">
                    {item.detail}
                  </p>

                  {/* Connector line for desktop layouts */}
                  {idx < roadmapItems.length - 1 && (
                    <div className="absolute top-1/2 -right-6 w-6 h-[1px] bg-slate-800/80 group-hover:bg-[#33ccff]/20 transition-colors hidden xl:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
