import React, { useState, useEffect } from "react";
import { 
  X, ShieldAlert, Sparkles, Database, Mail, Building, Lock, Calendar, 
  Trash2, RefreshCw, Download, CheckCircle, Search, Filter, Key, CheckSquare, 
  ExternalLink, LogOut, ChevronRight, Inbox, Eye, Archive, UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  stakeholderType: "Partnership" | "General Enquiry" | "Complaint" | "Other";
  message: string;
  timestamp: string;
  status: "Unread" | "In Review" | "Contacted" | "Archived";
  result: {
    executiveSummary: string;
    strategicRoadmap: string[];
    estimatedROI: string;
    partnershipMessage: string;
  };
}

export default function AdminInbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  // Load passkey from session storage if it was previously entered
  useEffect(() => {
    const savedPasskey = sessionStorage.getItem("yeedem_admin_passkey");
    if (savedPasskey) {
      setPasskey(savedPasskey);
      fetchInquiries(savedPasskey);
    }

    // Event listener to open portal from footer link or custom navigation
    const handleOpenPortal = () => {
      setIsOpen(true);
    };

    window.addEventListener("open-admin-portal", handleOpenPortal);
    return () => {
      window.removeEventListener("open-admin-portal", handleOpenPortal);
    };
  }, []);

  const fetchInquiries = async (keyToUse: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey: keyToUse }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Authentication failed.");
      }

      const data = await response.json();
      setInquiries(data.inquiries || []);
      setIsAuthenticated(true);
      sessionStorage.setItem("yeedem_admin_passkey", keyToUse);
      if (data.inquiries && data.inquiries.length > 0 && !selectedId) {
        setSelectedId(data.inquiries[0].id);
      }
    } catch (err: any) {
      setError(err.message || "Failed to retrieve inquiries.");
      setIsAuthenticated(false);
      sessionStorage.removeItem("yeedem_admin_passkey");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) {
      setError("Please input your secure owner passkey.");
      return;
    }
    fetchInquiries(passkey);
  };

  const handleUpdateStatus = async (id: string, targetStatus: string) => {
    try {
      const response = await fetch("/api/admin/inquiries/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey, id, status: targetStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status.");
      }

      const data = await response.json();
      setInquiries(data.inquiries || []);
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this strategic inquiry record? This action is irreversible.")) {
      return;
    }

    try {
      const response = await fetch("/api/admin/inquiries/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey, id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete record.");
      }

      const data = await response.json();
      setInquiries(data.inquiries || []);
      if (selectedId === id) {
        setSelectedId(data.inquiries && data.inquiries.length > 0 ? data.inquiries[0].id : null);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleClearAllInquiries = async () => {
    if (!confirm("CRITICAL WARNING: Are you sure you want to delete ALL inquiries in the database? This cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch("/api/admin/inquiries/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey, clearAll: true }),
      });

      if (!response.ok) {
        throw new Error("Failed to clear database.");
      }

      const data = await response.json();
      setInquiries([]);
      setSelectedId(null);
      alert("All lead entries successfully wiped.");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("yeedem_admin_passkey");
    setPasskey("");
    setIsAuthenticated(false);
    setInquiries([]);
    setSelectedId(null);
  };

  // CSV Lead Exporter
  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      alert("No inquiries available to export.");
      return;
    }

    const headers = ["ID", "Timestamp", "Name", "Email", "Company", "Category", "Status", "Original Message", "AI Executive Summary", "AI Estimated ROI"];
    const rows = inquiries.map(inq => [
      inq.id,
      new Date(inq.timestamp).toLocaleString(),
      inq.name.replace(/"/g, '""'),
      inq.email.replace(/"/g, '""'),
      inq.company.replace(/"/g, '""'),
      inq.stakeholderType,
      inq.status,
      (inq.message || "").replace(/"/g, '""'),
      (inq.result?.executiveSummary || "").replace(/"/g, '""'),
      (inq.result?.estimatedROI || "").replace(/"/g, '""')
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `yeedem_leads_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = (inq: Inquiry) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inq, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `yeedem_lead_${inq.company.replace(/\s+/g, '_')}_${inq.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  // Filter & Search logic
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.message || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "All" || inq.stakeholderType === filterType;
    const matchesStatus = filterStatus === "All" || inq.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const selectedInquiry = inquiries.find(inq => inq.id === selectedId);

  return (
    <>
      {/* Floating admin indicator key if authenticated (visible to owner on corner) */}
      {isAuthenticated && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 p-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center cursor-pointer group"
          title="Open Owner Inquiry Dashboard"
        >
          <ShieldAlert className="w-5 h-5 animate-pulse text-emerald-200" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out text-xs font-mono font-bold pl-0 group-hover:pl-2">
            Owner Inbox ({inquiries.filter(i => i.status === "Unread").length})
          </span>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />

            {/* Dashboard Dialog Frame */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full h-full sm:h-[85vh] sm:max-w-6xl bg-[#030424] border border-[#33ccff]/20 sm:rounded-2xl shadow-[0_0_50px_rgba(51,204,255,0.15)] flex flex-col overflow-hidden z-10"
            >
              {/* Decorative status strip */}
              <div className="h-1 bg-gradient-to-r from-[#33ccff] via-emerald-500 to-sky-600 w-full" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer z-50"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="p-6 border-b border-slate-800/80 bg-slate-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-[#33ccff]/40 shadow-[0_0_15px_rgba(51,204,255,0.15)]">
                    <ShieldAlert className="w-6 h-6 text-[#33ccff]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white font-display tracking-tight flex items-center gap-2">
                      <span>Owner Executive Control Desk</span>
                      <span className="text-[10px] font-mono font-bold bg-[#33ccff]/10 border border-[#33ccff]/20 text-[#33ccff] px-2 py-0.5 rounded uppercase">
                        Secure Client Gateway
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Yeedem Corporation Strategy & Partnership Lead Inbox
                    </p>
                  </div>
                </div>

                {isAuthenticated && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
                    <button
                      onClick={() => fetchInquiries(passkey)}
                      disabled={isLoading}
                      className="px-3 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#33ccff]' : ''}`} />
                      <span>Sync</span>
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="px-3 py-2 bg-[#33ccff]/10 hover:bg-[#33ccff]/20 border border-[#33ccff]/30 text-xs font-mono text-[#33ccff] rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV Report</span>
                    </button>
                    <button
                      onClick={handleClearAllInquiries}
                      className="px-3 py-2 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-900/40 text-xs font-mono text-rose-300 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Wipe Database</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 hover:text-white rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-slate-500" />
                      <span>Exit</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {!isAuthenticated ? (
                  /* Authentication Guard Card */
                  <div className="flex-1 flex items-center justify-center p-6 bg-slate-950/20">
                    <div className="w-full max-w-md bg-slate-950 border border-slate-800/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                        <Key className="w-32 h-32 text-[#33ccff]" />
                      </div>

                      <div className="text-center space-y-3 mb-6">
                        <div className="inline-flex p-3 rounded-full bg-[#33ccff]/10 border border-[#33ccff]/30 text-[#33ccff] mb-2">
                          <Lock className="w-6 h-6 animate-pulse" />
                        </div>
                        <h4 className="text-xl font-bold text-white font-display tracking-tight">
                          Owner Security Verification
                        </h4>
                        <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-xs mx-auto">
                          Welcome, <strong>Suleman Bades</strong>. Enter your secure partner dashboard passkey to review strategic inquiries and compile leads reports.
                        </p>
                      </div>

                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                            Security Admin Passkey
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                              <Key className="w-4 h-4" />
                            </span>
                            <input
                              type="password"
                              value={passkey}
                              onChange={(e) => setPasskey(e.target.value)}
                              placeholder="••••••••••••••"
                              className="w-full bg-[#030424] border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:border-[#33ccff]/50 focus:outline-none transition-colors placeholder:text-slate-700"
                            />
                          </div>
                        </div>

                        {error && (
                          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-lg flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                            <span>{error}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full py-3 px-4 bg-gradient-to-r from-[#33ccff] to-sky-600 hover:opacity-90 active:scale-[0.99] text-xs font-mono font-bold text-slate-950 uppercase tracking-widest rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                        >
                          {isLoading ? (
                            <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                          ) : (
                            <>
                              <span>Verify Identity</span>
                              <ChevronRight className="w-4 h-4 text-slate-950" />
                            </>
                          )}
                        </button>
                      </form>

                      <div className="mt-6 pt-5 border-t border-slate-900 text-center text-[10px] font-mono text-slate-500">
                        Secure Sandbox Cryptographic Terminal Active
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Authenticated Inbox Dashboard */
                  <>
                    {/* Left Column: List Pane */}
                    <div className="w-full md:w-[360px] border-r border-slate-800/80 flex flex-col bg-slate-950/20">
                      
                      {/* Search & Filters */}
                      <div className="p-4 border-b border-slate-800/80 space-y-3 bg-slate-950/40">
                        {/* Search input */}
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                            <Search className="w-3.5 h-3.5" />
                          </span>
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search name, company, text..."
                            className="w-full bg-[#030424] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:border-[#33ccff]/40 focus:outline-none"
                          />
                        </div>

                        {/* Dropdown Filters */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] font-mono text-slate-500 uppercase block mb-1">
                              Category
                            </label>
                            <select
                              value={filterType}
                              onChange={(e) => setFilterType(e.target.value)}
                              className="w-full bg-[#030424] border border-slate-800 text-[10px] text-slate-300 rounded p-1"
                            >
                              <option value="All">All Categories</option>
                              <option value="Partnership">Partnership</option>
                              <option value="General Enquiry">General</option>
                              <option value="Complaint">Complaint</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[9px] font-mono text-slate-500 uppercase block mb-1">
                              Status
                            </label>
                            <select
                              value={filterStatus}
                              onChange={(e) => setFilterStatus(e.target.value)}
                              className="w-full bg-[#030424] border border-slate-800 text-[10px] text-slate-300 rounded p-1"
                            >
                              <option value="All">All Statuses</option>
                              <option value="Unread">Unread</option>
                              <option value="In Review">In Review</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* List area */}
                      <div className="flex-1 overflow-y-auto divide-y divide-slate-900/60 scrollbar-thin">
                        {filteredInquiries.length === 0 ? (
                          <div className="p-8 text-center space-y-2">
                            <Inbox className="w-8 h-8 text-slate-700 mx-auto" />
                            <p className="text-xs text-slate-500">No matching inquiries found.</p>
                          </div>
                        ) : (
                          filteredInquiries.map((inq) => {
                            const isSelected = inq.id === selectedId;
                            const isUnread = inq.status === "Unread";
                            return (
                              <div
                                key={inq.id}
                                onClick={() => {
                                  setSelectedId(inq.id);
                                  if (inq.status === "Unread") {
                                    handleUpdateStatus(inq.id, "In Review");
                                  }
                                }}
                                className={`p-4 text-left cursor-pointer transition-all flex items-start gap-3 relative ${
                                  isSelected 
                                    ? "bg-[#33ccff]/5 border-l-2 border-[#33ccff]" 
                                    : "hover:bg-slate-950/40"
                                }`}
                              >
                                {isUnread && (
                                  <span className="absolute top-4 right-4 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#33ccff] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#33ccff]"></span>
                                  </span>
                                )}

                                <div className="flex-1 min-w-0 space-y-1">
                                  <div className="flex items-center space-x-1.5">
                                    <span className="text-xs font-bold text-white truncate max-w-[150px]">
                                      {inq.name}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-500 truncate max-w-[120px]">
                                      @{inq.company}
                                    </span>
                                  </div>

                                  <p className="text-xs text-slate-400 truncate leading-snug">
                                    {inq.message || "No message attached."}
                                  </p>

                                  <div className="flex items-center justify-between pt-1 text-[9px] font-mono">
                                    <span className="text-slate-500">
                                      {new Date(inq.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <div className="flex items-center space-x-1">
                                      <span className={`px-1.5 py-0.5 rounded-full border text-[8px] font-extrabold uppercase ${
                                        inq.stakeholderType === "Partnership"
                                          ? "bg-[#33ccff]/10 border-[#33ccff]/20 text-[#33ccff]"
                                          : inq.stakeholderType === "Complaint"
                                          ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                                          : inq.stakeholderType === "General Enquiry"
                                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                          : "bg-slate-800 border-slate-700 text-slate-300"
                                      }`}>
                                        {inq.stakeholderType}
                                      </span>
                                      <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-mono ${
                                        inq.status === "Unread"
                                          ? "bg-[#33ccff] text-[#030424] font-extrabold"
                                          : inq.status === "In Review"
                                          ? "bg-slate-800 text-amber-400 border border-amber-400/20"
                                          : inq.status === "Contacted"
                                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold"
                                          : "bg-slate-900 text-slate-500"
                                      }`}>
                                        {inq.status}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Right Column: Detailed View Pane */}
                    <div className="flex-1 overflow-y-auto bg-slate-950/40 p-6 space-y-6 scrollbar-thin relative">
                      {selectedInquiry ? (
                        <div className="space-y-6">
                          
                          {/* Core Meta Card */}
                          <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-5 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-900">
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono font-extrabold uppercase bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-400">
                                  ID: {selectedInquiry.id}
                                </span>
                                <h4 className="text-xl font-extrabold text-white font-display tracking-tight mt-1">
                                  {selectedInquiry.name}
                                </h4>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <Building className="w-3.5 h-3.5 text-[#33ccff]" />
                                    <strong>{selectedInquiry.company}</strong>
                                  </span>
                                  <span className="text-slate-600">•</span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                    {new Date(selectedInquiry.timestamp).toLocaleString()}
                                  </span>
                                </div>
                              </div>

                              {/* Status Action Controls */}
                              <div className="flex flex-wrap items-center gap-2">
                                <label className="text-[10px] font-mono text-slate-500 uppercase block font-bold">
                                  Lead Status:
                                </label>
                                <select
                                  value={selectedInquiry.status}
                                  onChange={(e) => handleUpdateStatus(selectedInquiry.id, e.target.value)}
                                  className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded px-2.5 py-1.5 focus:border-[#33ccff]/40 focus:outline-none"
                                >
                                  <option value="Unread">Unread</option>
                                  <option value="In Review">Under Review</option>
                                  <option value="Contacted">Contacted / Completed</option>
                                  <option value="Archived">Archived</option>
                                </select>
                              </div>
                            </div>

                            {/* Contact Email Link */}
                            <div className="flex flex-wrap items-center gap-3">
                              <a
                                href={`mailto:${selectedInquiry.email}?subject=Yeedem Strategic Response - ${selectedInquiry.company}&body=Hi ${selectedInquiry.name},%0D%0DThank you for contacting Yeedem regarding our offline-first compliance and finance systems.%0D%0DBest regards,%0DSuleman Bades%0DCEO, Yeedem`}
                                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:opacity-90 active:scale-95 text-xs font-mono font-bold text-white rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer"
                              >
                                <Mail className="w-3.5 h-3.5 text-emerald-200" />
                                <span>Compose Reply to: {selectedInquiry.email}</span>
                              </a>
                              <button
                                onClick={() => handleExportJSON(selectedInquiry)}
                                className="px-3 py-2 bg-slate-900 hover:bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 hover:text-white rounded-lg transition-all flex items-center space-x-1 cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5 text-slate-500" />
                                <span>Download JSON</span>
                              </button>
                              <button
                                onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                                className="px-3 py-2 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 text-xs font-mono text-rose-300 rounded-lg transition-all flex items-center space-x-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                                <span>Delete Inquiry</span>
                              </button>
                            </div>
                          </div>

                          {/* Client Message */}
                          <div className="space-y-2">
                            <h5 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold">
                              Sender Attachment Message
                            </h5>
                            <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 text-sm text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
                              {selectedInquiry.message || <span className="text-slate-500 italic">No custom message included in lead submission.</span>}
                            </div>
                          </div>

                          {/* AI Generated Integration Report */}
                          {selectedInquiry.result ? (
                            <div className="space-y-4">
                              <h5 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-[#33ccff]" />
                                <span>System-Compiled Strategic Strategy Strategy (Real-time AI)</span>
                              </h5>

                              <div className="bg-[#070840] border border-[#33ccff]/15 rounded-xl p-5 space-y-4 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#33ccff]/5 to-transparent blur-2xl pointer-events-none" />

                                {/* Executive Summary */}
                                <div className="space-y-1.5 relative z-10">
                                  <h6 className="text-[10px] font-mono text-[#33ccff] uppercase tracking-wider font-extrabold">
                                    EXECUTIVE SUMMARY
                                  </h6>
                                  <p className="text-xs text-slate-200 font-mono leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-900/40">
                                    {selectedInquiry.result.executiveSummary}
                                  </p>
                                </div>

                                {/* Strategic Roadmap */}
                                <div className="space-y-2.5 relative z-10">
                                  <h6 className="text-[10px] font-mono text-[#33ccff] uppercase tracking-wider font-extrabold">
                                    OPERATIONAL ROADMAP
                                  </h6>
                                  <div className="space-y-2">
                                    {selectedInquiry.result.strategicRoadmap && selectedInquiry.result.strategicRoadmap.map((step, idx) => (
                                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 bg-slate-950/20 p-2.5 rounded-lg border border-slate-900/20">
                                        <span className="font-mono font-bold text-[#33ccff] shrink-0 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                                          {idx + 1}
                                        </span>
                                        <span className="leading-normal">{step}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Estimated ROI */}
                                <div className="space-y-1.5 relative z-10">
                                  <h6 className="text-[10px] font-mono text-[#33ccff] uppercase tracking-wider font-extrabold">
                                    QUANTIFIED ROI MATRIX
                                  </h6>
                                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                                    {selectedInquiry.result.estimatedROI}
                                  </p>
                                </div>

                                {/* Partnership greeting message */}
                                <div className="pt-3 border-t border-slate-900/60 relative z-10">
                                  <p className="text-xs text-slate-400 italic">
                                    "{selectedInquiry.result.partnershipMessage}"
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 bg-slate-950/40 border border-slate-900 text-xs text-slate-500 italic rounded-xl text-center">
                              No automated strategy compiled for this submission.
                            </div>
                          )}

                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3">
                          <Inbox className="w-12 h-12 text-slate-800" />
                          <h5 className="text-sm font-bold text-slate-400">No Lead Selected</h5>
                          <p className="text-xs text-slate-500 max-w-xs">
                            Select an active strategic partnership inquiry from the left panel list to inspect compliance metadata, user messages, and custom-compiled integration roadmaps.
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Status footer banner */}
              <div className="p-4 bg-slate-950 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500 relative z-10">
                <div className="flex items-center space-x-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Suleman Bades Ledger Storage: {inquiries.length} Inquiries Logged</span>
                </div>
                <span>YEEDEM CENTRAL COMPLIANCE SECURE PORTAL</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
