import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Heart, Star, Sparkles } from 'lucide-react'
import { useCountdown } from '../hooks/useCountdown.js'

const TITLE = 'Hearts2Hearts'

const STAR_SEEDS = [
  [6,12,1],[14,7,1.3],[22,18,.8],[31,9,1.1],[42,5,1.4],[55,12,.9],[66,7,1.2],
  [78,15,1],[88,9,1.3],[94,22,.8],[3,32,1.1],[19,42,.9],[36,38,1.3],[48,46,.8],
  [62,40,1],[74,48,1.2],[85,44,.9],[91,38,1.1],[8,58,.8],[22,68,1],[40,72,.9],
  [58,68,1.2],[72,76,.8],[86,72,1.1],[12,82,1],[30,88,.9],[48,84,1.1],[66,90,.8],[80,86,1.2],
]

const HERO_PHOTOS = [
  '/images/hero/h2h-rude-concept-01.jpg',
  '/images/hero/h2h-rude-concept-02.jpg',
  '/images/hero/h2h-rude-concept-03.jpg',
  '/images/hero/h2h-rude-concept-04.jpg',
]

function Cloud({ size = 200, color, opacity = 1, style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 200 120" fill="none"
      style={{ display: 'block', ...style }} aria-hidden="true">
      <ellipse cx="100" cy="90" rx="95" ry="45" fill={color} fillOpacity={opacity} />
      <ellipse cx="65"  cy="70" rx="50" ry="42" fill={color} fillOpacity={opacity} />
      <ellipse cx="130" cy="65" rx="55" ry="45" fill={color} fillOpacity={opacity} />
      <ellipse cx="100" cy="55" rx="42" ry="38" fill={color} fillOpacity={opacity} />
    </svg>
  )
}

