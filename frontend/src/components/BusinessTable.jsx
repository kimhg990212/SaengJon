import { useState } from 'react'
import { getRisk } from '../data/mockData'
import BusinessModal from './BusinessModal'

const colorMap = {
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
}
const barColor = {
  red: '#ef4444', orange: '#f97316', yellow: '#eab308', green: '#22c55e'
}

export default function BusinessTable({ businesses, filter, search }) {
  const [selected, setSelected] = useState(null)

  const filtered = businesses.filter(b => {
    const risk = getRisk(b.score)
    const matchFilter = filter === 'all' || risk.color === filter ||
      (filter === 'critical' && b.score >= 80) ||
      (filter === 'high' && b.score >= 60 && b.score < 80) ||
      (filter === 'medium' && b.score >= 40 && b.score < 60) ||
      (filter === 'low' && b.score < 40)
    const matchSearch = !search || b.name.includes(search) || b.loc.includes(search) || b.cat.includes(search)
    return matchFilter && matchSearch
  })

  const currentMonth = (new Date().getMonth() + 1) + '월'

  return (
    <>
      <div className="bg-[#10141c] border border-white/[0.07] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.07] flex justify-between items-center">
          <span className="text-[14px] font-medium">업체별 위험 스코어</span>
          <span className="text-[12px] text-gray-500">{filtered.length}개 표시</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#161b26]">
                {['업체명', '소재지', '업종', '위험 등급', '스코어 (0–100)', '예측 기준월'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] text-gray-500 font-medium tracking-widest uppercase border-b border-white/[0.07]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => {
                const risk = getRisk(b.score)
                return (
                  <tr
                    key={b.id}
                    onClick={() => setSelected(b)}
                    className="border-b border-white/[0.07] last:border-0 cursor-pointer hover:bg-[#161b26] transition-all"
                  >
                    <td className="px-4 py-3">
                      <div className="text-[13px] font-medium">{b.name}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">{b.cat}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[12px] text-gray-500">{b.loc}</td>
                    <td className="px-4 py-3 text-[13px]">{b.cat}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border font-mono ${colorMap[risk.color]}`}>
                        {risk.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex-1 h-1 bg-[#161b26] rounded overflow-hidden">
                          <div className="h-full rounded" style={{ width: `${b.score}%`, background: barColor[risk.color] }} />
                        </div>
                        <span className="font-mono text-[13px] min-w-[28px] text-right" style={{ color: barColor[risk.color] }}>
                          {b.score}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[12px] text-gray-500">{currentMonth}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <BusinessModal business={selected} onClose={() => setSelected(null)} />}
    </>
  )
}