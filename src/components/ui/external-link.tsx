import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export function ExternalLink({ className, rel, target, ...props }: ExternalLinkProps) {
  return (
    <a
      className={cn(
        "font-medium text-primary underline decoration-brand-red/45 underline-offset-4 transition-colors hover:text-brand-red",
        className,
      )}
      rel={rel ?? "noreferrer"}
      target={target ?? "_blank"}
      {...props}
    />
  );
}
