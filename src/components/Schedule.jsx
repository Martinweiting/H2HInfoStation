import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { SCHEDULE } from '../data/index.js'

const DAYS_HEADER = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const MONTH_SHORT = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
const MONTH_ZH = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']

function parseDate(dateStr) {
  const [y, m, d] = dateStr.split('.').map(Number)
  return { year: y, month: m, day: d }
}

function getMonthLabel(dateStr) {
  const { month } = parseDate(dateStr)
  return MONTH_SHORT[month - 1]
}

// Feb 2026: Feb 1 = Sunday (col 0), 28 days
function buildCalFeb2026() {
  const cells = []
  // Feb 1 2026 is Sunday → no padding
  for (let d = 1; d <= 28; d++) cells.push(d)
  return cells
}

const CAL_CELLS = buildCalFeb2026()
const FEB_EVENT_DATES = new Set(
  SCHEDULE.filter(s => s.date.startsWith('2026.02')).map(s => parseDate(s.date).day)
)

// Tour groups for summary banner
const TOUR_GROUPS = [
  { region: '亞洲 · 首爾', flag: '🇰🇷', dates: '2026.02.21 – 02.22', venue: 'Olympic Hall, Olympic Park' },
  { region: '北美 · 布魯克林', flag: '🇺🇸', dates: '2026.03.19', venue: 'Brooklyn Paramount' },
  { region: '北美 · 洛杉磯', flag: '🇺🇸', dates: '2026.03.22', venue: 'The Wiltern' },
  { region: '亞洲 · 雅加達', flag: '🇮🇩', dates: '2026.03.28', venue: '待公告' },
]

