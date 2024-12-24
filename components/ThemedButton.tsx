'use client'
import PhMoonFill from '@/components/icons/moon'
import PhSunBold from '@/components/icons/sun'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemedButton() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className='cursor-pointer'
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <PhMoonFill /> : <PhSunBold />}
    </button>
  )
}
