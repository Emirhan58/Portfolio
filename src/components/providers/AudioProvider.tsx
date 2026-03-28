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
  ["/audio/music/green.mp3"],
];

const MUSIC_VOLUME_SCALE = 0.5;

const SFX_MAP: Record<string, string> = {
  "slash1": "/audio/sfx/slash1.mp3",
  "slash2": "/audio/sfx/slash2.mp3",
  "tink": "/audio/sfx/tink.wav",
};

// Module-level audio state — survives component remounts (locale switch etc.)
let audioInitialized = false;
let sfxInstances: Record<string, Howl> = {};
let musicInstance: Howl | null = null;
let currentTrackIdx = 0;

function initAudioOnce() {
  if (audioInitialized) return;
  audioInitialized = true;

  for (const [name, src] of Object.entries(SFX_MAP)) {
    sfxInstances[name] = new Howl({
      src: [src],
      onloaderror: (_id: number, err: unknown) =>
        console.warn(`[Audio] SFX load error (${name}):`, err),
      onplayerror: (_id: number, err: unknown) =>
        console.warn(`[Audio] SFX play error (${name}):`, err),
    });
  }

  const trackSrc = TRACKS[currentTrackIdx];
  musicInstance = new Howl({
    src: trackSrc,
    loop: true,
    volume: 0,
    preload: true,
    onloaderror: (_id: number, err: unknown) =>
      console.warn("[Audio] Music load error:", err),
    onplayerror: (_id: number, err: unknown) =>
      console.warn("[Audio] Music play error:", err),
  });

  musicInstance.on("end", () => {
    currentTrackIdx = (currentTrackIdx + 1) % TRACKS.length;
    const nextSrc = TRACKS[currentTrackIdx];
    if (musicInstance) {
      musicInstance.unload();
      musicInstance = new Howl({
        src: nextSrc,
        loop: true,
        volume: 0,
        preload: true,
      });
      musicInstance.play();
      musicInstance.fade(0, Howler.volume() * MUSIC_VOLUME_SCALE, 800);
    }
  });
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const sfxLastPlayed = useRef<Record<string, number>>({});
  const introListenerRef = useRef<(() => void) | null>(null);

  const startMusicIfReady = useCallback(() => {
    if (!musicInstance) return;
    if (musicInstance.playing()) return;

    if (introListenerRef.current) {
      window.removeEventListener("kanji-intro-done", introListenerRef.current);
      introListenerRef.current = null;
    }

    const introSeen = sessionStorage.getItem("kanji-intro-seen");
    if (introSeen === "true") {
      musicInstance.play();
      musicInstance.fade(0, volume * MUSIC_VOLUME_SCALE, 800);
    } else {
      const onIntroDone = () => {
        if (musicInstance) {
          musicInstance.play();
          musicInstance.fade(0, volume * MUSIC_VOLUME_SCALE, 800);
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

        if (wasEnabled) {
          setEnabled(true);
          initAudioOnce();
          Howler.volume(v ?? 0.5);

          // If music was playing before remount, continue
          if (musicInstance?.playing()) return;

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
      // localStorage unavailable
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAudio = useCallback(() => {
    initAudioOnce();
    setEnabled((prev) => {
      const next = !prev;
      if (next) {
        sfxInstances["tink"]?.play();
        Howler.volume(volume);
        startMusicIfReady();
      } else {
        musicInstance?.fade(volume * MUSIC_VOLUME_SCALE, 0, 1000);
        setTimeout(() => musicInstance?.pause(), 1000);
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
  }, [volume, startMusicIfReady]);

  const playSfx = useCallback(
    (name: string) => {
      if (!enabled || !sfxInstances[name]) return;

      const now = Date.now();
      const last = sfxLastPlayed.current[name] || 0;
      if (now - last < 200) return;
      sfxLastPlayed.current[name] = now;

      sfxInstances[name].play();
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

  // No cleanup — module-level instances persist across remounts
  useEffect(() => {
    return () => {
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
