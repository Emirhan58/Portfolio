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

const TRACKS: [string, string][] = [
  ["/audio/music/ambient-01.ogg", "/audio/music/ambient-01.mp3"],
  ["/audio/music/ambient-02.ogg", "/audio/music/ambient-02.mp3"],
];

const SFX_NAMES = [
  "brush-stroke",
  "ink-drop",
  "katana-slash",
  "swoosh",
  "tink",
];

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
  const startMusicIfReady = useCallback(() => {
    if (!musicRef.current) return;

    const introSeen = sessionStorage.getItem("kanji-intro-seen");
    if (introSeen === "true") {
      // Intro already done -- start music immediately with fade-in
      musicRef.current.play();
      musicRef.current.fade(0, volume, 1500);
    } else {
      // Intro still in progress -- listen once for completion, then start music
      const onIntroDone = () => {
        if (musicRef.current) {
          musicRef.current.play();
          musicRef.current.fade(0, volume, 1500);
        }
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

        // If user previously had audio enabled, auto-enable on first click
        if (wasEnabled) {
          const handler = () => {
            initAudio();
            setEnabled(true);
            Howler.volume(v ?? 0.5);
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
    for (const name of SFX_NAMES) {
      sfxRef.current[name] = new Howl({
        src: [`/audio/sfx/${name}.ogg`, `/audio/sfx/${name}.mp3`],
      });
    }

    // Create music Howl with html5 streaming
    const trackSrc = TRACKS[currentTrackIndex.current];
    musicRef.current = new Howl({
      src: trackSrc,
      html5: true,
      loop: true,
      volume: 0,
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
          html5: true,
          loop: true,
          volume: 0,
        });
        musicRef.current.play();
        musicRef.current.fade(0, Howler.volume(), 1500);
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
