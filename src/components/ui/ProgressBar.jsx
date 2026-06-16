/**
 * ProgressBar — thin ink rule that fills.
 * tone: brand | success | amber | danger
 */
const tones = {
  brand: "bg-brand-600",
  success: "bg-[oklch(55%_0.11_150)]",
  amber: "bg-[oklch(70%_0.13_70)]",
  danger: "bg-[oklch(52%_0.16_25)]",
};

export default function ProgressBar({
  value = 0,
  tone = "brand",
  height = "h-1",
  className = "",
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className={`${height} w-full rounded-full bg-paper-300/70 dark:bg-paper-850 overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full ${tones[tone]} transition-[width] duration-500`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
