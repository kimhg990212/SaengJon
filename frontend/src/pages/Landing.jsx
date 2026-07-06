// Role: 메인 랜딩 페이지 - 다크/라이트 테마 대응 Hero + Features + How it works
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import ThemeToggle from '../components/ThemeToggle'
import ParticleBackground from '../components/ParticleBackground'
import DiagnosisSimulator from '../components/DiagnosisSimulator'

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3) }

function useCountUp(target, duration, startVal) {
  const [value, setValue] = useState(startVal)
  const rafRef = useRef(null)
  useEffect(() => {
    const startTime = performance.now()
    function tick(now) {
      const t = Math.min((now - startTime) / duration, 1)
      setValue(Math.round(startVal + (target - startVal) * easeOutCubic(t)))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])
  return value
}

function makeColors(isDark) {
  return {
    page:          isDark ? '#070d07'                                                          : '#f6faf6',
    text:          isDark ? '#e2e8f0'                                                          : '#0a1209',
    textSub:       isDark ? 'rgba(255,255,255,0.45)'                                           : 'rgba(0,0,0,0.55)',
    textMuted:     isDark ? 'rgba(255,255,255,0.35)'                                           : 'rgba(0,0,0,0.45)',
    textFaint:     isDark ? 'rgba(255,255,255,0.25)'                                           : 'rgba(0,0,0,0.3)',
    textVfaint:    isDark ? 'rgba(255,255,255,0.2)'                                            : 'rgba(0,0,0,0.25)',
    accent:        isDark ? '#22c55e'                                                          : '#16a34a',
    accentHl:      isDark ? '#4ade80'                                                          : '#15803d',
    divider:       isDark ? 'rgba(255,255,255,0.07)'                                           : 'rgba(0,0,0,0.1)',
    sectionBorder: isDark ? 'rgba(255,255,255,0.05)'                                           : 'rgba(0,0,0,0.07)',
    cardBg:        isDark ? 'rgba(255,255,255,0.03)'                                           : 'rgba(0,0,0,0.025)',
    cardBorder:    isDark ? 'rgba(255,255,255,0.07)'                                           : 'rgba(0,0,0,0.09)',
    navBg:         isDark ? 'rgba(7,13,7,0.85)'                                               : 'rgba(246,250,246,0.9)',
    navBorder:     isDark ? 'rgba(34,197,94,0.08)'                                             : 'rgba(0,0,0,0.08)',
    gridLine:      isDark ? 'rgba(34,197,94,0.05)'                                             : 'rgba(34,197,94,0.07)',
    badgeBg:       isDark ? 'rgba(34,197,94,0.06)'                                             : 'rgba(34,197,94,0.08)',
    badgeBorder:   isDark ? 'rgba(34,197,94,0.35)'                                             : 'rgba(34,197,94,0.45)',
    ctaBg:         isDark ? '#22c55e'                                                          : '#16a34a',
    ctaText:       isDark ? '#052e16'                                                          : '#fff',
    ctaShadow:     isDark ? '0 8px 24px rgba(34,197,94,0.25)'                                 : '0 8px 24px rgba(22,163,74,0.2)',
    ghostText:     isDark ? 'rgba(255,255,255,0.65)'                                           : 'rgba(0,0,0,0.6)',
    ghostBorder:   isDark ? 'rgba(255,255,255,0.15)'                                           : 'rgba(0,0,0,0.2)',
    footer:        isDark ? 'rgba(255,255,255,0.2)'                                            : 'rgba(0,0,0,0.3)',
    vignette:      isDark ? 'radial-gradient(ellipse at center, transparent 35%, rgba(7,13,7,0.85) 100%)'
                          : 'radial-gradient(ellipse at center, transparent 35%, rgba(246,250,246,0.85) 100%)',
    modal:         isDark ? '#10141c'                                                          : '#ffffff',
    modalBorder:   isDark ? 'rgba(255,255,255,0.1)'                                            : 'rgba(0,0,0,0.1)',
    modalTitle:    isDark ? '#fff'                                                             : '#0a1209',
    modalSub:      isDark ? 'rgba(255,255,255,0.4)'                                            : 'rgba(0,0,0,0.45)',
    modalCancel:   isDark ? 'rgba(255,255,255,0.15)'                                           : 'rgba(0,0,0,0.15)',
    modalCancelT:  isDark ? 'rgba(255,255,255,0.5)'                                            : 'rgba(0,0,0,0.5)',
    tagText:       isDark ? '#4ade80'                                                          : '#15803d',
    tagBorder:     isDark ? 'rgba(34,197,94,0.3)'                                             : 'rgba(22,163,74,0.4)',
  }
}

export default function Landing() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [showConfirm, setShowConfirm] = useState(false)

  const isDark = theme === 'dark'
  const c = makeColors(isDark)

  const count1 = useCountUp(124500, 1600, Math.round(124500 * 0.82))
  const count2 = useCountUp(84,     1200, Math.round(84 * 0.82))
  const count3 = useCountUp(8,       800, 7)

  const transition = 'background 0.25s, color 0.25s, border-color 0.25s'

  return (
    <div style={{ background: c.page, fontFamily: 'Roboto Mono, monospace', color: c.text, minHeight: '100vh', transition }}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ParticleBackground theme={theme} />

        {/* 그리드 배경 */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: `linear-gradient(${c.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${c.gridLine} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />

        {/* Vignette */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: c.vignette }} />

        {/* Nav */}
        <nav style={{
          position: 'relative', zIndex: 10,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 40px',
          borderBottom: `1px solid ${c.navBorder}`,
          backdropFilter: 'blur(12px)',
          background: c.navBg,
          transition,
        }}>
          <div style={{ cursor: 'pointer' }} onClick={() => setShowConfirm(true)}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, color: c.text, letterSpacing: -0.5, transition }}>생존</span>
            <span style={{ fontSize: 10, color: c.textFaint, marginLeft: 8, transition }}>SAENGJEON</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span onClick={() => navigate('/service')} style={{ fontSize: 13, color: c.textMuted, cursor: 'pointer', transition }}>서비스 소개</span>
            <span style={{ fontSize: 13, color: c.textMuted, cursor: 'pointer', transition }}>데이터 파트너</span>
            <span style={{ fontSize: 13, color: c.textMuted, cursor: 'pointer', transition }}>요금제</span>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </nav>

        {/* Hero 컨텐츠 */}
        <div style={{
          position: 'relative', zIndex: 10, flex: 1,
          display: 'flex', alignItems: 'center',
          padding: '60px 40px', maxWidth: 1400, margin: '0 auto', width: '100%',
          gap: 64, boxSizing: 'border-box',
        }} className="hero-content">

          {/* 좌측 */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Live 뱃지 */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '5px 14px', borderRadius: 100,
              border: `1px solid ${c.badgeBorder}`, background: c.badgeBg, marginBottom: 28,
              transition,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.accent, animation: 'liveblink 1.2s ease-in-out infinite' }} />
              <span style={{ fontSize: 11, color: c.accentHl, letterSpacing: 1, transition }}>LIVE · 경기도 소상공인 AI 진단</span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(36px, 4vw, 58px)', lineHeight: 1.1,
              letterSpacing: -2, marginBottom: 24, color: c.text, transition,
            }}>
              폐업 <span style={{ color: c.accent, fontFamily: 'Roboto Mono, monospace', fontWeight: 300, letterSpacing: -1, transition }}>6개월 전</span>,<br />
              신호는 이미<br />
              데이터에 있다
            </h1>

            {/* 부제 */}
            <p style={{ fontSize: 14, color: c.textSub, lineHeight: 1.9, marginBottom: 36, transition }}>
              사업자등록번호 입력 하나로<br />
              국세청 · 카드매출 · 유동인구 · 상권정보<br />
              8개 공공데이터를 AI가 즉시 분석합니다
            </p>

            {/* 통계 */}
            <div style={{ display: 'flex', gap: 28, marginBottom: 40, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 26, fontWeight: 300, color: c.accent, lineHeight: 1, transition }}>
                  {count1.toLocaleString()}<span style={{ fontSize: 14 }}>개</span>
                </div>
                <div style={{ fontSize: 11, color: c.textMuted, marginTop: 5, transition }}>경기도 분석 사업체</div>
              </div>
              <div style={{ width: 1, background: c.divider, transition }} />
              <div>
                <div style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 26, fontWeight: 300, color: c.accent, lineHeight: 1, transition }}>
                  {count2}<span style={{ fontSize: 14 }}>%</span>
                </div>
                <div style={{ fontSize: 11, color: c.textMuted, marginTop: 5, transition }}>6개월 전 예측 정확도</div>
              </div>
              <div style={{ width: 1, background: c.divider, transition }} />
              <div>
                <div style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 26, fontWeight: 300, color: c.accent, lineHeight: 1, transition }}>
                  {count3}<span style={{ fontSize: 14 }}>개</span>
                </div>
                <div style={{ fontSize: 11, color: c.textMuted, marginTop: 5, transition }}>활용 공공데이터</div>
              </div>
            </div>

            {/* CTA 버튼 */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/diagnose')}
                style={{
                  padding: '13px 28px', borderRadius: 12,
                  background: c.ctaBg, color: c.ctaText,
                  fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer',
                  fontFamily: 'Roboto Mono, monospace', boxShadow: c.ctaShadow, transition,
                }}
              >
                무료 진단 시작하기
              </button>
              <button
                onClick={() => navigate('/service')}
                style={{
                  padding: '13px 28px', borderRadius: 12,
                  background: 'transparent', color: c.ghostText,
                  fontSize: 14, border: `1px solid ${c.ghostBorder}`,
                  cursor: 'pointer', fontFamily: 'Roboto Mono, monospace', transition,
                }}
              >
                서비스 소개 ↓
              </button>
            </div>
          </div>

          {/* 우측 */}
          <div className="simulator-wrap">
            <DiagnosisSimulator />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: '80px 40px', borderTop: `1px solid ${c.sectionBorder}`, transition }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="features-grid">
            {[
              { icon: '🔍', title: '실시간 상태조회',     desc: '국세청 사업자등록 상태를 실시간으로 확인. 휴업·폐업 여부를 즉시 파악합니다.',       tag: '국세청 OpenAPI' },
              { icon: '📊', title: '8개 공공데이터 분석', desc: '카드매출·유동인구·임대료·상권정보 등 경기도 공공데이터를 통합 분석합니다.',         tag: '경기데이터드림' },
              { icon: '🤖', title: 'AI 위험도 스코어링', desc: '5년 폐업 이력 학습 기반 AI가 6개월 후 폐업 위험을 0~100점으로 진단합니다.', tag: 'HelperLab AI' },
            ].map(f => (
              <div key={f.title} style={{
                background: c.cardBg, border: `1px solid ${c.cardBorder}`,
                borderRadius: 16, padding: 28, transition,
              }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 700, color: c.text, marginBottom: 10, transition }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: c.textSub, lineHeight: 1.75, marginBottom: 16, transition }}>{f.desc}</p>
                <span style={{ fontSize: 10, color: c.tagText, border: `1px solid ${c.tagBorder}`, borderRadius: 100, padding: '3px 10px', transition }}>{f.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ padding: '80px 40px', borderTop: `1px solid ${c.sectionBorder}`, transition }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 34, fontWeight: 800, color: c.text, textAlign: 'center', marginBottom: 48, transition }}>
            어떻게 작동하나요?
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="steps-row">
            {[
              { num: '01', title: '사업자등록번호 입력', desc: '10자리 번호만 입력하면 끝' },
              { num: '02', title: 'AI 자동 분석',        desc: '8개 공공데이터 실시간 수집 및 패턴 분석' },
              { num: '03', title: '위험도 리포트',        desc: '6개월 전 폐업 신호를 0~100 점수로 즉시 확인' },
            ].map((s, i) => (
              <React.Fragment key={s.num}>
                <div style={{
                  flex: 1, background: c.cardBg, border: `1px solid ${c.cardBorder}`,
                  borderRadius: 16, padding: '28px 24px', textAlign: 'center', transition,
                }}>
                  <div style={{ fontSize: 11, color: c.textFaint, letterSpacing: 2, marginBottom: 12, transition }}>{s.num}</div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 700, color: c.text, marginBottom: 8, transition }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: c.textSub, lineHeight: 1.7, transition }}>{s.desc}</div>
                </div>
                {i < 2 && <div style={{ fontSize: 20, color: c.accent, flexShrink: 0, transition }}>→</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ padding: '24px 40px', borderTop: `1px solid ${c.sectionBorder}`, textAlign: 'center', transition }}>
        <div style={{ fontSize: 12, color: c.footer, transition }}>
          © 2026 HelperLab · 생존(SaengJon) · 경기도 소상공인 AI 진단 서비스
        </div>
      </footer>

      {/* 처음화면 확인 다이얼로그 */}
      {showConfirm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            background: c.modal, borderRadius: 16, padding: 32,
            border: `1px solid ${c.modalBorder}`, maxWidth: 360, width: '90%', transition,
          }}>
            <div style={{ fontSize: 24, textAlign: 'center', marginBottom: 12 }}>🏠</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, textAlign: 'center', marginBottom: 8, color: c.modalTitle, transition }}>
              처음 화면으로 돌아가시겠습니까?
            </h3>
            <p style={{ fontSize: 13, color: c.modalSub, textAlign: 'center', marginBottom: 24, transition }}>메인 페이지로 이동합니다.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => { setShowConfirm(false); navigate('/') }}
                style={{ flex: 1, padding: 10, background: c.ctaBg, color: c.ctaText, border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 700, transition }}
              >확인</button>
              <button
                onClick={() => setShowConfirm(false)}
                style={{ flex: 1, padding: 10, background: 'transparent', color: c.modalCancelT, border: `1px solid ${c.modalCancel}`, borderRadius: 10, cursor: 'pointer', fontSize: 14, transition }}
              >취소</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes liveblink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @media (max-width: 768px) {
          .hero-content   { flex-direction: column !important; padding: 32px 20px !important; }
          .simulator-wrap { width: 100% !important; }
          .simulator-wrap > div { width: 100% !important; box-sizing: border-box; }
          .features-grid  { grid-template-columns: 1fr !important; }
          .steps-row      { flex-direction: column !important; }
        }
      `}</style>
    </div>
  )
}
