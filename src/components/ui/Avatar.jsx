const palettes = [
  "bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-900",
  "bg-[color-mix(in_oklab,var(--color-accent)_14%,transparent)] text-[oklch(42%_0.12_285)] dark:text-[oklch(78%_0.12_285)] border-[color-mix(in_oklab,var(--color-accent)_30%,transparent)]",
  "bg-[color-mix(in_oklab,var(--color-success)_12%,transparent)] text-[oklch(40%_0.13_150)] dark:text-[oklch(78%_0.13_150)] border-[color-mix(in_oklab,var(--color-success)_30%,transparent)]",
  "bg-[color-mix(in_oklab,var(--color-warning)_14%,transparent)] text-[oklch(45%_0.12_70)] dark:text-[oklch(80%_0.12_70)] border-[color-mix(in_oklab,var(--color-warning)_32%,transparent)]",
];

/**
 * Avatar — photo or serif initials. Rotating palette by seed.
 * Uses serif font for initials to reinforce editorial identity.
 */
export default function Avatar({
  src,
  alt = "",
  name = "",
  seed = 0,
  size = "h-11 w-11",
  rounded = "rounded-lg",
  serif = false,
}) {
  const initials = name?.slice(0, 2).toUpperCase() ?? "??";
  const palette = palettes[seed % palettes.length];

  return (
    <div
      className={`${size} ${rounded} shrink-0 border flex items-center justify-center overflow-hidden ${palette}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span
          className={`text-sm font-semibold tracking-tight ${
            serif ? "font-serif" : ""
          }`}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
