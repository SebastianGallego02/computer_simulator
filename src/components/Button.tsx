// src/components/ui/button.tsx
import React from "react"

type ButtonProps = React.PropsWithChildren<{
  variant?: "solid" | "outline" | "danger";
  className?: string;
  [key: string]: any;
}>;

export function Button({
  children,
  variant = "solid",
  className = "",
  ...props
}: ButtonProps) {
  let base =
    "rounded-lg font-semibold px-6 py-2 focus:outline-none transition-all duration-150"

  let variants = {
    solid:
      "bg-green-600 hover:bg-green-700 text-white shadow-md",
    outline:
      "border-2 border-white/30 text-white hover:bg-white/10",
    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  }

  return (
    <button className={base + " " + variants[variant] + " " + className} {...props}>
      {children}
    </button>
  )
}
