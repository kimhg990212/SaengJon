// Role: 사업자 폐업 위험 진단 페이지 - 상호명 검색 + 사업자번호 입력 → 국세청 실시간 조회
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import ThemeToggle from '../components/ThemeToggle'
import { fetchBusinessStatus, searchStore } from '../api/businessApi'

function formatBizNo(value) {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`
}

function getStatusBadge(b_stt) {
  if (b_stt === '계속사업자') return { label: b_stt, cls: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30' }
  if (b_stt === '휴업자')    return { label: b_stt, cls: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30' }
  if (b_stt === '폐업자')    return { label: b_stt, cls: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30' }
  return { label: b_stt || '확인불가', cls: 'bg-gray-500/10 text-gray-500 border-gray-500/30' }
}

export default function Diagnose() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [showConfirm, setShowConfirm] = useState(false)

  const [bizNo, setBizNo]                   = useState('')
  const [storeName, setStoreName]           = useState('')
  const [searchResults, setSearchResults]   = useState([])
  const [selectedStore, setSelectedStore]   = useState(null)
  const [ntsResult, setNtsResult]           = useState(null)
  const [loading, setLoading]               = useState(false)
  const [searching, setSearching]           = useState(false)
  const [error, setError]                   = useState('')

  const dropdownRef = useRef(null)
  const debounceRef = useRef(null)

  // 상호명 debounce 자동검색
  useEffect(() => {
    if (storeName.trim().length < 2) {
      setSearchResults([])
      return
    }
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setSearching(true)
      try {
        const results = await searchStore(storeName)
        setSearchResults(results)
      } catch {
        setSearchResults([])
      } finally {
        setSearching(false)
      }
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [storeName])

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    function onClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSearchResults([])
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function handleStoreNameChange(e) {
    setStoreName(e.target.value)
    if (selectedStore) setSelectedStore(null)
    setError('')
  }

  function handleSelectStore(item) {
    setSelectedStore(item)
    setStoreName(item.bizes_nm)
    setSearchResults([])
  }

  async function handleAnalyze() {
    setError('')
    const digits = bizNo.replace(/\D/g, '')
    if (digits.length < 10) {
      setError('사업자등록번호 10자리를 입력해주세요.')
      return
    }
    if (!storeName.trim()) {
      setError('상호명을 입력해주세요.')
      return
    }
    setLoading(true)
    try {
      const result = await fetchBusinessStatus(digits)
      setNtsResult(result)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setBizNo('')
    setStoreName('')
    setSearchResults([])
    setSelectedStore(null)
    setNtsResult(null)
    setError('')
  }

  const hasResult = ntsResult !== null

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
        {!hasResult && (
          <div className="flex flex-col items-center text-center pt-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 text-[11px] font-mono mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              서울 · 경기 소상공인 폐업위험 진단
            </div>
            <h1 className="font-['Syne'] text-[48px] font-extrabold tracking-tight leading-tight mb-4">
              폐업 위험을<br />지금 바로 진단하세요
            </h1>
            <p className="text-[15px] text-gray-500 dark:text-gray-400 mb-12">
              상호명과 사업자등록번호를 입력하면 국세청에서 즉시 상태를 확인합니다.
            </p>

            <div className="w-full max-w-md text-left">

              {/* 사업자등록번호 */}
              <div className="mb-4">
                <label className="block text-[12px] text-gray-500 mb-1.5 font-mono tracking-wide">사업자등록번호</label>
                <input
                  type="text"
                  value={bizNo}
                  onChange={e => { setBizNo(formatBizNo(e.target.value)); setError('') }}
                  placeholder="000-00-00000"
                  className="w-full px-5 py-4 text-[18px] font-mono border-2 border-black/[0.1] dark:border-white/[0.1] rounded-2xl bg-white dark:bg-[#10141c] text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-700 focus:outline-none focus:border-green-500 dark:focus:border-green-500 transition-colors text-center tracking-widest"
                  onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
                />
              </div>

              {/* 상호명 + 드롭다운 */}
              <div className="mb-6 relative" ref={dropdownRef}>
                <label className="block text-[12px] text-gray-500 mb-1.5 font-mono tracking-wide">
                  상호명
                  {selectedStore && (
                    <span className="ml-2 text-green-500 dark:text-green-400">✓ 선택됨</span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={storeName}
                    onChange={handleStoreNameChange}
                    placeholder="2글자 이상 입력하면 자동 검색"
                    className="w-full px-5 py-4 text-[15px] border-2 border-black/[0.1] dark:border-white/[0.1] rounded-2xl bg-white dark:bg-[#10141c] text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-700 focus:outline-none focus:border-green-500 dark:focus:border-green-500 transition-colors"
                    onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
                  />
                  {searching && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
                  )}
                </div>

                {/* 드롭다운 */}
                {searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white dark:bg-[#10141c] border border-green-500/30 rounded-xl shadow-2xl overflow-hidden">
                    {searchResults.map(item => (
                      <button
                        key={item.bizes_id}
                        onMouseDown={e => { e.preventDefault(); handleSelectStore(item) }}
                        className="w-full px-4 py-3 text-left hover:bg-green-500/5 transition-colors border-b border-black/[0.04] dark:border-white/[0.04] last:border-0"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-semibold text-[14px] text-gray-900 dark:text-white truncate">
                            {item.bizes_nm}
                            {item.branch_nm && (
                              <span className="font-normal text-gray-400 ml-1.5">({item.branch_nm})</span>
                            )}
                          </span>
                          <span className="text-[11px] text-gray-400 font-mono whitespace-nowrap shrink-0">{item.indu_sclass_nm}</span>
                        </div>
                        <div className="text-[12px] text-gray-400 mt-0.5">
                          {item.sgg_nm}{item.admdong_nm ? ` · ${item.admdong_nm}` : ''}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 에러 */}
              {error && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[13px]">
                  {error}
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-2xl transition-all shadow-lg shadow-green-500/20 hover:-translate-y-0.5 disabled:shadow-none disabled:hover:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    국세청 조회 중...
                  </span>
                ) : '폐업위험 진단하기'}
              </button>
              <p className="text-[11px] text-gray-400 mt-4 text-center">국세청 실시간 연동 · 개인정보 미수집</p>
            </div>

            {/* 안내 카드 */}
            <div className="mt-16 grid grid-cols-3 gap-4 w-full max-w-2xl text-left">
              {[
                { num: '01', title: '상호명 검색', desc: '상호명을 입력하면 소진공 DB에서 자동으로 업체를 찾습니다' },
                { num: '02', title: '번호 입력', desc: '10자리 사업자등록번호를 입력하세요' },
                { num: '03', title: '즉시 조회', desc: '국세청에서 실시간으로 사업자 상태를 확인합니다' },
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

        {/* ── 결과 단계 ── */}
        {hasResult && (
          <div className="pt-4">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-2">진단 완료</div>
                <h2 className="font-['Syne'] text-[32px] font-extrabold tracking-tight">
                  {selectedStore?.bizes_nm || storeName}
                </h2>
                {selectedStore && (
                  <div className="text-[13px] text-gray-500 mt-1">
                    {selectedStore.sgg_nm}
                    {selectedStore.indu_lclass_nm && ` · ${selectedStore.indu_lclass_nm}`}
                    {` · ${ntsResult.b_no}`}
                  </div>
                )}
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-black/[0.1] dark:border-white/[0.1] rounded-lg text-[13px] text-gray-500 hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-colors whitespace-nowrap"
              >
                다시 진단
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* 사업체 정보 카드 */}
              <div className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-2xl p-7">
                <div className="font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-5">사업체 정보</div>
                {selectedStore ? (
                  <div className="space-y-4">
                    <div>
                      <div className="text-[11px] text-gray-400 mb-1">상호명</div>
                      <div className="font-['Syne'] text-[22px] font-bold leading-tight">
                        {selectedStore.bizes_nm}
                        {selectedStore.branch_nm && (
                          <span className="text-[14px] font-normal text-gray-400 ml-2">({selectedStore.branch_nm})</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 mb-1">업종</div>
                      <div className="text-[13px]">
                        <span>{selectedStore.indu_lclass_nm}</span>
                        {selectedStore.indu_sclass_nm && (
                          <span className="text-gray-500"> › {selectedStore.indu_sclass_nm}</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 mb-1">주소</div>
                      <div className="text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed">
                        {selectedStore.road_addr || '정보 없음'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 mb-1">위치</div>
                      <div className="text-[13px]">
                        {selectedStore.sgg_nm}
                        {selectedStore.admdong_nm && (
                          <span className="text-gray-500"> · {selectedStore.admdong_nm}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-[13px] text-gray-400 leading-relaxed">
                    <p>상호명 검색 결과에서 업체를 선택하면</p>
                    <p>상세 정보를 확인할 수 있습니다.</p>
                  </div>
                )}
              </div>

              {/* 국세청 조회 결과 카드 */}
              <div className="bg-gray-50 dark:bg-[#10141c] border border-black/[0.06] dark:border-white/[0.07] rounded-2xl p-7">
                <div className="font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-5">국세청 조회 결과</div>
                {(() => {
                  const badge = getStatusBadge(ntsResult.b_stt)
                  return (
                    <div className="space-y-0">
                      <div className="flex items-center justify-between py-3.5 border-b border-black/[0.06] dark:border-white/[0.06]">
                        <span className="text-[12px] text-gray-400">영업상태</span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full border text-[12px] font-mono font-bold ${badge.cls}`}>
                          {badge.label}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3.5 border-b border-black/[0.06] dark:border-white/[0.06]">
                        <span className="text-[12px] text-gray-400">과세유형</span>
                        <span className="font-mono text-[13px]">{ntsResult.tax_type || '—'}</span>
                      </div>
                      <div className="flex items-center justify-between py-3.5 border-b border-black/[0.06] dark:border-white/[0.06]">
                        <span className="text-[12px] text-gray-400">사업자번호</span>
                        <span className="font-mono text-[13px]">{ntsResult.b_no}</span>
                      </div>
                      {ntsResult.end_dt && (
                        <div className="flex items-center justify-between py-3.5 border-b border-black/[0.06] dark:border-white/[0.06]">
                          <span className="text-[12px] text-gray-400">폐업일</span>
                          <span className="font-mono text-[13px] text-red-500 dark:text-red-400">{ntsResult.end_dt}</span>
                        </div>
                      )}
                      <div className="pt-3.5">
                        <span className="text-[10px] text-gray-400 font-mono">
                          {ntsResult.cached ? '캐시된 데이터 (24시간 이내 조회)' : '국세청 실시간 조회'}
                        </span>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>

            {/* 하단 액션 */}
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3.5 bg-green-500 hover:bg-green-600 text-white text-[14px] font-semibold rounded-xl transition-all"
              >
                다른 업체 진단하기
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3.5 border border-black/[0.1] dark:border-white/[0.1] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.05] text-[14px] rounded-xl transition-all"
              >
                메인으로
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
