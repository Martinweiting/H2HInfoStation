import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, Disc3, Languages, ListMusic, Play, X } from 'lucide-react'
import { Placeholder } from './Placeholder.jsx'

const MUSIC_WORKS = [
  {
    title: 'The Chase',
    subtitle: '1st Single Album',
    release: '2025.02.24',
    language: '韓語',
    type: '單曲專輯',
    sales: '428,725',
    tone: 'sky',
    desc: 'Hearts2Hearts 的出道單曲專輯，以同名主打曲揭開團體世界觀，並收錄 B-side〈Butterflies〉。',
    tracks: ['The Chase', 'Butterflies'],
    note: '出道作品',
  },
  {
    title: 'STYLE',
    subtitle: '1st Digital Single',
    release: '2025.06.18',
    language: '韓語',
    type: '數位單曲',
    tone: 'cream',
    desc: '首張韓語數位單曲，延續出道後的清亮能量，以俐落的流行編曲呈現團體的自信姿態。',
    tracks: ['STYLE'],
    note: '韓語數位單曲 1st',
  },
  {
    title: 'FOCUS',
    subtitle: '1st Mini Album',
    release: '2025.10.20',
    language: '韓語',
    type: '迷你專輯',
    sales: '436,517',
    tone: 'blush',
    desc: '首張迷你專輯，從主打曲〈FOCUS〉到收錄曲展開更完整的音樂色彩，實體版另收錄〈Style〉。',
    tracks: ['FOCUS', 'Apple Pie', 'Pretty Please (예쁜 기쁨)', 'Flutter', 'Blue Moon', 'Style (Physical only)'],
    note: '收錄先行曲〈Pretty Please (예쁜 기쁨)〉',
  },
  {
    title: 'Pretty Please (예쁜 기쁨)',
    subtitle: 'Pre-release Digital Single',
    release: '2025.09.24',
    language: '韓語',
    type: '數位單曲',
    tone: 'sky',
    desc: '作為《FOCUS》的先行曲率先公開，甜亮的旋律把迷你專輯回歸前的期待感推到前台。',
    tracks: ['Pretty Please (예쁜 기쁨)'],
    note: '《FOCUS》先行曲',
  },
  {
    title: 'RUDE!',
    subtitle: 'Digital Single',
    release: '2026.02.20',
    language: '韓語 / 日語',
    type: '數位單曲',
    tone: 'cream',
    desc: '第三張韓語數位單曲，之後推出日語版本，讓作品在韓語與日語語境中延伸不同聽感。',
    tracks: ['RUDE!', 'RUDE! (Japanese Ver.)'],
    note: '日語版本發行日：2026.03.17',
  },
]

function DetailItem({ icon, label, value, color }) {
  const Icon = icon

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
      <Icon size={14} color={color} />
      <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, letterSpacing: '.14em', opacity: .62 }}>
        {label}
      </span>
      <span style={{ fontSize: 13, overflowWrap: 'anywhere' }}>{value}</span>
    </div>
  )
}

