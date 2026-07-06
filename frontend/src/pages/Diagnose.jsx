// Role: 사업자 폐업 위험 진단 페이지 - 번호 입력 → AI 분석 → 결과 + 솔루션 표시
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import ThemeToggle from '../components/ThemeToggle'

// 사업자번호 포맷: 000-00-00000
function formatBizNo(value) {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`
}

function getRisk(score) {
  if (score >= 80) return { label: '위험', color: '#ef4444', bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-500 dark:text-red-400' }
  if (score >= 60) return { label: '경고', color: '#f97316', bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-500 dark:text-orange-400' }
  if (score >= 40) return { label: '주의', color: '#eab308', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-500 dark:text-yellow-400' }
  return { label: '안전', color: '#22c55e', bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-600 dark:text-green-400' }
}

const SOLUTIONS = {
  위험: [
    { icon: '🚨', title: '긴급 경영 컨설팅', desc: '소진공 전문 컨설턴트와 1:1 긴급 상담을 연결해드립니다.' },
    { icon: '💰', title: '긴급 정책자금 신청', desc: '소상공인 긴급 경영안정자금 신청 자격을 확인하세요.' },
    { icon: '🔄', title: '업종 전환 시뮬레이션', desc: '현 상권에서 생존 가능한 업종을 AI가 분석합니다.' },
  ],
  경고: [
    { icon: '📊', title: '매출 개선 전략 리포트', desc: '카드매출·유동인구 데이터 기반 개선 포인트를 제공합니다.' },
    { icon: '🏛️', title: '지원사업 매칭', desc: '현재 신청 가능한 경기도·소진공 지원사업을 매칭합니다.' },
    { icon: '📍', title: '상권 이동 분석', desc: '인근 상권 중 유망 이전 후보지를 분석합니다.' },
  ],
  주의: [
    { icon: '📋', title: '개선 포인트 리포트', desc: '위험 요인별 개선 우선순위와 실행 방안을 제시합니다.' },
    { icon: '📈', title: '성장 기회 분석', desc: '유동인구·매출 트렌드에서 발견된 성장 기회를 알려드립니다.' },
    { icon: '🔔', title: '월간 모니터링 설정', desc: '매월 위험지수 변동을 자동으로 알림합니다.' },
  ],
  안전: [
    { icon: '✅', title: '현황 모니터링 유지', desc: '분기별 자동 위험지수 점검으로 안전을 유지합니다.' },
    { icon: '🚀', title: '성장 전략 제안', desc: '현재 안정된 상태에서 추가 성장 가능한 전략을 분석합니다.' },
    { icon: '💡', title: '우수 사례 벤치마킹', desc: '같은 업종 우수 업체의 성공 요인을 제공합니다.' },
  ],
}

// 목 분석 결과 생성 (실제 API 연동 전)
function mockAnalyze(bizNo) {
  const seed = bizNo.replace(/\D/g, '').split('').reduce((a, c) => a + parseInt(c), 0)
  const score = 35 + (seed * 7) % 60
  const trend = Array.from({ length: 6 }, (_, i) => Math.max(10, Math.min(99, score - 15 + i * 4 + (seed % 5))))
  return {
    bizNo,
    name: ['수원갈비집', '성남PC방', '부천꽃집', '의정부분식', '안양카페'][seed % 5],
    loc: ['수원시 팔달구', '성남시 분당구', '부천시 원미구', '의정부시 의정부동', '안양시 동안구'][seed % 5],
    cat: ['한식', 'PC방', '꽃집', '분식', '카페'][seed % 5],
    score,
    trend,
    factors: [
      { label: '유동인구 변화', val: score - 10 + (seed % 15), max: 100 },
      { label: '카드매출 추이', val: score - 5 + (seed % 10), max: 100 },
      { label: '업종 밀집도', val: 30 + (seed % 40), max: 100 },
      { label: '폐업 인근 비율', val: 20 + (seed % 30), max: 100 },
      { label: '사업자 상태', val: score > 60 ? 70 : 20, max: 100 },
    ],
  }
}

export default function Diagnose() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [showConfirm, setShowConfirm] = useState(false)
  const [bizNo, setBizNo] = useState('')
  const [step, setStep] = useState('input') // input | loading | result
  const [result, setResult] = useState(null)

  function handleInput(e) {
    setBizNo(formatBizNo(e.target.value))
  }

  function handleAnalyze() {
    if (bizNo.replace(/\D/g, '').length < 10) return
    setStep('loading')
    setTimeout(() => {
      setResult(mockAnalyze(bizNo))
      setStep('result')
    }, 2000)
  }

  function handleReset() {
    setBizNo('')
    setResult(null)
    setStep('input')
  }

  const risk = result ? getRisk(result.score) : null
  const solutions = result ? SOLUTIONS[risk.label] : []
  const months = ['1월', '2월', '3월', '4월', '5월', '6월']

  return (
    <div className="min-h-screen bg-white text-[#0a0c10] dark:bg-[#0a0c10] dark:text-[#e8eaf0] font-['Noto_Sans_KR'] transition-colors">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-5 border-b border-black/[0.06] dark:border-white/[0.05] backdrop-blur-md bg-white/80 dark:bg-[#0a0c10]/80">
        <div className="cursor-pointer" onClick={() => setShowConfirm(true)}>
          <span className="font-['Syne'] text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">생존</span>
          <span className="font-mono text-[10px] text-gray-400 dark:text-gray-600 ml-2">SAENGJEON</span>
        </div>
        <div className="flex items-center gap-6">
          <span onClick={() => navigate('/service')} className="text-[13px] text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">서비스 소개</span>
          <span className="text-[13px] text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">데이터 파트너</span>
          <span className="text-[13px] text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">요금제</span>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </nav>

      <div className="pt-24 pb-20 px-10 max-w-[900px] mx-auto">

        {/* ── 입력 단계 ── */}
        {step === 'input' && (
          <div className="flex flex-col items-center text-center pt-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 text-[11px] font-mono mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              무료 · 1분 이내 · 즉시 결과
            </div>
            <h1 className="font-['Syne'] text-[48px] font-extrabold tracking-tight leading-tight mb-4">
              폐업 위험을<br />지금 바로 진단하세요
            </h1>
            <p className="text-[15px] text-gray-500 dark:text-gray-400 mb-12">
              사업자등록번호만 입력하면 AI가 즉시 분석합니다.
            </p>

            <div className="w-full max-w-md">
              <div className="relative mb-4">
                <input
                  type="text"
                  value={bizNo}
                  onChange={handleInput}
                  placeholder="000-00-00000"
                  className="w-full px-5 py-4 text-[18px] font-mono border-2 border-black/[0.1] dark:border-white/[0.1] rounded-2xl bg-white dark:bg-[#10141c] text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-700 focus:outline-none focus:border-green-500 dark:focus:border-green-500 transition-colors text-center tracking-widest"
                  onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
                />
              </div>
              <button
                onClick={handleAnalyze}
                disabled={bizNo.replace(/\D/g, '').length < 10}
                className="w-full py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-2xl transition-all shadow-lg shadow-green-500/20 hover:-translate-y-0.5 disabled:shadow-none disabled:hover:translate-y-0"
              >
                위험 진단 시작 →
              </button>
              <p className="text-[11px] text-gray-400 mt-4">개인정보는 수집하지 않습니다. 사업자번호만으로 분석합니다.</p>
            </div>

            {/* 예시 안내 */}
            <div className="mt-16 grid grid-cols-3 gap-4 w-full max-w-2xl text-left">
              {[
                { num: '01', title: '번호 입력', desc: '10자리 사업자등록번호를 입력하세요' },
                { num: '02', title: 'AI 분석', desc: '5개 공공 데이터 소스를 실시간 분석합니다' },
                { num: '03', title: '결과 확인', desc: '위험지수와 맞춤 솔루션을 즉시 확인하세요' },
              ].map(s => (
                <div key={s.num} className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-xl p-5">
                  <div className="font-mono text-[11px] text-gray-400 mb-3">{s.num}</div>
                  <div className="font-semibold text-[14px] mb-1">{s.title}</div>
                  <div className="text-[12px] text-gray-500 leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 로딩 단계 ── */}
        {step === 'loading' && (
          <div className="flex flex-col items-center justify-center text-center pt-32">
            <div className="w-16 h-16 rounded-full border-4 border-green-500/20 border-t-green-500 animate-spin mb-8" />
            <h2 className="font-['Syne'] text-[28px] font-bold mb-3">AI 분석 중...</h2>
            <p className="text-[14px] text-gray-500 mb-8">5개 공공 데이터 소스를 분석하고 있습니다</p>
            <div className="flex flex-col gap-2 text-left w-64">
              {['경기데이터드림 유동인구 조회', '카드매출 데이터 분석', '인허가 현황 확인', '폐업 인근 비율 계산', '위험지수 산출 중'].map((t, i) => (
                <div key={t} className="flex items-center gap-2.5 text-[12px] text-gray-500">
                  <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 text-[9px]">✓</span>
                  {t}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 결과 단계 ── */}
        {step === 'result' && result && (
          <div>
            {/* 상단 결과 헤더 */}
            <div className="flex items-start justify-between mb-8 pt-4">
              <div>
                <div className="font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-2">진단 완료</div>
                <h2 className="font-['Syne'] text-[32px] font-extrabold tracking-tight">{result.name}</h2>
                <div className="text-[13px] text-gray-500 mt-1">{result.loc} · {result.cat} · {result.bizNo}</div>
              </div>
              <button onClick={handleReset} className="px-4 py-2 border border-black/[0.1] dark:border-white/[0.1] rounded-lg text-[13px] text-gray-500 hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-colors">
                다시 진단
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* 위험지수 카드 */}
              <div className={`${risk.bg} border ${risk.border} rounded-2xl p-7`}>
                <div className="font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-4">위험지수</div>
                <div className="flex items-end gap-4 mb-5">
                  <div className={`font-['Roboto_Mono'] text-[80px] font-light leading-none ${risk.text}`}>{result.score}</div>
                  <div className="pb-3">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full border ${risk.border} ${risk.bg} ${risk.text} text-[12px] font-mono font-bold`}>
                      {risk.label}
                    </div>
                    <div className="text-[12px] text-gray-500 mt-1">/ 100점</div>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-black/20 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 transition-all duration-1000"
                    style={{ width: `${result.score}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                  <span>안전 0</span><span>50</span><span>100 위험</span>
                </div>
              </div>

              {/* 6개월 추이 */}
              <div className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-2xl p-7">
                <div className="font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-5">6개월 위험지수 추이</div>
                <div className="flex items-end gap-2 h-20">
                  {result.trend.map((v, i) => {
                    const c = v >= 80 ? '#ef4444' : v >= 60 ? '#f97316' : v >= 40 ? '#eab308' : '#22c55e'
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t" style={{ height: `${v * 0.7}px`, background: c, opacity: 0.85 }} />
                        <div className="text-[9px] text-gray-500 font-mono">{v}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-between mt-1">
                  {months.map(m => (
                    <div key={m} className="flex-1 text-center text-[9px] text-gray-500 font-mono">{m}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* 위험 요인 분석 */}
            <div className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-2xl p-7 mb-6">
              <div className="font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-5">위험 요인 분석</div>
              <div className="space-y-4">
                {result.factors.map(f => {
                  const c = f.val >= 80 ? '#ef4444' : f.val >= 60 ? '#f97316' : f.val >= 40 ? '#eab308' : '#22c55e'
                  return (
                    <div key={f.label}>
                      <div className="flex justify-between text-[13px] mb-1.5">
                        <span className="text-gray-700 dark:text-gray-300">{f.label}</span>
                        <span className="font-mono" style={{ color: c }}>{f.val}</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 dark:bg-[#161b26] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${f.val}%`, background: c }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 맞춤 솔루션 */}
            <div className="mb-8">
              <div className="font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-4">맞춤 솔루션</div>
              <div className="grid grid-cols-3 gap-4">
                {solutions.map(s => (
                  <div key={s.title} className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-2xl p-5 hover:border-green-500/30 transition-all">
                    <div className="text-2xl mb-3">{s.icon}</div>
                    <div className="font-semibold text-[14px] mb-2">{s.title}</div>
                    <div className="text-[12px] text-gray-500 leading-relaxed">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 하단 액션 */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-3.5 bg-green-500 hover:bg-green-600 text-white text-[14px] font-semibold rounded-xl transition-all"
              >
                전체 업체 현황 보기 →
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-3.5 border border-black/[0.1] dark:border-white/[0.1] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.05] text-[14px] rounded-xl transition-all"
              >
                다른 번호 진단
              </button>
            </div>
          </div>
        )}
      </div>

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