export function Schedule({ dark }) {
  const p = dark ? {
    bg: '#0B1530', panel: '#15224A', text: '#F8FAFF', textSoft: 'rgba(248,250,255,.62)',
    rule: 'rgba(255,255,255,.16)', accent: '#87CEEB', chip: 'rgba(255,255,255,.06)',
    pastChip: 'rgba(255,255,255,.03)',
  } : {
    bg: '#FFFCF7', panel: '#FAF6F0', text: '#1A2B45', textSoft: 'rgba(26,43,69,.55)',
    rule: 'rgba(26,43,69,.10)', accent: '#5AB3D9', chip: 'rgba(26,43,69,.04)',
    pastChip: 'rgba(26,43,69,.02)',
  }

  const TYPE_COLOR = {
    SHOWCASE:   dark ? 'rgba(135,206,235,.18)' : '#E6F4FB',
    FANMEETING: dark ? 'rgba(255,138,168,.12)' : '#FFE5EC',
    BROADCAST:  dark ? 'rgba(255,255,255,.06)' : '#FAF6F0',
  }

  return (
    <section id="schedule" aria-labelledby="schedule-heading" style={{
      background: p.bg, color: p.text, fontFamily: 'var(--ff-body)',
    }}>
      {/* Hero banner */}
      <div style={{
        padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px) clamp(28px, 4vw, 48px)',
        borderBottom: `0.5px solid ${p.rule}`,
      }}>
        <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 16.5, letterSpacing: '.24em', color: p.textSoft, marginBottom: 14 }}>
          EVENTS &amp; SCHEDULE · 2025 – 2026
        </div>
        <h2 id="schedule-heading" className="ff-display" style={{
          margin: 0, fontStyle: 'italic', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 500, lineHeight: .95,
        }}>HEARTS 2 HOUSE.</h2>
        <div style={{ fontSize: 19, color: p.textSoft, marginTop: 8, lineHeight: 1.7 }}>
          첫 번째 단독 팬미팅 투어 · 2026.02.21 – 03.28<br />
          韓國 · 北美 · 印尼 · 4場城市巡演
        </div>

        {/* Tour city grid */}
        <div style={{
          marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 12,
        }}>
          {TOUR_GROUPS.map((g, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * .08, duration: .3 }}
              style={{
                padding: '12px 16px', borderRadius: 10,
                background: p.chip, border: `0.5px solid ${p.rule}`,
                minWidth: 180, flex: '1 1 180px',
              }}
            >
              <div style={{ fontSize: 21.5, marginBottom: 4 }}>{g.flag}</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: p.text }}>{g.region}</div>
              <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.14em', color: p.textSoft, marginTop: 3 }}>
                {g.dates}
              </div>
              <div style={{ fontSize: 16.5, color: p.textSoft, marginTop: 2 }}>{g.venue}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Calendar + list */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        borderBottom: `0.5px solid ${p.rule}`,
      }}>
        {/* Feb 2026 calendar */}
        <div style={{
          padding: 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 48px)',
          borderRight: `0.5px solid ${p.rule}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
            <h3 className="ff-display" style={{ margin: 0, fontStyle: 'italic', fontSize: 32, fontWeight: 500 }}>Feb 2026</h3>
            <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 16.5, letterSpacing: '.22em', color: p.textSoft }}>2026 / 02</div>
          </div>
          <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.16em', color: p.textSoft, marginBottom: 16 }}>
            HEARTS 2 HOUSE · 首爾場
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5 }}>
            {DAYS_HEADER.map((d, i) => (
              <div key={i} style={{
                fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.18em',
                color: p.textSoft, textAlign: 'center', paddingBottom: 6,
              }}>{d}</div>
            ))}
            {CAL_CELLS.map((d, i) => {
              const has = FEB_EVENT_DATES.has(d)
              return (
                <div key={i} style={{
                  aspectRatio: '1/1', borderRadius: 8,
                  background: has ? (dark ? 'rgba(255,138,168,.18)' : '#FFE5EC') : 'transparent',
                  border: has ? `0.5px solid #FF8AA8` : `0.5px solid ${p.rule}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  color: has ? p.text : p.textSoft,
                  fontWeight: has ? 700 : 400,
                }}
                  aria-label={has ? `2026.02.${String(d).padStart(2,'0')} 有活動` : undefined}
                >
                  <span style={{ fontSize: 18 }}>{d}</span>
                  {has && <Heart size={8} color="#FF8AA8" fill="#FF8AA8" />}
                </div>
              )
            })}
          </div>

          {/* Feb legend */}
          <div style={{ marginTop: 14, display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: '#FFE5EC', border: '0.5px solid #FF8AA8' }} />
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.14em', color: p.textSoft }}>
              HEARTS 2 HOUSE 演出日
            </span>
          </div>
        </div>

        {/* Event list */}
        <div style={{ padding: 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 48px)' }}>
          <h3 className="ff-display" style={{ margin: '0 0 18px', fontStyle: 'italic', fontSize: 32, fontWeight: 500 }}>All Events.</h3>
          <ul className="schedule-event-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
            {SCHEDULE.map((s, i) => {
              const mon = getMonthLabel(s.date)
              const day = s.date.slice(-2)
              const yr  = s.date.slice(0, 4)
              const isPast = !!s.past
              const chipBg = TYPE_COLOR[s.type] || p.chip

              return (
                <motion.li key={i}
                  className="schedule-event"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: .35, delay: i * .06 }}
                  style={{
                    display: 'grid', gridTemplateColumns: '58px 1fr auto',
                    gap: 12, alignItems: 'flex-start',
                    padding: '14px 16px', borderRadius: 10,
                    background: isPast ? p.pastChip : chipBg,
                    border: `0.5px solid ${isPast ? p.rule : p.accent}`,
                    opacity: isPast ? .72 : 1,
                  }}
                >
                  {/* Date col */}
                  <div style={{ textAlign: 'center', paddingTop: 2 }}>
                    <div className="ff-display" style={{
                      fontStyle: 'italic', fontSize: 26, fontWeight: 500,
                      lineHeight: 1, color: isPast ? p.textSoft : p.text,
                    }}>{day}</div>
                    <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 15, letterSpacing: '.18em', color: p.textSoft }}>{mon}</div>
                    <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 14.5, letterSpacing: '.12em', color: p.textSoft, opacity: .7 }}>{yr}</div>
                  </div>

                  {/* Info col */}
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: p.text, lineHeight: 1.4 }}>{s.title}</div>
                    <div style={{ fontSize: 16.5, color: p.textSoft, marginTop: 3, fontFamily: 'var(--ff-mono)', letterSpacing: '.1em' }}>
                      {s.time !== '—' && s.time !== 'TBA' ? `${s.time} · ` : ''}{s.loc}
                    </div>
                    {s.desc && (
                      <div style={{ fontSize: 16.5, color: p.textSoft, marginTop: 5, lineHeight: 1.5, opacity: .85 }}>
                        {s.desc}
                      </div>
                    )}
                  </div>

                  {/* Type badge */}
                  <div className="schedule-badges" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <span style={{
                      padding: '3px 9px', borderRadius: 999, fontSize: 15.5, letterSpacing: '.16em',
                      fontFamily: 'var(--ff-mono)',
                      background: dark ? 'rgba(255,255,255,.08)' : '#FFFCF7',
                      border: `0.5px solid ${p.rule}`, color: p.textSoft,
                      whiteSpace: 'nowrap',
                    }}>{s.type}</span>
                    {isPast && (
                      <span style={{
                        padding: '2px 8px', borderRadius: 999, fontSize: 15, letterSpacing: '.14em',
                        fontFamily: 'var(--ff-mono)',
                        background: 'transparent',
                        border: `0.5px solid ${p.rule}`, color: p.textSoft,
                        whiteSpace: 'nowrap', opacity: .6,
                      }}>ENDED</span>
                    )}
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
      <style>{`
        @media (max-width: 520px) {
          .schedule-event {
            grid-template-columns: 52px minmax(0, 1fr) !important;
            gap: 12px !important;
          }

          .schedule-badges {
            grid-column: 2 !important;
            align-items: flex-start !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            margin-top: 2px;
          }

          .schedule-event * {
            overflow-wrap: anywhere;
          }

          .schedule-event-list {
            overflow: hidden;
          }
        }
      `}</style>
    </section>
  )
}
