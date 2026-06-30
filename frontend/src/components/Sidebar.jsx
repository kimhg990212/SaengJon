import { useState } from 'react'

const navItems = [
  { icon: '▦', label: '대시보드', path: '/' },
  { icon: '◎', label: '업체 검색', path: '/search' },
  { icon: '⬡', label: '지역 현황', path: '/district' },
  { icon: '↗', label: '위험 알림', path: '/alerts' },
  { icon: '▤', label: '리포트', path: '/report' },
  { icon: '⚙', label: '설정', path: '/settings' },
]

export default function Sidebar() {
  const [active, setActive] = useState('대시보드')

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[220px] bg-[#10141c] border-r border-white/[0.07] flex flex-col">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/[0.07]">
        <div className="font-['Syne'] text-[22px] font-extrabold tracking-tight text-white">생존</div>
        <div className="font-mono text-[10px] text-gray-500 mt-0.5 tracking-wider">SAENGJEON · v0.1 MVP</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3">
        {navItems.map(item => (
          <div
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer text-[13px] mb-0.5 transition-all
              ${active === item.label
                ? 'bg-indigo-500/15 text-indigo-300 font-medium'
                : 'text-gray-500 hover:bg-[#161b26] hover:text-gray-200'
              }`}
          >
            <span className="text-base opacity-80">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/[0.07]">
        <div className="bg-[#161b26] border border-white/[0.07] rounded-lg p-3 font-mono text-[10px] text-gray-500">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#22c55e]" />
            API 연결됨
          </div>
          <div>경기데이터드림 · mock</div>
        </div>
      </div>
    </aside>
  )
}