import { useRef, useEffect } from "react";
import { ArrowRight, Server, Shield, Sparkles, Terminal } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onExploreEcosystem: () => void;
  onLaunchSimulator: () => void;
}

export default function Hero({ onExploreEcosystem, onLaunchSimulator }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    const particleCount = 45;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25, // Subtle slow movement
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.5 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw lines between particles that are close together
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 110) * 0.18;
            ctx.strokeStyle = `rgba(51, 204, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw and move particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce back from boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = "rgba(51, 204, 255, 0.4)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-[#070840] pt-24 overflow-hidden"
    >
      {/* Subtle Slow Particle Network Layer */}
      <canvas
        ref={canvasRef}
        id="hero-particle-infrastructure-canvas"
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      {/* Dynamic Grid Background with Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e295d_1px,transparent_1px),linear-gradient(to_bottom,#1e295d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 z-0" />
      
      {/* glowing radial vectors */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#33ccff]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute -bottom-10 left-1/4 w-[300px] h-[300px] bg-[#070840] border-t border-[#33ccff]/30 rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
        
        {/* Tech Accolades Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2.5 bg-slate-950/80 border border-[#33ccff]/30 px-4 py-1.5 rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#33ccff] animate-pulse" />
          <span className="text-xs font-mono font-semibold text-slate-100 uppercase tracking-widest">
            Enterprise Infrastructure for Unmapped Markets
          </span>
        </motion.div>

        {/* Corporate High-Impact Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-display max-w-5xl mx-auto leading-[1.15]"
        >
          Structuring Informal Commerce with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33ccff] to-sky-300">
            Offline-First Data
          </span>{" "}
          & Compliance Rails
        </motion.h1>

        {/* Corporate Pitch / Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-sans leading-relaxed"
        >
          Yeedem builds localized ledger engines, climate-tech battery monitoring telemetry,
          and robust parsing systems designed for seamless operational continuity in zero-data,
          low-connectivity environments globally.
        </motion.p>

        {/* Core Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button
            id="explore-ecosystem-hero-btn"
            onClick={onExploreEcosystem}
            className="w-full sm:w-auto px-8 py-4 bg-[#33ccff] hover:bg-sky-400 text-[#070840] font-bold rounded-lg shadow-lg hover:shadow-[#33ccff]/20 transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
          >
            <span>Explore 5-Pillar Ecosystem</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            id="launch-simulator-hero-btn"
            onClick={onLaunchSimulator}
            className="w-full sm:w-auto px-8 py-4 bg-slate-950/90 hover:bg-slate-900 text-white border border-[#33ccff]/30 hover:border-[#33ccff]/60 font-medium rounded-lg transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
          >
            <Terminal className="w-4.5 h-4.5 text-[#33ccff]" />
            <span>Launch Fuse Parser CLI</span>
          </button>
        </motion.div>

        {/* Live Critical Infrastructure Telemetry Counters */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          <div className="bg-slate-950/60 border border-[#33ccff]/10 rounded-xl p-6 text-left relative overflow-hidden group hover:border-[#33ccff]/30 transition-all">
            <div className="absolute top-4 right-4 text-slate-800">
              <Server className="w-8 h-8 group-hover:text-[#33ccff]/10 transition-colors" />
            </div>
            <div className="text-[11px] font-mono text-[#33ccff] uppercase tracking-widest font-semibold">
              TRANSACTION METADATA SYNCED
            </div>
            <div className="text-3xl font-extrabold text-white mt-2 font-display">
              12.4M+
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Zero-data packet verification standard
            </div>
          </div>

          <div className="bg-slate-950/60 border border-[#33ccff]/10 rounded-xl p-6 text-left relative overflow-hidden group hover:border-[#33ccff]/30 transition-all">
            <div className="absolute top-4 right-4 text-slate-800">
              <Shield className="w-8 h-8 group-hover:text-[#33ccff]/10 transition-colors" />
            </div>
            <div className="text-[11px] font-mono text-[#33ccff] uppercase tracking-widest font-semibold">
              CARBON EMISSIONS PREVENTED
            </div>
            <div className="text-3xl font-extrabold text-white mt-2 font-display">
              410k Tons
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Via high-efficiency LiFePO4 batteries
            </div>
          </div>

          <div className="bg-slate-950/60 border border-[#33ccff]/10 rounded-xl p-6 text-left relative overflow-hidden group hover:border-[#33ccff]/30 transition-all">
            <div className="absolute top-4 right-4 text-slate-800">
              <Terminal className="w-8 h-8 group-hover:text-[#33ccff]/10 transition-colors" />
            </div>
            <div className="text-[11px] font-mono text-[#33ccff] uppercase tracking-widest font-semibold">
              FUSE PARSER RUNS COMPLETED
            </div>
            <div className="text-3xl font-extrabold text-white mt-2 font-display">
              100% Offline
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Accounting reconciliation rate online
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
