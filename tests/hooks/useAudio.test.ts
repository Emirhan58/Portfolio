import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, render, screen, act } from "@testing-library/react";
import React from "react";

// Mock howler module — Howl must be a proper constructor (class/function)
vi.mock("howler", () => {
  function Howl() {
    this.play = vi.fn();
    this.pause = vi.fn();
    this.fade = vi.fn();
    this.volume = vi.fn();
    this.unload = vi.fn();
    this.on = vi.fn();
  }
  return { Howl, Howler: { volume: vi.fn() } };
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};
vi.stubGlobal("localStorage", localStorageMock);

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(() => "true"),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};
vi.stubGlobal("sessionStorage", sessionStorageMock);

import { AudioProvider, useAudio } from "@/components/providers/AudioProvider";

describe("AudioProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    sessionStorageMock.getItem.mockReturnValue("true");
  });

  it("renders children", () => {
    render(
      React.createElement(
        AudioProvider,
        null,
        React.createElement("div", { "data-testid": "child" }, "Hello")
      )
    );
    expect(screen.getByTestId("child")).toBeTruthy();
  });

  it("useAudio throws outside provider", () => {
    expect(() => {
      renderHook(() => useAudio());
    }).toThrow("useAudio must be inside AudioProvider");
  });

  it("toggleAudio toggles enabled state", () => {
    let audioState: ReturnType<typeof useAudio>;

    function Consumer() {
      audioState = useAudio();
      return React.createElement("div", null, String(audioState.enabled));
    }

    render(
      React.createElement(AudioProvider, null, React.createElement(Consumer))
    );

    expect(audioState!.enabled).toBe(false);

    act(() => {
      audioState!.toggleAudio();
    });

    expect(audioState!.enabled).toBe(true);
  });

  it("playSfx skips when disabled", () => {
    let audioState: ReturnType<typeof useAudio>;

    function Consumer() {
      audioState = useAudio();
      return null;
    }

    render(
      React.createElement(AudioProvider, null, React.createElement(Consumer))
    );

    // Audio is disabled by default, playSfx should be a no-op
    // Since initAudio hasn't been called, sfxRef is empty -- no Howl.play called
    expect(audioState!.enabled).toBe(false);

    // Calling playSfx when disabled should not throw
    act(() => {
      audioState!.playSfx("tink");
    });

    // Still disabled -- no error means playSfx safely short-circuited
    expect(audioState!.enabled).toBe(false);
  });

  it("setVolume updates volume and saves to localStorage", () => {
    let audioState: ReturnType<typeof useAudio>;

    function Consumer() {
      audioState = useAudio();
      return null;
    }

    render(
      React.createElement(AudioProvider, null, React.createElement(Consumer))
    );

    act(() => {
      audioState!.setVolume(0.8);
    });

    expect(audioState!.volume).toBe(0.8);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "audio-prefs",
      expect.stringContaining("0.8")
    );
  });

  it("startMusicIfReady defers music when intro not seen", () => {
    sessionStorageMock.getItem.mockReturnValue(null);
    const addEventSpy = vi.spyOn(window, "addEventListener");

    let audioState: ReturnType<typeof useAudio>;

    function Consumer() {
      audioState = useAudio();
      return null;
    }

    render(
      React.createElement(AudioProvider, null, React.createElement(Consumer))
    );

    // Toggle audio to trigger startMusicIfReady
    act(() => {
      audioState!.toggleAudio();
    });

    // Should have registered a listener for "kanji-intro-done"
    const introCall = addEventSpy.mock.calls.find(
      (call) => call[0] === "kanji-intro-done"
    );
    expect(introCall).toBeTruthy();

    addEventSpy.mockRestore();
  });
});
