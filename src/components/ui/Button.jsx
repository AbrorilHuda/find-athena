import Spinner from "./Spinner.jsx";

const variants = {
  primary:
    "bg-brand-700 text-paper-50 hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-500",
  secondary:
    "bg-transparent text-brand-700 dark:text-brand-300 border border-brand-300 dark:border-brand-800 hover:bg-brand-50 dark:hover:bg-brand-950",
  ghost:
    "bg-transparent text-paper-600 dark:text-paper-400 hover:bg-paper-200/60 dark:hover:bg-paper-850",
  danger:
    "bg-transparent text-danger border border-danger/30 hover:bg-danger/8 dark:hover:bg-danger/12",
};

const sizes = {
  sm: "text-xs px-2.5 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2 gap-2",
};

/**
 * Button primitive — editorial: solid ink fill or hairline outline.
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
      className={`inline-flex items-center justify-center font-medium rounded-lg
        transition-colors duration-150
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400
        focus-visible:ring-offset-2 dark:focus-visible:ring-offset-paper-950
        disabled:opacity-45 disabled:cursor-not-allowed
        cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? <Spinner /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
