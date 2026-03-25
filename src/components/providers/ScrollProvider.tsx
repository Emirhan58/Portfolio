"use client";
import { createContext, useContext } from "react";
import { useScrollSection } from "@/hooks/useScrollSection";
import type { SectionId } from "@/lib/constants";

interface ScrollContextValue {
  activeSection: SectionId;
  scrollTo: (id: SectionId) => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  activeSection: "hero",
  scrollTo: () => {},
});

export const useScrollContext = () => useContext(ScrollContext);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const scrollData = useScrollSection();
  return (
    <ScrollContext.Provider value={scrollData}>
      {children}
    </ScrollContext.Provider>
  );
}
