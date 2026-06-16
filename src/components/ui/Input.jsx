/**
 * Input primitive — editorial: underline-only on light, full field on dark.
 * Optional leading/trailing icon slots.
 */
export default function Input({
  leftIcon,
  rightSlot,
  className = "",
  inputClassName = "",
  ...props
}) {
  const wrapper = leftIcon || rightSlot ? "relative" : "";

  return (
    <div className={wrapper}>
      {leftIcon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-paper-500 dark:text-paper-500 pointer-events-none flex">
          {leftIcon}
        </span>
      )}
      <input
        className={`w-full ${leftIcon ? "pl-10" : "pl-3.5"} ${
          rightSlot ? "pr-10" : "pr-3.5"
        } py-2.5 text-sm
          bg-paper-50 dark:bg-paper-900
          text-paper-950 dark:text-paper-100
          placeholder:text-paper-400 dark:placeholder:text-paper-600
          border border-paper-300 dark:border-paper-800 rounded-lg
          focus:outline-none focus:border-brand-500 focus:ring-2
          focus:ring-brand-200 dark:focus:ring-brand-900
          transition-colors ${inputClassName} ${className}`}
        {...props}
      />
      {rightSlot && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 flex">
          {rightSlot}
        </span>
      )}
    </div>
  );
}
