export function SectionDivider() {
  return (
    <div className="relative w-full h-8 overflow-hidden">
      {/* Katana slash line */}
      <div
        className="absolute top-1/2 left-[-5%] w-[110%] h-[2px] -translate-y-1/2 -rotate-2"
        style={{ background: "rgba(192, 57, 43, 0.25)" }}
      />
      {/* Asanoha geometric pattern strip */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0L24 12L12 24L0 12Z' fill='none' stroke='%23d4a574' stroke-width='0.5'/%3E%3Cpath d='M12 0L12 24M0 12L24 12' stroke='%23d4a574' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}
