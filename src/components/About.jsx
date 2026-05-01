import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarDays,
  ExternalLink,
  Heart,
  Music,
  Radio,
  Sparkles,
  Users,
  X,
} from 'lucide-react'

const STATS = [
  {
    label: 'Accounts',
    value: '官方帳號',
    detail: 'social links',
    icon: Users,
    title: 'Official Accounts',
    description: 'Official Hearts2Hearts social media accounts and shop links.',
    links: [
      { label: 'Instagram', url: 'https://www.instagram.com/hearts2hearts/' },
      { label: 'X', url: 'https://x.com/Hearts2Hearts' },
      { label: 'YouTube', url: 'https://www.youtube.com/@hearts2hearts.official' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@hearts2hearts' },
      { label: 'Facebook', url: 'https://www.facebook.com/hearts2heartsH2H/' },
      { label: 'Weverse', url: 'https://weverse.io/hearts2hearts' },
      { label: 'Weverse Shop', url: 'https://shop.weverse.io/zh-tw/shop/USD/artists/213' },
      { label: 'Weibo', url: 'https://weibo.com/7971304015' },
      { label: 'bilibili', url: 'https://space.bilibili.com/3546824314980440/' },
      { label: 'Douyin', url: 'https://www.douyin.com/user/MS4wLjABAAAAM7nXa8ubHrjX2RSkcdsZQebBCbV1X-vnPurgQ8t8W584yHjzOtbiArIhr9Qrf8Ot' },
      { label: 'SMTOWN GLOBAL SHOP', url: 'https://global.shop.smtown.com/collections/hearts2hearts' },
    ],
  },
  {
    label: 'DEBUT',
    value: '2025.02.24',
    detail: 'with The Chase',
    icon: CalendarDays,
    title: '出道日',
    description: '團體於 2025 年 2 月 24 日以首張單曲專輯 The Chase 正式出道，將追逐夢想、彼此連結與青春能量作為初始故事。',
  },
  {
    label: 'LABEL',
    value: '所屬公司',
    detail: 'SM Entertainment',
    icon: Music,
    title: 'SM Entertainment',
    description: 'Hearts2Hearts是繼2020年aespa後，時隔五年再度推出女子團體；亦是SM娛樂進入『SM 3.0』時代後推出的首組女子團體。',
    links: [
      { label: 'SM Entertainment', url: 'https://www.smentertainment.com/' },
    ],
  },
  {
    label: 'FANDOM',
    value: '粉絲名稱',
    detail: 'S2U',
    icon: Heart,
    title: 'S2U',
    description: '『S2U』（韓語：하츄），讀作『Hearts U』。『S2U』的寓意囊括了：『S2』可看作是愛心的形狀之餘，『S』也代表了團體自身，並再加上代表粉絲的『U』，代表粉絲們將持續陪伴在團體身邊',
  },
  {
    label: 'COLOR',
    value: 'Sky Blue',
    detail: '#87CEEB',
    icon: Sparkles,
    title: '代表色',
    description: 'Sky Blue 帶有清澈、開闊與夢幻的感覺，呼應團體年輕、輕盈又帶一點未來感的視覺調性。',
  },
  {
    label: 'SIGNAL',
    value: 'Connect',
    detail: 'hearts as one',
    icon: Radio,
    title: '團體訊號',
    description: 'Connect 是團體介紹裡反覆出現的精神：成員、音樂、舞台與粉絲彼此連線，讓八個不同的故事匯成同一段節奏。',
  },
]

const TAGS = ['#S2U', '#하츠투하츠', '#Hearts2Hearts', '#H2H', '#SkyBlue']

const fadeUp = (i = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.52, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
})

