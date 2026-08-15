/**
 * Transisi lembut di batas bawah section bertema gelap (Hero/CTA) menuju
 * warna latar section berikutnya — menggantikan siluet gunung bergerigi
 * yang terasa terlalu tegas untuk nuansa yang lebih elegan.
 */
export function FadeToColor({
  color,
  className = "",
}: {
  color: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-56 ${className}`}
      style={{
        background: `linear-gradient(to bottom, transparent, ${color})`,
      }}
    />
  );
}
