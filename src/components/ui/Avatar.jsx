const palettes = [
  "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900",
  "bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-900",
  "bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border-brand-200 dark:border-brand-900",
  "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900",
];

/**
 * Avatar — photo or initials with rotating color palette by `seed`.
 * props: src, alt, name, seed (id), size
 */
export default function Avatar({
  src,
  alt = "",
  name = "",
  seed = 0,
  size = "h-11 w-11",
  rounded = "rounded-xl",
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
        <span className="text-sm font-semibold">{initials}</span>
      )}
    </div>
  );
}
