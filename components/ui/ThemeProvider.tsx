'use client'

// ─────────────────────────────────────────────────────────────────
// components/ui/ThemeProvider.tsx
//
// Thin wrapper around next-themes ThemeProvider.
//
// React 19 warns about <script> tags injected by next-themes for
// flash-of-unstyled-content prevention. This is a cosmetic warning —
// the script is intentional and harmless. The fix is two-part:
//
//   1. Import ThemeProviderProps directly from next-themes so the
//      `attribute` prop is typed as Attribute | Attribute[] (not string).
//
//   2. In app/layout.tsx, add suppressHydrationWarning to <html>.
//      next-themes mutates the html element's class/data-theme attr
//      before React hydrates, which also causes hydration mismatch
//      warnings without it.
//
// No other changes needed here — the warning is in layout, not here.
// ─────────────────────────────────────────────────────────────────

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}
