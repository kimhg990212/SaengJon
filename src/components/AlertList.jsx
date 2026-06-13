import { ALERTS } from '../data/mockData'

export default function AlertList() {
  const colorMap = {
    red: 'bg-red-400 shadow-[0_0_6px_#ef4444]',
    orange: 'bg-orange-400',
  }
  const textMap = {
    red: 'text-red-400',
    orange: 'text-orange-400',
  }

  return (
    <div className="bg-[#10141c] border border-white/[0.07] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-white/[0.07] flex justify-between items-center">
        <span className="text-[14px] font-medium">긴급 알림</span>
        <span className="text-[12px] text-red-400">● {ALERTS.filter(a => a.color === 'red').length}건</span>
      </div>
      <div>
        {ALERTS.map(alert => (
          <div key={alert.id} className="px-5 py-3 border-b border-white/[0.07] last:border-0 flex gap-3 items-start cursor-pointer hover:bg-[#161b26] transition-all">
            <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${colorMap[alert.color]}`} />
            <div className="flex-1">
              <div className="text-[13px] font-medium">{alert.name}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">{alert.reason}</div>
            </div>
            <div className={`font-mono text-[13px] flex-shrink-0 ${textMap[alert.color]}`}>
              {alert.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}