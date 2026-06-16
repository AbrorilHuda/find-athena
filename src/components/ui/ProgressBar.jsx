const tones = {
  brand: "bg-brand-500",
  teal: "bg-teal-500",
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
  red: "bg-red-500",
};

/**
 * ProgressBar — rounded bar with filled portion.
 * props: value (0-100), tone, className, height
 */
export default function ProgressBar({
  value = 0,
  tone = "brand",
  height = "h-1.5",
  className = "",
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className={`${height} w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden ${className}`}
    >
      <div
        className={`h-full ${tones[tone]} rounded-full transition-all duration-300`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
