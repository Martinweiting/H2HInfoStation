import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Globe2, Link2, X } from 'lucide-react'
import { MEMBERS } from '../data/index.js'

const TONE_STYLES = {
  sky: {
    tint: '#E6F4FB',
    accent: '#5AB3D9',
    accentSoft: 'rgba(90,179,217,.16)',
    text: '#164866',
  },
  blush: {
    tint: '#FFE5EC',
    accent: '#FF8AA8',
    accentSoft: 'rgba(255,138,168,.18)',
    text: '#6B1A2E',
  },
  cream: {
    tint: '#F5F0FF',
    accent: '#8EA8FF',
    accentSoft: 'rgba(142,168,255,.18)',
    text: '#25365F',
  },
}

const FAN_SITE_LINKS = {
  Carmen: [
    'Lucky2clover_',
    'suarmentari',
    'ravi_carmen',
    'carmenitaisland',
    'vow060328',
  ],
  Jiwoo: [
    'Blue_jiwoo',
    'aile_907',
    's2ache_jw',
    'melody_jw907',
    'universe_jwh2h',
    'Gravity_jiwoo',
    '2days2jiwoo',
    'withyou_0907',
    'DOUX_jiwoo',
    '2_3_jw',
    'http__38',
    'Cake4jiwoo',
    'axuueo',
    'YPreviewJ_0612',
    'fraise_0907',
    'bjw_jiwoo',
    'syzygy_2110',
    'lili_jiwoo',
    'redamancy_jw',
    'cloud__jw',
    'HS2_koi_jw',
    'ouS2ouu',
    'HERSH_97',
    'dotdotdiary_',
    'DOUX_jw',
  ],
  Yuha: [
    'yuhappyplace',
    'Chocolate070412',
    'foryu_07',
    'cinema_yh',
    'seiran0412',
    'River_yuha',
    'Yurora_0412',
    'yuha_poetry',
    'yours_yh',
  ],
  Stella: [
    'Etoile_0618',
    'nekomo_st',
    'salty_stella',
    'StellaryNight',
    'sugar_dahyunstl',
    'GlowyStella',
    'Lumielle_0618',
    'polaris_0618',
    'S2Utaso',
    'T_Tiramisu618',
    'im_uaaii',
    'IntCelestella',
  ],
  Juun: [
    'Soar_1203',
    'Creamy_Ju123',
    'purplepearl1203',
    'Isaro1203',
    'romii22__',
  ],
  'A-na': [
    'DeerAna_1220',
    'AVENIR_1220',
    'cupidpink_',
    'muse_1220',
    'waaoai11',
  ],
  Ian: [
    'shizuku_9',
    'IanToT1009',
    'POPPINGUMMY1009',
    'Moonan09',
    'Idyllic_ian',
    'ianova_1009',
    'IAN_LoveLetter',
    'Iankongee',
    '52Hertz_ian',
    'I_Andlove',
    'shizuku9',
    'kissbye0',
  ],
  'Ye-on': [
    'onfor19',
    'iam_nayeonist',
    'yee5n_i',
    'HoneyBear0419',
    'Ayla_yeon',
  ],
}

const FAN_SITE_PHOTOS = {
  Carmen: '/images/fan-sites/carmen.jpg',
  Jiwoo: '/images/fan-sites/jiwoo.jpg',
  Yuha: '/images/fan-sites/yuha.jpg',
  Stella: '/images/fan-sites/stella.jpg',
  Juun: '/images/fan-sites/juun.jpg',
  'A-na': '/images/fan-sites/a-na.jpg',
  Ian: '/images/fan-sites/ian.jpg',
  'Ye-on': '/images/fan-sites/ye-on.jpg',
}

function photoFor(member) {
  return FAN_SITE_PHOTOS[member.en] || null
}

