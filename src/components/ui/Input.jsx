/**
 * Input primitive with optional leading/trailing icon slot.
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
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none flex">
          {leftIcon}
        </span>
      )}
      <input
        className={`w-full ${leftIcon ? "pl-10" : "pl-3.5"} ${
          rightSlot ? "pr-10" : "pr-3.5"
        } py-2.5 text-sm bg-neutral-50 dark:bg-neutral-800/60
          text-neutral-900 dark:text-neutral-100 placeholder-neutral-400
          border border-neutral-200 dark:border-neutral-700 rounded-xl
          focus:outline-none focus:border-brand-400 focus:ring-2
          focus:ring-brand-100 dark:focus:ring-brand-900/50
          transition-all ${inputClassName} ${className}`}
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
