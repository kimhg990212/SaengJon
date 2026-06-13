import { DISTRICTS } from '../data/mockData'

export default function DistrictChart() {
  const max = Math.max(...DISTRICTS.map(d => d.cnt))

  return (
    <div className="bg-[#10141c] border border-white/[0.07] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-white/[0.07]">
        <span className="text-[14px] font-medium">지역별 위험 업체 수</span>
      </div>
      <div className="p-5">
        {DISTRICTS.map(d => {
          const pct = Math.round(d.cnt / max * 100)
          const color = pct > 80 ? '#ef4444' : pct > 60 ? '#f97316' : '#eab308'
          return (
            <div key={d.name} className="flex items-center gap-3 mb-3 last:mb-0">
              <div className="text-[12px] text-gray-500 w-16 flex-shrink-0">{d.name}</div>
              <div className="flex-1 h-[18px] bg-[#161b26] rounded overflow-hidden">
                <div
                  className="h-full rounded flex items-center pl-2"
                  style={{ width: `${pct}%`, background: color }}
                >
                  <span className="text-[11px] text-white/90 font-mono">{d.cnt}개</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}