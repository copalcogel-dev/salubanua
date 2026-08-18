/**
 * Ikon Instagram & Facebook — lucide-react versi proyek ini tidak
 * menyediakan ikon merek, jadi digambar sendiri sebagai SVG garis sederhana
 * agar seragam dengan ikon lucide di sekitarnya (ukuran & strokeWidth serupa).
 */
type IconProps = { size?: number; strokeWidth?: number; className?: string };

export function InstagramIcon({ size = 16, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ size = 16, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 16, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.3 7.6L3 20l.9-5.1a8.5 8.5 0 1 1 16.6-3.4z" />
      <path d="M8.5 9.3c.2-.5.5-.5.7-.5h.5c.2 0 .4 0 .5.4s.6 1.5.6 1.6.1.2 0 .4-.2.3-.4.5-.3.3-.1.6a6 6 0 0 0 2.5 2.2c.3.1.5.1.6-.1s.6-.7.8-.9.4-.2.6-.1l1.4.7c.2.1.3.1.4.3s.1.7-.1 1.3-1.2 1.1-1.6 1.1a5 5 0 0 1-2-.3 9.4 9.4 0 0 1-4.4-3.9 4.9 4.9 0 0 1-1-2.6c0-.8.4-1.2.6-1.4z" />
    </svg>
  );
}
