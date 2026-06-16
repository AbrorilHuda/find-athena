/**
 * Shared icon set — inline SVG (no icon library).
 * Each icon accepts standard SVG props (className, strokeWidth, etc.).
 * Uses `currentColor` so color follows parent's text color.
 */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function ShieldCheck({ className = "h-5 w-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} {...props}>
      <path d="M12 2.5 4 6.5v5c0 4.8 3.4 9.2 8 10.4 4.6-1.2 8-5.6 8-10.4v-5L12 2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function User({ className = "h-4 w-4", ...props }) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} {...props}>
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M2.5 13.5c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5" />
    </svg>
  );
}

export function Lock({ className = "h-4 w-4", ...props }) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} {...props}>
      <rect x="3" y="7" width="10" height="7.5" rx="2" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}

export function Eye({ className = "h-4 w-4", ...props }) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} {...props}>
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z" />
      <circle cx="8" cy="8" r="2" />
    </svg>
  );
}

export function EyeOff({ className = "h-4 w-4", ...props }) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} {...props}>
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z" />
      <circle cx="8" cy="8" r="2" />
      <path d="m2 2 12 12" />
    </svg>
  );
}

export function AlertCircle({ className = "h-4 w-4", ...props }) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} {...props}>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 5v3.5M8 10.5h.01" />
    </svg>
  );
}

export function Search({ className = "h-4 w-4", ...props }) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} {...props}>
      <circle cx="7" cy="7" r="5" />
      <path d="m11 11 3 3" />
    </svg>
  );
}

export function Refresh({ className = "h-4 w-4", ...props }) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} {...props}>
      <path d="M13.5 2.5A6.5 6.5 0 1 1 8 1.5" />
      <path d="M13.5 2.5V6h-3.5" />
    </svg>
  );
}

export function Clock({ className = "h-3.5 w-3.5", ...props }) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} {...props}>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 5v3.5l2 1.5" />
    </svg>
  );
}

export function ChevronDown({ className = "h-3 w-3", ...props }) {
  return (
    <svg viewBox="0 0 12 12" className={className} {...base} {...props}>
      <path d="m2 4 4 4 4-4" />
    </svg>
  );
}

export function Logout({ className = "h-3.5 w-3.5", ...props }) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} {...props}>
      <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
      <path d="m11 11 3-3-3-3" />
      <path d="M14 8H6" />
    </svg>
  );
}

export function ArrowRight({ className = "h-3.5 w-3.5", ...props }) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} {...props}>
      <path d="M10 8H3M7 5l3 3-3 3" />
      <path d="M10 3h3v10h-3" />
    </svg>
  );
}

export function ExternalLink({ className = "h-3 w-3", ...props }) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} {...props}>
      <path d="M9 3h4v4" />
      <path d="M13 3 7 9" />
      <path d="M11 9v3.5A1.5 1.5 0 0 1 9.5 14h-6A1.5 1.5 0 0 1 2 12.5v-6A1.5 1.5 0 0 1 3.5 5H7" />
    </svg>
  );
}

export function Scholar({ className = "h-3 w-3", ...props }) {
  // Google Scholar graduation-cap mark
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} {...props}>
      <path d="M2 5.5 8 2l6 3.5L8 9 2 5.5Z" />
      <path d="M4.5 7v3.5c0 1 1.5 1.8 3.5 1.8s3.5-.8 3.5-1.8V7" />
      <path d="M14 5.5v4" />
    </svg>
  );
}

export function Sinta({ className = "h-3 w-3", ...props }) {
  // SINTA badge — stylized book/award
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} {...props}>
      <path d="M8 1.8 2.5 5l5.5 3.2L13.5 5 8 1.8Z" />
      <path d="M4 6.5v3.2c0 .9 1.8 1.7 4 1.7s4-.8 4-1.7V6.5" />
      <path d="M13.5 5v3.5" />
      <circle cx="13.5" cy="9.8" r="1.4" />
    </svg>
  );
}
