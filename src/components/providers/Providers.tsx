"use client";
import { LenisProvider } from "./LenisProvider";
import { ScrollProvider } from "./ScrollProvider";
import { AudioProvider } from "./AudioProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <ScrollProvider>
        <AudioProvider>
          {children}
        </AudioProvider>
      </ScrollProvider>
    </LenisProvider>
  );
}