function StatDetailModal({ stat, dark, palette, onClose }) {
  useEffect(() => {
    if (!stat) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [stat, onClose])

  if (!stat) return null

  const Icon = stat.icon

  return (
    <AnimatePresence>
      <motion.div
        key="stat-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .18 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: dark ? 'rgba(3,8,22,.68)' : 'rgba(10,16,35,.42)',
          backdropFilter: 'blur(7px)',
          WebkitBackdropFilter: 'blur(7px)',
          display: 'grid',
          placeItems: 'center',
          padding: 22,
        }}
      >
        <motion.div
          key="stat-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="stat-detail-heading"
          initial={{ opacity: 0, y: 18, scale: .96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: .98 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: 'min(520px, 100%)',
            borderRadius: 18,
            background: dark ? '#15224A' : '#F8FBFF',
            color: palette.text,
            border: `0.5px solid ${palette.rule}`,
            boxShadow: dark ? '0 26px 90px rgba(0,0,0,.42)' : '0 26px 90px rgba(26,43,69,.18)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            padding: '22px 24px 20px',
            background: dark
              ? 'linear-gradient(140deg, rgba(135,206,235,.18), rgba(255,138,168,.08))'
              : 'linear-gradient(140deg, rgba(230,244,251,.95), rgba(255,229,236,.75))',
            borderBottom: `0.5px solid ${palette.rule}`,
            position: 'relative',
          }}>
            <button
              type="button"
              onClick={onClose}
              aria-label="關閉詳細介紹"
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 34,
                height: 34,
                borderRadius: 999,
                border: 'none',
                background: dark ? 'rgba(255,255,255,.10)' : 'rgba(26,43,69,.08)',
                color: palette.text,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={15} />
            </button>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: dark ? 'rgba(135,206,235,.16)' : 'rgba(255,255,255,.82)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <Icon size={20} color={palette.accent} />
            </div>
            <div className="ff-mono" style={{
              fontSize: 15,
              letterSpacing: '.22em',
              color: palette.textMuted,
              marginBottom: 8,
            }}>
              {stat.label} / {stat.value}
            </div>
            <h3 id="stat-detail-heading" className="ff-display" style={{
              margin: 0,
              fontStyle: 'italic',
              fontSize: 34,
              fontWeight: 500,
              lineHeight: 1,
            }}>
              {stat.title}
            </h3>
          </div>
          <div style={{ padding: '22px 24px 26px' }}>
            <p style={{
              margin: 0,
              fontSize: 18.5,
              lineHeight: 1.8,
              color: palette.textSoft,
            }}>
              {stat.description}
            </p>
            {stat.links?.length > 0 && (
              <div style={{
                marginTop: 18,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                gap: 10,
              }}>
                {stat.links.map(link => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                      minHeight: 44,
                      padding: '10px 12px',
                      borderRadius: 10,
                      background: dark ? 'rgba(255,255,255,.07)' : 'rgba(26,43,69,.05)',
                      border: `0.5px solid ${palette.rule}`,
                      color: palette.text,
                      fontSize: 17,
                      fontWeight: 600,
                      lineHeight: 1.25,
                      overflowWrap: 'anywhere',
                    }}
                  >
                    <span>{link.label}</span>
                    <ExternalLink size={15} color={palette.accent} style={{ flexShrink: 0 }} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

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
  const [activeStat, setActiveStat] = useState(null)

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
    <>
    <StatDetailModal stat={activeStat} dark={dark} palette={p} onClose={() => setActiveStat(null)} />
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
              團體介紹 · HEARTS2HEARTS
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
              Hearts2Hearts 是 SM Entertainment 旗下 8 人女子團體，以「八顆心彼此連結」為核心概念，成員們將透過團體自身的音樂，以多樣化的情感及訊息與粉絲互相結合心意共同邁進。
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
              <motion.button
                type="button"
                key={s.label}
                {...fadeUp(i)}
                onClick={() => setActiveStat(s)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: .98 }}
                style={{
                minHeight: 148,
                padding: '22px 20px',
        background: dark ? 'rgba(21,34,74,.92)' : 'rgba(255,255,255,.80)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'var(--ff-body)',
                color: p.text,
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
              </motion.button>
            )
          })}
        </div>

      </div>
    </section>
    </>
  )
}
