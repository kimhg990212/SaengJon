import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import KpiCard from '../components/KpiCard'
import BusinessTable from '../components/BusinessTable'
import AlertList from '../components/AlertList'
import DistrictChart from '../components/DistrictChart'
import { BUSINESSES } from '../data/mockData'

const FILTERS = ['all', 'critical', 'high', 'medium', 'low']
const FILTER_LABELS = ['전체', '위험', '경고', '주의', '안전']

export default function Dashboard() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const critical = BUSINESSES.filter(b => b.score >= 80).length
  const high = BUSINESSES.filter(b => b.score >= 60 && b.score < 80).length
  const safe = BUSINESSES.filter(b => b.score < 60).length

  return (
    <div className="flex bg-[#0a0c10] min-h-screen text-[#e8eaf0]">
      <Sidebar />
      <main className="ml-[220px] flex-1 p-8">
        {/* Topbar */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="font-['Syne'] text-2xl font-bold tracking-tight">위험 현황 대시보드</h1>
            <p className="text-gray-500 text-[13px] mt-1">경기도 소상공인 폐업 선행 예측 · {new Date().getFullYear()}년 {new Date().getMonth()+1}월 기준</p>
          </div>
          <div className="flex gap-2.5 items-center">
            <input
              type="text"
              placeholder="업체명 또는 소재지"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-[#161b26] border border-white/[0.07] focus:border-indigo-500 rounded-lg px-4 py-2 text-[13px] w-52 outline-none transition-colors text-[#e8eaf0] placeholder-gray-600"
            />
            <button className="px-4 py-2 rounded-lg border border-white/[0.07] bg-[#10141c] text-gray-500 hover:text-white text-[13px] transition-all">
              ↻ 새로고침
            </button>
            <button className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] transition-all">
              ＋ 리포트 출력
            </button>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-4 gap-4 mb-7">
          <KpiCard label="전체 분석 업체" value={BUSINESSES.length.toLocaleString()} delta="127" deltaUp={true} color="white" onClick={() => setFilter('all')} />
          <KpiCard label="위험 (80점 이상)" value={critical} delta="18" deltaUp={true} color="red" onClick={() => setFilter('critical')} />
          <KpiCard label="경고 (60~79점)" value={high} delta="43" deltaUp={true} color="orange" onClick={() => setFilter('high')} />
          <KpiCard label="안전 (59점 이하)" value={safe} delta="-61" deltaUp={false} color="green" onClick={() => setFilter('low')} />
        </div>

        {/* Content */}
        <div className="grid grid-cols-[1fr_360px] gap-5">
          <div>
            {/* Filter tabs */}
            <div className="flex gap-1.5 mb-4">
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] border transition-all
                    ${filter === f
                      ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
                      : 'border-white/[0.07] text-gray-500 hover:text-white'
                    }`}
                >
                  {FILTER_LABELS[i]}
                </button>
              ))}
            </div>
            <BusinessTable businesses={BUSINESSES} filter={filter} search={search} />
          </div>

          <div className="flex flex-col gap-4">
            <AlertList />
            <DistrictChart />
          </div>
        </div>
      </main>
    </div>
  )
}