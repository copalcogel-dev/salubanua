/**
 * Lapisan dekoratif: beberapa bulatan warna sage yang di-blur lembut untuk
 * memberi kedalaman pada section berlatar terang, tanpa mengganggu
 * keterbacaan konten di atasnya (pointer-events-none, opacity rendah).
 */
export function ImmersiveGlow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#4a7c59]/10 blur-3xl" />
      <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-[#dfece3] opacity-70 blur-3xl" />
      <div className="absolute -bottom-16 left-1/3 h-64 w-64 rounded-full bg-[#153e2a]/[0.06] blur-3xl" />
    </div>
  );
}
