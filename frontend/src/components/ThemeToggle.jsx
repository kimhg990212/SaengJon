// 다크/화이트 모드 전환 토글 버튼
export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="테마 전환"
      className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-[12px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      {theme === 'dark' ? '☀ 라이트' : '🌙 다크'}
    </button>
  )
}
