/**
 * Card primitive — surface container with consistent border/radius/shadow.
 * props: hover (lift effect), className
 */
export default function Card({
  hover = false,
  className = "",
  children,
  ...props
}) {
  return (
    <div
      className={`bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        rounded-2xl shadow-card
        ${hover ? "transition-shadow hover:shadow-soft" : ""}
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
