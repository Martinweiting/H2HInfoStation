import { useState } from 'react'
import { Crown } from 'lucide-react'
import { Placeholder } from '../Placeholder.jsx'
import { MEMBERS } from '../../data/index.js'
import { getMemberPhoto } from '../../data/memberPhotos.js'

export function MagazineCard({ m, onClick }) {
  const [hovered, setHovered] = useState(false)
  const idx = MEMBERS.indexOf(m)
  const photo = getMemberPhoto(m.en, 'magazine')
  const isJiwoo = m.en === 'Jiwoo'

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        width: '100%',
        background: 'rgba(255,255,255,.78)',
        border: isJiwoo ? '1px solid rgba(255,214,102,.72)' : '.5px solid rgba(26,43,69,.12)',
        cursor: 'pointer',
        boxShadow: hovered
          ? isJiwoo
            ? '0 20px 42px rgba(26,43,69,.18), 0 0 26px rgba(255,214,102,.30)'
            : '0 18px 40px rgba(26,43,69,.18)'
          : isJiwoo
            ? '0 0 0 1px rgba(255,214,102,.26), 0 0 18px rgba(255,214,102,.18)'
            : 'none',
        transition: 'box-shadow .2s',
        position: 'relative',
      }}
      aria-label={`${m.en} 成員卡片`}
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
          boxShadow: '0 8px 18px rgba(26,43,69,.14), 0 0 18px rgba(255,214,102,.34)',
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
