import React from "react";
import { useGlossary } from "./GlossaryContext";
import { Sparkles } from "lucide-react";

interface GlossaryTermProps {
  term: string;
  context?: string;
  children?: React.ReactNode;
  key?: React.Key;
}

export default function GlossaryTerm({ term, context, children }: GlossaryTermProps) {
  const { openTerm } = useGlossary();

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openTerm(term, context || children?.toString() || term);
  };

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => e.key === "Enter" && handleOpen(e as any)}
      className="inline-flex items-center text-[#33ccff] hover:text-sky-300 font-medium border-b border-dashed border-[#33ccff]/50 hover:border-[#33ccff] cursor-pointer transition-all duration-200 decoration-none select-none px-0.5"
      title={`Click to view '${term}' in glossary`}
    >
      {children || term}
      <Sparkles className="w-2.5 h-2.5 ml-0.5 text-[#33ccff]/60 animate-pulse inline-block" />
    </span>
  );
}
