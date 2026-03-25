import { cn } from "@/lib/cn";

interface ParchmentCardProps {
  children: React.ReactNode;
  className?: string;
}

export function ParchmentCard({ children, className }: ParchmentCardProps) {
  return (
    <div
      className={cn(
        "relative bg-surface rounded-lg p-6",
        "border border-accent-gold/15",
        "shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      {/* Paper grain overlay */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
