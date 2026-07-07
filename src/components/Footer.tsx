import { Cpu, Mail, Globe, Sparkles, ShieldAlert } from "lucide-react";
import yeedemLogo from "../assets/images/yeedem_logo_1782645457543.PNG";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="bg-[#070840] text-slate-400 py-16 border-t border-slate-900 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#33ccff]/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand Metadata Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-950 border border-[#33ccff]/30 overflow-hidden shadow-[0_0_15px_rgba(51,204,255,0.1)] group">
                <img 
                  src={yeedemLogo} 
                  alt="Yeedem Logo" 
                  className="w-full h-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white font-display">
                YEEDEM
              </span>
            </div>
            
            <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-xl">
              Yeedem is an enterprise-grade technology company engineering offline-first FinTech ledger infrastructure, RegTech compliance automation, ClimateTech energy asset management (decentralized LiFePO4 configurations), and localized AI parsing systems tailored specifically for unmapped retail sectors.
            </p>

            <div className="text-[10px] font-mono space-y-1 text-slate-500 pt-2">
              <div className="flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-[#33ccff]" />
                <span>Primary Operations: Global Emerging Markets</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                <span>Regulatory Code Compliance Certified</span>
              </div>
            </div>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">
              OPERATIONS
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#ecosystem" className="hover:text-white transition-colors">Yeedem Books</a></li>
              <li><a href="#ecosystem" className="hover:text-white transition-colors">Compliance Rails</a></li>
              <li><a href="#ecosystem" className="hover:text-white transition-colors">VoltEdge Lithium</a></li>
              <li><a href="#ecosystem" className="hover:text-white transition-colors">Satellite Monitoring</a></li>
              <li><a href="#ecosystem" className="hover:text-white transition-colors">Local Fuse Parser</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">
              LIVE PORTALS
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="https://inv.yeedem.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-1"><span>Yeedem Books Portal</span></a></li>
              <li><a href="#case-studies" className="hover:text-white transition-colors">My Starlink Stats</a></li>
              <li><a href="#case-studies" className="hover:text-white transition-colors">CWC Educational Portal</a></li>
              <li><a href="#technical-infrastructure" className="hover:text-white transition-colors">API Console Demo</a></li>
              <li>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-admin-portal'))}
                  className="hover:text-white text-slate-400 font-sans transition-colors flex items-center space-x-1 cursor-pointer outline-none border-none bg-transparent"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-[#33ccff]" />
                  <span>Owner Admin Gateway</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower footer copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-4">
          <div>
            © {currentYear} Yeedem Corporation. All global engineering rights reserved.
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-white transition-colors">Privacy Infrastructure</span>
            <span className="hover:text-white transition-colors">Security Audit Standards</span>
            <span className="hover:text-white transition-colors">Executive Reviews</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
