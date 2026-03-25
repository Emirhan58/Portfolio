import { cn } from "@/lib/cn";

interface MedalBadgeProps {
  icon?: React.ReactNode;
  name: string;
  subtitle: string;
  description: string;
  className?: string;
}

export function MedalBadge({ icon, name, subtitle, description, className }: MedalBadgeProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {/* Medal circle */}
      <div className="w-[120px] h-[120px] rounded-full border-3 border-accent-gold flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(212,165,116,0.2),inset_0_0_15px_rgba(212,165,116,0.1)]">
        {icon || (
          <span className="font-heading text-h2 text-accent-gold">{subtitle.charAt(0)}</span>
        )}
      </div>
      {/* Card below */}
      <div className="bg-bg rounded-lg p-6 w-full">
        <h3 className="font-heading text-h3 text-paper font-bold mb-1">{name}</h3>
        <p className="text-body text-accent-gold mb-3">{subtitle}</p>
        <p className="text-body text-text-secondary leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
