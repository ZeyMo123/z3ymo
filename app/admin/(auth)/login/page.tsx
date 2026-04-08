'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { checkAdminPassword } from '@/lib/admin/actions'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [isPending, startT] = useTransition()

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startT(async () => {
      const ok = await checkAdminPassword(password)
      if (ok) {
        // Set a simple session cookie (for MVP — replace with Supabase Auth for production)
        document.cookie = `z3ymo_admin=${process.env.NEXT_PUBLIC_ADMIN_TOKEN ?? 'admin-token'}; path=/admin; max-age=${60 * 60 * 24 * 7}; samesite=strict`
        router.push('/admin')
      } else {
        setError('Incorrect password.')
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-void dark:bg-whisper flex items-center justify-center mx-auto mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <rect x="2" y="3" width="8" height="8" rx="1"/>
              <rect x="14" y="3" width="8" height="8" rx="1"/>
              <rect x="14" y="14" width="8" height="8" rx="1"/>
              <rect x="2" y="14" width="8" height="8" rx="1"/>
            </svg>
          </div>
          <h1 className="font-display font-bold text-xl text-void dark:text-whisper">Z3ymo Admin</h1>
          <p className="text-sm text-void/40 dark:text-whisper/40 mt-1">Enter your password to continue</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-void/8 dark:border-whisper/8 p-7">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950/20 px-4 py-3 rounded-xl">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                </svg>
                {error}
              </div>
            )}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              autoFocus
              required
              className="w-full px-4 py-3.5 rounded-xl border border-void/10 dark:border-whisper/10 bg-transparent text-void dark:text-whisper text-sm placeholder:text-void/30 dark:placeholder:text-whisper/30 focus:outline-none focus:border-crimson/40 focus:ring-2 focus:ring-crimson/8 transition-all"
            />
            <button type="submit" disabled={isPending || !password}
              className="w-full py-3.5 rounded-xl bg-void dark:bg-whisper text-whisper dark:text-void text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2">
              {isPending
                ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg> Signing in…</>
                : 'Sign in to dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-void/25 dark:text-whisper/25 mt-6">
          Set ADMIN_PASSWORD in your environment variables.
        </p>
      </div>
    </div>
  )
}
