// Role: 메인 랜딩 페이지 - Hero 섹션만 표시
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import ThemeToggle from '../components/ThemeToggle'

export default function Landing() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="min-h-screen bg-white text-[#0a0c10] dark:bg-[#0a0c10] dark:text-[#e8eaf0] overflow-x-hidden font-['Noto_Sans_KR'] transition-colors">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-5 border-b border-black/[0.06] dark:border-white/[0.05] backdrop-blur-md bg-white/80 dark:bg-[#0a0c10]/80">
        <div className="cursor-pointer" onClick={() => setShowConfirm(true)}>
          <span className="font-['Syne'] text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">생존</span>
          <span className="font-mono text-[10px] text-gray-400 dark:text-gray-600 ml-2">SAENGJEON</span>
        </div>
        <div className="flex items-center gap-6">
          <span
            onClick={() => navigate('/service')}
            className="text-[13px] text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors"
          >서비스 소개</span>
          <span className="text-[13px] text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">데이터 파트너</span>
          <span className="text-[13px] text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">요금제</span>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center px-10 pt-20 max-w-[1400px] mx-auto">
        {/* Left */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 text-[11px] font-mono mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            경기도 공공데이터 기반 AI 예측
          </div>

          <h1 className="font-['Syne'] text-[64px] font-extrabold leading-[1.08] tracking-[-1.5px] mb-6">
            소상공인<br />
            <span className="text-green-600 dark:text-green-400">폐업 예방</span><br />
            솔루션 플랫폼
          </h1>

          <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-md">
            사업자등록번호 하나로 폐업 위험을 AI가 미리 진단합니다.<br />
            경기도 실제 공공데이터 기반, 객관적인 수치로.
          </p>

          <div className="flex gap-3 mb-14">
            <button
              onClick={() => navigate('/diagnose')}
              className="px-7 py-3.5 bg-green-500 hover:bg-green-600 text-white text-[14px] font-semibold rounded-xl transition-all shadow-lg shadow-green-500/20 hover:-translate-y-0.5"
            >
              무료로 진단받기 →
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 border-t border-black/[0.07] dark:border-white/[0.07] pt-10">
            <div>
              <div className="font-['Roboto_Mono'] text-[32px] font-light text-gray-900 dark:text-white leading-none tracking-tight">4,821</div>
              <div className="text-[12px] text-gray-500 mt-1">분석 완료 업체</div>
            </div>
            <div className="w-px bg-black/[0.07] dark:bg-white/[0.07]" />
            <div>
              <div className="font-['Roboto_Mono'] text-[32px] font-light text-red-500 dark:text-red-400 leading-none tracking-tight">312</div>
              <div className="text-[12px] text-gray-500 mt-1">이번 달 위험 감지</div>
            </div>
            <div className="w-px bg-black/[0.07] dark:bg-white/[0.07]" />
            <div>
              <div className="font-['Roboto_Mono'] text-[32px] font-light text-green-600 dark:text-green-400 leading-none tracking-tight">94%</div>
              <div className="text-[12px] text-gray-500 mt-1">예측 정확도</div>
            </div>
          </div>
        </div>

        {/* Right — 기능 목업 */}
        <div className="w-[440px] flex-shrink-0 flex flex-col gap-3">
          {/* 위험 스코어 카드 */}
          <div className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-2xl p-5 hover:border-green-500/20 transition-all">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-[11px] text-gray-500 font-mono uppercase tracking-widest mb-1">위험 진단</div>
                <div className="font-semibold text-[15px]">수원갈비집</div>
                <div className="text-[11px] text-gray-500 mt-0.5">수원시 팔달구 · 한식</div>
              </div>
              <div className="text-right">
                <div className="font-['Roboto_Mono'] text-[52px] font-light leading-none text-red-500 dark:text-red-400 tracking-tight">92</div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-mono mt-1">위험</div>
              </div>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-[#161b26] rounded-full overflow-hidden mb-3">
              <div className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500" style={{ width: '92%' }} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '매출 변화', val: '▼ 31%' },
                { label: '유동인구', val: '▼ 28%' },
                { label: '밀집도', val: '높음' },
              ].map(f => (
                <div key={f.label} className="bg-gray-100 dark:bg-[#161b26] rounded-lg px-3 py-2 text-center">
                  <div className="text-[10px] text-gray-500 mb-0.5">{f.label}</div>
                  <div className="text-[12px] font-mono text-red-600 dark:text-red-400">{f.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 6개월 트렌드 */}
          <div className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-2xl p-5 hover:border-green-500/20 transition-all">
            <div className="text-[11px] text-gray-500 font-mono uppercase tracking-widest mb-3">6개월 위험지수 추이</div>
            <div className="flex items-end gap-1.5 h-16">
              {[38, 48, 58, 70, 81, 92].map((v, i) => {
                const c = v >= 80 ? '#ef4444' : v >= 60 ? '#f97316' : v >= 40 ? '#eab308' : '#22c55e'
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-sm" style={{ height: `${v * 0.6}px`, background: c, opacity: 0.85 }} />
                    <div className="text-[9px] text-gray-500 dark:text-gray-600 font-mono">{v}</div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-1">
              {['1월','2월','3월','4월','5월','6월'].map(m => (
                <div key={m} className="flex-1 text-center text-[9px] text-gray-500 dark:text-gray-600 font-mono">{m}</div>
              ))}
            </div>
          </div>

          {/* 위험 업체 리스트 미니 */}
          <div className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-2xl p-5 hover:border-green-500/20 transition-all">
            <div className="flex justify-between items-center mb-3">
              <div className="text-[11px] text-gray-500 font-mono uppercase tracking-widest">위험 업체 현황</div>
              <div className="text-[11px] text-red-500 dark:text-red-400 font-mono">● 5건 긴급</div>
            </div>
            {[
              { name:'수원갈비집', score:92, color:'text-red-500 dark:text-red-400' },
              { name:'성남PC방', score:88, color:'text-red-500 dark:text-red-400' },
              { name:'부천 꽃집', score:83, color:'text-orange-500 dark:text-orange-400' },
            ].map(b => (
              <div key={b.name} className="flex justify-between items-center py-2 border-b border-black/[0.05] dark:border-white/[0.05] last:border-0">
                <span className="text-[13px]">{b.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1 bg-gray-200 dark:bg-[#161b26] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-red-400" style={{ width: `${b.score}%` }} />
                  </div>
                  <span className={`font-mono text-[12px] ${b.color}`}>{b.score}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 데이터 소스 뱃지 */}
          <div className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-2xl p-4 hover:border-green-500/20 transition-all">
            <div className="text-[11px] text-gray-500 font-mono uppercase tracking-widest mb-3">연동 데이터 소스</div>
            <div className="flex flex-wrap gap-2">
              {['경기데이터드림', '공공데이터포털', '소진공 API', '행정안전부', '국세청'].map(s => (
                <span key={s} className="px-3 py-1 bg-gray-100 dark:bg-[#161b26] border border-black/[0.05] dark:border-white/[0.05] rounded-full text-[11px] text-gray-500 dark:text-gray-400">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.06] dark:border-white/[0.05] px-10 py-7 flex justify-between items-center">
        <div>
          <span className="font-['Syne'] font-bold text-gray-900 dark:text-white">생존</span>
          <span className="font-mono text-[10px] text-gray-400 dark:text-gray-600 ml-2">by HelperLab</span>
        </div>
        <div className="text-[12px] text-gray-500 dark:text-gray-600">© 2026 HelperLab. 경기도 소상공인 AI 폐업예측 플랫폼</div>
      </footer>

      {/* 처음화면 확인 다이얼로그 */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#10141c] rounded-2xl p-8 shadow-2xl border border-black/[0.08] dark:border-white/[0.08] max-w-sm w-full mx-4">
            <div className="text-2xl mb-4 text-center">🏠</div>
            <h3 className="font-['Syne'] text-[18px] font-bold text-center mb-2">처음 화면으로 돌아가시겠습니까?</h3>
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
                className="flex-1 py-2.5 border border-black/[0.1] dark:border-white/[0.1] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.05] text-[14px] rounded-xl transition-all"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
