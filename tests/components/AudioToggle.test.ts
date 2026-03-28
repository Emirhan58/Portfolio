import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

// Mock howler
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

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const mockToggleAudio = vi.fn();
const mockSetVolume = vi.fn();

// Mock AudioProvider's useAudio
vi.mock("@/components/providers/AudioProvider", () => ({
  useAudio: () => ({
    enabled: false,
    volume: 0.5,
    toggleAudio: mockToggleAudio,
    setVolume: mockSetVolume,
    playSfx: vi.fn(),
  }),
}));

import { AudioToggle } from "@/components/layout/AudioToggle";

describe("AudioToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders volume button with aria-label", () => {
    render(React.createElement(AudioToggle));
    const button = screen.getByRole("button", { name: "soundOn" });
    expect(button).toBeTruthy();
  });

  it("renders muted icon when disabled (volume-x SVG lines)", () => {
    const { container } = render(React.createElement(AudioToggle));
    // volume-x icon has <line> elements for the X
    const lines = container.querySelectorAll("line");
    expect(lines.length).toBe(2);
  });

  it("calls toggleAudio on click", () => {
    render(React.createElement(AudioToggle));
    const button = screen.getByRole("button", { name: "soundOn" });
    fireEvent.click(button);
    expect(mockToggleAudio).toHaveBeenCalledTimes(1);
  });
});
