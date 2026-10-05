import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

import { buttonStyles, type ButtonVariant } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
  variant?: ButtonVariant;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    className,
    label,
    children,
    variant = "secondary",
    type = "button",
    ...props
  },
  ref,
) {
  return (
    <button
      aria-label={label}
      className={cn(
        buttonStyles({ variant, size: "sm" }),
        "aspect-square w-10 p-0",
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
});
