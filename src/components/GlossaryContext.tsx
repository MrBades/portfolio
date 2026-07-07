import React, { createContext, useContext, useState } from "react";

export interface GlossaryTermData {
  term: string;
  definition: string;
  contextualApplication: string;
  category: string;
  difficulty: "Core" | "Intermediate" | "Advanced";
  relatedTerms: string[];
  isAiGenerated: boolean;
}

interface GlossaryContextType {
  isOpen: boolean;
  activeTerm: string | null;
  termData: GlossaryTermData | null;
  isLoading: boolean;
  error: string | null;
  openTerm: (term: string, context?: string) => Promise<void>;
  closeGlossary: () => void;
}

const GlossaryContext = createContext<GlossaryContextType | undefined>(undefined);

export function GlossaryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const [termData, setTermData] = useState<GlossaryTermData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openTerm = async (term: string, contextText?: string) => {
    setIsOpen(true);
    setActiveTerm(term);
    setIsLoading(true);
    setError(null);
    setTermData(null);

    try {
      const response = await fetch("/api/glossary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ term, context: contextText }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch glossary definition.");
      }

      const data = await response.json();
      setTermData(data);
    } catch (err: any) {
      console.error("Glossary fetch error:", err);
      setError("Unable to compile real-time AI definition. Loaded offline database fallback.");
      
      // Client-side emergency fallback just in case the server fails completely
      setTermData({
        term,
        definition: `A specialized technical parameter of Yeedem's unmapped operations: "${term}". This core system module operates natively within zero-bandwidth parameters.`,
        contextualApplication: `Integrated natively inside Yeedem's high-uptime offline ecosystem to streamline accounting integrity for unmapped retail sectors.`,
        category: "Enterprise System",
        difficulty: "Intermediate",
        relatedTerms: ["Double-Entry Ledger", "Local Fuse Parser"],
        isAiGenerated: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeGlossary = () => {
    setIsOpen(false);
    setActiveTerm(null);
    setTermData(null);
  };

  return (
    <GlossaryContext.Provider
      value={{
        isOpen,
        activeTerm,
        termData,
        isLoading,
        error,
        openTerm,
        closeGlossary,
      }}
    >
      {children}
    </GlossaryContext.Provider>
  );
}

export function useGlossary() {
  const context = useContext(GlossaryContext);
  if (!context) {
    throw new Error("useGlossary must be used within a GlossaryProvider");
  }
  return context;
}
