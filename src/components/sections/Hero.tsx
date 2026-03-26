import { getTranslations } from "next-intl/server";
import { SakuraFall } from "@/components/ui/SakuraFall";
import { HeroTagline } from "@/components/animations/HeroTagline";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4 overflow-hidden">
      {/* === Background Art Layer === */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

        {/* Sumi-e brush strokes — confident, tapering, with splatter */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Rough ink edge — displacement + blur for organic feel */}
            <filter id="sumi-rough">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="5" seed="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
              <feGaussianBlur stdDeviation="0.8" />
            </filter>
            <filter id="sumi-soft">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
              <feGaussianBlur stdDeviation="2" />
            </filter>
            <filter id="splatter">
              <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" seed="12" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
          </defs>

          {/*
            Main stroke — bold diagonal sweep from lower-left.
            Starts thick (strokeWidth gradient simulated by overlapping paths),
            tapers off as it rises. Like a single confident brush gesture.
          */}
          {/* Thick base of stroke */}
          <path
            d="M-30,820 C50,800 120,760 200,700 Q260,660 300,620"
            stroke="var(--color-paper)"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
            filter="url(#sumi-rough)"
            opacity="0.7"
          />
          {/* Mid section — getting thinner */}
          <path
            d="M280,640 C320,600 370,550 430,510 Q480,480 520,460"
            stroke="var(--color-paper)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            filter="url(#sumi-rough)"
            opacity="0.6"
          />
          {/* Tail — thin flick trailing off */}
          <path
            d="M500,475 C540,455 590,430 650,420 Q700,415 730,418"
            stroke="var(--color-paper)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            filter="url(#sumi-rough)"
            opacity="0.4"
          />

          {/* Second stroke — quick horizontal slash, upper right area */}
          <path
            d="M950,160 C1000,155 1080,150 1160,165 Q1220,175 1260,190"
            stroke="var(--color-paper)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            filter="url(#sumi-rough)"
            opacity="0.45"
          />
          {/* Thin trailing end */}
          <path
            d="M1240,185 C1280,200 1320,220 1350,245"
            stroke="var(--color-paper)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            filter="url(#sumi-rough)"
            opacity="0.3"
          />

          {/* Red accent — short, energetic slash */}
          <path
            d="M1080,680 C1110,660 1150,635 1200,625"
            stroke="var(--color-accent-red)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            filter="url(#sumi-rough)"
            opacity="0.35"
          />

          {/* Ink splatter from main stroke — small dots scattered near impact */}
          <g filter="url(#splatter)" opacity="0.5">
            <circle cx="220" cy="690" r="4" fill="var(--color-paper)" />
            <circle cx="245" cy="710" r="2.5" fill="var(--color-paper)" />
            <circle cx="195" cy="715" r="1.8" fill="var(--color-paper)" />
            <circle cx="270" cy="695" r="1.2" fill="var(--color-paper)" />
            <circle cx="180" cy="730" r="3" fill="var(--color-paper)" />
            <circle cx="310" cy="635" r="2" fill="var(--color-paper)" />
            <circle cx="255" cy="660" r="1.5" fill="var(--color-paper)" />
          </g>

          {/* Splatter near second stroke */}
          <g filter="url(#splatter)" opacity="0.35">
            <circle cx="980" cy="148" r="2.5" fill="var(--color-paper)" />
            <circle cx="1010" cy="140" r="1.5" fill="var(--color-paper)" />
            <circle cx="1270" cy="200" r="2" fill="var(--color-paper)" />
            <circle cx="1290" cy="210" r="1.2" fill="var(--color-paper)" />
          </g>

          {/* Dry brush texture — thin parallel scratches near main stroke */}
          <g opacity="0.2" filter="url(#sumi-soft)">
            <path d="M100,790 C140,770 180,750 220,730" stroke="var(--color-paper)" strokeWidth="0.8" fill="none" />
            <path d="M110,800 C150,778 190,758 230,738" stroke="var(--color-paper)" strokeWidth="0.5" fill="none" />
            <path d="M90,810 C130,788 170,768 210,748" stroke="var(--color-paper)" strokeWidth="0.6" fill="none" />
          </g>
        </svg>

        {/* Bamboo — left side */}
        <svg
          className="absolute left-6 md:left-16 top-0 h-full w-24 md:w-32 opacity-[0.06]"
          viewBox="0 0 120 900"
          preserveAspectRatio="xMidYMin slice"
        >
          <line x1="45" y1="0" x2="45" y2="900" stroke="var(--color-paper)" strokeWidth="3" />
          <ellipse cx="45" cy="150" rx="6" ry="2" fill="var(--color-paper)" opacity="0.8" />
          <ellipse cx="45" cy="350" rx="6" ry="2" fill="var(--color-paper)" opacity="0.8" />
          <ellipse cx="45" cy="550" rx="6" ry="2" fill="var(--color-paper)" opacity="0.8" />
          <ellipse cx="45" cy="720" rx="6" ry="2" fill="var(--color-paper)" opacity="0.8" />
          <path d="M45,140 C55,120 80,110 100,115" stroke="var(--color-paper)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M45,140 C55,125 75,128 90,135" stroke="var(--color-paper)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M45,345 C35,320 15,315 5,325" stroke="var(--color-paper)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M45,345 C30,330 18,335 8,340" stroke="var(--color-paper)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M45,545 C60,525 85,520 105,528" stroke="var(--color-paper)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M45,545 C55,530 78,532 95,542" stroke="var(--color-paper)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <line x1="65" y1="80" x2="65" y2="900" stroke="var(--color-paper)" strokeWidth="2" opacity="0.6" />
          <ellipse cx="65" cy="250" rx="4" ry="1.5" fill="var(--color-paper)" opacity="0.5" />
          <ellipse cx="65" cy="480" rx="4" ry="1.5" fill="var(--color-paper)" opacity="0.5" />
          <path d="M65,245 C75,230 90,228 105,234" stroke="var(--color-paper)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M65,475 C55,460 35,458 20,465" stroke="var(--color-paper)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
        </svg>

        {/* Sakura branch with flowers — right side */}
        <svg
          className="absolute right-4 md:right-12 top-[25%] w-44 md:w-64 h-[70%] opacity-[0.09]"
          viewBox="0 0 220 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <path id="petal" d="M0,-14 C5,-14 9,-8 9,-3 C9,2 5,6 0,8 C-5,6 -9,2 -9,-3 C-9,-8 -5,-14 0,-14 Z" />
          </defs>
          {/* Branch */}
          <path
            d="M195,10 C175,40 155,70 130,120 S90,220 75,300 Q65,360 60,420"
            stroke="var(--color-paper)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5"
          />
          <path
            d="M145,95 C160,110 175,130 180,160"
            stroke="var(--color-paper)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"
          />
          <path
            d="M95,250 C80,240 60,225 45,230"
            stroke="var(--color-paper)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"
          />
          {/* Flower 1 */}
          <g transform="translate(145, 90)">
            <use href="#petal" transform="rotate(0)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(72)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(144)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(216)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(288)" fill="var(--color-accent-red)" />
            <circle r="3.5" fill="var(--color-accent-gold)" />
            <circle cx="2" cy="-3" r="0.8" fill="var(--color-accent-gold)" opacity="0.8" />
            <circle cx="-2" cy="-2.5" r="0.8" fill="var(--color-accent-gold)" opacity="0.8" />
          </g>
          {/* Flower 2 */}
          <g transform="translate(100, 235) rotate(-20)">
            <use href="#petal" transform="rotate(0) scale(0.85)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(72) scale(0.85)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(144) scale(0.85)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(216) scale(0.85)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(288) scale(0.85)" fill="var(--color-accent-red)" />
            <circle r="3" fill="var(--color-accent-gold)" />
          </g>
          {/* Flower 3 */}
          <g transform="translate(178, 155) rotate(15)">
            <use href="#petal" transform="rotate(0) scale(0.75)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(72) scale(0.75)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(144) scale(0.75)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(216) scale(0.75)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(288) scale(0.75)" fill="var(--color-accent-red)" />
            <circle r="2.5" fill="var(--color-accent-gold)" />
          </g>
          {/* Flower 4 */}
          <g transform="translate(70, 370) rotate(-10)">
            <use href="#petal" transform="rotate(0) scale(0.9)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(72) scale(0.9)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(144) scale(0.9)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(216) scale(0.9)" fill="var(--color-accent-red)" />
            <use href="#petal" transform="rotate(288) scale(0.9)" fill="var(--color-accent-red)" />
            <circle r="3" fill="var(--color-accent-gold)" />
          </g>
          {/* Bud */}
          <g transform="translate(50, 415)">
            <ellipse rx="4" ry="7" fill="var(--color-accent-red)" opacity="0.7" transform="rotate(-10)" />
            <ellipse rx="3" ry="6" fill="var(--color-accent-red)" opacity="0.5" transform="rotate(15)" />
          </g>
        </svg>

        {/* Enso circle — wraps all content */}
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[52%] w-[420px] h-[420px] md:w-[500px] md:h-[500px] opacity-[0.045]"
          viewBox="0 0 200 200"
        >
          <defs>
            <filter id="enso-brush">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="5" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
              <feGaussianBlur stdDeviation="1" />
            </filter>
          </defs>
          <path
            d="M100,12 C158,12 188,52 188,100 C188,148 158,188 100,188 C46,188 14,152 13,108"
            stroke="var(--color-paper)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            filter="url(#enso-brush)"
          />
        </svg>

        {/* Subtle radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, rgba(192, 57, 43, 0.03) 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Falling sakura petals — animated */}
      <SakuraFall />

      {/* Content */}
      <div className="relative z-base">
        <h1
          className="font-heading font-bold text-paper leading-[1.1]"
          style={{ fontSize: "clamp(3rem, 5vw, 6rem)" }}
        >
          {t("name")}
        </h1>
        <p className="text-h3 text-text-secondary opacity-80 mt-4">
          {t("role")}
        </p>
        <p className="text-body text-text-secondary italic mt-3 max-w-[600px] mx-auto">
          <HeroTagline />
        </p>
        <a
          href="/Emirhan_Kaya_CV.pdf"
          download
          className="inline-block mt-8 bg-accent-red text-paper px-6 py-2 rounded-md font-medium transition-all duration-normal hover:bg-accent-red-bright hover:shadow-[0_0_20px_rgba(192,57,43,0.4)]"
        >
          {t("downloadCV")}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-text-secondary opacity-60"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}
