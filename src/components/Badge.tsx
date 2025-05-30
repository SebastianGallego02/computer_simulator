// src/components/ui/badge.tsx
import React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "orange" | "cyan" | "yellow";
}

export function Badge({ children, className = "", variant = "solid", ...props }: BadgeProps) {
  let styles =
    "inline-block px-2 py-0.5 rounded-full text-xs font-mono tracking-tight"
  let variants = {
    solid: "bg-blue-700 text-blue-100",
    outline: "border border-blue-400 text-blue-400 bg-transparent",
    orange: "bg-orange-700 text-orange-100",
    cyan: "bg-cyan-700 text-cyan-100",
    yellow: "bg-yellow-600 text-yellow-100",
  }
  return (
    <span className={styles + " " + (variants[variant] || "") + " " + className} {...props}>
      {children}
    </span>
  )
}
