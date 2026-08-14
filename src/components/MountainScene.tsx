"use client";

export function MountainScene({
  accent = "#2f5233",
  className = "",
}: {
  accent?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fa9a3" />
          <stop offset="45%" stopColor="#6b9a8f" />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
        <linearGradient id="peakFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a8266" />
          <stop offset="100%" stopColor="#4d5a41" />
        </linearGradient>
        <linearGradient id="peakMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f5a3d" />
          <stop offset="100%" stopColor="#153e2a" />
        </linearGradient>
        <linearGradient id="peakNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#26402c" />
          <stop offset="100%" stopColor="#122019" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16332f" />
          <stop offset="100%" stopColor="#0a1c19" />
        </linearGradient>
        <radialGradient id="mist" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#sky)" />
      <rect width="1600" height="900" fill="url(#mist)" />

      <path
        d="M0,420 L120,300 260,380 400,260 560,360 720,240 900,340 1080,250 1260,350 1420,270 1600,360 1600,620 0,620 Z"
        fill="url(#peakFar)"
        opacity="0.55"
      />

      <path
        d="M0,520 L180,340 300,430 460,300 620,420 800,310 980,430 1160,320 1340,440 1500,340 1600,410 1600,700 0,700 Z"
        fill="url(#peakMid)"
        opacity="0.85"
      />

      <path
        d="M-20,620 L200,400 340,500 520,360 700,510 900,380 1100,520 1300,400 1500,520 1620,440 1620,720 -20,720 Z"
        fill="url(#peakNear)"
      />

      <path d="M300,430 L340,500 380,450 400,470 340,410 Z" fill="#d8dfe0" opacity="0.6" />
      <path d="M980,430 L1020,470 1060,440 1080,460 1000,400 Z" fill="#d8dfe0" opacity="0.5" />

      <rect y="700" width="1600" height="200" fill="url(#water)" />
      <g opacity="0.35">
        <path d="M-20,760 L200,660 340,720 520,650 700,730 900,660 1100,730 1300,670 1500,730 1620,690 1620,900 -20,900 Z" fill="#16332f" />
      </g>
      <g stroke="#3a5c53" strokeOpacity="0.3" strokeWidth="2">
        <line x1="100" y1="780" x2="500" y2="780" />
        <line x1="700" y1="820" x2="1150" y2="820" />
        <line x1="300" y1="850" x2="900" y2="850" />
      </g>

      <ellipse cx="1240" cy="805" rx="46" ry="9" fill="#3b2418" opacity="0.85" />
      <path d="M1200,805 Q1240,788 1280,805 Q1240,815 1200,805 Z" fill="#5c3a26" />
    </svg>
  );
}
