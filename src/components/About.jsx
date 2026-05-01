import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  AtSign,
  CalendarDays,
  Disc3,
  Globe2,
  Heart,
  Instagram,
  MessagesSquare,
  Music,
  Radio,
  Sparkles,
  Star,
  Users,
  WandSparkles,
  Youtube,
} from 'lucide-react'

const STATS = [
  { label: 'MEMBERS', value: '8', detail: 'eight voices', icon: Users },
  { label: 'DEBUT', value: '2025.02.24', detail: 'with The Chase', icon: CalendarDays },
  { label: 'LABEL', value: 'SM Entertainment', detail: 'official artist', icon: Music },
  { label: 'FANDOM', value: 'S2U', detail: 'stars to you', icon: Heart },
  { label: 'COLOR', value: 'Sky Blue', detail: '#87CEEB', icon: Sparkles },
  { label: 'SIGNAL', value: 'Connect', detail: 'hearts as one', icon: Radio },
]

const FEATURE_CARDS = [
  {
    label: 'CONCEPT',
    title: '清澈、夢感，並且帶著速度感。',
    body: 'Hearts2Hearts 將「心與心相連」轉化成明亮的流動感：像雲層、星點、信件與舞台燈光交疊，讓每一次回歸都像收到一封新的邀請。',
    icon: WandSparkles,
  },
  {
    label: 'IDENTITY',
    title: '八個座標，組成同一片天空。',
    body: '每位成員保留鮮明的個人色彩，合體時則收束成柔亮的 Sky Blue。這個站點延續同樣邏輯：資訊清楚、畫面有呼吸感、細節帶一點心動。',
    icon: Star,
  },
  {
    label: 'FAN HUB',
    title: '為 S2U 留一個可以慢慢逛的地方。',
    body: '關於成員、音樂、行程、影像與粉絲留言的入口都集中在這裡，像一本持續更新的線上 scrapbook，替每個時刻留下漂亮索引。',
    icon: MessagesSquare,
  },
]

