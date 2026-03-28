"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useScrollContext } from "@/components/providers/ScrollProvider";
import { useRouter, usePathname } from "@/i18n/navigation";
import { NAV_LINKS, SECTION_KANJI } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { shojiLeft, shojiRight, shojiContent } from "@/lib/animation-variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AudioToggle } from "./AudioToggle";

export function Navbar() {
  const { activeSection, scrollTo } = useScrollContext();
  const router = useRouter();
  const pathname = usePathname();
  const { shouldAnimate } = useReducedMotion();
  const t = useTranslations("nav");

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: (typeof NAV_LINKS)[number]["id"]) => {
    scrollTo(id);
    setMobileMenuOpen(false);
  };

  const handleLanguageSwitch = (locale: "en" | "tr") => {
    router.replace(pathname, { locale });
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-navbar transition-all duration-normal",
          scrolled
            ? "bg-bg/90 backdrop-blur-md py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* EK Monogram */}
          <button
            onClick={() => scrollTo("hero")}
            className="font-heading text-h3 text-accent-gold hover:text-accent-gold/80 transition-colors duration-normal"
          >
            EK
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={cn(
                  "relative text-small font-medium tracking-wide uppercase transition-colors duration-normal",
                  activeSection === link.id
                    ? "text-accent-red"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {t(link.id)}
                {activeSection === link.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-red rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right side: Language toggle + CV download + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleLanguageSwitch("tr")}
                className="w-7 h-5 rounded-sm overflow-hidden hover:scale-110 transition-transform duration-fast shadow-sm"
                aria-label="Türkçeye geç"
              >
                <svg viewBox="0 0 60 40" className="w-full h-full">
                  <rect width="60" height="40" fill="#E30A17"/>
                  <circle cx="23" cy="20" r="10" fill="#fff"/>
                  <circle cx="26" cy="20" r="8" fill="#E30A17"/>
                  <polygon points="35,20 30.5,22 31.5,17.5 28,14.5 32.5,14 35,10 37.5,14 42,14.5 38.5,17.5 39.5,22" fill="#fff" transform="scale(0.7) translate(17,10)"/>
                </svg>
              </button>
              <button
                onClick={() => handleLanguageSwitch("en")}
                className="w-7 h-5 rounded-sm overflow-hidden hover:scale-110 transition-transform duration-fast shadow-sm"
                aria-label="Switch to English"
              >
                <svg viewBox="0 0 60 30" className="w-full h-full">
                  <clipPath id="gb-clip"><rect width="60" height="30"/></clipPath>
                  <g clipPath="url(#gb-clip)">
                    <rect width="60" height="30" fill="#012169"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#gb-diag)"/>
                    <clipPath id="gb-diag"><path d="M30,15 L60,30 L60,0 Z M30,15 L0,0 L0,30 Z"/></clipPath>
                    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
                    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
                  </g>
                </svg>
              </button>
            </div>

            {/* Audio Toggle */}
            <AudioToggle />

            {/* CV Download Button */}
            <a
              href="/Emirhan_Kaya_CV.pdf"
              download
              className="hidden sm:inline-flex bg-accent-red text-paper px-4 py-2 rounded text-sm font-medium hover:bg-accent-red-bright transition-colors duration-normal"
            >
              {t("downloadCV")}
            </a>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={cn(
                  "w-6 h-0.5 bg-text-primary transition-all duration-normal",
                  mobileMenuOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "w-6 h-0.5 bg-text-primary transition-all duration-normal",
                  mobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "w-6 h-0.5 bg-text-primary transition-all duration-normal",
                  mobileMenuOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Shoji Door Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {shouldAnimate ? (
              <>
                {/* Left Shoji Panel */}
                <motion.div
                  className="fixed inset-y-0 left-0 w-1/2 bg-bg"
                  style={{ zIndex: 199 }}
                  variants={shojiLeft}
                  initial="closed"
                  animate="open"
                  exit={{ x: "0%", transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
                />
                {/* Right Shoji Panel */}
                <motion.div
                  className="fixed inset-y-0 right-0 w-1/2 bg-bg"
                  style={{ zIndex: 199 }}
                  variants={shojiRight}
                  initial="closed"
                  animate="open"
                  exit={{ x: "0%", transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
                />
                {/* Menu Content */}
                <motion.div
                  className="fixed inset-0 z-overlay flex flex-col items-center justify-center gap-8"
                  variants={shojiContent}
                  initial="closed"
                  animate="open"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  {NAV_LINKS.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={cn(
                        "flex items-center gap-4 transition-colors duration-normal",
                        activeSection === link.id
                          ? "text-accent-red"
                          : "text-text-secondary hover:text-text-primary"
                      )}
                    >
                      <span className="font-kanji text-h3 text-accent-gold/30">
                        {SECTION_KANJI[link.id]}
                      </span>
                      <span className="font-heading text-h2">{t(link.id)}</span>
                    </button>
                  ))}
                  {/* Mobile CV Download */}
                  <a
                    href="/Emirhan_Kaya_CV.pdf"
                    download
                    className="mt-4 bg-accent-red text-paper px-6 py-3 rounded text-body font-medium hover:bg-accent-red-bright transition-colors duration-normal"
                  >
                    {t("downloadCV")}
                  </a>
                </motion.div>
              </>
            ) : (
              /* Reduced motion: instant show/hide */
              <div className="fixed inset-0 z-overlay bg-bg flex flex-col items-center justify-center gap-8">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={cn(
                      "flex items-center gap-4",
                      activeSection === link.id
                        ? "text-accent-red"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    <span className="font-kanji text-h3 text-accent-gold/30">
                      {SECTION_KANJI[link.id]}
                    </span>
                    <span className="font-heading text-h2">{t(link.id)}</span>
                  </button>
                ))}
                <a
                  href="/Emirhan_Kaya_CV.pdf"
                  download
                  className="mt-4 bg-accent-red text-paper px-6 py-3 rounded text-body font-medium"
                >
                  {t("downloadCV")}
                </a>
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
