export default function KpiCard({ label, value, delta, deltaUp, color, onClick }) {
  const colorMap = {
    red: 'text-red-400',
    orange: 'text-orange-400',
    yellow: 'text-yellow-400',
    green: 'text-green-400',
    white: 'text-white',
  }

  return (
    <div
      onClick={onClick}
      className="bg-[#10141c] border border-white/[0.07] rounded-xl p-5 cursor-pointer hover:border-white/[0.15] transition-all animate-fadeUp"
    >
      <div className="text-[11px] text-gray-500 font-medium tracking-widest uppercase mb-2.5">
        {label}
      </div>
      <div className={`font-['Roboto_Mono'] text-[32px] font-light tracking-tight leading-none mb-1.5 ${colorMap[color] || 'text-white'}`}>
        {value}
      </div>
      <div className="text-[12px] text-gray-500 flex items-center gap-1">
        {deltaUp
          ? <span className="text-red-400">↑ +{delta}</span>
          : <span className="text-green-400">↓ {delta}</span>
        }
        &nbsp;전월 대비
      </div>
    </div>
  )
}