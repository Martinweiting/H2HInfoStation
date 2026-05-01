import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Star, Globe, Home, Sparkles } from 'lucide-react'
import { Placeholder } from './Placeholder.jsx'
import { getMemberPhoto } from '../data/memberPhotos.js'

const TONE_COLORS = {
  sky:   { bg: '#E6F4FB', accent: '#5AB3D9', badge: '#C8E8F5', text: '#1A4A6B' },
  blush: { bg: '#FFE5EC', accent: '#FF8AA8', badge: '#FFD0DC', text: '#6B1A2E' },
  cream: { bg: '#F5F0FF', accent: '#8EA8FF', badge: '#E8ECFF', text: '#25365F' },
}

function StatBadge({ label, value, tone }) {
  const c = TONE_COLORS[tone] || TONE_COLORS.sky
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '10px 14px', borderRadius: 12,
      background: c.badge, gap: 3, minWidth: 64,
    }}>
      <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 15, letterSpacing: '.2em', color: c.text, opacity: .7 }}>{label}</span>
      <span style={{ fontSize: 18, fontWeight: 600, color: c.text, lineHeight: 1.2, textAlign: 'center' }}>{value}</span>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value, accent }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid rgba(26,43,69,.07)' }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(26,43,69,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
        <Icon size={13} color={accent} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.2em', color: 'rgba(26,43,69,.45)', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 18, color: '#1A2B45', lineHeight: 1.55 }}>{value}</div>
      </div>
    </div>
  )
}

