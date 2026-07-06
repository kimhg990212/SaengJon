// Role: 서비스 소개 페이지 - 기능/데이터소스/위험도분석/CTA 4섹션 구성
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import ThemeToggle from '../components/ThemeToggle'

const DATA_SOURCES = [
  {
    name: '경기데이터드림',
    tag: 'GDD',
    color: '#22c55e',
    items: ['유동인구 데이터', '카드 매출 통계', '상권 변화 지수'],
    desc: '경기도 내 실시간 상권·유동인구 핵심 지표',
  },
  {
    name: '공공데이터포털',
    tag: 'DATA.GO',
    color: '#3b82f6',
    items: ['인허가 정보', '행정구역 데이터', '업종 분류 현황'],
    desc: '정부 공식 인허가·행정 오픈 데이터',
  },
  {
    name: '소진공 API',
    tag: 'SBC',
    color: '#f97316',
    items: ['소상공인 지원사업', '정책자금 현황', '컨설팅 연계'],
    desc: '소상공인시장진흥공단 정책 지원 정보',
  },
  {
    name: '행정안전부',
    tag: 'MOIS',
    color: '#a855f7',
    items: ['사업자 등록 현황', '폐업 통계', '지역별 업체 분포'],
    desc: '사업자 등록·폐업 공식 행정 데이터',
  },
  {
    name: '국세청',
    tag: 'NTS',
    color: '#eab308',
    items: ['사업자 상태 조회', '과세 유형 확인', '휴·폐업 여부'],
    desc: '국세청 실시간 사업자 상태 API 연동',
  },
]

const RISK_FACTORS = [
  { label: '유동인구 변화', weight: 30, color: '#ef4444' },
  { label: '카드매출 추이', weight: 25, color: '#f97316' },
  { label: '업종 밀집도', weight: 20, color: '#eab308' },
  { label: '폐업 인근 비율', weight: 15, color: '#a855f7' },
  { label: '사업자 상태', weight: 10, color: '#3b82f6' },
]

const SOLUTIONS = [
  {
    range: '80 ~ 100',
    label: '위험',
    color: 'text-red-500 dark:text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
    icon: '🚨',
    actions: ['긴급 경영 컨설팅 연결', '폐업 절차 안내', '재창업 지원 연계'],
  },
  {
    range: '60 ~ 79',
    label: '경고',
    color: 'text-orange-500 dark:text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
    icon: '⚠️',
    actions: ['업종 전환 시뮬레이션', '정책자금 매칭', '상권 이동 분석'],
  },
  {
    range: '40 ~ 59',
    label: '주의',
    color: 'text-yellow-500 dark:text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    icon: '📋',
    actions: ['개선 포인트 리포트', '매출 향상 전략 제시', '유사 업종 비교 분석'],
  },
  {
    range: '0 ~ 39',
    label: '안전',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    icon: '✅',
    actions: ['현황 모니터링 유지', '성장 기회 데이터 제공', '분기별 자동 알림'],
  },
]