export function Hero({ dark }) {
  const [mounted, setMounted] = useState(false)
  const [heroPhoto] = useState(() => HERO_PHOTOS[Math.floor(Math.random() * HERO_PHOTOS.length)])
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t) }, [])

  const { days, hours, mins, secs, isPast } = useCountdown('2026-03-28T19:00:00+07:00')

  const stars = useMemo(() =>
    STAR_SEEDS.map(([l, t, s], i) => ({ l, t, s, d: (i * 0.13) % 1.6 }))
  , [])

  const p = dark ? {
    bgTop: '#0B1530', bgMid: '#15224A', bgBot: '#1F2E5E',
    text: '#F8FAFF', textSoft: 'rgba(248,250,255,.7)',
    accent: '#BFE3F2', chip: 'rgba(255,255,255,.10)',
    cloud: 'rgba(191,227,242,.18)', star: '#FFF6C9', heart: '#FFC1D0',
    border: 'rgba(255,255,255,.18)',
  } : {
    bgTop: '#E6F4FB', bgMid: '#CDE8F5', bgBot: '#FFF2F6',
    text: '#1A2B45', textSoft: 'rgba(26,43,69,.65)',
    accent: '#5AB3D9', chip: 'rgba(255,255,255,.7)',
    cloud: 'rgba(255,255,255,.85)', star: '#5AB3D9', heart: '#FF8AA8',
    border: 'rgba(26,43,69,.10)',
  }

  return (
    <section
      id="hero"
      aria-label="Hero section"
      style={{
        position: 'relative', width: '100%',
        minHeight: '100svh', overflow: 'hidden',
        background: `linear-gradient(180deg, ${p.bgTop} 0%, ${p.bgMid} 55%, ${p.bgBot} 100%)`,
        color: p.text,
        fontFamily: 'var(--ff-body)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Random concept photo background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1.2s ease .15s',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: -14,
          backgroundImage: `url(${heroPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: dark
            ? 'blur(3px) saturate(.95) brightness(.68)'
            : 'blur(3px) saturate(1.08) brightness(1.04)',
          transform: 'scale(1.015)',
          opacity: dark ? .82 : .9,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: dark
            ? 'linear-gradient(180deg, rgba(11,21,48,.34) 0%, rgba(21,34,74,.18) 46%, rgba(31,46,94,.5) 100%)'
            : 'linear-gradient(180deg, rgba(230,244,251,.2) 0%, rgba(255,252,247,.08) 46%, rgba(255,242,246,.34) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: dark
            ? 'radial-gradient(ellipse 70% 52% at 50% 42%, rgba(255,193,208,.16), transparent 68%)'
            : 'radial-gradient(ellipse 70% 52% at 50% 42%, rgba(255,255,255,.26), transparent 68%)',
        }} />
      </div>

      {/* Star field */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} aria-hidden="true">
        {stars.map((s, i) => (
          <Star key={i} size={6 + s.s * 4} color={p.star}
            style={{
              position: 'absolute', left: `${s.l}%`, top: `${s.t}%`,
              opacity: mounted ? .9 : 0,
              transition: `opacity 1.6s ease ${0.4 + s.d}s`,
              filter: `drop-shadow(0 0 6px ${p.star})`,
              animation: mounted ? `twinkle 3.${i % 9}s ease-in-out ${s.d}s infinite alternate` : 'none',
            }}
          />
        ))}
      </div>

      {/* Clouds */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', zIndex: 1, pointerEvents: 'none' }} aria-hidden="true">
        <Cloud size={420} color={p.cloud} opacity={.55} style={{ position: 'absolute', left: '-4%', bottom: '-8%', filter: 'blur(.4px)' }} />
        <Cloud size={520} color={p.cloud} opacity={.7}  style={{ position: 'absolute', right: '-6%', bottom: '-12%' }} />
        <Cloud size={300} color={p.cloud} opacity={.5}  style={{ position: 'absolute', left: '22%', bottom: '6%' }} />
        <Cloud size={240} color={p.cloud} opacity={.6}  style={{ position: 'absolute', right: '28%', bottom: '14%', filter: 'blur(.6px)' }} />
      </div>

      {/* Title block */}
      <div style={{
        position: 'relative', zIndex: 3,
        textAlign: 'center', padding: '0 clamp(24px, 5vw, 80px)',
        marginTop: '-8vh',
      }}>
        {/* Kicker chip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: .8, delay: .2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '6px 16px', borderRadius: 999,
            background: p.chip, border: `0.5px solid ${p.border}`,
            fontSize: 11, letterSpacing: '.24em', color: p.textSoft, marginBottom: 24,
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <Sparkles size={12} color={p.accent} />
          <span>OFFICIAL FAN HUB · 2025 ×</span>
          <Sparkles size={12} color={p.accent} />
        </motion.div>

        {/* Letter-by-letter title */}
        <h1 className="ff-display" style={{
          margin: 0, fontStyle: 'italic', fontWeight: 500,
          fontSize: 'clamp(52px, 9vw, 148px)', lineHeight: .95, letterSpacing: '-.01em',
          color: p.text,
        }}>
          {TITLE.split('').map((ch, i) => (
            <span key={i} style={{
              display: 'inline-block', whiteSpace: 'pre',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(28px)',
              transition: `opacity .6s ease ${0.05 + i * 0.06}s, transform .8s cubic-bezier(.2,.7,.3,1) ${0.05 + i * 0.06}s`,
            }}>{ch}</span>
          ))}
          <span style={{
            display: 'inline-block', verticalAlign: 'middle', marginLeft: 18,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'scale(1)' : 'scale(.5)',
            transition: `opacity .6s ease ${0.05 + TITLE.length * 0.06}s, transform .9s cubic-bezier(.34,1.56,.64,1) ${0.05 + TITLE.length * 0.06}s`,
          }}>
            <Heart size={48} color={p.heart} fill={p.heart}
              style={{ filter: `drop-shadow(0 6px 14px ${p.heart}66)` }} />
          </span>
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: .9, delay: 1.2 }}
          style={{ margin: '22px auto 0', maxWidth: 540, fontSize: 15, lineHeight: 1.7, color: p.textSoft }}
        >
          <span className="ff-display" style={{ fontStyle: 'italic', fontSize: 17, color: p.text }}>Connect Hearts, Beat as One</span>
          <br />
          來自 SM Entertainment · 八位女孩的夢幻組合 · 代表色 Sky Blue
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: .9, delay: 1.4 }}
          style={{ marginTop: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}
        >
          {/* Envelope-stamp CTA */}
          <LetterButton dark={dark} />

          <button
            onClick={() => document.querySelector('#discography')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              appearance: 'none', cursor: 'pointer',
              padding: '13px 22px', borderRadius: 999,
              background: 'transparent', color: p.text,
              fontSize: 13, fontWeight: 500, letterSpacing: '.04em',
              border: `0.5px solid ${p.border}`,
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'background .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(255,255,255,.07)' : 'rgba(26,43,69,.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{
              display: 'inline-flex', width: 22, height: 22, borderRadius: '50%',
              background: p.text, color: dark ? '#0B1530' : '#FFF',
              alignItems: 'center', justifyContent: 'center', fontSize: 9,
            }}>▶</span>
            收聽最新作品
          </button>
        </motion.div>
      </div>

      {/* Bottom info strip */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: .9, delay: 1.6 }}
        style={{
          position: 'absolute', left: 'clamp(24px, 4vw, 56px)', bottom: 36, zIndex: 5,
        }}
        aria-label="Next event countdown"
      >
        {isPast ? (
          <>
            <div style={{ fontSize: 10, letterSpacing: '.24em', color: p.textSoft, marginBottom: 8, fontFamily: 'var(--ff-mono)' }}>
              LAST EVENT · COMPLETED
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
              <span className="ff-display" style={{ fontStyle: 'italic', fontSize: 'clamp(18px, 2.2vw, 28px)', fontWeight: 500 }}>
                HEARTS 2 HOUSE
              </span>
              <span style={{
                fontSize: 10, padding: '2px 10px', borderRadius: 999,
                background: dark ? 'rgba(255,138,168,.15)' : '#FFE5EC',
                color: '#FF8AA8', fontFamily: 'var(--ff-mono)', letterSpacing: '.14em',
              }}>TOUR ENDED</span>
            </div>
            <div style={{ fontSize: 12, color: p.textSoft, marginTop: 6, fontFamily: 'var(--ff-mono)', letterSpacing: '.1em' }}>
              2026.02.21 – 03.28 · 韓國 · 美國 · 印尼
            </div>
            <div style={{ fontSize: 13, color: p.textSoft, marginTop: 8, fontStyle: 'italic' }}>
              感謝 S2U 讓第一次巡演圓滿落幕 🩵
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 10, letterSpacing: '.24em', color: p.textSoft, marginBottom: 8, fontFamily: 'var(--ff-mono)' }}>
              NEXT EVENT · COUNTDOWN
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
              <span className="ff-display" style={{ fontStyle: 'italic', fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 500 }}>
                HEARTS 2 HOUSE
              </span>
              <span style={{ fontSize: 12, color: p.textSoft }}>Jakarta · Indonesia</span>
            </div>
            <div style={{ display: 'flex', gap: 18, marginTop: 10, fontFamily: 'var(--ff-mono)' }}>
              {[[days, 'DAYS'], [hours, 'HRS'], [mins, 'MIN'], [secs, 'SEC']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 500, color: p.text }}>{n}</div>
                  <div style={{ fontSize: 9, letterSpacing: '.2em', color: p.textSoft }}>{l}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: .9, delay: 1.8 }}
        style={{
          position: 'absolute', right: 'clamp(24px, 4vw, 56px)', bottom: 36, zIndex: 5,
          fontSize: 11, color: p.textSoft, display: 'flex', alignItems: 'center', gap: 10,
        }}
        aria-hidden="true"
      >
        <span className="ff-mono" style={{ letterSpacing: '.18em' }}>SCROLL</span>
        <span style={{
          display: 'inline-block', width: 1, height: 32,
          background: p.border, position: 'relative', overflow: 'hidden',
        }}>
          <span style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 14,
            background: p.text, animation: 'scrollDot 2.4s ease-in-out infinite',
          }} />
        </span>
      </motion.div>
    </section>
  )
}

function LetterButton({ dark }) {
  const [hovered, setHovered] = useState(false)
  const shadow = dark ? '#5AB3D9' : '#1A2B45'

  return (
    <button
      onClick={() => document.querySelector('#members')?.scrollIntoView({ behavior: 'smooth' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="前往成員介紹"
      style={{
        appearance: 'none', border: 'none', cursor: 'pointer', position: 'relative',
        padding: '16px 30px 16px 56px',
        background: dark ? '#F8FAFF' : '#FFFCF7', color: '#1A2B45',
        fontFamily: 'var(--ff-display)', fontStyle: 'italic', fontWeight: 600, fontSize: 16,
        boxShadow: hovered
          ? `6px 7px 0 0 ${shadow}, 0 18px 38px rgba(26,43,69,.28)`
          : `4px 5px 0 0 ${shadow}, 0 14px 32px rgba(26,43,69,.22)`,
        clipPath: 'polygon(0 0, 4% 8%, 9% 0, 14% 8%, 19% 0, 24% 8%, 29% 0, 34% 8%, 39% 0, 44% 8%, 49% 0, 54% 8%, 59% 0, 64% 8%, 69% 0, 74% 8%, 79% 0, 84% 8%, 89% 0, 94% 8%, 100% 0, 100% 100%, 0 100%)',
        transform: hovered ? 'translate(-2px,-2px)' : 'translate(0,0)',
        transition: 'transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s',
      }}
    >
      {/* Wax seal */}
      <span style={{
        position: 'absolute', left: 14, top: '58%',
        transform: hovered ? 'translateY(-50%) rotate(-12deg) scale(1.08)' : 'translateY(-50%) rotate(-8deg) scale(1)',
        width: 32, height: 32, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 30%, #FFB0C4 0%, #FF6F8E 55%, #C73B5C 100%)',
        boxShadow: 'inset 0 -2px 4px rgba(0,0,0,.25), inset 0 2px 3px rgba(255,255,255,.4), 0 2px 4px rgba(0,0,0,.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform .3s cubic-bezier(.34,1.56,.64,1)',
      }}>
        <Heart size={16} color="rgba(255,255,255,.85)" fill="rgba(255,255,255,.85)" />
      </span>
      <span style={{ position: 'relative' }}>
        認識成員
        <span className="ff-mono" style={{
          fontStyle: 'normal', fontSize: 9, letterSpacing: '.24em', color: '#5AB3D9',
          display: 'block', marginTop: 1, fontWeight: 500,
        }}>MEET · THE · TEAM</span>
      </span>
    </button>
  )
}
