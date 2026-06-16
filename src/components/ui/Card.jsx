/**
 * Card primitive — editorial: paper surface with hairline border.
 * `flat` renders borderless (just spacing/typography grouping).
 */
export default function Card({
  hover = false,
  flat = false,
  className = "",
  children,
  ...props
}) {
  const base = flat
    ? ""
    : "bg-paper-50 dark:bg-paper-900 border border-paper-300 dark:border-paper-800 shadow-card rounded-xl";
  return (
    <div
      className={`${base} ${hover ? "transition-shadow hover:shadow-soft" : ""}
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
