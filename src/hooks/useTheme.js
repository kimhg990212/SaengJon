// 다크/화이트 모드 상태를 localStorage에 저장하고 <html> 클래스에 반영하는 훅
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'saengjon-theme'

export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(STORAGE_KEY) || 'dark'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
