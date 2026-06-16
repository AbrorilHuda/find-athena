import Spinner from "./Spinner.jsx";

const variants = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm",
  secondary:
    "bg-white dark:bg-neutral-900 text-brand-700 dark:text-brand-300 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800",
  ghost:
    "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800",
  danger:
    "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 hover:bg-red-100 dark:hover:bg-red-900/60",
};

const sizes = {
  sm: "text-xs px-2.5 py-1.5 gap-1.5",
  md: "text-sm px-3.5 py-2 gap-2",
};

/**
 * Button primitive.
 * props: variant, size, loading, leftIcon, rightIcon
 */
export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  children,
  disabled,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-medium rounded-xl
        transition-all duration-150 active:scale-[0.98]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300
        focus-visible:ring-offset-1 dark:focus-visible:ring-offset-neutral-950
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? <Spinner /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
