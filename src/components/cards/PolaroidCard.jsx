import { useState } from 'react'
import { Crown } from 'lucide-react'
import { Placeholder } from '../Placeholder.jsx'
import { getMemberPhoto } from '../../data/memberPhotos.js'

export function PolaroidCard({ m, tilt = 0, onClick }) {
  const [hovered, setHovered] = useState(false)
  const photo = getMemberPhoto(m.en, 'polaroid')
  const isJiwoo = m.en === 'Jiwoo'

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
          ? isJiwoo
            ? '0 24px 42px rgba(26,43,69,.24), 0 0 0 2px rgba(255,214,102,.72), 0 0 28px rgba(255,214,102,.34)'
            : '0 22px 40px rgba(26,43,69,.28)'
          : isJiwoo
            ? '0 14px 30px rgba(26,43,69,.18), 0 0 0 2px rgba(255,214,102,.58), 0 0 22px rgba(255,214,102,.24)'
            : '0 12px 28px rgba(26,43,69,.18), 0 1px 0 rgba(0,0,0,.04)',
        transform: hovered ? 'rotate(0deg) translateY(-6px)' : `rotate(${tilt}deg)`,
        transition: 'transform .25s ease, box-shadow .25s',
        cursor: 'pointer',
        position: 'relative',
      }}
      aria-label={`${m.en} member card`}
    >
      {isJiwoo && (
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 2,
          width: 32,
          height: 32,
          borderRadius: 999,
          background: 'rgba(255,255,255,.88)',
          border: '1px solid rgba(255,214,102,.82)',
          boxShadow: '0 8px 18px rgba(26,43,69,.16), 0 0 18px rgba(255,214,102,.36)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D9A71C',
          pointerEvents: 'none',
        }}>
          <Crown size={17} strokeWidth={2.25} />
        </div>
      )}

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