function WorkModal({ work, onClose, dark }) {
  const p = dark ? { bg: '#0B1530', panel: '#15224A', text: '#F8FAFF', soft: 'rgba(248,250,255,.62)', rule: 'rgba(255,255,255,.14)', accent: '#87CEEB' }
                 : { bg: '#FFFCF7', panel: '#FAF6F0', text: '#1A2B45', soft: 'rgba(26,43,69,.58)', rule: 'rgba(26,43,69,.12)', accent: '#5AB3D9' }

  return (
    <AnimatePresence>
      {work && (
        <>
          <motion.div
            key="work-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 1200, background: 'rgba(5,10,24,.78)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          />
          <motion.div
            key="work-modal"
            initial={{ opacity: 0, scale: .94, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .96, y: 10 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1201,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 'clamp(16px, 4vw, 40px)',
              pointerEvents: 'none',
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: 760, maxHeight: 'min(760px, calc(100vh - 32px))',
                borderRadius: 14, background: p.bg, color: p.text,
                overflow: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,.45)',
                pointerEvents: 'all',
              }}
            >
              <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(180px, 260px) 1fr', gap: 0 }}>
                <div style={{ minHeight: 260, background: p.panel }}>
                  <Placeholder label={work.title.toUpperCase()} tone={work.tone} ratio="1/1" style={{ width: '100%', height: '100%' }} />
                </div>
                <div style={{ padding: 'clamp(22px, 4vw, 34px)' }}>
                  <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, letterSpacing: '.2em', color: p.soft, marginBottom: 10 }}>
                    {work.type}
                  </div>
                  <h3 className="ff-display" style={{ margin: 0, fontStyle: 'italic', fontSize: 'clamp(30px, 5vw, 54px)', fontWeight: 500, lineHeight: 1 }}>
                    {work.title}
                  </h3>
                  <div style={{ marginTop: 8, color: p.accent, fontSize: 13, fontWeight: 700 }}>{work.subtitle}</div>
                  <p style={{ margin: '18px 0 0', color: p.soft, fontSize: 14, lineHeight: 1.8 }}>{work.desc}</p>
                </div>
                <button onClick={onClose} aria-label="關閉作品資訊" style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 34, height: 34, borderRadius: 999,
                  background: dark ? 'rgba(255,255,255,.1)' : 'rgba(26,43,69,.07)',
                  color: p.text, border: `0.5px solid ${p.rule}`,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <X size={15} />
                </button>
              </div>

              <div style={{ padding: '0 clamp(22px, 4vw, 34px) clamp(24px, 4vw, 34px)' }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                  gap: 12, padding: '18px 0', borderTop: `0.5px solid ${p.rule}`, borderBottom: `0.5px solid ${p.rule}`,
                }}>
                  <DetailItem icon={CalendarDays} label="RELEASE" value={work.release} color={p.accent} />
                  <DetailItem icon={Languages} label="LANG" value={work.language} color={p.accent} />
                  {work.sales && <DetailItem icon={Disc3} label="SALES" value={work.sales} color={p.accent} />}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(180px, .55fr)', gap: 'clamp(18px, 4vw, 32px)', paddingTop: 20 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <ListMusic size={16} color={p.accent} />
                      <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, letterSpacing: '.18em', color: p.soft }}>TRACKS</div>
                    </div>
                    <ol style={{ margin: 0, paddingLeft: 20, color: p.text, fontSize: 14, lineHeight: 1.9 }}>
                      {work.tracks.map(track => <li key={track}>{track}</li>)}
                    </ol>
                  </div>
                  <div style={{ color: p.soft, fontSize: 13, lineHeight: 1.75 }}>
                    <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, letterSpacing: '.18em', marginBottom: 10 }}>NOTE</div>
                    {work.note}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function MusicVideos({ dark }) {
  const [activeWork, setActiveWork] = useState(null)

  const p = dark ? {
    bg: '#0B1530', text: '#F8FAFF', textSoft: 'rgba(248,250,255,.58)',
    rule: 'rgba(255,255,255,.1)', accent: '#87CEEB',
  } : {
    bg: '#FFFCF7', text: '#1A2B45', textSoft: 'rgba(26,43,69,.55)',
    rule: 'rgba(26,43,69,.1)', accent: '#5AB3D9',
  }

  return (
    <section id="mv" aria-labelledby="mv-heading" style={{
      background: p.bg, color: p.text, fontFamily: 'var(--ff-body)',
    }}>
      <WorkModal work={activeWork} onClose={() => setActiveWork(null)} dark={dark} />

      <div style={{
        padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px) clamp(24px, 3vw, 40px)',
        borderBottom: `0.5px solid ${p.rule}`,
      }}>
        <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, letterSpacing: '.24em', color: p.textSoft, marginBottom: 14 }}>
          MUSIC WORKS / 音樂作品
        </div>
        <h2 id="mv-heading" className="ff-display" style={{
          margin: 0, fontStyle: 'italic', fontSize: 'clamp(32px, 5vw, 64px)',
          fontWeight: 500, lineHeight: .95,
        }}>
          音樂作品{' '}
          <span style={{ color: p.accent }}>archive.</span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 1, background: p.rule,
      }}>
        {MUSIC_WORKS.map((work, i) => (
          <motion.button
            key={work.title}
            onClick={() => setActiveWork(work)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * .06, duration: .35 }}
            whileHover="hover"
            style={{
              appearance: 'none', border: 'none', cursor: 'pointer',
              background: p.bg, padding: 0, textAlign: 'left',
              display: 'flex', flexDirection: 'column', minHeight: 0,
            }}
            aria-label={`查看 ${work.title} 作品資訊`}
          >
            <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', width: '100%' }}>
              <Placeholder label={work.title.toUpperCase()} tone={work.tone} style={{ width: '100%', height: '100%' }} />
              <motion.div
                variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }}
                initial="initial"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(11,21,48,.52)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <motion.div
                  variants={{ hover: { scale: 1.08 } }}
                  style={{
                    width: 52, height: 52, borderRadius: 999,
                    background: 'rgba(255,255,255,.2)', backdropFilter: 'blur(6px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,.3)',
                  }}
                >
                  <Play size={19} color="#fff" fill="#fff" style={{ marginLeft: 3 }} />
                </motion.div>
              </motion.div>
            </div>

            <div style={{ padding: '16px 18px 20px', background: p.bg, flex: 1 }}>
              <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 9, letterSpacing: '.2em', color: p.textSoft, marginBottom: 6 }}>
                {work.subtitle} / {work.release}
              </div>
              <div className="ff-display" style={{ fontStyle: 'italic', fontSize: 22, fontWeight: 500, color: p.text, lineHeight: 1.12 }}>
                {work.title}
              </div>
              <div style={{ marginTop: 7, fontSize: 12, color: p.textSoft, lineHeight: 1.6 }}>
                {work.type} · {work.language}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <style>{`
        @media (max-width: 680px) {
          #mv [style*="grid-template-columns: minmax(180px, 260px) 1fr"] {
            grid-template-columns: 1fr !important;
          }
          #mv [style*="grid-template-columns: minmax(0, 1fr) minmax(180px, .55fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
