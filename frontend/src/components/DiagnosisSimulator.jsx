// Role: 4개 시나리오 자동순환 진단 카드 - 게이지/스파크라인/메트릭/스캔라인 애니메이션
import { useState, useEffect, useRef } from 'react'

const SCENARIOS = [
  { biz: '수원 갈비집',        bno: '124-81-183XXX · 수원시 영통구',    score: 72, bad: true,
    m1: ['▼ -28%', 'red'],   m2: ['▼ -19%', 'red'],   m3: ['높음', 'yellow'],    m4: ['위험', 'red'],
    chart: [100, 98, 95, 91, 85, 79, 72, 68] },
  { biz: '비전동 스터디카페',   bno: '220-81-624XXX · 평택시 비전동',   score: 28, bad: false,
    m1: ['▲ +14%', 'green'], m2: ['▲ +9%', 'green'],  m3: ['보통', 'yellow'],    m4: ['안정', 'green'],
    chart: [60, 62, 65, 63, 68, 70, 72, 71] },
  { biz: '안양 네일샵',         bno: '138-12-445XXX · 안양시 만안구',   score: 91, bad: true,
    m1: ['▼ -44%', 'red'],   m2: ['▼ -31%', 'red'],   m3: ['매우높음', 'red'],   m4: ['심각', 'red'],
    chart: [90, 85, 78, 70, 62, 54, 45, 40] },
  { biz: '고양 스시집',         bno: '176-23-591XXX · 고양시 일산동구', score: 45, bad: false,
    m1: ['▼ -8%', 'yellow'], m2: ['▲ +3%', 'green'],  m3: ['보통', 'yellow'],    m4: ['주의', 'yellow'],
    chart: [55, 54, 56, 52, 50, 48, 50, 51] },
]

const MESSAGES = [
  '국세청 상태 조회 중...',
  '카드매출 데이터 분석 중...',
  '유동인구 패턴 로딩...',
  '상권 경쟁도 산출 중...',
  'AI 스코어링 중...',
  '진단 완료 ✓',
]

const COLOR = { red: '#ef4444', green: '#22c55e', yellow: '#eab308' }

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3) }

