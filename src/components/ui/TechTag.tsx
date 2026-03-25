export function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-block text-body text-text-secondary bg-accent-red/10 border border-accent-red/20 rounded px-2 py-1 text-sm">
      {label}
    </span>
  );
}
