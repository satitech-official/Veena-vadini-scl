import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

type SectionSpacing = "sm" | "md" | "lg" | "xl";

type SectionProps = HTMLAttributes<HTMLElement> & {
  spacing?: SectionSpacing;
};

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-28 lg:py-36",
  xl: "py-24 sm:py-32 lg:py-44",
};

export function Section({
  className,
  spacing = "lg",
  ...props
}: SectionProps) {
  return (
    <section className={cn(spacingClasses[spacing], className)} {...props} />
  );
}
