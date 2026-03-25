import { cn } from "@/lib/cn";

export function Footer() {
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
          Crafted with the spirit of Bushido
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-6 text-text-secondary text-small">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors duration-normal"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors duration-normal"
          >
            LinkedIn
          </a>
          <a
            href="mailto:hello@emirhankaya.dev"
            className="hover:text-text-primary transition-colors duration-normal"
          >
            Email
          </a>
        </div>

        {/* Copyright */}
        <p className="text-text-secondary text-small">
          &copy; {currentYear} Emirhan Kaya. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