export default function ServiceIntro() {
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
            onClick={() => setShowConfirm(true)}
            className="text-[13px] text-green-600 dark:text-green-400 font-semibold cursor-pointer"
          >
            서비스 소개
          </span>
          <span className="text-[13px] text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">데이터 파트너</span>
          <span className="text-[13px] text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">요금제</span>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            onClick={() => navigate('/diagnose')}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-[13px] rounded-lg transition-all font-medium"
          >
            무료 진단 →
          </button>
        </div>
      </nav>

      {/* ── Section 1: 서비스 소개 ── */}
      <section className="pt-32 pb-24 px-10 max-w-[1400px] mx-auto">
        <div className="mb-14 text-center">
          <div className="font-mono text-[11px] text-green-600 dark:text-green-400 tracking-widest uppercase mb-3">Services</div>
          <h1 className="font-['Syne'] text-[48px] font-extrabold tracking-tight mb-4">생존이 제공하는 서비스</h1>
          <p className="text-[15px] text-gray-500 dark:text-gray-400">사업자번호 하나로 폐업 위험 진단부터 맞춤 솔루션까지, 한 번에.</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 카드 1: 폐업 위험 진단 */}
          <div className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-2xl p-7 hover:border-green-500/30 transition-all">
            <div className="text-3xl mb-4">◎</div>
            <h3 className="font-['Syne'] text-[20px] font-bold mb-2">폐업 위험 진단</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-6">0~100 위험지수로 현재 상태를 수치화합니다. 사업자번호만으로 즉시 진단.</p>
            {/* 미니 위험 스코어 */}
            <div className="bg-white dark:bg-[#161b26] rounded-xl p-4 border border-black/[0.05] dark:border-white/[0.05]">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <div className="text-[11px] text-gray-500 font-mono mb-0.5">위험 진단</div>
                  <div className="font-semibold text-[13px]">수원갈비집</div>
                </div>
                <div className="font-['Roboto_Mono'] text-[40px] font-light leading-none text-red-500 dark:text-red-400">92</div>
              </div>
              <div className="h-1.5 bg-gray-200 dark:bg-[#0a0c10] rounded-full overflow-hidden mb-2">
                <div className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500" style={{ width: '92%' }} />
              </div>
              <div className="flex justify-between text-[9px] text-gray-400 font-mono">
                <span>안전 0</span><span>50</span><span>100 위험</span>
              </div>
            </div>
          </div>

          {/* 카드 2: 위험 원인 분석 */}
          <div className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-2xl p-7 hover:border-green-500/30 transition-all">
            <div className="text-3xl mb-4">⬡</div>
            <h3 className="font-['Syne'] text-[20px] font-bold mb-2">위험 원인 분석</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-6">어떤 요인이 위험도를 높이는지 항목별로 분해해서 보여줍니다.</p>
            {/* 미니 팩터 바 */}
            <div className="space-y-2.5">
              {[
                { label: '유동인구 감소', val: 78, color: '#ef4444' },
                { label: '카드매출 하락', val: 65, color: '#f97316' },
                { label: '업종 밀집도', val: 52, color: '#eab308' },
              ].map(f => (
                <div key={f.label}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-gray-600 dark:text-gray-400">{f.label}</span>
                    <span className="font-mono" style={{ color: f.color }}>{f.val}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 dark:bg-[#0a0c10] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${f.val}%`, background: f.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 카드 3: 6개월 추이 */}
          <div className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-2xl p-7 hover:border-green-500/30 transition-all">
            <div className="text-3xl mb-4">▤</div>
            <h3 className="font-['Syne'] text-[20px] font-bold mb-2">맞춤 솔루션 제안</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-6">위험도에 따라 최적화된 대응 방안과 지원사업을 자동으로 매칭합니다.</p>
            {/* 미니 솔루션 */}
            <div className="space-y-2">
              {['긴급 경영 컨설팅 연결', '정책자금 지원 매칭', '상권 이동 분석 제공'].map((s, i) => (
                <div key={s} className="flex items-center gap-2.5 bg-white dark:bg-[#161b26] rounded-lg px-3 py-2 border border-black/[0.05] dark:border-white/[0.05]">
                  <span className="w-5 h-5 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 text-[10px] font-mono flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <span className="text-[12px] text-gray-700 dark:text-gray-300">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: 데이터 소스 ── */}
      <section className="px-10 py-24 border-t border-black/[0.06] dark:border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14 text-center">
            <div className="font-mono text-[11px] text-green-600 dark:text-green-400 tracking-widest uppercase mb-3">Data Sources</div>
            <h2 className="font-['Syne'] text-[40px] font-extrabold tracking-tight mb-4">신뢰할 수 있는 데이터 소스</h2>
            <p className="text-[15px] text-gray-500 dark:text-gray-400">5개 공공 기관의 실데이터를 AI가 통합 분석합니다.</p>
          </div>

          {/* 데이터 흐름 시각화 */}
          <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
            <div className="flex gap-3 flex-shrink-0">
              {DATA_SOURCES.map(src => (
                <div key={src.name} className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-xl px-4 py-3 text-center min-w-[120px]">
                  <div className="font-mono text-[9px] px-2 py-0.5 rounded-full inline-block mb-2" style={{ background: `${src.color}18`, color: src.color }}>
                    {src.tag}
                  </div>
                  <div className="text-[12px] font-semibold">{src.name}</div>
                </div>
              ))}
            </div>
            <div className="text-2xl text-gray-300 dark:text-gray-600 flex-shrink-0 font-mono">→</div>
            <div className="flex-shrink-0 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-3 text-center">
              <div className="text-[10px] font-mono text-green-600 dark:text-green-400 mb-1">AI ENGINE</div>
              <div className="text-[13px] font-bold">통합 분석</div>
            </div>
            <div className="text-2xl text-gray-300 dark:text-gray-600 flex-shrink-0 font-mono">→</div>
            <div className="flex-shrink-0 bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-3 text-center">
              <div className="font-['Roboto_Mono'] text-[32px] font-light text-red-500 dark:text-red-400 leading-none">92</div>
              <div className="text-[10px] font-mono text-gray-500 mt-0.5">위험지수</div>
            </div>
          </div>

          {/* 소스별 상세 카드 */}
          <div className="grid grid-cols-5 gap-4">
            {DATA_SOURCES.map(src => (
              <div key={src.name} className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-2xl p-5 hover:border-green-500/20 transition-all">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 font-mono text-[10px] font-bold" style={{ background: `${src.color}18`, color: src.color }}>
                  {src.tag.slice(0, 2)}
                </div>
                <div className="font-semibold text-[13px] mb-1">{src.name}</div>
                <div className="text-[11px] text-gray-500 mb-4 leading-relaxed">{src.desc}</div>
                <ul className="space-y-1.5">
                  {src.items.map(item => (
                    <li key={item} className="flex items-center gap-1.5 text-[11px] text-gray-600 dark:text-gray-400">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: src.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: 위험도 분석 + 솔루션 ── */}
      <section className="px-10 py-24 border-t border-black/[0.06] dark:border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14 text-center">
            <div className="font-mono text-[11px] text-green-600 dark:text-green-400 tracking-widest uppercase mb-3">Risk Analysis</div>
            <h2 className="font-['Syne'] text-[40px] font-extrabold tracking-tight mb-4">위험도 분석과 솔루션</h2>
            <p className="text-[15px] text-gray-500 dark:text-gray-400">5가지 지표를 가중 합산해 위험지수를 도출하고, 등급별 솔루션을 제공합니다.</p>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {/* 왼쪽: 위험 분석 구성 */}
            <div>
              <div className="font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-5">위험지수 구성 요소</div>
              <div className="space-y-4">
                {RISK_FACTORS.map(f => (
                  <div key={f.label}>
                    <div className="flex justify-between text-[13px] mb-2">
                      <span className="font-medium">{f.label}</span>
                      <span className="font-mono text-gray-500">{f.weight}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-[#161b26] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${f.weight * 3}%`, background: f.color }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* 수식 */}
              <div className="mt-8 bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-xl p-5">
                <div className="font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-3">위험지수 산출</div>
                <div className="font-mono text-[12px] text-gray-700 dark:text-gray-300 leading-relaxed">
                  위험지수 =<br />
                  <span className="text-red-500">유동인구 × 0.30</span> +{' '}
                  <span className="text-orange-500">매출 × 0.25</span> +{' '}
                  <span className="text-yellow-500">밀집도 × 0.20</span> +<br />
                  <span className="text-purple-500">폐업비율 × 0.15</span> +{' '}
                  <span className="text-blue-500">사업자상태 × 0.10</span>
                </div>
              </div>
            </div>

            {/* 오른쪽: 솔루션 제공 */}
            <div>
              <div className="font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-5">등급별 솔루션 제공</div>
              <div className="space-y-3">
                {SOLUTIONS.map(s => (
                  <div key={s.label} className={`border rounded-xl p-4 ${s.bg}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl">{s.icon}</span>
                      <div>
                        <span className={`font-mono text-[11px] font-bold ${s.color}`}>{s.label}</span>
                        <span className="font-mono text-[11px] text-gray-500 ml-2">({s.range}점)</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {s.actions.map(a => (
                        <span key={a} className="px-2.5 py-1 bg-white/60 dark:bg-black/20 rounded-lg text-[11px] text-gray-700 dark:text-gray-300">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: CTA ── */}
      <section className="px-10 py-20 text-center border-t border-black/[0.06] dark:border-white/[0.05]">
        <h2 className="font-['Syne'] text-[42px] font-extrabold tracking-tight mb-3">
          지금 바로 진단해보세요
        </h2>
        <p className="text-[14px] text-gray-500 mb-8">무료 · 1분 이내 · 사업자번호만 있으면 OK</p>
        <button
          onClick={() => navigate('/diagnose')}
          className="px-10 py-4 bg-green-500 hover:bg-green-600 text-white text-[15px] font-semibold rounded-xl transition-all shadow-lg shadow-green-500/20 hover:-translate-y-0.5"
        >
          무료로 진단받기 →
        </button>
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
