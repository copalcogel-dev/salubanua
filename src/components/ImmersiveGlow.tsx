/**
 * Lapisan dekoratif: bidang warna sage yang di-blur besar untuk memberi
 * kedalaman pada section berlatar terang. Varian `tone` dipakai agar tiap
 * section punya karakter berbeda sehingga halaman tidak terasa datar.
 */
export function ImmersiveGlow({
  tone = "sage",
  className = "",
}: {
  tone?: "sage" | "deep" | "warm";
  className?: string;
}) {
  const palettes = {
    sage: ["bg-[#7fb08c]/35", "bg-[#c8e0cf]/60", "bg-[#4a7c59]/20"],
    deep: ["bg-[#4a7c59]/30", "bg-[#a8cdb6]/50", "bg-[#153e2a]/15"],
    warm: ["bg-[#d8c9a3]/40", "bg-[#bcd8c4]/50", "bg-[#4a7c59]/20"],
  } as const;

  const [a, b, c] = palettes[tone];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className={`absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full ${a} blur-[110px]`}
      />
      <div
        className={`absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full ${b} blur-[100px]`}
      />
      <div
        className={`absolute -bottom-40 left-1/4 h-[32rem] w-[32rem] rounded-full ${c} blur-[120px]`}
      />
    </div>
  );
}
