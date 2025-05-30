// src/components/ui/separator.tsx
import React from "react"

export function Separator({ className = "", ...props }) {
  return (
    <hr
      className={
        "my-2 border-t border-white/20 w-full " + className
      }
      {...props}
    />
  )
}
