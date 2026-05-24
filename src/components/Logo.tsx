import Link from "next/link";

export function LogoIcon({ size = 28, inverted = false }: { size?: number; inverted?: boolean }) {
  const bg = inverted ? "#fafaf7" : "#181613";
  const fg = inverted ? "#181613" : "#fafaf7";

  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {/* Dark rounded square */}
      <rect width="28" height="28" rx="7" fill={bg} />

      {/* Handle ring — left (top-left) */}
      <circle cx="8.5" cy="8.5" r="3.8" stroke={fg} strokeWidth="1.5" fill="none" />

      {/* Handle ring — right (top-right) */}
      <circle cx="19.5" cy="8.5" r="3.8" stroke={fg} strokeWidth="1.5" fill="none" />

      {/* Blade 1: left handle → bottom-right tip */}
      <line x1="11.2" y1="11.2" x2="22" y2="23" stroke={fg} strokeWidth="1.6" strokeLinecap="round" />

      {/* Blade 2: right handle → bottom-left tip */}
      <line x1="16.8" y1="11.2" x2="6" y2="23" stroke={fg} strokeWidth="1.6" strokeLinecap="round" />

      {/* Pivot screw at crossing point */}
      <circle cx="14" cy="15.2" r="2" fill={bg} />
      <circle cx="14" cy="15.2" r="2" stroke={fg} strokeWidth="1.3" />
    </svg>
  );
}

export function LogoFull({
  inverted = false,
  size = 28,
}: {
  inverted?: boolean;
  size?: number;
}) {
  const textColor = inverted ? "text-[#fafaf7]" : "text-[#181613]";
  return (
    <div className="flex items-center gap-2">
      <LogoIcon size={size} inverted={inverted} />
      <span
        className={`text-xl font-bold ${textColor}`}
        style={{ fontFamily: "var(--font-fraunces), serif" }}
      >
        Clocksy
      </span>
    </div>
  );
}

export function LogoLink({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
      <LogoIcon inverted={inverted} />
      <span
        className={`text-xl font-bold ${inverted ? "text-[#fafaf7]" : "text-[#181613]"}`}
        style={{ fontFamily: "var(--font-fraunces), serif" }}
      >
        Clocksy
      </span>
    </Link>
  );
}