const SOCIALS = [
  { name: 'Instagram', handle: '@hearts2hearts_official', accent: '#E1306C', icon: Instagram },
  { name: 'X', handle: '@Hearts2Hearts', accent: '#1DA1F2', icon: AtSign },
  { name: 'YouTube', handle: 'Hearts2Hearts', accent: '#FF3B3B', icon: Youtube },
  { name: 'TikTok', handle: '@hearts2hearts', accent: '#111827', mark: '♪' },
  { name: 'Weverse', handle: 'Hearts2Hearts', accent: '#00C851', icon: MessagesSquare },
  { name: 'SMTOWN', handle: 'official updates', accent: '#5AB3D9', icon: Globe2 },
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
        : 'linear-gradient(150deg, rgba(255,252,247,.96), rgba(230,244,251,.92))',
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
    panel: '#FFFCF7',
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
              Hearts2Hearts 是 SM Entertainment 於 2025 年推出的八人女團。這個區塊重新整理為一張更現代的品牌名片：
              保留網站原有的天空藍、奶油紙感與細緻線條，同時用更乾淨的資訊層級呈現團體定位、粉絲連結與官方入口。
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
                background: dark ? 'rgba(21,34,74,.92)' : 'rgba(255,252,247,.94)',
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 16,
          marginTop: 16,
        }}>
          <motion.article {...fadeUp(0)} style={{
            gridColumn: 'span 2',
            minHeight: 320,
            padding: 'clamp(26px, 4vw, 42px)',
            borderRadius: 28,
            background: dark
              ? 'linear-gradient(145deg, rgba(21,34,74,.94), rgba(11,21,48,.78))'
              : 'linear-gradient(145deg, rgba(255,252,247,.96), rgba(230,244,251,.86))',
            border: `0.5px solid ${p.rule}`,
            boxShadow: p.shadow,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div aria-hidden="true" style={{
              position: 'absolute',
              right: '-9%',
              top: '-24%',
              width: 280,
              height: 280,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${dark ? 'rgba(135,206,235,.20)' : 'rgba(135,206,235,.46)'}, transparent 65%)`,
            }} />
            <div style={{
              position: 'relative',
              zIndex: 1,
              fontFamily: 'var(--ff-mono)',
              fontSize: 15.5,
              letterSpacing: '.24em',
              color: p.textMuted,
              marginBottom: 18,
            }}>
              EDITORIAL BRIEF · CONNECT HEARTS
            </div>
            <h3 className="ff-display" style={{
              position: 'relative',
              zIndex: 1,
              margin: 0,
              maxWidth: 640,
              fontStyle: 'italic',
              fontSize: 'clamp(30px, 4.8vw, 62px)',
              fontWeight: 500,
              lineHeight: .98,
              color: p.text,
            }}>
              Where eight stories become one bright pulse.
            </h3>
            <p style={{
              position: 'relative',
              zIndex: 1,
              margin: '20px 0 0',
              maxWidth: 670,
              fontSize: 19,
              lineHeight: 1.85,
              color: p.textSoft,
            }}>
              新版 ABOUT 不再只是資料羅列，而是像進入站點後的第二個開場：先用品牌敘事建立氛圍，
              再用可掃讀的資訊卡承接成員、出道、粉絲名與官方平台。畫面保留細線分隔與柔和底色，
              但加入更有當代感的軌道圖形、玻璃感資訊層與清楚的內容節奏。
            </p>
            <div style={{
              position: 'relative',
              zIndex: 1,
              marginTop: 26,
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
            }}>
              {['clear hierarchy', 'sky palette', 'fan-first archive'].map(item => (
                <span key={item} style={{
                  padding: '8px 13px',
                  borderRadius: 999,
                  background: dark ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.72)',
                  border: `0.5px solid ${p.rule}`,
                  color: p.textSoft,
                  fontFamily: 'var(--ff-mono)',
                  fontSize: 15.5,
                  letterSpacing: '.13em',
                }}>
                  {item}
                </span>
              ))}
            </div>
          </motion.article>

          <motion.aside {...fadeUp(1)} style={{
            minHeight: 320,
            padding: 'clamp(24px, 4vw, 34px)',
            borderRadius: 28,
            background: dark ? 'rgba(255,255,255,.055)' : 'rgba(255,252,247,.88)',
            border: `0.5px solid ${p.rule}`,
            boxShadow: p.shadow,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 24,
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: p.accent,
                fontFamily: 'var(--ff-mono)',
                fontSize: 15.5,
                letterSpacing: '.22em',
              }}>
                <Heart size={14} fill={p.blush} color={p.blush} />
                OFFICIAL FANDOM
              </div>
              <div className="ff-display" style={{
                marginTop: 18,
                fontStyle: 'italic',
                fontSize: 'clamp(56px, 8vw, 86px)',
                fontWeight: 500,
                lineHeight: .86,
                color: p.accent,
              }}>
                S2U
              </div>
              <p style={{ margin: '18px 0 0', fontSize: 18, lineHeight: 1.8, color: p.textSoft }}>
                S2U 承接「Stars to You」的意象，像把每位粉絲的光點送回舞台中央。這裡把粉絲名稱做成主要節點，
                讓 ABOUT 區塊同時是團體介紹，也是給 S2U 的入口。
              </p>
            </div>
            <button
              type="button"
              onClick={() => document.querySelector('#fanwall')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                appearance: 'none',
                border: `0.5px solid ${p.rule}`,
                borderRadius: 999,
                padding: '12px 16px',
                background: dark ? 'rgba(135,206,235,.13)' : '#E6F4FB',
                color: p.text,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                fontSize: 17,
                fontWeight: 650,
                letterSpacing: '.06em',
              }}
            >
              VISIT FAN WALL
              <ArrowUpRight size={15} />
            </button>
          </motion.aside>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: 16,
          marginTop: 16,
        }}>
          {FEATURE_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.article key={card.label} {...fadeUp(i)} whileHover={{ y: -4 }} style={{
                padding: '24px',
                borderRadius: 24,
                background: dark ? 'rgba(21,34,74,.72)' : 'rgba(255,252,247,.9)',
                border: `0.5px solid ${p.rule}`,
                boxShadow: dark ? 'none' : '0 18px 44px rgba(26,43,69,.07)',
              }}>
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: dark ? 'rgba(135,206,235,.12)' : '#E6F4FB',
                  marginBottom: 18,
                }}>
                  <Icon size={18} color={p.accent} />
                </div>
                <div style={{
                  fontFamily: 'var(--ff-mono)',
                  fontSize: 15.5,
                  letterSpacing: '.22em',
                  color: p.textMuted,
                  marginBottom: 10,
                }}>
                  {card.label}
                </div>
                <h3 style={{
                  margin: 0,
                  fontSize: 21.5,
                  lineHeight: 1.45,
                  color: p.text,
                  fontWeight: 700,
                }}>
                  {card.title}
                </h3>
                <p style={{ margin: '12px 0 0', fontSize: 18, lineHeight: 1.8, color: p.textSoft }}>
                  {card.body}
                </p>
              </motion.article>
            )
          })}
        </div>

        <motion.div {...fadeUp(0)} style={{
          marginTop: 16,
          padding: 'clamp(24px, 4vw, 36px)',
          borderRadius: 28,
          background: dark ? 'rgba(255,255,255,.045)' : 'rgba(255,252,247,.82)',
          border: `0.5px solid ${p.rule}`,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 18,
            alignItems: 'end',
            flexWrap: 'wrap',
            marginBottom: 20,
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--ff-mono)',
                fontSize: 15.5,
                letterSpacing: '.24em',
                color: p.textMuted,
                marginBottom: 10,
              }}>
                OFFICIAL SIGNALS · SNS HUB
              </div>
              <h3 className="ff-display" style={{
                margin: 0,
                fontStyle: 'italic',
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 500,
                color: p.text,
              }}>
                Follow the next pulse.
              </h3>
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              color: p.textSoft,
              fontSize: 17,
              letterSpacing: '.04em',
            }}>
              <Disc3 size={15} color={p.accent} />
              updates, stages, letters, behind-the-scenes
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: 12,
          }}>
            {SOCIALS.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.name}
                  {...fadeUp(i)}
                  whileHover={{ y: -3 }}
                  style={{
                    padding: 16,
                    borderRadius: 18,
                    background: dark ? 'rgba(255,255,255,.055)' : 'rgba(255,255,255,.72)',
                    border: `0.5px solid ${p.rule}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 13,
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: dark ? 'rgba(255,255,255,.07)' : '#FFFCF7',
                    color: s.accent,
                    boxShadow: dark ? 'none' : '0 8px 22px rgba(26,43,69,.08)',
                    fontWeight: 800,
                    fontSize: 22.5,
                  }}>
                    {Icon ? <Icon size={18} color={s.accent} /> : s.mark}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 18, fontWeight: 750, color: p.text }}>{s.name}</div>
                    <div style={{
                      marginTop: 3,
                      fontFamily: 'var(--ff-mono)',
                      fontSize: 15.5,
                      letterSpacing: '.07em',
                      color: p.textSoft,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {s.handle}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
