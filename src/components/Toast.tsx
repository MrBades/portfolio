import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, isVisible, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="custom-toast-notification"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#070840]/95 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] rounded-xl p-4 flex items-start space-x-3 backdrop-blur-md"
        >
          {/* Animated visual glow pulse behind */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-xl pointer-events-none" />
          
          {/* Alert Success Icon */}
          <div className="flex-shrink-0 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>

          {/* Toast Message details */}
          <div className="flex-1 min-w-0">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
              Inquiry Compiled
            </span>
            <p className="text-xs text-slate-100 font-sans mt-0.5 leading-relaxed font-medium">
              {message}
            </p>
          </div>

          {/* Dismiss button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-md hover:bg-slate-800/50"
            aria-label="Dismiss Notification"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Visual dynamic countdown bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-800 rounded-b-xl overflow-hidden">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
