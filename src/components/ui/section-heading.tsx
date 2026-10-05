import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="type-eyebrow mb-4 text-brand-red">{eyebrow}</p> : null}
      <h2 className="type-h2 text-primary">{title}</h2>
      {description ? <p className="type-body-large mt-5 text-muted">{description}</p> : null}
    </div>
  );
}
