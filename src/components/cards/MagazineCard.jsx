import { useState } from 'react'
import { Placeholder } from '../Placeholder.jsx'
import { MEMBERS } from '../../data/index.js'
import { getMemberPhoto } from '../../data/memberPhotos.js'

export function MagazineCard({ m, onClick }) {
  const [hovered, setHovered] = useState(false)
  const idx = MEMBERS.indexOf(m)
  const photo = getMemberPhoto(m.en, 'magazine')

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        width: '100%',
        background: 'rgba(255,255,255,.78)',
        border: '.5px solid rgba(26,43,69,.12)',
        cursor: 'pointer',
        boxShadow: hovered ? '0 18px 40px rgba(26,43,69,.18)' : 'none',
        transition: 'box-shadow .2s',
      }}
      aria-label={`${m.en} 成員卡片`}
    >
      {photo ? (
        <img
          src={photo}
          alt={`${m.en} magazine portrait`}
          loading="lazy"
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: '3 / 4.2',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      ) : (
        <Placeholder label={m.en.toUpperCase()} tone={m.tone}
          style={{ width: '100%', aspectRatio: '3/4.2' }} />
      )}

      <div style={{ padding: '14px 14px 16px' }}>
        <div style={{
          fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.22em',
          color: 'rgba(26,43,69,.55)', marginBottom: 6,
        }}>
          NO.0{idx + 1} — {m.kr}
        </div>
        <div className="ff-display" style={{ fontStyle: 'italic', fontSize: 32, fontWeight: 500, lineHeight: 1, color: '#1A2B45' }}>
          {m.en}.
        </div>
        <div style={{ height: 1, background: 'rgba(26,43,69,.12)', margin: '10px 0' }} />
        <div style={{ fontSize: 16.5, color: 'rgba(26,43,69,.65)', lineHeight: 1.5 }}>
          {m.role}
          <div style={{
            marginTop: 4, fontFamily: 'var(--ff-mono)', fontSize: 15.5,
            letterSpacing: '.18em', color: 'rgba(26,43,69,.5)',
          }}>
            {m.bday === 'Coming Soon' ? 'BIRTHDAY · TBD' : m.bday} · MBTI {m.mbti}
          </div>
        </div>
      </div>
    </article>
  )
}
