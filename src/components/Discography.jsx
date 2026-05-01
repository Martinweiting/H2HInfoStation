import { motion } from 'framer-motion'
import { Placeholder } from './Placeholder.jsx'
import { RELEASES } from '../data/index.js'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

export function Discography({ dark }) {
  const p = dark ? {
    bg: '#0B1530', panel: '#15224A', text: '#F8FAFF', textSoft: 'rgba(248,250,255,.62)',
    rule: 'rgba(255,255,255,.16)', accent: '#87CEEB',
  } : {
    bg: '#FFFCF7', panel: '#FAF6F0', text: '#1A2B45', textSoft: 'rgba(26,43,69,.55)',
    rule: 'rgba(26,43,69,.10)', accent: '#5AB3D9',
  }

  return (
    <section id="discography" aria-labelledby="disco-heading" style={{
      background: p.bg, color: p.text, fontFamily: 'var(--ff-body)',
    }}>
      {/* Header */}
      <div style={{
        padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px) clamp(24px, 3vw, 40px)',
        borderBottom: `0.5px solid ${p.rule}`,
      }}>
        <div style={{
          fontFamily: 'var(--ff-mono)', fontSize: 16.5, letterSpacing: '.24em',
          color: p.textSoft, marginBottom: 14,
        }}>TIMELINE / {'\u6642\u9593\u8ef8'}</div>
        <h2 id="disco-heading" className="ff-display" style={{
          margin: 0, fontStyle: 'italic', fontSize: 'clamp(36px, 6vw, 80px)',
          fontWeight: 500, lineHeight: .95,
        }}>
          {'\u6642\u9593\u8ef8'}{' '}
          <span style={{ color: p.accent }}>hearts.</span>
        </h2>
      </div>

      {/* Timeline */}
      <div style={{ padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 64px)', position: 'relative' }}>
        {/* Rail */}
        <div className="discography-rail" aria-hidden="true" style={{
          position: 'absolute', left: 'clamp(100px, 12vw, 160px)',
          top: 32, bottom: 32, width: 1, background: p.rule,
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 5vw, 56px)' }}>
          {RELEASES.map((r, i) => (
            <motion.div
              key={r.title}
              className="discography-release"
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp} transition={{ duration: .6, delay: i * .1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'clamp(80px, 10vw, 120px) 56px 1fr clamp(140px, 20vw, 260px)',
                gap: 'clamp(12px, 2vw, 28px)',
                alignItems: 'start',
              }}
            >
              {/* Date */}
              <div style={{
                fontFamily: 'var(--ff-mono)', fontSize: 16.5, letterSpacing: '.18em',
                color: p.text, paddingTop: 10,
              }}>
                {r.date}
                <div style={{ color: p.textSoft, fontSize: 15.5, marginTop: 4 }}>{r.type}</div>
              </div>

              {/* Dot */}
              <div style={{ position: 'relative', height: 80 }}>
                <div style={{
                  position: 'absolute', left: 18, top: 14,
                  width: 14, height: 14, borderRadius: '50%',
                  background: p.accent,
                  boxShadow: `0 0 0 4px ${p.bg}, 0 0 0 5px ${p.rule}`,
                }} />
              </div>

              {/* Body */}
              <div>
                <h3 className="ff-display" style={{
                  margin: '0 0 6px', fontStyle: 'italic',
                  fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: 500, lineHeight: 1, color: p.text,
                }}>
                  {r.title}
                </h3>
                <div style={{ fontSize: 18, color: p.textSoft, marginBottom: 10 }}>
                  {r.en} · {r.tracks} tracks
                </div>
                <p style={{ margin: 0, fontSize: 18, lineHeight: 1.7, color: p.text, maxWidth: 480 }}>
                  {r.note}
                </p>
                <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                  {r.streams.map(s => (
                    <a key={s.name} href={s.url} aria-label={`在 ${s.name} 收聽 ${r.title}`}
                      style={{
                        padding: '4px 12px', borderRadius: 999,
                        border: `0.5px solid ${p.rule}`,
                        fontSize: 16.5, color: p.textSoft, letterSpacing: '.04em',
                        transition: 'background .2s, color .2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = p.accent; e.currentTarget.style.color = '#1A2B45' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = p.textSoft }}
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Cover */}
              <Placeholder label={r.title.toUpperCase()} tone={r.color}
                ratio="1/1" style={{ width: '100%', borderRadius: 8 }} />
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 700px) {
          .discography-rail {
            display: none !important;
          }

          .discography-release {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 16px !important;
            padding-bottom: 28px;
            border-bottom: 0.5px solid ${p.rule};
          }

          .discography-release > div:nth-child(1) {
            padding-top: 0 !important;
            overflow-wrap: anywhere;
          }

          .discography-release > div:nth-child(2) {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
