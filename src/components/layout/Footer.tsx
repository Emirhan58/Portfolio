import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/cn";
import { CONTACT_LINKS } from "@/lib/data";

export async function Footer() {
  const t = await getTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("relative bg-surface border-t border-accent-gold/20 py-16 px-8")}>
      {/* Mountain silhouette background */}
      <div
        className="absolute inset-x-0 top-0 h-24 bg-bamboo/5 pointer-events-none"
        style={{
          clipPath: "polygon(0% 100%, 15% 30%, 25% 60%, 40% 10%, 55% 50%, 70% 20%, 85% 55%, 100% 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto flex flex-col items-center gap-6 text-center">
        {/* Name */}
        <h2 className="font-heading text-h3 text-accent-gold">
          Emirhan Kaya
        </h2>

        {/* Tagline */}
        <p className="text-text-secondary text-small italic">
          {t("tagline")}
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-6 text-text-secondary text-small">
          <a
            href={CONTACT_LINKS.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors duration-normal"
          >
            GitHub
          </a>
          <a
            href={CONTACT_LINKS.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors duration-normal"
          >
            LinkedIn
          </a>
          <a
            href={CONTACT_LINKS.email.href}
            className="hover:text-text-primary transition-colors duration-normal"
          >
            Email
          </a>
        </div>

        {/* Copyright */}
        <p className="text-text-secondary text-small">
          &copy; {currentYear} Emirhan Kaya. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
