import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { STATS_DATA, CORE_TECHNOLOGIES } from "@/lib/data";
import { TechTag } from "@/components/ui/TechTag";

export async function About() {
  const t = await getTranslations("about");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-h2 text-paper text-center mb-12 font-bold">
        {t("heading")}
      </h2>

      {/* Photo + Bio grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left column: Photo + Education + Stats */}
        <div className="lg:col-span-4 flex flex-col items-center gap-6">
          {/* Profile photo with ink-wash frame */}
          <div className="relative w-[240px] h-[240px] md:w-[260px] md:h-[260px]">
            <Image
              src="/images/emirhan-3.jpg"
              alt={t("photoAlt")}
              fill
              className="object-cover"
              sizes="260px"
              style={{
                maskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 8c25 -2 48 8 65 25s28 40 27 65c-1 25 -12 48 -30 63s-42 23 -65 22c-23 -1 -45 -10 -60 -27S12 116 13 93c1 -23 13 -45 32 -60S75 10 100 8z' fill='black'/%3E%3C/svg%3E")`,
                maskSize: "cover",
                maskRepeat: "no-repeat",
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 8c25 -2 48 8 65 25s28 40 27 65c-1 25 -12 48 -30 63s-42 23 -65 22c-23 -1 -45 -10 -60 -27S12 116 13 93c1 -23 13 -45 32 -60S75 10 100 8z' fill='black'/%3E%3C/svg%3E")`,
                WebkitMaskSize: "cover",
                WebkitMaskRepeat: "no-repeat",
              }}
            />
            {/* Ink-wash brush stroke border */}
            <svg
              className="absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)] pointer-events-none"
              viewBox="0 0 200 200"
              aria-hidden="true"
            >
              <defs>
                <filter id="ink-rough">
                  <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
                </filter>
              </defs>
              <path
                d="M100 8c25 -2 48 8 65 25s28 40 27 65c-1 25 -12 48 -30 63s-42 23 -65 22c-23 -1 -45 -10 -60 -27S12 116 13 93c1 -23 13 -45 32 -60S75 10 100 8z"
                fill="none"
                stroke="var(--color-accent-gold)"
                strokeWidth="1.5"
                opacity="0.35"
                filter="url(#ink-rough)"
              />
              <path
                d="M100 8c25 -2 48 8 65 25s28 40 27 65c-1 25 -12 48 -30 63s-42 23 -65 22c-23 -1 -45 -10 -60 -27S12 116 13 93c1 -23 13 -45 32 -60S75 10 100 8z"
                fill="none"
                stroke="var(--color-accent-gold)"
                strokeWidth="0.8"
                opacity="0.15"
                strokeDasharray="4 6 12 4"
              />
            </svg>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-text-secondary text-body">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t("location")}
          </div>

          {/* Education */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-paper text-body font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              {t("education.degree")}
            </div>
            <p className="text-text-secondary text-small mt-1">
              {t("education.university")}
            </p>
            <p className="text-text-secondary text-small">
              {t("education.period")} · {t("education.gpa")}
            </p>
          </div>

          {/* Stat counters */}
          <div className="grid grid-cols-3 gap-6 w-full max-w-xs text-center mt-2">
            {STATS_DATA.map((stat) => (
              <div key={stat.key}>
                <span className="block font-heading text-h2 text-accent-red font-bold">
                  {stat.value}
                </span>
                <span className="text-small text-text-secondary">
                  {t(`stats.${stat.key}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Bio + Technologies + Links */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Bio */}
          <p className="text-body text-paper leading-relaxed">
            {t("bio")}
          </p>

          {/* Core Technologies */}
          <div>
            <h3 className="font-heading text-h3 text-paper font-bold mb-4">
              {t("technologies")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {CORE_TECHNOLOGIES.map((tech) => (
                <TechTag key={tech} label={tech} />
              ))}
            </div>
          </div>

          {/* Links row */}
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/Emirhan58"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-body text-text-secondary hover:text-paper transition-colors duration-normal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/emirhankaya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-body text-text-secondary hover:text-paper transition-colors duration-normal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://leetcode.com/u/Emirhan58"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-body text-text-secondary hover:text-paper transition-colors duration-normal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
              </svg>
              {t("leetcode")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
