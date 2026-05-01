import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Placeholder } from './Placeholder.jsx'
import { RELEASES } from '../data/index.js'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }
const INITIAL_TIMELINE_COUNT = 5

export function Discography({ dark }) {
  const [timelineOpen, setTimelineOpen] = useState(false)
  const visibleReleases = RELEASES.slice(0, INITIAL_TIMELINE_COUNT)
  const hiddenCount = Math.max(RELEASES.length - INITIAL_TIMELINE_COUNT, 0)
  const p = dark ? {
    bg: '#0B1530', panel: '#15224A', text: '#F8FAFF', textSoft: 'rgba(248,250,255,.62)',
    rule: 'rgba(255,255,255,.16)', accent: '#87CEEB',
  } : {
    bg: 'linear-gradient(180deg, #F4FBFF 0%, #FFF3FA 50%, #EEF8FF 100%)', panel: 'rgba(255,255,255,.72)', text: '#1A2B45', textSoft: 'rgba(26,43,69,.58)',
    rule: 'rgba(26,43,69,.10)', accent: '#5AB3D9',
  }

  useEffect(() => {
    if (!timelineOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setTimelineOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [timelineOpen])

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
          {'Timeline of'}{' '}
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
          {visibleReleases.map((r, i) => (
            <motion.div
              key={`${r.date}-${r.title}`}
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
                  {r.en} · {r.tracks} event{r.tracks > 1 ? 's' : ''}
                </div>
                <p style={{ margin: 0, fontSize: 18, lineHeight: 1.7, color: p.text, maxWidth: 480 }}>
                  {r.note}
                </p>
                <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                  {r.streams.map(s => (
                    <a key={s.name} href={s.url} aria-label={`${s.name} · ${r.title}`}
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

        {hiddenCount > 0 && (
          <div style={{
            display: 'flex', justifyContent: 'center',
            marginTop: 'clamp(32px, 5vw, 56px)',
          }}>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => setTimelineOpen(true)}
              style={{
                border: `0.5px solid ${p.rule}`,
                background: p.panel,
                color: p.text,
                borderRadius: 999,
                padding: '10px 22px',
                fontSize: 17,
                letterSpacing: '.04em',
                cursor: 'pointer',
                boxShadow: dark ? 'none' : '0 10px 26px rgba(90,179,217,.14)',
                transition: 'transform .2s, background .2s, color .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {`開啟完整時間軸 · 還有 ${hiddenCount} 個事件`}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {timelineOpen && (
          <motion.div
            key="timeline-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
            onClick={() => setTimelineOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="timeline-modal-title"
            style={{
              position: 'fixed', inset: 0, zIndex: 1200,
              background: 'rgba(10,16,35,.62)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(16px, 4vw, 36px)',
            }}
          >
            <motion.div
              key="timeline-modal"
              initial={{ opacity: 0, y: 18, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: .98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              onClick={(event) => event.stopPropagation()}
              style={{
                width: 'min(980px, 100%)',
                maxHeight: 'min(820px, calc(100vh - 32px))',
                overflow: 'hidden',
                borderRadius: 8,
                background: dark ? '#101D45' : '#F8FBFF',
                color: dark ? '#F8FAFF' : '#1A2B45',
                boxShadow: '0 28px 80px rgba(10,16,35,.32)',
                border: `0.5px solid ${dark ? 'rgba(255,255,255,.16)' : 'rgba(26,43,69,.10)'}`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{
                padding: '24px clamp(20px, 4vw, 36px)',
                borderBottom: `0.5px solid ${p.rule}`,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 16,
                background: dark ? '#0B1530' : 'linear-gradient(180deg, #F4FBFF 0%, #FFF7FB 100%)',
              }}>
                <div>
                  <div className="ff-mono" style={{
                    fontSize: 15.5,
                    letterSpacing: '.22em',
                    color: p.textSoft,
                    marginBottom: 8,
                  }}>
                    COMPLETE TIMELINE
                  </div>
                  <h3 id="timeline-modal-title" className="ff-display" style={{
                    margin: 0,
                    fontStyle: 'italic',
                    fontSize: 'clamp(28px, 4vw, 48px)',
                    fontWeight: 500,
                    lineHeight: 1,
                  }}>
                    完整時間軸
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setTimelineOpen(false)}
                  aria-label="關閉完整時間軸"
                  style={{
                    appearance: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    background: dark ? 'rgba(255,255,255,.12)' : 'rgba(26,43,69,.08)',
                    color: dark ? '#F8FAFF' : '#1A2B45',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="timeline-modal-body" style={{
                overflowY: 'auto',
                padding: 'clamp(20px, 4vw, 36px)',
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr)',
                  gap: 18,
                }}>
                  {RELEASES.map((r) => (
                    <article
                      key={`modal-${r.date}-${r.title}`}
                      className="timeline-modal-item"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '112px 1fr 132px',
                        gap: 18,
                        alignItems: 'start',
                        padding: '16px 0',
                        borderBottom: `0.5px solid ${p.rule}`,
                      }}
                    >
                      <div className="ff-mono" style={{
                        fontSize: 15.5,
                        letterSpacing: '.12em',
                        color: p.text,
                        lineHeight: 1.35,
                      }}>
                        {r.date}
                        <div style={{ color: p.textSoft, fontSize: 14.5, marginTop: 4 }}>{r.type}</div>
                      </div>
                      <div>
                        <h4 className="ff-display" style={{
                          margin: '0 0 6px',
                          fontStyle: 'italic',
                          fontSize: 'clamp(22px, 3vw, 32px)',
                          fontWeight: 500,
                          lineHeight: 1.05,
                          color: p.text,
                        }}>
                          {r.title}
                        </h4>
                        <div style={{ fontSize: 17, color: p.textSoft, marginBottom: 8 }}>
                          {r.en} 繚 {r.tracks} event{r.tracks > 1 ? 's' : ''}
                        </div>
                        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: p.text }}>
                          {r.note}
                        </p>
                        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                          {r.streams.map(s => (
                            <a key={`${r.title}-${s.name}`} href={s.url} aria-label={`${s.name} 繚 ${r.title}`}
                              style={{
                                padding: '4px 10px',
                                borderRadius: 999,
                                border: `0.5px solid ${p.rule}`,
                                fontSize: 15.5,
                                color: p.textSoft,
                                letterSpacing: '.04em',
                              }}
                            >
                              {s.name}
                            </a>
                          ))}
                        </div>
                      </div>
                      <Placeholder
                        label={r.title.toUpperCase()}
                        tone={r.color}
                        ratio="1/1"
                        style={{ width: '100%', borderRadius: 8 }}
                      />
                    </article>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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

          .timeline-modal-item {
            grid-template-columns: minmax(0, 1fr) !important;
          }

          .timeline-modal-item > * {
            min-width: 0;
          }

          .timeline-modal-item > div:first-child {
            overflow-wrap: anywhere;
          }
        }
      `}</style>
    </section>
  )
}
