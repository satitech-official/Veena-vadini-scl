import type { SVGProps } from "react";

type InstagramIconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
};

export function InstagramIcon({ size = 24, ...props }: InstagramIconProps) {
  return (
    <svg
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect height="18" rx="5" stroke="currentColor" strokeWidth="1.8" width="18" x="3" y="3" />
      <circle cx="12" cy="12" r="4.15" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.35" cy="6.7" fill="currentColor" r="1.15" />
    </svg>
  );
}

export function FacebookIcon({ size = 24, ...props }: InstagramIconProps) {
  return (
    <svg
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13.55 21v-8.2h2.75l.41-3.2h-3.16V7.56c0-.93.26-1.56 1.59-1.56h1.7V3.14a22.7 22.7 0 0 0-2.48-.14c-2.45 0-4.13 1.5-4.13 4.24V9.6H7.45v3.2h2.78V21h3.32Z" />
    </svg>
  );
}
