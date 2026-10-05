import { Info } from "lucide-react";

import { cn } from "@/lib/utils/cn";

type DemoContentLabelProps = {
  className?: string;
  tone?: "light" | "dark";
};

export function DemoContentLabel({ className, tone = "light" }: DemoContentLabelProps) {
  return (
    <p className={cn("demo-content-label", tone === "dark" ? "demo-content-label-dark" : "demo-content-label-light", className)}>
      <Info aria-hidden="true" size={14} strokeWidth={1.8} />
      <span>Demo content — not an official school announcement.</span>
    </p>
  );
}
