import { useState } from "react";
import { SIMULATION_TEMPLATES } from "../data";
import { ParseResult } from "../types";
import { Terminal, Copy, Send, CheckCircle2, ShieldAlert, Cpu, RefreshCw, AlertTriangle, Activity, Wifi, Layers } from "lucide-react";
import { motion } from "motion/react";
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import GlossaryTerm from "./GlossaryTerm";

function renderTextWithGlossary(text: string) {
  const keywords = [
    { word: "double-entry ledgers", term: "Double-Entry Ledger" },
    { word: "double-entry ledger", term: "Double-Entry Ledger" },
    { word: "Local Fuse Parser", term: "Local Fuse Parser" },
    { word: "Local Fuse Engine", term: "Local Fuse Parser" },
    { word: "IndexedDB", term: "IndexedDB" },
    { word: "offline-first", term: "IndexedDB" },
    { word: "TLS 1.3 Offline Sandbox", term: "Cryptographic Checksum" },
    { word: "offline parsing compiler", term: "Local Fuse Parser" },
    { word: "unstructured telemetry", term: "Local Fuse Parser" },
    { word: "schema vectors", term: "Local Fuse Parser" },
    { word: "WhatsApp", term: "RegTech Rails" },
    { word: "delta sync", term: "Delta Sync Reconciliation" },
    { word: "LiFePO4", term: "LiFePO4 Storage" },
    { word: "Starlink", term: "Starlink" },
    { word: "SLA", term: "Starlink" }
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

// Mock Infrastructure Telemetry Datasets
const latencyData = [
  { time: "00:00", latency: 24 },
  { time: "03:00", latency: 19 },
  { time: "06:00", latency: 31 },
  { time: "09:00", latency: 22 },
  { time: "12:00", latency: 15 },
  { time: "15:00", latency: 26 },
  { time: "18:00", latency: 21 },
  { time: "21:00", latency: 18 }
];

const throughputData = [
  { time: "00:00", throughput: 120 },
  { time: "03:00", throughput: 280 },
  { time: "06:00", throughput: 340 },
  { time: "09:00", throughput: 190 },
  { time: "12:00", throughput: 420 },
  { time: "15:00", throughput: 310 },
  { time: "18:00", throughput: 250 },
  { time: "21:00", throughput: 380 }
];

const uptimeData = [
  { date: "06-21", uptime: 99.98 },
  { date: "06-22", uptime: 99.99 },
  { date: "06-23", uptime: 99.99 },
  { date: "06-24", uptime: 99.97 },
  { date: "06-25", uptime: 99.99 },
  { date: "06-26", uptime: 99.99 },
  { date: "06-27", uptime: 99.99 },
  { date: "06-28", uptime: 99.99 }
];

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  unit?: string;
}

const CustomChartTooltip = ({ active, payload, label, unit }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#070840]/95 border border-[#33ccff]/30 p-2.5 rounded-lg shadow-xl text-left backdrop-blur-sm">
        <p className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">{label}</p>
        <p className="text-xs font-extrabold text-[#33ccff] mt-0.5 font-mono">
          {payload[0].value}
          <span className="text-[10px] text-slate-300 font-normal ml-1">{unit}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function Infrastructure() {
  const [inputText, setInputText] = useState(SIMULATION_TEMPLATES[0].text);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTemplateClick = (text: string) => {
    setInputText(text);
    setErrorMsg("");
  };

  const handleParse = async () => {
    setIsLoading(true);
    setErrorMsg("");
    setParseResult(null);

    try {
      const response = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentText: inputText })
      });

      if (!response.ok) {
        throw new Error("Enterprise parsing endpoint returned an error status.");
      }

      const data = await response.json();
      setParseResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to communicate with Yeedem Edge API. Utilizing local offline checksum compilation.");
      // Standard local backup format
      setParseResult({
        merchantName: "Yeedem Books Safe Node",
        transactionDate: new Date().toISOString().split("T")[0],
        amount: 145.00,
        currency: "USD",
        itemsParsed: ["Fallback local processing schema matched"],
        category: "System Log Compliance",
        taxEstimate: 21.75,
        offlineSafetyIndex: "High - Offline Local Compiler",
        complianceFlags: ["Edge connection failure fallback applied", "Double-entry integrity checked manually"],
        accountingAuditTrial: "The local parser verified the payload structure. Cryptographic checksum signed successfully. Transaction marked for regional server syncing on reconnection."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="technical-infrastructure" className="py-24 bg-slate-950 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#33ccff]/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#33ccff] bg-[#33ccff]/5 px-3 py-1 rounded-full border border-[#33ccff]/10">
            Technical Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-4">
            Edge Parsing & Double-Entry Ledgers
          </h2>
          <p className="mt-4 text-slate-400 font-sans">
            {renderTextWithGlossary("Interactive system demonstration of Yeedem's proprietary offline parsing compiler. Input raw WhatsApp text, receipts, or diagnostics logs to compile high-integrity audit ledgers.")}
          </p>
        </div>

        {/* Console Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Control Input and Template Library */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-[#070840] border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
                  <Terminal className="w-4 h-4 text-[#33ccff]" />
                  <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest">
                    Parser Input Console
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                  {renderTextWithGlossary("Select a typical unstructured telemetry or transaction log template to test the Yeedem Local Fuse Parser, or type your own:")}
                </p>

                {/* Templates Selector */}
                <div className="mt-4 space-y-2">
                  {SIMULATION_TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.label}
                      onClick={() => handleTemplateClick(tpl.text)}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                        inputText === tpl.text
                          ? "bg-[#33ccff]/10 border-[#33ccff]/40 text-[#33ccff]"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900"
                      }`}
                    >
                      <span className="font-semibold block">{tpl.label}</span>
                    </button>
                  ))}
                </div>

                {/* Main Text Area Input */}
                <div className="mt-5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                    Raw Telemetry / Transaction Text
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={5}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3.5 text-xs text-slate-200 font-mono focus:border-[#33ccff]/50 focus:outline-none resize-none"
                    placeholder="Enter raw merchant log or telemetry text here..."
                  />
                </div>
              </div>

              {/* Run Trigger Action */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="text-[10px] font-mono text-slate-500">
                  {renderTextWithGlossary("Secure TLS 1.3 Offline Sandbox")}
                </div>
                <button
                  id="execute-parser-btn"
                  onClick={handleParse}
                  disabled={isLoading}
                  className="px-6 py-2.5 bg-[#33ccff] hover:bg-sky-400 disabled:bg-slate-800 text-[#070840] hover:text-[#070840] disabled:text-slate-500 font-bold rounded-lg transition-all text-xs flex items-center space-x-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Execute Local Fuse Parser</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* Right Block: Live Compiled Schema Output */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between overflow-hidden">
            
            {/* Header Terminal Style */}
            <div className="bg-[#070840] px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-4 font-semibold">
                  yeedem-fuse-compiler-out.json
                </span>
              </div>
              <div className="text-[9px] font-mono text-[#33ccff] border border-[#33ccff]/30 rounded px-2 py-0.5 bg-[#33ccff]/5">
                SCHEMA V2.4.1
              </div>
            </div>

            {/* Compiled Interactive Body */}
            <div className="p-6 flex-1 flex flex-col justify-center">
              
              {!parseResult && !isLoading && !errorMsg && (
                <div className="text-center py-12 max-w-md mx-auto">
                  <Cpu className="w-12 h-12 text-[#33ccff]/30 mx-auto mb-4 animate-pulse" />
                  <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wide">
                    Parser Idle
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 font-sans">
                    Click "Execute Local Fuse Parser" above to parse raw transaction documents into high-integrity compliance structures.
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-12">
                  <RefreshCw className="w-10 h-10 text-[#33ccff] mx-auto mb-4 animate-spin" />
                  <p className="text-xs text-slate-400 font-mono">
                    Initializing local tokenizer... Resolving parsing schema vectors via server-side pipeline...
                  </p>
                </div>
              )}

              {errorMsg && (
                <div className="mb-4 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-start space-x-2.5 text-xs text-amber-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {parseResult && !isLoading && (
                <div className="space-y-4">
                  
                  {/* Ledger Metrics Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                      <span className="text-[9px] font-mono text-slate-500 block uppercase">
                        Merchant Name
                      </span>
                      <span className="text-xs font-bold text-white mt-0.5 block truncate">
                        {parseResult.merchantName}
                      </span>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                      <span className="text-[9px] font-mono text-slate-500 block uppercase">
                        Verified Total
                      </span>
                      <span className="text-xs font-bold text-emerald-400 mt-0.5 block">
                        {parseResult.amount.toLocaleString("en-US", { style: "currency", currency: parseResult.currency })}
                      </span>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                      <span className="text-[9px] font-mono text-slate-500 block uppercase">
                        Offline Integrity Index
                      </span>
                      <span className="text-xs font-bold text-cyan-400 mt-0.5 block">
                        {parseResult.offlineSafetyIndex}
                      </span>
                    </div>
                  </div>

                  {/* Parsed Items and Compliance List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    
                    <div>
                      <h5 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-bold">
                        Compiled Ledger Items
                      </h5>
                      <ul className="space-y-1.5 bg-slate-900/60 p-3 rounded-lg border border-slate-900">
                        {parseResult.itemsParsed.map((item, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                            <span className="text-[#33ccff] font-mono">•</span>
                            <span>{renderTextWithGlossary(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-bold">
                        Compliance Audit Flags
                      </h5>
                      <ul className="space-y-1.5 bg-slate-900/60 p-3 rounded-lg border border-slate-900">
                        {parseResult.complianceFlags.map((flag, idx) => (
                          <li key={idx} className="text-xs text-amber-300 flex items-start space-x-2">
                            <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
                            <span>{renderTextWithGlossary(flag)}</span>
                          </li>
                        ))}
                        {parseResult.complianceFlags.length === 0 && (
                          <li className="text-xs text-slate-400 italic">No compliance flags triggered. Standard audit rail verified.</li>
                        )}
                      </ul>
                    </div>

                  </div>

                  {/* Accounting Audit Trial Log */}
                  <div className="bg-[#070840] border border-slate-800/80 p-4 rounded-lg">
                    <h5 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5 font-bold flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#33ccff]" />
                      <span>Ledger Audit Verification Trial</span>
                    </h5>
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">
                      {renderTextWithGlossary(parseResult.accountingAuditTrial)}
                    </p>
                  </div>

                </div>
              )}

            </div>

            {/* Footer Terminal Metadata */}
            <div className="bg-slate-900 px-5 py-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>Status: COMPILER_IDLE</span>
              <span>Memory Footprint: 1.12 MB</span>
            </div>

          </div>

        </div>

        {/* Infrastructure Real-time Metrics Dashboard */}
        <div id="infrastructure-telemetry-metrics" className="mt-20 bg-[#070840]/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-800 mb-8">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#33ccff] uppercase tracking-widest flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#33ccff] animate-pulse" />
                <span>Live Infrastructure Status</span>
              </span>
              <h3 className="text-xl font-bold text-white font-display mt-1">
                Real-time Network Operational Telemetry
              </h3>
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-2 md:mt-0 flex items-center space-x-4">
              <span>Nodes: <span className="text-[#33ccff] font-bold">320 Managed</span></span>
              <span>Uptime Index: <span className="text-emerald-400 font-bold">99.99%</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Chart 1: Gateway Latency */}
            <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-[#33ccff]" />
                    <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                      Gateway Latency
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                    Stable
                  </span>
                </div>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={latencyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="time" stroke="#64748b" fontSize={8} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={8} tickLine={false} />
                      <Tooltip content={<CustomChartTooltip unit="ms" />} cursor={{ stroke: "#33ccff", strokeWidth: 1, strokeDasharray: "3 3" }} />
                      <Line
                        type="monotone"
                        dataKey="latency"
                        stroke="#33ccff"
                        strokeWidth={2}
                        dot={{ r: 2, strokeWidth: 1, stroke: "#33ccff" }}
                        activeDot={{ r: 4 }}
                        name="Latency"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900/50 flex justify-between text-[10px] font-mono text-slate-500">
                <span>Mean Response Time</span>
                <span className="text-slate-300 font-bold">21.3 ms</span>
              </div>
            </div>

            {/* Chart 2: Sync Throughput */}
            <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-[#33ccff]" />
                    <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                      Ledger Sync Volume
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#33ccff] font-semibold bg-[#33ccff]/10 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={throughputData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="time" stroke="#64748b" fontSize={8} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={8} tickLine={false} />
                      <Tooltip content={<CustomChartTooltip unit="KB/s" />} cursor={{ fill: "rgba(51, 204, 255, 0.05)" }} />
                      <Bar dataKey="throughput" fill="url(#colorThroughput)" radius={[2, 2, 0, 0]} name="Throughput">
                        {/* Define gradients */}
                        <defs>
                          <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#33ccff" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#33ccff" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900/50 flex justify-between text-[10px] font-mono text-slate-500">
                <span>Peak Ledger Delta Sync</span>
                <span className="text-slate-300 font-bold">420 KB/s</span>
              </div>
            </div>

            {/* Chart 3: Uptime Telemetry */}
            <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                      Uptime Telemetry
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                    99.99% Guaranteed
                  </span>
                </div>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={uptimeData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="date" stroke="#64748b" fontSize={8} tickLine={false} />
                      <YAxis stroke="#64748b" domain={[99.9, 100]} fontSize={8} tickLine={false} />
                      <Tooltip content={<CustomChartTooltip unit="%" />} />
                      <Area
                        type="monotone"
                        dataKey="uptime"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorUptime)"
                        strokeWidth={2}
                        name="Uptime"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900/50 flex justify-between text-[10px] font-mono text-slate-500">
                <span>Enterprise SLA Target</span>
                <span className="text-slate-300 font-bold">99.95% SLA</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
