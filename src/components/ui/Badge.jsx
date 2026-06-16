const tones = {
  brand:
    "bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-900",
  neutral:
    "bg-paper-200/70 dark:bg-paper-850 text-paper-700 dark:text-paper-300 border-paper-300 dark:border-paper-800",
  success:
    "bg-[color-mix(in_oklab,var(--color-success)_12%,transparent)] text-[oklch(40%_0.13_150)] dark:text-[oklch(75%_0.13_150)] border-[color-mix(in_oklab,var(--color-success)_30%,transparent)]",
  plum: "bg-[color-mix(in_oklab,var(--color-accent)_12%,transparent)] text-[oklch(42%_0.12_285)] dark:text-[oklch(78%_0.12_285)] border-[color-mix(in_oklab,var(--color-accent)_30%,transparent)]",
  amber:
    "bg-[color-mix(in_oklab,var(--color-warning)_14%,transparent)] text-[oklch(45%_0.12_70)] dark:text-[oklch(80%_0.12_70)] border-[color-mix(in_oklab,var(--color-warning)_32%,transparent)]",
  danger:
    "bg-[color-mix(in_oklab,var(--color-danger)_12%,transparent)] text-[oklch(42%_0.15_25)] dark:text-[oklch(75%_0.14_25)] border-[color-mix(in_oklab,var(--color-danger)_30%,transparent)]",
};

/**
 * Badge — small pill. Tones map to semantic roles.
 * dot renders a leading dot in the badge's text color.
 */
export default function Badge({
  tone = "neutral",
  dot = false,
  className = "",
  children,
  ...props
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium
        border rounded-full tabular ${tones[tone]} ${className}`}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-current opacity-90" />
      )}
      {children}
    </span>
  );
}
