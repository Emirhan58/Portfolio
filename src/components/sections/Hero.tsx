import { getTranslations } from "next-intl/server";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
      {/* Sumi-e ink splash background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(192, 57, 43, 0.03) 0%, rgba(30, 30, 30, 0.05) 30%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

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
          {t("tagline")}
        </p>
        <a
          href="/Emirhan_Kaya_CV.pdf"
          download
          className="inline-block mt-8 bg-accent-red text-paper px-6 py-2 rounded-md font-medium transition-all duration-normal hover:bg-accent-red-bright hover:shadow-[0_0_20px_rgba(192,57,43,0.4)]"
        >
          {t("downloadCV")}
        </a>
      </div>

      {/* Scroll indicator -- CSS bounce animation */}
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