export function MemberModal({ member, photoStyle = 'polaroid', onClose }) {
  const m = member
  const c = TONE_COLORS[m?.tone] || TONE_COLORS.sky
  const photo = m ? getMemberPhoto(m.en, photoStyle) : null

  useEffect(() => {
    if (!m) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [m, onClose])

  return (
    <AnimatePresence>
      {m && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .22 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(10,16,35,.55)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: '100%', opacity: .6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 34, mass: .9 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 1001,
              width: 'min(560px, 100vw)',
        background: '#F8FBFF',
              overflowY: 'auto',
              boxShadow: '-20px 0 60px rgba(10,16,35,.22)',
              display: 'flex', flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero band */}
            <div style={{
              background: `linear-gradient(160deg, ${c.bg} 0%, #F8FBFF 100%)`,
              padding: '36px 28px 24px',
              borderBottom: '1px solid rgba(26,43,69,.08)',
              position: 'relative',
            }}>
              {/* Close */}
              <button
                onClick={onClose}
                aria-label="關閉"
                style={{
                  position: 'absolute', top: 18, right: 18,
                  width: 34, height: 34, borderRadius: 999,
                  background: 'rgba(26,43,69,.08)', border: 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,43,69,.16)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(26,43,69,.08)'}
              >
                <X size={15} color="#1A2B45" />
              </button>

              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                {/* Photo */}
                <div style={{ flexShrink: 0 }}>
                  {photo ? (
                    <img
                      src={photo}
                      alt={`${m.en} ${photoStyle} portrait`}
                      style={{
                        width: 108,
                        aspectRatio: '3 / 4',
                        borderRadius: 12,
                        objectFit: 'cover',
                        objectPosition: 'center',
                        boxShadow: '0 8px 24px rgba(26,43,69,.16)',
                      }}
                    />
                  ) : (
                  <Placeholder
                    label={`${m.en.toUpperCase()} · PHOTO`}
                    tone={m.tone}
                    style={{ width: 108, aspectRatio: '3/4', borderRadius: 12, boxShadow: '0 8px 24px rgba(26,43,69,.16)' }}
                  />
                  )}
                </div>

                {/* Name block */}
                <div style={{ flex: 1, paddingTop: 4 }}>
                  <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.24em', color: 'rgba(26,43,69,.45)', marginBottom: 8 }}>
                    HEARTS2HEARTS · MEMBER
                  </div>
                  <h2 className="ff-display" style={{ margin: 0, fontStyle: 'italic', fontSize: 34, fontWeight: 500, lineHeight: .95, color: '#1A2B45' }}>
                    {m.en} <span style={{ fontSize: 25 }}>{m.emoji}</span>
                  </h2>
                  <div style={{ fontSize: 19, color: 'rgba(26,43,69,.6)', marginTop: 6, lineHeight: 1.3 }}>
                    {m.zh}（{m.kr}）
                    {m.fullName && <span style={{ display: 'block', fontSize: 16.5, marginTop: 2, opacity: .7 }}>{m.fullName}</span>}
                    {m.englishName && <span style={{ display: 'block', fontSize: 16.5, marginTop: 2, opacity: .7 }}>英文名：{m.englishName}</span>}
                  </div>
                  <div style={{
                    marginTop: 12, fontSize: 16.5, color: c.text,
                    background: c.badge, borderRadius: 6,
                    padding: '5px 10px', display: 'inline-block', lineHeight: 1.4,
                  }}>
                    {m.role}
                  </div>
                </div>
              </div>

              {/* Stat badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
                <StatBadge label="生日" value={m.bday} tone={m.tone} />
                <StatBadge label="MBTI" value={m.mbti} tone={m.tone} />
                <StatBadge label="身高" value={m.height} tone={m.tone} />
                <StatBadge label="血型" value={m.blood} tone={m.tone} />
                <StatBadge label="星座" value={m.zodiac} tone={m.tone} />
                <StatBadge label="訓練期" value={m.training} tone={m.tone} />
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 28px 40px', flex: 1 }}>

              {/* Basic info rows */}
              <InfoRow icon={MapPin} label="出身地" value={m.birthplace} accent={c.accent} />
              <InfoRow icon={Globe} label="國籍" value={m.nationality} accent={c.accent} />
              {m.languages && (
                <InfoRow icon={Globe} label="語言能力" value={m.languages.join('、')} accent={c.accent} />
              )}
              <InfoRow icon={Star} label="偶像 / 榜樣" value={m.idol} accent={c.accent} />
              <InfoRow icon={Sparkles} label="特長" value={m.specialty} accent={c.accent} />
              <InfoRow icon={Home} label="宿舍" value={m.dorm} accent={c.accent} />

              {/* Inspired */}
              {m.inspired && (
                <div style={{ margin: '16px 0 0', padding: 16, borderRadius: 12, background: c.bg }}>
                  <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.22em', color: 'rgba(26,43,69,.45)', marginBottom: 6 }}>
                    偶像之路的起點
                  </div>
                  <p style={{ margin: 0, fontSize: 18, color: '#1A2B45', lineHeight: 1.65 }}>{m.inspired}</p>
                </div>
              )}

              {/* Trivia */}
              {m.trivia?.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.22em', color: 'rgba(26,43,69,.45)', marginBottom: 12 }}>
                    ✦ 成員小故事
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {m.trivia.map((fact, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: .08 + i * .04, duration: .28 }}
                        style={{
                          display: 'flex', gap: 10, alignItems: 'flex-start',
                          fontSize: 18, color: '#1A2B45', lineHeight: 1.6,
                        }}
                      >
                        <span style={{
                          flexShrink: 0, width: 18, height: 18, borderRadius: 999,
                          background: c.badge, color: c.text,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 15.5, fontWeight: 700, fontFamily: 'var(--ff-mono)', marginTop: 2,
                        }}>
                          {i + 1}
                        </span>
                        {fact}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hashtags */}
              {m.hashtags?.length > 0 && (
                <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {m.hashtags.map(tag => (
                    <span key={tag} style={{
                      padding: '5px 12px', borderRadius: 999,
                      background: c.badge, fontSize: 16.5,
                      color: c.text, letterSpacing: '.05em',
                    }}>{tag}</span>
                  ))}
                </div>
              )}

              {/* Quote */}
              <motion.blockquote
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .3, duration: .35 }}
                className="ff-display"
                style={{
                  margin: '28px 0 0', fontStyle: 'italic',
                  fontSize: 22.5, fontWeight: 500,
                  color: '#1A2B45', lineHeight: 1.55,
                  borderLeft: `3px solid ${c.accent}`,
                  paddingLeft: 16,
                }}
              >
                "{m.quote}"
                <footer style={{
                  fontFamily: 'var(--ff-mono)', fontSize: 15.5, fontStyle: 'normal',
                  letterSpacing: '.22em', color: 'rgba(26,43,69,.45)', marginTop: 8,
                }}>— {m.quoteSource}</footer>
              </motion.blockquote>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
