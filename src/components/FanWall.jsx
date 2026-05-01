import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, TrendingUp } from 'lucide-react'
import { FAN_MESSAGES } from '../data/index.js'

const NOTE_COLORS = {
  sky:   { bg: '#E6F4FB', tape: '#5AB3D9' },
  blush: { bg: '#FFE5EC', tape: '#FF8AA8' },
  cream: { bg: '#F5F0FF', tape: '#9EA7FF' },
}

const TRENDING = [
  ['#H2H_1YEAR',      482],
  ['#우리의새벽',      312],
  ['#H2HOUSE',        268],
  ['#Connect_Hearts', 198],
  ['#Stella_voice',   134],
]

const TONES = ['sky', 'blush', 'cream']

export function FanWall({ dark }) {
  const [messages, setMessages] = useState(FAN_MESSAGES)
  const [draft, setDraft] = useState('')
  const [draftTone, setDraftTone] = useState('sky')
  const [draftTag, setDraftTag] = useState('')

  const p = dark ? {
    bg: '#0B1530', panel: '#15224A', text: '#F8FAFF', textSoft: 'rgba(248,250,255,.62)',
    rule: 'rgba(255,255,255,.16)', accent: '#87CEEB',
  } : {
    bg: 'linear-gradient(180deg, #F3FAFF 0%, #FFF4FA 50%, #F4F2FF 100%)', panel: 'rgba(255,255,255,.68)', text: '#1A2B45', textSoft: 'rgba(26,43,69,.58)',
    rule: 'rgba(26,43,69,.10)', accent: '#5AB3D9',
  }

  const handlePost = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    setMessages(prev => [{
      name: '@你',
      msg: trimmed,
      tag: draftTag ? `#${draftTag}` : '#H2H_S2U',
      tone: draftTone,
    }, ...prev])
    setDraft('')
    setDraftTag('')
  }

  return (
    <section id="fanwall" aria-labelledby="fanwall-heading" style={{
      background: p.bg, color: p.text, fontFamily: 'var(--ff-body)',
    }}>
      {/* Header */}
      <div style={{
        padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px) clamp(24px, 3vw, 40px)',
        borderBottom: `0.5px solid ${p.rule}`,
      }}>
        <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 16.5, letterSpacing: '.24em', color: p.textSoft, marginBottom: 14 }}>
          FAN WALL · {messages.length + 1278} LETTERS · LIVE
        </div>
        <h2 id="fanwall-heading" className="ff-display" style={{
          margin: 0, fontStyle: 'italic', fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 500, lineHeight: .95,
        }}>
          Letters from <span style={{ color: p.accent }}>S2U.</span>
        </h2>
        <p style={{ maxWidth: 560, fontSize: 19, lineHeight: 1.7, color: p.textSoft, marginTop: 18 }}>
          匿名或具名都行。每一封都是寫給 Hearts2Hearts 的心聲。
        </p>
      </div>

      {/* Composer + Trending */}
      <div style={{
        padding: 'clamp(24px, 4vw, 40px) clamp(24px, 5vw, 64px)',
        background: p.panel, borderBottom: `0.5px solid ${p.rule}`,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {/* Composer */}
          <div>
            <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 16.5, letterSpacing: '.22em', color: p.textSoft, marginBottom: 10 }}>
              ✉ WRITE A LETTER
            </div>
            <div style={{
              background: dark ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.76)',
              border: `0.5px solid ${p.rule}`, borderRadius: 12, padding: 18,
            }}>
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handlePost() }}
                placeholder="寫下你想對 Hearts2Hearts 說的話…"
                aria-label="寫信內容"
                style={{
                  width: '100%', minHeight: 80, resize: 'vertical',
                  background: 'transparent', border: 'none', outline: 'none',
                  fontFamily: 'var(--ff-script)', fontSize: 23, lineHeight: 1.5,
                  color: p.text, caretColor: p.accent,
                }}
              />

              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginTop: 14, paddingTop: 14, borderTop: `0.5px solid ${p.rule}`,
                flexWrap: 'wrap', gap: 10,
              }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* Tone picker */}
                  {TONES.map(t => (
                    <button key={t} onClick={() => setDraftTone(t)}
                      aria-label={`選擇 ${t} 色調`}
                      aria-pressed={draftTone === t}
                      style={{
                        width: 22, height: 22, borderRadius: 6,
                        background: NOTE_COLORS[t].bg, cursor: 'pointer',
                        border: draftTone === t ? `1.5px solid ${p.accent}` : `0.5px solid ${p.rule}`,
                        appearance: 'none',
                      }}
                    />
                  ))}
                  {/* Tag input */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: p.accent, fontWeight: 600 }}>#</span>
                    <input
                      value={draftTag}
                      onChange={e => setDraftTag(e.target.value.replace(/\s/g, '_'))}
                      placeholder="加標籤"
                      aria-label="標籤"
                      style={{
                        background: 'transparent', border: 'none', outline: 'none',
                        fontFamily: 'var(--ff-body)', fontSize: 17, color: p.text,
                        width: 90,
                      }}
                    />
                  </div>
                </div>

                <PostButton onClick={handlePost} dark={dark} />
              </div>
            </div>
          </div>

          {/* Trending */}
          <div>
            <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 16.5, letterSpacing: '.22em', color: p.textSoft, marginBottom: 10 }}>
              # TRENDING
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {TRENDING.map(([tag, n]) => (
                <li key={tag} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  padding: '8px 14px', borderRadius: 8,
                    background: dark ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.72)',
                  border: `0.5px solid ${p.rule}`,
                }}>
                  <span style={{ fontSize: 18, color: p.text, fontWeight: 500 }}>{tag}</span>
                  <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.18em', color: p.textSoft }}>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Notes wall */}
      <div style={{ padding: 'clamp(28px, 4vw, 48px) clamp(24px, 5vw, 64px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 'clamp(16px, 2.5vw, 28px)',
        }}>
          {messages.map((m, i) => {
            const c = NOTE_COLORS[m.tone] || NOTE_COLORS.sky
            const tilt = (i % 2 === 0 ? -1 : 1) * (1 + (i % 3))
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, scale: .95, rotate: tilt }}
                whileInView={{ opacity: 1, scale: 1, rotate: tilt }}
                whileHover={{ rotate: 0, y: -4, scale: 1.01 }}
                viewport={{ once: true }}
                transition={{ duration: .4, delay: (i % 6) * .06 }}
                style={{
                  position: 'relative', padding: '28px 22px 22px',
                  background: c.bg, color: '#1A2B45',
                  boxShadow: '0 12px 28px rgba(26,43,69,.18)',
                  cursor: 'default',
                }}
                aria-label={`來自 ${m.name} 的留言`}
              >
                {/* Tape */}
                <div aria-hidden="true" style={{
                  position: 'absolute', top: -8, left: '50%',
                  transform: 'translateX(-50%) rotate(-3deg)',
                  width: 64, height: 18, background: c.tape, opacity: .6,
                  boxShadow: '0 1px 2px rgba(0,0,0,.06)',
                }} />

                <p className="ff-script" style={{
                  fontSize: 21.5, lineHeight: 1.55, color: '#1A2B45', minHeight: 80,
                  margin: 0,
                }}>
                  {m.msg}
                </p>

                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  marginTop: 14, paddingTop: 12, borderTop: '1px dashed rgba(26,43,69,.2)',
                }}>
                  <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.18em', color: 'rgba(26,43,69,.7)' }}>
                    {m.name}
                  </span>
                  <span style={{ fontSize: 15.5, color: '#5AB3D9', fontWeight: 600 }}>{m.tag}</span>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function PostButton({ onClick, dark }) {
  const [hovered, setHovered] = useState(false)
  const shadow = dark ? '#5AB3D9' : '#1A2B45'
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="發佈留言"
      style={{
        appearance: 'none', border: 'none', cursor: 'pointer', position: 'relative',
        padding: '10px 22px 10px 42px',
                  background: dark ? '#F8FAFF' : '#F8FBFF', color: '#1A2B45',
        fontFamily: 'var(--ff-display)', fontStyle: 'italic', fontWeight: 600, fontSize: 14,
        boxShadow: hovered
          ? `4px 4px 0 0 ${shadow}`
          : `3px 3px 0 0 ${shadow}`,
        transform: hovered ? 'translate(-1px,-1px)' : 'none',
        transition: 'transform .2s, box-shadow .2s',
      }}
    >
      <span style={{
        position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%) rotate(-8deg)',
        width: 24, height: 24, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 30%, #FFB0C4 0%, #FF6F8E 55%, #C73B5C 100%)',
        boxShadow: 'inset 0 -1px 3px rgba(0,0,0,.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Heart size={12} color="rgba(255,255,255,.9)" fill="rgba(255,255,255,.9)" />
      </span>
      送出
    </button>
  )
}
