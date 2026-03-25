import { cn } from "@/lib/cn";

interface MonIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function MonIcon({ href, label, children, className }: MonIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex flex-col items-center gap-3",
        className
      )}
    >
      <div className="w-16 h-16 rounded-full border-2 border-accent-gold flex items-center justify-center transition-all duration-normal group-hover:border-accent-red group-hover:shadow-[0_0_20px_rgba(192,57,43,0.3)]">
        <span className="text-paper w-6 h-6">{children}</span>
      </div>
      <span className="text-body text-text-secondary group-hover:text-paper transition-colors duration-normal">
        {label}
      </span>
    </a>
  );
}
