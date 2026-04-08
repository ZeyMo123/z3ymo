'use client'

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'

// Re-export next-themes ThemeProviderProps directly so `attribute` is
// typed as `Attribute | Attribute[]` instead of `string`.
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
