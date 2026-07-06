// Role: 대시보드 좌측 사이드바 - 네비게이션 + 로고 홈 이동 확인
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <aside className="fixed top-0 left-0 bottom-0 w-[220px] bg-[#10141c] border-r border-white/[0.07] flex flex-col">
        {/* Logo */}
        <div
          className="px-6 py-7 border-b border-white/[0.07] cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setShowConfirm(true)}
        >
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

      {/* 처음화면 확인 다이얼로그 */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#10141c] rounded-2xl p-8 shadow-2xl border border-black/[0.08] dark:border-white/[0.08] max-w-sm w-full mx-4">
            <div className="text-2xl mb-4 text-center">🏠</div>
            <h3 className="font-['Syne'] text-[18px] font-bold text-center mb-2 text-gray-900 dark:text-white">처음 화면으로 돌아가시겠습니까?</h3>
            <p className="text-[13px] text-gray-500 text-center mb-7">메인 페이지로 이동합니다.</p>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowConfirm(false); navigate('/') }}
                className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white text-[14px] font-semibold rounded-xl transition-all"
              >
                확인
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 border border-white/[0.1] text-gray-400 hover:bg-white/[0.05] text-[14px] rounded-xl transition-all"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
