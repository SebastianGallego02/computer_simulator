// src/components/ui/card.tsx
import React from "react"

type CardProps = React.PropsWithChildren<{
  className?: string;
  [key: string]: any;
}>;

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={
        "rounded-2xl bg-slate-800/60 border border-slate-700 shadow-lg backdrop-blur-lg " +
        className
      }
      {...props}
    >
      {children}
    </div>
  )
}

type CardHeaderProps = React.PropsWithChildren<{
  className?: string;
  [key: string]: any;
}>;

export function CardHeader({ className = "", children, ...props }: CardHeaderProps) {
  return (
    <div className={"p-4 pb-0 " + className} {...props}>
      {children}
    </div>
  )
}

type CardTitleProps = React.PropsWithChildren<{
  className?: string;
  [key: string]: any;
}>;

export function CardTitle({ className = "", children, ...props }: CardTitleProps) {
  return (
    <h2
      className={
        "font-bold text-xl tracking-tight leading-tight mb-3 " + className
      }
      {...props}
    >
      {children}
    </h2>
  )
}

type CardContentProps = React.PropsWithChildren<{
  className?: string;
  [key: string]: any;
}>;

export function CardContent({ className = "", children, ...props }: CardContentProps) {
  return (
    <div className={"p-4 pt-2 " + className} {...props}>
      {children}
    </div>
  )
}
