import { useState, useEffect } from "react";
import { Cpu, Menu, X, Globe, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import yeedemLogo from "/src/assets/images/yeedem_logo_1782645457543.png";

interface NavbarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ activeSection, scrollToSection }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Dynamic clock showing real-time UTC/Server reference
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const menuItems = [
    { label: "Ecosystem", id: "ecosystem" },
    { label: "Case Studies", id: "case-studies" },
    { label: "Technical Infrastructure", id: "technical-infrastructure" },
    { label: "About", id: "about" },
    { label: "Contact & Partnership", id: "contact" }
  ];

  return (
    <nav
      id="main-navigation-bar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#070840]/95 backdrop-blur-md border-b border-[#33ccff]/20 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Company Brand Logo */}
          <div 
            id="brand-logo-container"
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-950 border border-[#33ccff]/40 overflow-hidden shadow-[0_0_15px_rgba(51,204,255,0.15)] group">
              <img 
                src={yeedemLogo} 
                alt="Yeedem Logo" 
                className="w-full h-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-wider text-white font-display">
                YEEDEM
              </span>
              <div className="text-[9px] text-[#33ccff] uppercase tracking-widest font-mono font-bold leading-none">
                Parent Tech Corp
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm tracking-wide font-medium transition-colors cursor-pointer relative py-1 ${
                  activeSection === item.id
                    ? "text-[#33ccff]"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#33ccff]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Real-time Enterprise Node Metadata */}
          <div className="hidden lg:flex items-center space-x-4 text-xs font-mono bg-slate-950/60 border border-[#33ccff]/10 rounded-full px-4 py-1.5 text-slate-400">
            <Globe className="w-3.5 h-3.5 text-[#33ccff] animate-spin-slow" />
            <span>{currentTime}</span>
            <span className="text-slate-600">|</span>
            <div className="flex items-center space-x-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Edge Verified</span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-1.5 rounded-md border border-slate-700/50"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-navigation-dropdown"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-[#070840] border-b border-[#33ccff]/20 px-4 pt-2 pb-4 space-y-2 shadow-2xl"
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-link-${item.id}`}
              onClick={() => {
                scrollToSection(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                activeSection === item.id
                  ? "bg-[#33ccff]/10 text-[#33ccff] border-l-4 border-[#33ccff]"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col space-y-2 text-[11px] font-mono text-slate-400 px-3">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span>Uptime: 99.99% Network Status</span>
            </div>
            <div>Ref: {currentTime}</div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
