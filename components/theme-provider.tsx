'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // Only render theme provider after component has mounted to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same structure during SSR
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
