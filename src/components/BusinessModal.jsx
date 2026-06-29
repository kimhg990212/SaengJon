import { useEffect } from 'react'
import { getRisk, getMonths } from '../data/mockData'

export default function BusinessModal({ business, onClose }) {
  const months = getMonths()

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!business) return null

  const risk = getRisk(business.score)
  const colorMap = {
    red: '#ef4444', orange: '#f97316', yellow: '#eab308', green: '#22c55e'
  }
  const badgeBg = {
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
  }
  const scoreColor = colorMap[risk.color]

  const factors = [
    { name: '월 매출 변화율', val: business.score > 70 ? `▼ -${Math.round(business.score * 0.3)}%` : `▼ -${Math.round(business.score * 0.1)}%` },
    { name: '유동인구 변화', val: business.score > 70 ? `▼ -${Math.round(business.score * 0.4)}%` : `▼ -${Math.round(business.score * 0.15)}%` },
    { name: '동종업 밀집도', val: business.score > 70 ? '높음' : '보통' },
    { name: '임차료 연체 여부', val: business.score > 80 ? '1회 이상' : '없음' },
    { name: '업력', val: `${Math.round(3 + (100 - business.score) / 10)}년` },
  ]

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-[#10141c] border border-white/[0.15] rounded-2xl w-[560px] max-h-[80vh] overflow-y-auto">
        <div className="px-7 pt-6 pb-5 border-b border-white/[0.07] flex justify-between items-start">
          <div>
            <div className="font-['Syne'] text-[18px] font-bold">{business.name}</div>
            <div className="text-[12px] text-gray-500 mt-1">{business.loc} · {business.cat}</div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl leading-none transition-colors">×</button>
        </div>

        <div className="px-7 py-6">
          <div className="text-center mb-6">
            <div className="text-[12px] text-gray-500 mb-1">폐업 위험 지수</div>
            <div className="font-['Roboto_Mono'] text-[64px] font-light leading-none tracking-tight" style={{ color: scoreColor }}>
              {business.score}
            </div>
            <div className="mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium border font-mono ${badgeBg[risk.color]}`}>
                {risk.label}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 uppercase tracking-widest mb-2">최근 6개월 위험지수 추이</div>
          {business.trend.map((v, i) => {
            const c = v >= 80 ? '#ef4444' : v >= 60 ? '#f97316' : v >= 40 ? '#eab308' : '#22c55e'
            return (
              <div key={i} className="flex items-center gap-2 mb-1.5">
                <div className="font-mono text-[11px] text-gray-500 w-9">{months[i]}</div>
                <div className="flex-1 h-3.5 bg-[#161b26] rounded overflow-hidden">
                  <div className="h-full rounded" style={{ width: `${v}%`, background: c }} />
                </div>
                <div className="font-mono text-[11px] min-w-[24px] text-right" style={{ color: c }}>{v}</div>
              </div>
            )
          })}

          <div className="text-[11px] text-gray-500 uppercase tracking-widest mt-5 mb-2">주요 위험 요인</div>
          <div>
            {factors.map(f => (
              <div key={f.name} className="flex justify-between items-center py-2.5 border-b border-white/[0.07] last:border-0 text-[13px]">
                <span className="text-gray-500">{f.name}</span>
                <span className="font-mono">{f.val}</span>
              </div>
            ))}
          </div>

          <button className="w-full mt-5 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-[13px] font-medium transition-colors">
            PDF 리포트 출력
          </button>
        </div>
      </div>
    </div>
  )
}