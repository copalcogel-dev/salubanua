export function MountainDivider({
  fill,
  className = "",
}: {
  fill: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-10 sm:h-16 ${className}`}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          d="M0,120 L0,70 L120,92 L240,48 L360,78 L480,30 L600,60 L720,18 L840,62 L960,32 L1080,66 L1200,22 L1320,54 L1440,36 L1440,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
