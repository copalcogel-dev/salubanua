export function TopoPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-[0.07] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="topo-contour" width="140" height="140" patternUnits="userSpaceOnUse">
          <circle cx="70" cy="70" r="58" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="70" cy="70" r="40" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="70" cy="70" r="22" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#topo-contour)" />
    </svg>
  );
}
