import { motion } from 'framer-motion'
import {
  CalendarDays,
  Heart,
  Music,
  Radio,
  Sparkles,
  Users,
} from 'lucide-react'

const STATS = [
  { label: 'MEMBERS', value: '8', detail: 'eight voices', icon: Users },
  { label: 'DEBUT', value: '2025.02.24', detail: 'with The Chase', icon: CalendarDays },
  { label: 'LABEL', value: 'SM Entertainment', detail: 'official artist', icon: Music },
  { label: 'FANDOM', value: 'S2U', detail: 'stars to you', icon: Heart },
  { label: 'COLOR', value: 'Sky Blue', detail: '#87CEEB', icon: Sparkles },
  { label: 'SIGNAL', value: 'Connect', detail: 'hearts as one', icon: Radio },
]

const TAGS = ['#S2U', '#하츠투하츠', '#Hearts2Hearts', '#H2H', '#SkyBlue']

const fadeUp = (i = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.52, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
})

function OrbitMark({ dark, palette }) {
  const orbit = dark ? 'rgba(255,255,255,.18)' : 'rgba(26,43,69,.10)'

  return (
    <div aria-hidden="true" style={{
      position: 'relative',
      minHeight: 360,
      borderRadius: 28,
      overflow: 'hidden',
      background: dark
        ? 'linear-gradient(150deg, rgba(21,34,74,.95), rgba(11,21,48,.86))'
        : 'linear-gradient(150deg, rgba(255,255,255,.88), rgba(230,244,251,.92))',
      border: `0.5px solid ${palette.rule}`,
      boxShadow: palette.shadow,
    }}>
      <div style={{
        position: 'absolute',
        inset: 26,
        border: `0.5px solid ${orbit}`,
        borderRadius: '50%',
        transform: 'rotate(-12deg) scaleX(1.12)',
      }} />
      <div style={{
        position: 'absolute',
        inset: 56,
        border: `0.5px dashed ${orbit}`,
        borderRadius: '50%',
        transform: 'rotate(18deg) scaleY(.82)',
      }} />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 34,
          borderRadius: '50%',
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          const angle = (i / 8) * Math.PI * 2
          const x = 50 + Math.cos(angle) * 43
          const y = 50 + Math.sin(angle) * 34
          return (
            <span key={i} style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: 9,
              height: 9,
              borderRadius: 999,
              background: i % 2 ? '#FF8AA8' : '#87CEEB',
              boxShadow: `0 0 0 6px ${dark ? 'rgba(255,255,255,.045)' : 'rgba(255,255,255,.7)'}`,
              transform: 'translate(-50%, -50%)',
            }} />
          )
        })}
      </motion.div>
      <div style={{
        position: 'absolute',
        inset: '50% auto auto 50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}>
        <div className="ff-display" style={{
          fontSize: 'clamp(68px, 10vw, 118px)',
          fontStyle: 'italic',
          fontWeight: 500,
          lineHeight: .82,
          color: palette.text,
          letterSpacing: '-.08em',
        }}>
          H<span style={{ color: palette.accent }}>2</span>H
        </div>
        <div style={{
          marginTop: 14,
          fontFamily: 'var(--ff-mono)',
          fontSize: 15.5,
          letterSpacing: '.22em',
          color: palette.textSoft,
          whiteSpace: 'nowrap',
        }}>
          8 HEARTS / 1 SIGNAL
        </div>
      </div>
      <div style={{
        position: 'absolute',
        left: 18,
        right: 18,
        bottom: 18,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 10,
      }}>
        {['DEBUT 2025', 'SKY BLUE', 'SMTOWN', 'S2U'].map(item => (
          <div key={item} style={{
            padding: '10px 12px',
            borderRadius: 14,
            background: dark ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.74)',
            border: `0.5px solid ${palette.rule}`,
            fontFamily: 'var(--ff-mono)',
            fontSize: 15.5,
            letterSpacing: '.16em',
            color: palette.textSoft,
            backdropFilter: 'blur(10px)',
          }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export function About({ dark }) {
  const p = dark ? {
    bg: '#0D1A38',
    panel: '#15224A',
    panelSoft: 'rgba(255,255,255,.055)',
    text: '#F8FAFF',
    textSoft: 'rgba(248,250,255,.62)',
    textMuted: 'rgba(248,250,255,.42)',
    rule: 'rgba(255,255,255,.14)',
    accent: '#87CEEB',
    accentDeep: '#5AB3D9',
    blush: '#FFC8D6',
    shadow: '0 24px 70px rgba(0,0,0,.28)',
  } : {
    bg: '#F4F8FC',
    panel: 'rgba(255,255,255,.74)',
    panelSoft: 'rgba(255,255,255,.62)',
    text: '#1A2B45',
    textSoft: 'rgba(26,43,69,.62)',
    textMuted: 'rgba(26,43,69,.42)',
    rule: 'rgba(26,43,69,.10)',
    accent: '#5AB3D9',
    accentDeep: '#2F9CC8',
    blush: '#FF8AA8',
    shadow: '0 24px 70px rgba(26,43,69,.12)',
  }

  return (
    <section id="about" aria-labelledby="about-heading" style={{
      position: 'relative',
      overflow: 'hidden',
      background: dark
        ? `radial-gradient(circle at 78% 10%, rgba(135,206,235,.16), transparent 34%), radial-gradient(circle at 8% 70%, rgba(255,138,168,.12), transparent 28%), ${p.bg}`
        : `radial-gradient(circle at 78% 8%, rgba(135,206,235,.38), transparent 34%), radial-gradient(circle at 8% 78%, rgba(255,229,236,.8), transparent 30%), ${p.bg}`,
      color: p.text,
      fontFamily: 'var(--ff-body)',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        opacity: dark ? .22 : .38,
        backgroundImage: `linear-gradient(${p.rule} 1px, transparent 1px), linear-gradient(90deg, ${p.rule} 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
        maskImage: 'linear-gradient(180deg, transparent, black 18%, black 72%, transparent)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent, black 18%, black 72%, transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(44px, 7vw, 88px) clamp(24px, 5vw, 64px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: 'clamp(28px, 5vw, 68px)',
          alignItems: 'center',
        }}>
          <motion.div {...fadeUp(0)}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '7px 14px',
              borderRadius: 999,
              background: p.panelSoft,
              border: `0.5px solid ${p.rule}`,
              color: p.textSoft,
              fontFamily: 'var(--ff-mono)',
              fontSize: 15.5,
              letterSpacing: '.22em',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}>
              <Sparkles size={13} color={p.accent} />
              ABOUT · 하츠투하츠 · HEARTS2HEARTS
            </div>

            <h2 id="about-heading" className="ff-display" style={{
              margin: '22px 0 0',
              maxWidth: 760,
              fontStyle: 'italic',
              fontSize: 'clamp(40px, 7vw, 92px)',
              fontWeight: 500,
              lineHeight: .92,
              letterSpacing: '-.025em',
              color: p.text,
            }}>
              A soft signal for{' '}
              <span style={{ color: p.accent }}>every heart.</span>
            </h2>

            <p style={{
              margin: '22px 0 0',
              maxWidth: 670,
              fontSize: 'clamp(19px, 1.5vw, 20.5px)',
              lineHeight: 1.85,
              color: p.textSoft,
            }}>
              Hearts2Hearts（韓語：하츠투하츠），簡稱H2H（韓語：하투하），團體名稱寓意著成員們將透過團體自身的音樂，以多樣化的情感及訊息與粉絲互相結合心意共同邁進。
            </p>

            <div style={{ marginTop: 26, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {TAGS.map(tag => (
                <span key={tag} style={{
                  padding: '7px 13px',
                  borderRadius: 999,
                  background: dark ? 'rgba(135,206,235,.12)' : 'rgba(255,255,255,.74)',
                  border: `0.5px solid ${p.rule}`,
                  color: tag === '#SkyBlue' ? p.accentDeep : p.text,
                  fontFamily: 'var(--ff-mono)',
                  fontSize: 15.5,
                  letterSpacing: '.12em',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(1)}>
            <OrbitMark dark={dark} palette={p} />
          </motion.div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(158px, 1fr))',
          gap: 1,
          marginTop: 'clamp(34px, 5vw, 58px)',
          overflow: 'hidden',
          border: `0.5px solid ${p.rule}`,
          borderRadius: 24,
          background: p.rule,
          boxShadow: p.shadow,
        }}>
          {STATS.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div key={s.label} {...fadeUp(i)} style={{
                minHeight: 148,
                padding: '22px 20px',
        background: dark ? 'rgba(21,34,74,.92)' : 'rgba(255,255,255,.80)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    fontFamily: 'var(--ff-mono)',
                    fontSize: 15.5,
                    letterSpacing: '.22em',
                    color: p.textMuted,
                  }}>
                    {s.label}
                  </div>
                  <Icon size={16} color={p.accent} />
                </div>
                <div>
                  <div style={{
                    fontSize: s.value.length > 12 ? 14 : 24,
                    fontWeight: 650,
                    lineHeight: 1.1,
                    color: p.text,
                    letterSpacing: s.value.length > 12 ? '.01em' : '-.02em',
                  }}>
                    {s.value}
                    {s.label === 'COLOR' && (
                      <span style={{
                        display: 'inline-block',
                        width: 11,
                        height: 11,
                        marginLeft: 8,
                        borderRadius: 999,
                        background: '#87CEEB',
                        boxShadow: '0 0 0 4px rgba(135,206,235,.22)',
                        verticalAlign: 'middle',
                      }} />
                    )}
                  </div>
                  <div style={{
                    marginTop: 6,
                    fontSize: 17,
                    color: p.textSoft,
                    letterSpacing: '.02em',
                  }}>
                    {s.detail}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
