/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ecosystem from "./components/Ecosystem";
import CaseStudies from "./components/CaseStudies";
import Infrastructure from "./components/Infrastructure";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { GlossaryProvider } from "./components/GlossaryContext";
import GlossarySidebar from "./components/GlossarySidebar";
import AdminInbox from "./components/AdminInbox";


export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "ecosystem", "case-studies", "technical-infrastructure", "about", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Calculate total reading/scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <GlossaryProvider>
      <div id="yeedem-corporate-framework" className="bg-[#070840] text-slate-100 min-h-screen font-sans antialiased overflow-x-hidden">
        
        {/* Decorative enterprise line at the very top */}
        <div className="h-1 w-full bg-gradient-to-r from-[#33ccff] via-sky-500 to-[#070840] fixed top-0 left-0 z-50" />

        {/* Thin, animated scroll-progress bar just below existing header line */}
        <div
          id="scroll-progress-indicator-bar"
          className="fixed top-1 left-0 h-0.5 bg-gradient-to-r from-[#33ccff] to-cyan-400 z-50 transition-all duration-100 ease-out shadow-[0_0_8px_rgba(51,204,255,0.7)]"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Corporate Header & Navigation */}
        <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

        {/* Core Dynamic Content Sections */}
        <main id="corporate-viewports-container">
          <Hero 
            onExploreEcosystem={() => scrollToSection("ecosystem")}
            onLaunchSimulator={() => scrollToSection("technical-infrastructure")}
          />
          
          <Ecosystem />
          
          <CaseStudies />
          
          <Infrastructure />
          
          <About />
          
          <Contact />
        </main>

        {/* Professional Auditor Indexable Footer */}
        <Footer />

        {/* Glossary flyout sidebar */}
        <GlossarySidebar />

        {/* Secure Admin Portal for Suleman Bades */}
        <AdminInbox />

      </div>
    </GlossaryProvider>
  );
}

