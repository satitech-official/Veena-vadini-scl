import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "quiet";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-white shadow-[0_12px_28px_rgba(27,27,76,0.18)] hover:border-brand-red hover:bg-brand-red",
  secondary:
    "border-brand-indigo/20 bg-surface text-primary hover:border-brand-red hover:text-brand-red",
  quiet: "border-transparent bg-transparent text-primary hover:bg-brand-indigo/7",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-14 px-6 text-base",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
}: Pick<ButtonProps, "variant" | "size"> = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full border font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
  );
}

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonStyles({ variant, size }), className)}
      type={type}
      {...props}
    />
  );
}
