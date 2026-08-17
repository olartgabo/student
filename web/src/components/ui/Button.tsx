import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-display uppercase " +
  "tracking-mono-caps transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  // Dark label on the orange fill: white would land at 2.14:1.
  primary: "bg-orange text-navy-900 hover:bg-orange-700",
  secondary: "border border-slate-600 text-white hover:bg-white/5",
  outline: "border border-white text-white hover:bg-white/10",
  ghost: "text-sky hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-small",
  md: "h-11 px-5 text-small",
  lg: "h-13 px-7 text-body",
};

type ButtonProps = { variant?: Variant; size?: Size } & (
  | ({ href: string } & ComponentPropsWithoutRef<"a">)
  | ({ href?: undefined } & ComponentPropsWithoutRef<"button">)
);

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      />
    );
  }

  const { type = "button", ...rest } = props;
  return <button type={type} className={classes} {...rest} />;
}
