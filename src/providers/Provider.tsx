"use client"

import React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"

interface Props {
  children: React.ReactNode
}

export const ThemeProvider = ({
  children,
  ...props
}: Props & React.ComponentProps<typeof NextThemesProvider>) => {
  return (
    <NextThemesProvider {...props}>
      <SessionProvider>{children}</SessionProvider>
    </NextThemesProvider>
  )
}