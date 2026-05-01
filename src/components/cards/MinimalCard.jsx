import { useState } from 'react'
import { Placeholder } from '../Placeholder.jsx'
import { getMemberPhoto } from '../../data/memberPhotos.js'

const TONES = { sky: '#E6F4FB', blush: '#FFE5EC', cream: '#F5F0FF' }

export function MinimalCard({ m, onClick }) {
  const [hovered, setHovered] = useState(false)
  const photo = getMemberPhoto(m.en, 'minimal')

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        width: '100%',
        padding: 14, borderRadius: 18,
        background: TONES[m.tone] || TONES.sky,
        cursor: 'pointer',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 14px 28px rgba(26,43,69,.14)' : 'none',
        transition: 'transform .25s, box-shadow .25s',
      }}
      aria-label={`${m.en} 成員卡片`}
    >
      {photo ? (
        <img
          src={photo}
          alt={`${m.en} minimal portrait`}
          loading="lazy"
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: 12,
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      ) : (
        <Placeholder label={m.en.toUpperCase()} tone={m.tone}
          style={{ width: '100%', aspectRatio: '1/1', borderRadius: 12 }} />
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
        <div>
          <div className="ff-display" style={{ fontStyle: 'italic', fontSize: 22, fontWeight: 500, lineHeight: 1, color: '#1A2B45' }}>
            {m.en}
          </div>
          <div style={{ fontSize: 16, color: 'rgba(26,43,69,.55)', marginTop: 3, letterSpacing: '.06em' }}>
            {m.kr} · {m.zh === 'Coming Soon' ? '—' : m.zh}
          </div>
        </div>
        <div style={{ fontSize: 21.5 }}>{m.emoji}</div>
      </div>

      <div style={{
        marginTop: 10, paddingTop: 10,
        borderTop: '1px dashed rgba(26,43,69,.18)',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.16em',
        color: 'rgba(26,43,69,.55)',
      }}>
        <span>{m.bday === 'Coming Soon' ? '—' : m.bday}</span>
        <span>{m.mbti}</span>
      </div>
    </article>
  )
}