function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a})`
}

function drawSparkline(canvas, data, color) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const W = canvas.width
  const H = canvas.height
  ctx.clearRect(0, 0, W, H)

  const min = Math.min(...data) - 5
  const max = Math.max(...data) + 5
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / (max - min)) * H * 0.9 - H * 0.05,
  }))

  // gradient fill
  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2
    const my = (pts[i].y + pts[i + 1].y) / 2
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my)
  }
  ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y)
  ctx.lineTo(W, H)
  ctx.lineTo(0, H)
  ctx.closePath()
  const grad = ctx.createLinearGradient(0, 0, 0, H)
  grad.addColorStop(0, hexToRgba(color, 0.25))
  grad.addColorStop(1, hexToRgba(color, 0))
  ctx.fillStyle = grad
  ctx.fill()

  // line
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = 1.5
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2
    const my = (pts[i].y + pts[i + 1].y) / 2
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my)
  }
  ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y)
  ctx.stroke()
}

function makeSimColors(isDark) {
  return {
    cardBg:      isDark ? '#0a1209'                      : '#ffffff',
    cardBorder:  isDark ? 'rgba(34,197,94,0.2)'          : 'rgba(34,197,94,0.25)',
    bizName:     isDark ? '#e2e8f0'                      : '#0a1209',
    bizNo:       isDark ? 'rgba(255,255,255,0.35)'       : 'rgba(0,0,0,0.45)',
    badgeBadBg:  isDark ? 'rgba(239,68,68,0.12)'        : 'rgba(239,68,68,0.08)',
    badgeBadBd:  isDark ? 'rgba(239,68,68,0.3)'         : 'rgba(239,68,68,0.25)',
    badgeBadTxt: isDark ? '#f87171'                      : '#dc2626',
    badgeOkBg:   isDark ? 'rgba(34,197,94,0.12)'        : 'rgba(34,197,94,0.08)',
    badgeOkBd:   isDark ? 'rgba(34,197,94,0.3)'         : 'rgba(34,197,94,0.25)',
    badgeOkTxt:  isDark ? '#4ade80'                      : '#16a34a',
    gaugeLabel:  isDark ? 'rgba(255,255,255,0.35)'       : 'rgba(0,0,0,0.45)',
    gaugeTrack:  isDark ? 'rgba(255,255,255,0.07)'       : 'rgba(0,0,0,0.08)',
    gaugeHint:   isDark ? 'rgba(255,255,255,0.2)'        : 'rgba(0,0,0,0.25)',
    metricBg:    isDark ? 'rgba(255,255,255,0.04)'       : 'rgba(0,0,0,0.04)',
    metricLabel: isDark ? 'rgba(255,255,255,0.3)'        : 'rgba(0,0,0,0.4)',
    msgText:     isDark ? 'rgba(255,255,255,0.4)'        : 'rgba(0,0,0,0.45)',
    msgDone:     isDark ? '#4ade80'                      : '#16a34a',
  }
}

export default function DiagnosisSimulator({ theme = 'dark' }) {
  const isDark = theme === 'dark'
  const c = makeSimColors(isDark)

  const [scIdx, setScIdx]         = useState(0)
  const [msgIdx, setMsgIdx]       = useState(0)
  const [done, setDone]           = useState(false)
  const [displayScore, setDisplayScore] = useState(0)
  const sparkRef   = useRef(null)
  const timerRef   = useRef(null)
  const scoreRafRef = useRef(null)

  const sc = SCENARIOS[scIdx]
  const gaugeColor = sc.bad ? '#ef4444' : '#22c55e'

  // 시나리오 전환 시 모든 애니메이션 재시작
  useEffect(() => {
    setMsgIdx(0)
    setDone(false)
    setDisplayScore(0)

    // 스코어 애니메이션
    const target = sc.score
    const startTime = performance.now()
    function tickScore(now) {
      const t = Math.min((now - startTime) / 1400, 1)
      setDisplayScore(Math.round(target * easeOutCubic(t)))
      if (t < 1) scoreRafRef.current = requestAnimationFrame(tickScore)
    }
    scoreRafRef.current = requestAnimationFrame(tickScore)

    // 메시지 시퀀스
    let step = 0
    function nextMsg() {
      step++
      setMsgIdx(step)
      if (step === MESSAGES.length - 1) {
        setDone(true)
        timerRef.current = setTimeout(() => {
          setScIdx(prev => (prev + 1) % SCENARIOS.length)
        }, 3200)
      } else {
        timerRef.current = setTimeout(nextMsg, 550)
      }
    }
    timerRef.current = setTimeout(nextMsg, 550)

    return () => {
      clearTimeout(timerRef.current)
      cancelAnimationFrame(scoreRafRef.current)
    }
  }, [scIdx])

  // 스파크라인 캔버스 갱신
  useEffect(() => {
    drawSparkline(sparkRef.current, sc.chart, sc.bad ? '#ef4444' : '#22c55e')
  }, [scIdx])

  const metrics = [
    { label: '월 매출 변화', val: sc.m1[0], color: COLOR[sc.m1[1]] },
    { label: '유동인구',     val: sc.m2[0], color: COLOR[sc.m2[1]] },
    { label: '동종업 경쟁', val: sc.m3[0], color: COLOR[sc.m3[1]] },
    { label: '임대료 압박', val: sc.m4[0], color: COLOR[sc.m4[1]] },
  ]

  return (
    <div style={{
      background: c.cardBg,
      border: `1px solid ${c.cardBorder}`,
      borderRadius: 10,
      padding: 24,
      width: 480,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Roboto Mono, monospace',
      flexShrink: 0,
      transition: 'background 0.25s, border-color 0.25s',
    }}>
      {/* Scan line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2, zIndex: 20, pointerEvents: 'none',
        background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)',
        animation: 'scanline 3s linear infinite',
      }} />

      {/* 헤더 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 19, color: c.bizName, marginBottom: 4 }}>{sc.biz}</div>
          <div style={{ fontSize: 12, color: c.bizNo, letterSpacing: 0.3 }}>{sc.bno}</div>
        </div>
        <div style={{
          padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, whiteSpace: 'nowrap',
          background: sc.bad ? c.badgeBadBg : c.badgeOkBg,
          border: `1px solid ${sc.bad ? c.badgeBadBd : c.badgeOkBd}`,
          color: sc.bad ? c.badgeBadTxt : c.badgeOkTxt,
        }}>
          {sc.bad ? '위험감지' : '계속사업자'}
        </div>
      </div>

      {/* 게이지 */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: c.gaugeLabel, letterSpacing: 1, textTransform: 'uppercase' }}>폐업 위험도</span>
          <span style={{ fontSize: 40, fontWeight: 300, color: gaugeColor, lineHeight: 1 }}>{displayScore}</span>
        </div>
        <div style={{ height: 7, background: c.gaugeTrack, borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 4,
            background: `linear-gradient(90deg, #22c55e, ${gaugeColor})`,
            width: `${displayScore}%`,
            transition: 'width 0.05s linear',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: c.gaugeHint, marginTop: 4 }}>
          <span>안전 0</span><span>50</span><span>100 위험</span>
        </div>
      </div>

      {/* 스파크라인 */}
      <canvas
        ref={sparkRef}
        width={432} height={80}
        style={{ width: '100%', height: 80, display: 'block', marginBottom: 18 }}
      />

      {/* 메트릭 2×2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
        {metrics.map(m => (
          <div key={m.label} style={{ background: c.metricBg, borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontSize: 10, color: c.metricLabel, marginBottom: 4, letterSpacing: 0.3 }}>{m.label}</div>
            <div style={{ fontSize: 16, fontWeight: 500, color: m.color }}>{m.val}</div>
          </div>
        ))}
      </div>

      {/* 분석 메시지 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: c.msgText }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
          background: '#22c55e',
          boxShadow: done ? '0 0 8px #22c55e' : 'none',
          animation: done ? 'none' : 'blink 0.8s ease-in-out infinite',
        }} />
        <span style={{ color: done ? c.msgDone : c.msgText }}>{MESSAGES[msgIdx]}</span>
      </div>

      <style>{`
        @keyframes scanline {
          0%   { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.15; }
        }
      `}</style>
    </div>
  )
}
