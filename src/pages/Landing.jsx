import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#e8eaf0] overflow-x-hidden font-['Noto_Sans_KR']">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-5 border-b border-white/[0.05] backdrop-blur-md bg-[#0a0c10]/80">
        <div>
          <span className="font-['Syne'] text-xl font-extrabold tracking-tight text-white">생존</span>
          <span className="font-mono text-[10px] text-gray-600 ml-2">SAENGJEON</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[13px] text-gray-500 hover:text-white cursor-pointer transition-colors">서비스 소개</span>
          <span className="text-[13px] text-gray-500 hover:text-white cursor-pointer transition-colors">데이터 파트너</span>
          <span className="text-[13px] text-gray-500 hover:text-white cursor-pointer transition-colors">요금제</span>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-[13px] rounded-lg transition-all font-medium"
          >
            대시보드 →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center px-10 pt-20 max-w-[1400px] mx-auto">
        {/* Left */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[11px] font-mono mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            경기도 공공데이터 기반 AI 예측
          </div>

          <h1 className="font-['Syne'] text-[64px] font-extrabold leading-[1.08] tracking-[-1.5px] mb-6">
            소상공인<br />
            <span className="text-green-400">폐업 예방</span><br />
            솔루션 플랫폼
          </h1>

          <p className="text-[15px] text-gray-400 leading-relaxed mb-10 max-w-md">
            사업자등록번호 하나로 폐업 위험을 AI가 미리 진단합니다.<br />
            경기도 실제 공공데이터 기반, 객관적인 수치로.
          </p>

          <div className="flex gap-3 mb-14">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-7 py-3.5 bg-green-500 hover:bg-green-600 text-white text-[14px] font-semibold rounded-xl transition-all shadow-lg shadow-green-500/20 hover:-translate-y-0.5"
            >
              무료로 진단받기 →
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 border-t border-white/[0.07] pt-10">
            <div>
              <div className="font-['Roboto_Mono'] text-[32px] font-light text-white leading-none tracking-tight">4,821</div>
              <div className="text-[12px] text-gray-500 mt-1">분석 완료 업체</div>
            </div>
            <div className="w-px bg-white/[0.07]" />
            <div>
              <div className="font-['Roboto_Mono'] text-[32px] font-light text-red-400 leading-none tracking-tight">312</div>
              <div className="text-[12px] text-gray-500 mt-1">이번 달 위험 감지</div>
            </div>
            <div className="w-px bg-white/[0.07]" />
            <div>
              <div className="font-['Roboto_Mono'] text-[32px] font-light text-green-400 leading-none tracking-tight">94%</div>
              <div className="text-[12px] text-gray-500 mt-1">예측 정확도</div>
            </div>
          </div>
        </div>

        {/* Right — 기능 목업 */}
        <div className="w-[440px] flex-shrink-0 flex flex-col gap-3">
          {/* 위험 스코어 카드 */}
          <div className="bg-[#10141c] border border-white/[0.07] rounded-2xl p-5 hover:border-green-500/20 transition-all">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-[11px] text-gray-500 font-mono uppercase tracking-widest mb-1">위험 진단</div>
                <div className="font-semibold text-[15px]">수원갈비집</div>
                <div className="text-[11px] text-gray-500 mt-0.5">수원시 팔달구 · 한식</div>
              </div>
              <div className="text-right">
                <div className="font-['Roboto_Mono'] text-[52px] font-light leading-none text-red-400 tracking-tight">92</div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono mt-1">위험</div>
              </div>
            </div>
            {/* Score bar */}
            <div className="h-1.5 bg-[#161b26] rounded-full overflow-hidden mb-3">
              <div className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500" style={{ width: '92%' }} />
            </div>
            {/* Factors */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '매출 변화', val: '▼ 31%' },
                { label: '유동인구', val: '▼ 28%' },
                { label: '밀집도', val: '높음' },
              ].map(f => (
                <div key={f.label} className="bg-[#161b26] rounded-lg px-3 py-2 text-center">
                  <div className="text-[10px] text-gray-500 mb-0.5">{f.label}</div>
                  <div className="text-[12px] font-mono text-red-400">{f.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 6개월 트렌드 */}
          <div className="bg-[#10141c] border border-white/[0.07] rounded-2xl p-5 hover:border-green-500/20 transition-all">
            <div className="text-[11px] text-gray-500 font-mono uppercase tracking-widest mb-3">6개월 위험지수 추이</div>
            <div className="flex items-end gap-1.5 h-16">
              {[38, 48, 58, 70, 81, 92].map((v, i) => {
                const c = v >= 80 ? '#ef4444' : v >= 60 ? '#f97316' : v >= 40 ? '#eab308' : '#22c55e'
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-sm" style={{ height: `${v * 0.6}px`, background: c, opacity: 0.85 }} />
                    <div className="text-[9px] text-gray-600 font-mono">{v}</div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-1">
              {['1월','2월','3월','4월','5월','6월'].map(m => (
                <div key={m} className="flex-1 text-center text-[9px] text-gray-600 font-mono">{m}</div>
              ))}
            </div>
          </div>

          {/* 위험 업체 리스트 미니 */}
          <div className="bg-[#10141c] border border-white/[0.07] rounded-2xl p-5 hover:border-green-500/20 transition-all">
            <div className="flex justify-between items-center mb-3">
              <div className="text-[11px] text-gray-500 font-mono uppercase tracking-widest">위험 업체 현황</div>
              <div className="text-[11px] text-red-400 font-mono">● 5건 긴급</div>
            </div>
            {[
              { name:'수원갈비집', score:92, color:'text-red-400' },
              { name:'성남PC방', score:88, color:'text-red-400' },
              { name:'부천 꽃집', score:83, color:'text-orange-400' },
            ].map(b => (
              <div key={b.name} className="flex justify-between items-center py-2 border-b border-white/[0.05] last:border-0">
                <span className="text-[13px]">{b.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1 bg-[#161b26] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-red-400" style={{ width: `${b.score}%` }} />
                  </div>
                  <span className={`font-mono text-[12px] ${b.color}`}>{b.score}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 데이터 소스 뱃지 */}
          <div className="bg-[#10141c] border border-white/[0.07] rounded-2xl p-4 hover:border-green-500/20 transition-all">
            <div className="text-[11px] text-gray-500 font-mono uppercase tracking-widest mb-3">연동 데이터 소스</div>
            <div className="flex flex-wrap gap-2">
              {['경기데이터드림', '공공데이터포털', '소진공 API', '행정안전부', '국세청'].map(s => (
                <span key={s} className="px-3 py-1 bg-[#161b26] border border-white/[0.05] rounded-full text-[11px] text-gray-400">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-10 py-24 max-w-[1400px] mx-auto border-t border-white/[0.05]">
        <div className="mb-12">
          <div className="font-mono text-[11px] text-green-400 tracking-widest uppercase mb-2">How it works</div>
          <h2 className="font-['Syne'] text-[36px] font-bold tracking-tight">3단계로 끝나는 위험 진단</h2>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {[
            { num:'01', title:'사업자번호 입력', desc:'10자리 사업자등록번호만 입력하면 끝. 별도 서류나 재무정보 불필요.', icon:'◎', color:'#22c55e' },
            { num:'02', title:'AI 자동 분석', desc:'경기도 유동인구, 카드매출, 인허가 데이터를 AI가 실시간으로 분석합니다.', icon:'⬡', color:'#f97316' },
            { num:'03', title:'위험 리포트 수령', desc:'0~100 위험지수와 핵심 원인, 대응 방안을 즉시 확인하세요.', icon:'▤', color:'#22c55e' },
          ].map(f => (
            <div key={f.num} className="bg-[#10141c] border border-white/[0.07] rounded-2xl p-7 hover:border-green-500/20 transition-all">
              <div className="flex items-center gap-2 mb-5">
                <span className="font-mono text-[11px] text-gray-600">{f.num}</span>
                <span className="text-xl" style={{ color: f.color }}>{f.icon}</span>
              </div>
              <h3 className="font-['Syne'] text-[18px] font-bold mb-2">{f.title}</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* B2B/B2G */}
      <section className="px-10 py-24 border-t border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-mono text-[11px] text-green-400 tracking-widest uppercase mb-3">Enterprise & Government</div>
            <h2 className="font-['Syne'] text-[32px] font-bold tracking-tight leading-tight mb-4">
              기관·금융사를 위한<br />데이터 파트너십
            </h2>
            <p className="text-[14px] text-gray-400 leading-relaxed mb-7">
              생존이 수집·분석한 소상공인 위험 데이터를 보증기관, 지자체, 금융기관에 API로 제공합니다.<br />
              <span className="text-gray-200">기보·신보·소진공·경기도청</span>의 정책 설계를 돕습니다.
            </p>
            <button className="px-5 py-2.5 border border-green-500/40 text-green-400 hover:bg-green-500/10 rounded-lg text-[13px] transition-all">
              파트너십 문의 →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label:'기보·신보', desc:'보증 심사 리스크 보조지표', icon:'🏦' },
              { label:'소진공', desc:'사전 경영 위기 알림 연계', icon:'🏢' },
              { label:'경기도청', desc:'소상공인 정책 타겟팅', icon:'🏛️' },
              { label:'지역 금융', desc:'대출 리스크 사전 감지', icon:'💳' },
            ].map(p => (
              <div key={p.label} className="bg-[#10141c] border border-white/[0.07] rounded-xl p-5 hover:border-green-500/20 transition-all">
                <div className="text-2xl mb-2">{p.icon}</div>
                <div className="font-semibold text-[13px] mb-1">{p.label}</div>
                <div className="text-[11px] text-gray-500">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="px-10 py-20 text-center border-t border-white/[0.05]">
        <h2 className="font-['Syne'] text-[42px] font-extrabold tracking-tight mb-3">
          지금 바로 진단해보세요
        </h2>
        <p className="text-[14px] text-gray-500 mb-8">무료 · 1분 이내 · 사업자번호만 있으면 OK</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-10 py-4 bg-green-500 hover:bg-green-600 text-white text-[15px] font-semibold rounded-xl transition-all shadow-lg shadow-green-500/20 hover:-translate-y-0.5"
        >
          무료로 진단받기 →
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] px-10 py-7 flex justify-between items-center">
        <div>
          <span className="font-['Syne'] font-bold text-white">생존</span>
          <span className="font-mono text-[10px] text-gray-600 ml-2">by HelperLab</span>
        </div>
        <div className="text-[12px] text-gray-600">© 2026 HelperLab. 경기도 소상공인 AI 폐업예측 플랫폼</div>
      </footer>
    </div>
  )
}