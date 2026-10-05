import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type ImageFrameProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function ImageFrame({ className, children, ...props }: ImageFrameProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[1.75rem] border border-brand-indigo/10 bg-sky-accent/45 shadow-[0_24px_60px_rgba(27,27,76,0.12)]",
        className,
      )}
      {...props}
    >
      {children}
    </figure>
  );
}
