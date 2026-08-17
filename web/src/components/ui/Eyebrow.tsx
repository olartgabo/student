import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** The leading `//` is drawn by CSS, so it stays out of the accessibility tree. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}
