"use client";
import { LenisProvider } from "./LenisProvider";
import { ScrollProvider } from "./ScrollProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <ScrollProvider>
        {children}
      </ScrollProvider>
    </LenisProvider>
  );
}
