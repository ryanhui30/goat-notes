"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",

          // Success toast styles (bg-emerald-700)
          "--success-bg": "rgb(4 120 87)", // bg-emerald-700
          "--success-text": "white",
          "--success-border": "rgb(4 120 87 / 0.3)",

           // Error toast (rose-600)
           "--error-bg": "rgb(225 29 72)",
           "--error-text": "white",
           "--error-border": "rgb(225 29 72 / 0.3)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
