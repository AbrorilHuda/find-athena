export default function Spinner({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`animate-spin ${className}`}
    >
      <path
        d="M13.5 2.5A6.5 6.5 0 1 1 8 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.5 2.5V6h-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
