import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { MEMBERS } from '../data/index.js'
import { PolaroidCard } from './cards/PolaroidCard.jsx'
import { MagazineCard } from './cards/MagazineCard.jsx'
import { MinimalCard } from './cards/MinimalCard.jsx'
import { MemberModal } from './MemberModal.jsx'

const CARD_STYLES = [
  { value: 'polaroid', label: 'Polaroid', zh: '拍立得' },
  { value: 'magazine', label: 'Magazine', zh: '雜誌' },
  { value: 'minimal',  label: 'Minimal',  zh: '極簡' },
]

function CardStyleSwitcher({ value, onChange, dark }) {
  const idx = CARD_STYLES.findIndex(o => o.value === value)
  const border = dark ? 'rgba(255,255,255,.16)' : 'rgba(26,43,69,.12)'

  return (
    <div role="group" aria-label="卡片樣式切換" style={{
      display: 'inline-flex', alignItems: 'center', gap: 14,
      padding: '6px 10px 6px 18px', borderRadius: 999,
      background: dark ? 'rgba(255,255,255,.06)' : 'rgba(255,252,247,.92)',
      border: `0.5px solid ${border}`,
      boxShadow: dark
        ? '0 8px 22px rgba(0,0,0,.35)'
        : '0 8px 22px rgba(26,43,69,.10), inset 0 1px 0 rgba(255,255,255,.6)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
    }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Heart size={13} color="#FF8AA8" fill="#FF8AA8" />
        <span className="ff-display" style={{
          fontStyle: 'italic', fontSize: 14, fontWeight: 600,
          color: dark ? '#F8FAFF' : '#1A2B45', whiteSpace: 'nowrap',
        }}>card style</span>
      </span>

      <div style={{
        position: 'relative', display: 'inline-flex',
        background: dark ? 'rgba(0,0,0,.25)' : '#E6F4FB',
        borderRadius: 999, padding: 3,
      }}>
        {/* Thumb */}
        <div style={{
          position: 'absolute', top: 3, bottom: 3,
          left: 3 + idx * 98,
          width: 98, borderRadius: 999,
          background: dark ? 'linear-gradient(180deg,#5AB3D9,#3A8FB7)' : 'linear-gradient(180deg,#FFFCF7,#FFF)',
          boxShadow: dark ? '0 2px 6px rgba(90,179,217,.4)' : '0 2px 6px rgba(26,43,69,.15)',
          transition: 'left .28s cubic-bezier(.34,1.4,.64,1)',
          pointerEvents: 'none',
        }} aria-hidden="true" />

        {CARD_STYLES.map((o, i) => (
          <button key={o.value} onClick={() => onChange(o.value)}
            aria-pressed={i === idx}
            style={{
              appearance: 'none', border: 'none', cursor: 'pointer', background: 'transparent',
              position: 'relative', zIndex: 1, width: 98, padding: '7px 0',
              fontFamily: 'var(--ff-body)', fontSize: 12,
              fontWeight: i === idx ? 600 : 500,
              color: i === idx
                ? (dark ? '#0B1530' : '#1A2B45')
                : (dark ? 'rgba(248,250,255,.65)' : 'rgba(26,43,69,.55)'),
              transition: 'color .2s',
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function renderCard(m, i, cardStyle, onOpen) {
  if (cardStyle === 'magazine') return <MagazineCard key={m.en} m={m} onClick={() => onOpen(m)} />
  if (cardStyle === 'minimal')  return <MinimalCard  key={m.en} m={m} onClick={() => onOpen(m)} />
  return <PolaroidCard key={m.en} m={m} tilt={(i % 2 === 0 ? -1 : 1) * (2 + (i % 3))} onClick={() => onOpen(m)} />
}

export function Members({ dark }) {
  const [cardStyle, setCardStyle] = useState('polaroid')
  const [activeMember, setActiveMember] = useState(null)

  const p = dark ? {
    bg: '#0B1530', panel: '#15224A', text: '#F8FAFF', textSoft: 'rgba(248,250,255,.62)',
    rule: 'rgba(255,255,255,.16)', accent: '#87CEEB',
  } : {
    bg: '#FFFCF7', panel: '#FAF6F0', text: '#1A2B45', textSoft: 'rgba(26,43,69,.55)',
    rule: 'rgba(26,43,69,.10)', accent: '#5AB3D9',
  }

  return (
    <>
    <MemberModal member={activeMember} photoStyle={cardStyle} onClose={() => setActiveMember(null)} />
    <section id="members" aria-labelledby="members-heading" style={{
      background: p.bg, color: p.text, fontFamily: 'var(--ff-body)',
    }}>
      {/* Header */}
      <div style={{
        padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px) clamp(24px, 3vw, 40px)',
        borderBottom: `0.5px solid ${p.rule}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--ff-mono)', fontSize: 11, letterSpacing: '.24em',
            color: p.textSoft, marginBottom: 14,
          }}>MEMBERS · 008 · DEBUT 2025.02.24</div>
          <h2 id="members-heading" className="ff-display" style={{
            margin: 0, fontStyle: 'italic', fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 500, lineHeight: .95, color: p.text,
          }}>
            Eight hearts,{' '}
            <span style={{ color: p.accent }}>one beat.</span>
          </h2>
        </div>
        <CardStyleSwitcher value={cardStyle} onChange={setCardStyle} dark={dark} />
      </div>

      {/* Cards grid */}
      <div className={`members-card-grid members-card-grid--${cardStyle}`}>
        {MEMBERS.map((m, i) => renderCard(m, i, cardStyle, setActiveMember))}
      </div>

      {/* Click hint */}
      <div style={{
        padding: '12px clamp(24px, 5vw, 64px) clamp(28px, 4vw, 48px)',
        display: 'flex', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--ff-mono)', fontSize: 10, letterSpacing: '.22em',
          color: p.textSoft, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Heart size={10} color="#FF8AA8" fill="#FF8AA8" />
          點擊成員卡片以查看詳細資料
          <Heart size={10} color="#FF8AA8" fill="#FF8AA8" />
        </span>
      </div>
    </section>
    </>
  )
}
