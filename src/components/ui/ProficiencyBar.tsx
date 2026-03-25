interface ProficiencyBarProps {
  label: string;
  percentage: number;
}

export function ProficiencyBar({ label, percentage }: ProficiencyBarProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-body text-text-secondary">{label}</span>
        <span className="text-body text-text-secondary text-sm">{percentage}%</span>
      </div>
      <div className="h-1.5 bg-bg rounded-sm overflow-hidden">
        <div
          className="h-full bg-accent-red rounded-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
