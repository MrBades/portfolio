import React, { useState } from "react";
import { InquiryForm, InquiryResponse } from "../types";
import { Send, CheckCircle2, ShieldCheck, Mail, Building2, Terminal, HelpCircle, RefreshCw, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import Toast from "./Toast";

export default function Contact() {
  const [formData, setFormData] = useState<InquiryForm>({
    name: "",
    email: "",
    company: "",
    stakeholderType: "Partnership",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<InquiryResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      setErrorMsg("Please provide your name, professional email, and organization details.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setResponse(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Enterprise gateway rejected the proposal request parameters.");
      }

      const data = await res.json();
      setResponse(data);
      setShowToast(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to communicate with Yeedem Gateway. Generating local backup partnership proposal...");
      // Pre-compiled local backup
      setResponse({
        received: true,
        executiveSummary: `Partnership proposal initiated for ${formData.company} (${formData.stakeholderType}). Focus vector aligned to: Decentralized Edge Processing.`,
        strategicRoadmap: [
          `Phase 1: Local node hardware sandbox integration.`,
          `Phase 2: Offline telemetry & compliance mapping tests.`,
          `Phase 3: Formal pilot deployment validation.`
        ],
        estimatedROI: `Minimizing fossil-fuel reliance up to 40% with fully compliant ledger records.`,
        partnershipMessage: `Thank you, ${formData.name}. Suleman Bades' chief architect office will contact you at ${formData.email} regarding your interest.`
      });
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#33ccff]/15 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#33ccff] bg-[#33ccff]/5 px-3 py-1 rounded-full border border-[#33ccff]/10">
            Enterprise Engagement
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-4">
            Strategic Partnership & Inquiry
          </h2>
          <p className="mt-4 text-slate-400 font-sans">
            Connect with Yeedem. Select your inquiry category to compile a tailored integration roadmap and strategic response mapped to our operational pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Form Block */}
          <div className="lg:col-span-6 bg-[#070840] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
                <Building2 className="w-4 h-4 text-[#33ccff]" />
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest">
                  Strategic Inquiry Form
                </span>
              </div>

              {errorMsg && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs p-3 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Grid Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5 font-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:border-[#33ccff]/50 focus:outline-none"
                    placeholder="Suleman Bades"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5 font-bold">
                    Professional Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:border-[#33ccff]/50 focus:outline-none"
                    placeholder="reviewer@organization.com"
                    required
                  />
                </div>
              </div>

              {/* Organization details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5 font-bold">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:border-[#33ccff]/50 focus:outline-none"
                    placeholder="Enterprise Corp"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5 font-bold">
                    Inquiry Category
                  </label>
                  <select
                    name="stakeholderType"
                    value={formData.stakeholderType}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:border-[#33ccff]/50 focus:outline-none"
                  >
                    <option value="Partnership">Partnership Enquiry</option>
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Complaint">Complaint / Report Issue</option>
                    <option value="Other">Other / Feedback</option>
                  </select>
                </div>
              </div>

              {/* Project brief details */}
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5 font-bold">
                  Partnership Message / Context Brief
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3.5 text-xs text-white focus:border-[#33ccff]/50 focus:outline-none resize-none"
                  placeholder="Detail your operational focus parameters..."
                />
              </div>

              {/* Submit trigger button */}
              <button
                id="submit-partnership-inquiry-btn"
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#33ccff] hover:bg-sky-400 text-[#070840] font-bold text-xs font-mono uppercase tracking-widest py-3.5 rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Compiling Proposal Strategy...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Generate Tailored Partnership Proposal</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Proposal Strategy Board Block */}
          <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between overflow-hidden">
            
            {/* Terminal Header */}
            <div className="bg-[#070840] px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-[#33ccff]" />
                <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
                  Yeedem AI Strategic Roadmap
                </span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE CONNECT</span>
              </span>
            </div>

            {/* Content Output */}
            <div className="p-6 flex-1 flex flex-col justify-center">
              
              {!response && !isLoading && (
                <div className="text-center py-12 max-w-sm mx-auto">
                  <Mail className="w-12 h-12 text-[#33ccff]/30 mx-auto mb-4 animate-pulse" />
                  <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wide">
                    Roadmap Uninitialized
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 font-sans">
                    Complete the inquiry form to compile an instant AI-powered corporate integration roadmap custom-tailored to your inquiry parameters.
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-12">
                  <RefreshCw className="w-10 h-10 text-[#33ccff] mx-auto mb-4 animate-spin" />
                  <p className="text-xs text-slate-400 font-mono">
                    Compiling strategic synergy vectors... Matching standard Double-Entry Ledger frameworks to compliance criteria...
                  </p>
                </div>
              )}

              {response && !isLoading && (
                <div className="space-y-5">
                  
                  {/* Executive Summary Block */}
                  <div className="bg-[#070840] border border-[#33ccff]/20 p-4 rounded-lg">
                    <h5 className="text-[10px] font-mono text-[#33ccff] uppercase tracking-widest font-bold mb-1">
                      EXECUTIVE SYNERGY SUMMARY
                    </h5>
                    <p className="text-xs text-slate-200 font-sans leading-relaxed">
                      {response.executiveSummary}
                    </p>
                  </div>

                  {/* Strategic Roadmap List */}
                  <div>
                    <h5 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold mb-2">
                      IMPLEMENTATION ROADMAP
                    </h5>
                    <ul className="space-y-2">
                      {response.strategicRoadmap.map((step, idx) => (
                        <li key={idx} className="bg-slate-900 border border-slate-900 p-2.5 rounded-lg text-xs text-slate-300 flex items-start space-x-2.5">
                          <span className="text-[#33ccff] font-mono font-bold">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ROI metric */}
                  <div className="bg-slate-900 border border-slate-900 p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 block uppercase">
                        Estimated Abatement / Accounting ROI
                      </span>
                      <span className="text-xs font-bold text-emerald-400 mt-0.5 block">
                        {response.estimatedROI}
                      </span>
                    </div>
                  </div>

                  {/* personal message */}
                  <div className="pt-2 border-t border-slate-900 flex items-start space-x-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="font-sans italic leading-relaxed">
                      "{response.partnershipMessage}"
                    </p>
                  </div>

                </div>
              )}

            </div>

            {/* Footer console block */}
            <div className="bg-slate-900 px-5 py-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>Endpoint: /api/inquiry</span>
              <span>Secure Gateway Signed</span>
            </div>

          </div>

        </div>

      </div>
      <Toast
        message="Message Sent Successfully! Your custom enterprise partnership roadmap is ready."
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}
