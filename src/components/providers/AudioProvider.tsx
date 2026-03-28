"use client";
import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { Howl, Howler } from "howler";

interface AudioState {
  enabled: boolean;
  volume: number;
  toggleAudio: () => void;
  setVolume: (v: number) => void;
  playSfx: (name: string) => void;
}

const AudioCtx = createContext<AudioState | null>(null);

const TRACKS: string[][] = [
  ["/audio/music/river-flows-in-you.mp3"],
];

const SFX_MAP: Record<string, string> = {
  "slash1": "/audio/sfx/slash1.mp3",
  "slash2": "/audio/sfx/slash2.mp3",
  "tink": "/audio/sfx/tink.wav",
};

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const initialized = useRef(false);
  const musicRef = useRef<Howl | null>(null);
  const sfxRef = useRef<Record<string, Howl>>({});
  const currentTrackIndex = useRef(0);
  const sfxLastPlayed = useRef<Record<string, number>>({});
  const introListenerRef = useRef<(() => void) | null>(null);

  // Helper: start music only after kanji intro completes
  // Cleans up any previous listener before adding a new one to prevent duplicates
  const startMusicIfReady = useCallback(() => {
    if (!musicRef.current) return;

    // If already playing, don't restart
    if (musicRef.current.playing()) return;

    // Remove any previous intro listener to prevent duplicates
    if (introListenerRef.current) {
      window.removeEventListener("kanji-intro-done", introListenerRef.current);
      introListenerRef.current = null;
    }

    const introSeen = sessionStorage.getItem("kanji-intro-seen");
    if (introSeen === "true") {
      musicRef.current.play();
      musicRef.current.fade(0, volume, 800);
    } else {
      const onIntroDone = () => {
        if (musicRef.current) {
          musicRef.current.play();
          musicRef.current.fade(0, volume, 800);
        }
        introListenerRef.current = null;
      };
      introListenerRef.current = onIntroDone;
      window.addEventListener("kanji-intro-done", onIntroDone, { once: true });
    }
  }, [volume]);

  // Restore preferences from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("audio-prefs");
      if (saved) {
        const { enabled: wasEnabled, volume: v } = JSON.parse(saved);
        if (typeof v === "number") setVolumeState(v);

        // If user previously had audio enabled, restore UI + preload sounds
        // Music starts on first user gesture (browser autoplay policy)
        if (wasEnabled) {
          setEnabled(true);
          initAudio();
          Howler.volume(v ?? 0.5);

          const handler = () => {
            startMusicIfReady();
            document.removeEventListener("click", handler);
            document.removeEventListener("touchstart", handler);
          };
          document.addEventListener("click", handler, { once: true });
          document.addEventListener("touchstart", handler, { once: true });

          return () => {
            document.removeEventListener("click", handler);
            document.removeEventListener("touchstart", handler);
          };
        }
      }
    } catch {
      // localStorage unavailable (SSR or private browsing)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initAudio = useCallback(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Create SFX Howl instances
    for (const [name, src] of Object.entries(SFX_MAP)) {
      sfxRef.current[name] = new Howl({
        src: [src],
        onloaderror: (_id: number, err: unknown) =>
          console.warn(`[Audio] SFX load error (${name}):`, err),
        onplayerror: (_id: number, err: unknown) =>
          console.warn(`[Audio] SFX play error (${name}):`, err),
      });
    }

    // Create music Howl (Web Audio API — fully preloads for instant playback)
    const trackSrc = TRACKS[currentTrackIndex.current];
    musicRef.current = new Howl({
      src: trackSrc,
      loop: true,
      volume: 0,
      preload: true,
      onloaderror: (_id: number, err: unknown) =>
        console.warn("[Audio] Music load error:", err),
      onplayerror: (_id: number, err: unknown) =>
        console.warn("[Audio] Music play error:", err),
    });

    // On track end, advance to next track
    musicRef.current.on("end", () => {
      currentTrackIndex.current =
        (currentTrackIndex.current + 1) % TRACKS.length;
      const nextSrc = TRACKS[currentTrackIndex.current];
      if (musicRef.current) {
        musicRef.current.unload();
        musicRef.current = new Howl({
          src: nextSrc,
          loop: true,
          volume: 0,
          preload: true,
        });
        musicRef.current.play();
        musicRef.current.fade(0, Howler.volume(), 800);
      }
    });
  }, []);

  const toggleAudio = useCallback(() => {
    initAudio();
    setEnabled((prev) => {
      const next = !prev;
      if (next) {
        // Enable: play tink SFX, set global volume, start music
        sfxRef.current["tink"]?.play();
        Howler.volume(volume);
        startMusicIfReady();
      } else {
        // Disable: fade out music then pause
        musicRef.current?.fade(volume, 0, 1000);
        setTimeout(() => musicRef.current?.pause(), 1000);
      }
      try {
        localStorage.setItem(
          "audio-prefs",
          JSON.stringify({ enabled: next, volume })
        );
      } catch {
        // localStorage unavailable
      }
      return next;
    });
  }, [initAudio, volume, startMusicIfReady]);

  const playSfx = useCallback(
    (name: string) => {
      if (!enabled || !sfxRef.current[name]) return;

      // Debounce: skip if same SFX played < 200ms ago
      const now = Date.now();
      const last = sfxLastPlayed.current[name] || 0;
      if (now - last < 200) return;
      sfxLastPlayed.current[name] = now;

      sfxRef.current[name].play();
    },
    [enabled]
  );

  const setVolume = useCallback(
    (v: number) => {
      setVolumeState(v);
      Howler.volume(v);
      try {
        localStorage.setItem(
          "audio-prefs",
          JSON.stringify({ enabled, volume: v })
        );
      } catch {
        // localStorage unavailable
      }
    },
    [enabled]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      musicRef.current?.unload();
      Object.values(sfxRef.current).forEach((h) => h.unload());
      if (introListenerRef.current) {
        window.removeEventListener("kanji-intro-done", introListenerRef.current);
      }
    };
  }, []);

  return (
    <AudioCtx.Provider
      value={{ enabled, volume, toggleAudio, setVolume, playSfx }}
    >
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be inside AudioProvider");
  return ctx;
}
