import React from "react";
import { X, User, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const teamMembers: TeamMember[] = [
  {
    name: "Suleman Bades",
    role: "CEO, Founder & Chief Software Architect",
    bio: "Systems architect specializing in low-connectivity data infrastructure, custom power engineering, and localized fintech applications designed for emerging market scalability."
  },
  {
    name: "Engineering Team",
    role: "Global Core Engineering",
    bio: "Dedicated team of software engineers building robust offline-first compliance and finance systems."
  }
];

export default function TeamModal({ isOpen, onClose }: TeamModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-[#070840] border border-[#33ccff]/30 rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-[#33ccff]" />
              Meet the Team
            </h2>
            <div className="space-y-6">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-[10px] font-mono text-[#33ccff] uppercase tracking-wider font-bold mb-2">{member.role}</p>
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
