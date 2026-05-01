import { useState } from 'react'
import { Placeholder } from '../Placeholder.jsx'
import { getMemberPhoto } from '../../data/memberPhotos.js'

export function PolaroidCard({ m, tilt = 0, onClick }) {
  const [hovered, setHovered] = useState(false)
  const photo = getMemberPhoto(m.en, 'polaroid')

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        width: '100%',
        background: 'rgba(255,255,255,.84)',
        padding: '14px 14px 18px',
        boxShadow: hovered
          ? '0 22px 40px rgba(26,43,69,.28)'
          : '0 12px 28px rgba(26,43,69,.18), 0 1px 0 rgba(0,0,0,.04)',
        transform: hovered ? 'rotate(0deg) translateY(-6px)' : `rotate(${tilt}deg)`,
        transition: 'transform .25s ease, box-shadow .25s',
        cursor: 'pointer',
        position: 'relative',
      }}
      aria-label={`${m.en} member card`}
    >
      {photo ? (
        <img
          src={photo}
          alt={`${m.en} portrait`}
          loading="lazy"
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: '3 / 4',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      ) : (
        <Placeholder
          label={`${m.en.toUpperCase()} PHOTO`}
          tone={m.tone}
          style={{ width: '100%', aspectRatio: '3/4' }}
        />
      )}

      <div className="ff-script" style={{
        marginTop: 14,
        fontSize: 28,
        lineHeight: 1,
        color: '#1A2B45',
        textAlign: 'center',
        fontWeight: 600,
      }}>
        {m.en} <span style={{ color: '#FF8AA8', fontSize: 23 }}>{m.emoji}</span>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: 6,
        fontFamily: 'var(--ff-mono)',
        fontSize: 15.5,
        letterSpacing: '.22em',
        color: 'rgba(26,43,69,.55)',
      }}>
        {m.kr} / {m.bday === 'Coming Soon' ? '--' : m.bday}
      </div>

      <div aria-hidden="true" style={{
        position: 'absolute',
        top: -8,
        left: '50%',
        transform: 'translateX(-50%) rotate(-3deg)',
        width: 54,
        height: 18,
        background: 'rgba(135,206,235,.55)',
        boxShadow: '0 1px 2px rgba(0,0,0,.06)',
      }} />
    </article>
  )
}