function normalizeHandle(handle) {
  return handle
    .trim()
    .replace(/^https?:\/\/(?:www\.)?x\.com\//i, '')
    .replace(/^x\.com\//i, '')
    .replace(/^@/, '')
    .replace(/[/?#].*$/, '')
}

function sitesFor(member) {
  const handles = FAN_SITE_LINKS[member.en] || []
  const seen = new Set()

  return handles.reduce((sites, rawHandle) => {
    const handle = normalizeHandle(rawHandle)
    const key = handle.toLowerCase()
    if (!handle || seen.has(key)) return sites
    seen.add(key)
    sites.push({
      handle,
      label: `${member.en} @${handle}`,
      url: `https://x.com/${handle}`,
    })
    return sites
  }, [])
}

function FanSiteModal({ member, dark, onClose }) {
  const tone = TONE_STYLES[member?.tone] || TONE_STYLES.sky
  const sites = member ? sitesFor(member) : []

  useEffect(() => {
    if (!member) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [member, onClose])

  return (
    <AnimatePresence>
      {member && (
        <>
          <motion.div
            key="fansite-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(10,16,35,.58)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />
          <motion.div
            key="fansite-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fansite-modal-title"
            initial={{ opacity: 0, y: 22, scale: .96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: .97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              translate: '-50% -50%',
              zIndex: 1001,
              width: 'min(640px, calc(100vw - 32px))',
              maxHeight: 'calc(100vh - 40px)',
              overflowY: 'auto',
              borderRadius: 18,
              background: dark ? '#101D45' : '#F8FBFF',
              border: dark ? '1px solid rgba(255,255,255,.14)' : '1px solid rgba(26,43,69,.10)',
              boxShadow: dark ? '0 24px 70px rgba(0,0,0,.44)' : '0 24px 70px rgba(26,43,69,.22)',
              color: dark ? '#F8FAFF' : '#1A2B45',
              fontFamily: 'var(--ff-body)',
            }}
          >
            <div style={{
              position: 'relative',
              padding: '28px clamp(22px, 5vw, 34px) 24px',
              background: dark
                ? `linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.02)), ${tone.accentSoft}`
                : `linear-gradient(145deg, ${tone.tint}, #F8FBFF 78%)`,
              borderBottom: dark ? '1px solid rgba(255,255,255,.10)' : '1px solid rgba(26,43,69,.08)',
            }}>
              <button
                className="fansite-modal-close"
                onClick={onClose}
                aria-label="關閉站子蒐集彈窗"
                style={{
                  position: 'absolute',
                  top: 18,
                  right: 18,
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: dark ? 'rgba(255,255,255,.10)' : 'rgba(26,43,69,.08)',
                  color: dark ? '#F8FAFF' : '#1A2B45',
                }}
              >
                <X size={16} />
              </button>
              <div style={{
                fontFamily: 'var(--ff-mono)',
                fontSize: 15,
                letterSpacing: '.24em',
                color: dark ? 'rgba(248,250,255,.54)' : 'rgba(26,43,69,.48)',
                marginBottom: 10,
              }}>
                MEMBER SITE COLLECTION
              </div>
              <h3 id="fansite-modal-title" className="ff-display" style={{
                margin: 0,
                fontStyle: 'italic',
                fontSize: 'clamp(34px, 7vw, 58px)',
                lineHeight: .95,
                fontWeight: 500,
              }}>
                {member.en}
                <span style={{ color: tone.accent }}> sites</span>
              </h3>
              <p style={{
                margin: '12px 0 0',
                fontSize: 18,
                lineHeight: 1.65,
                color: dark ? 'rgba(248,250,255,.70)' : 'rgba(26,43,69,.62)',
              }}>
                {member.zh}（{member.kr}）的相關網站清單。每筆連結皆會開啟對應的 X / Twitter 帳號。
              </p>
            </div>

            <div
              style={{
                padding: '24px clamp(22px, 5vw, 34px) 34px',
                display: 'grid',
                gap: 10,
              }}
            >
              {sites.map(site => (
                <a
                  className="fansite-link"
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto minmax(0, 1fr) auto',
                    alignItems: 'center',
                    gap: 14,
                    padding: 16,
                    borderRadius: 12,
                    background: dark ? 'rgba(255,255,255,.06)' : '#FFFFFF',
                    border: dark ? '1px solid rgba(255,255,255,.12)' : '1px solid rgba(26,43,69,.10)',
                    boxShadow: dark ? 'none' : '0 10px 24px rgba(26,43,69,.08)',
                  }}
                >
                  <span style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: tone.accentSoft,
                    color: tone.accent,
                  }}>
                    <Globe2 size={20} />
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span style={{
                      display: 'block',
                      fontSize: 19,
                      fontWeight: 700,
                      color: dark ? '#F8FAFF' : '#1A2B45',
                    }}>
                      {site.label}
                    </span>
                    <span style={{
                      display: 'block',
                      marginTop: 3,
                      fontSize: 15.5,
                      color: dark ? 'rgba(248,250,255,.54)' : 'rgba(26,43,69,.52)',
                      overflowWrap: 'anywhere',
                    }}>
                      {site.url}
                    </span>
                  </span>
                  <ExternalLink size={18} color={tone.accent} />
                </a>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function FanSiteCard({ member, index, dark, onOpen }) {
  const tone = TONE_STYLES[member.tone] || TONE_STYLES.sky
  const siteCount = sitesFor(member).length
  const photo = photoFor(member)
  const imageSlotHeight = 248

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(member)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: .42, delay: index * .035 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: .98 }}
      className="fansite-card"
      style={{
        appearance: 'none',
        border: dark ? '1px solid rgba(255,255,255,.12)' : '1px solid rgba(26,43,69,.10)',
        cursor: 'pointer',
        textAlign: 'left',
        minHeight: 292,
        borderRadius: 8,
        padding: 0,
        overflow: 'hidden',
        background: dark
          ? 'linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.035))'
          : 'linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 100%)',
        color: dark ? '#F8FAFF' : '#1A2B45',
        boxShadow: dark ? '0 18px 34px rgba(0,0,0,.24)' : '0 16px 34px rgba(26,43,69,.10)',
        display: 'grid',
        gridTemplateRows: `${imageSlotHeight}px auto`,
      }}
    >
      <div className="fansite-image-slot" style={{
        position: 'relative',
        height: imageSlotHeight,
        padding: 10,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: dark
          ? 'linear-gradient(135deg, rgba(248,250,255,.075), rgba(142,168,255,.055))'
          : 'linear-gradient(135deg, rgba(238,247,252,.92), rgba(246,242,255,.82))',
        borderBottom: dark ? '1px solid rgba(255,255,255,.10)' : '1px solid rgba(26,43,69,.08)',
      }}>
        {photo ? (
          <img
            src={photo}
            alt={`${member.en} fan site preview`}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center top',
              borderRadius: 6,
              display: 'block',
            }}
          />
        ) : (
          <div aria-hidden="true" style={{
            position: 'absolute',
            inset: 18,
            borderRadius: 6,
            border: dark ? '1px dashed rgba(255,255,255,.20)' : '1px dashed rgba(26,43,69,.18)',
            background: dark ? 'rgba(11,21,48,.16)' : 'rgba(255,255,255,.38)',
          }} />
        )}
      </div>

      <div style={{ padding: '18px 18px 20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 9,
        }}>
          <span className="ff-display" style={{
            fontSize: 31,
            fontStyle: 'italic',
            lineHeight: 1,
            fontWeight: 500,
          }}>
            {member.en}
          </span>
          <span style={{
            flexShrink: 0,
            width: 32,
            height: 32,
            borderRadius: 999,
            background: tone.accentSoft,
            color: tone.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Link2 size={16} />
          </span>
        </div>
        <div style={{
          fontSize: 17,
          lineHeight: 1.45,
          color: dark ? 'rgba(248,250,255,.64)' : 'rgba(26,43,69,.58)',
        }}>
          {member.zh} · {member.kr}
        </div>
        <div style={{
          marginTop: 16,
          paddingTop: 13,
          borderTop: dark ? '1px solid rgba(255,255,255,.10)' : '1px solid rgba(26,43,69,.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          fontFamily: 'var(--ff-mono)',
          fontSize: 14,
          letterSpacing: '.18em',
          color: dark ? 'rgba(248,250,255,.48)' : 'rgba(26,43,69,.44)',
        }}>
          <span>{siteCount} SITES</span>
          <span>OPEN</span>
        </div>
      </div>
    </motion.button>
  )
}

export function FanSites({ dark }) {
  const [activeMember, setActiveMember] = useState(null)

  const palette = dark ? {
    bg: 'linear-gradient(180deg, #101D45 0%, #0B1530 100%)',
    text: '#F8FAFF',
    textSoft: 'rgba(248,250,255,.60)',
    rule: 'rgba(255,255,255,.13)',
    panel: 'rgba(255,255,255,.06)',
  } : {
    bg: 'linear-gradient(180deg, #F8F2FF 0%, #EFF8FF 56%, #FFFFFF 100%)',
    text: '#1A2B45',
    textSoft: 'rgba(26,43,69,.58)',
    rule: 'rgba(26,43,69,.10)',
    panel: 'rgba(255,255,255,.70)',
  }

  return (
    <>
      <FanSiteModal member={activeMember} dark={dark} onClose={() => setActiveMember(null)} />
      <section id="fan-sites" aria-labelledby="fan-sites-heading" style={{
        background: palette.bg,
        color: palette.text,
        fontFamily: 'var(--ff-body)',
      }}>
        <div style={{
          padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px) clamp(22px, 3vw, 34px)',
          borderBottom: `0.5px solid ${palette.rule}`,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          alignItems: 'end',
          gap: 24,
        }} className="fansite-header">
          <div>
            <div style={{
              fontFamily: 'var(--ff-mono)',
              fontSize: 16,
              letterSpacing: '.24em',
              color: palette.textSoft,
              marginBottom: 14,
            }}>
              X Accounts / 站子蒐集
            </div>
            <h2 id="fan-sites-heading" className="ff-display" style={{
              margin: 0,
              fontStyle: 'italic',
              fontSize: 'clamp(34px, 5vw, 64px)',
              fontWeight: 500,
              lineHeight: .95,
            }}>
              Fan Site <span style={{ color: '#5AB3D9' }}>Index</span>
            </h2>
          </div>
          <div style={{
            justifySelf: 'end',
            maxWidth: 360,
            padding: '12px 14px',
            borderRadius: 8,
            background: palette.panel,
            border: `0.5px solid ${palette.rule}`,
            fontSize: 17,
            lineHeight: 1.55,
            color: palette.textSoft,
          }}>
           整理站子清單並列出，點擊直接開啟連結，歡迎提供站子使本份名單更為完整。
          </div>
        </div>

        <div className="fansite-grid" style={{
          padding: 'clamp(28px, 4vw, 50px) clamp(18px, 4vw, 56px) clamp(40px, 5vw, 72px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 'clamp(14px, 2.5vw, 24px)',
        }}>
          {MEMBERS.map((member, index) => (
            <FanSiteCard
              key={member.en}
              member={member}
              index={index}
              dark={dark}
              onOpen={setActiveMember}
            />
          ))}
        </div>

        <style>{`
          .fansite-card {
            transition: box-shadow .2s ease, border-color .2s ease;
          }

          .fansite-card:hover {
            border-color: ${dark ? 'rgba(255,255,255,.22)' : 'rgba(90,179,217,.36)'} !important;
            box-shadow: ${dark ? '0 24px 42px rgba(0,0,0,.34)' : '0 24px 44px rgba(26,43,69,.14)'} !important;
          }

          @media (max-width: 680px) {
            .fansite-header {
              grid-template-columns: minmax(0, 1fr) !important;
            }

            .fansite-header > div:last-child {
              justify-self: stretch !important;
              max-width: none !important;
            }

            .fansite-grid {
              grid-template-columns: minmax(0, 1fr) !important;
            }
          }

          @media (max-width: 480px) {
            .fansite-header {
              padding: 36px 18px 20px !important;
              gap: 16px !important;
            }

            .fansite-header h2 {
              font-size: 38px !important;
            }

            .fansite-grid {
              padding: 22px 18px 36px !important;
              gap: 12px !important;
            }

            .fansite-card {
              min-height: 0 !important;
              display: grid !important;
              grid-template-columns: 108px minmax(0, 1fr) !important;
              grid-template-rows: none !important;
              align-items: stretch !important;
            }

            .fansite-card:hover {
              transform: none !important;
            }

            .fansite-image-slot {
              height: auto !important;
              min-height: 130px !important;
              padding: 8px !important;
              border-bottom: 0 !important;
              border-right: ${dark ? '1px solid rgba(255,255,255,.10)' : '1px solid rgba(26,43,69,.08)'} !important;
            }

            .fansite-card > div:last-child {
              padding: 14px 14px 16px !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: center !important;
            }

            .fansite-card .ff-display {
              font-size: 26px !important;
            }

            .fansite-card > div:last-child > div:last-child {
              margin-top: 10px !important;
              padding-top: 10px !important;
              font-size: 13px !important;
            }

            .fansite-link {
              grid-template-columns: 42px minmax(0, 1fr) !important;
              min-height: 64px !important;
              padding: 12px !important;
              gap: 12px !important;
            }

            .fansite-link > span:last-child {
              display: none !important;
            }

            .fansite-modal-close {
              width: 44px !important;
              height: 44px !important;
              top: 12px !important;
              right: 12px !important;
            }
          }

          @media (min-width: 880px) {
            .fansite-grid {
              grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            }
          }

          @media (min-width: 1440px) {
            .fansite-grid {
              grid-template-columns: repeat(8, minmax(0, 1fr)) !important;
            }
          }
        `}</style>
      </section>
    </>
  )
}
