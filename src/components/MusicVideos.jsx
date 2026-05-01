import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Clapperboard,
  ExternalLink,
  Film,
  Headphones,
  Library,
  ListMusic,
  Music2,
  Play,
  Sparkles,
} from 'lucide-react'
import { MUSIC_WORKS } from '../data/musicWorks.js'

const GROUPS = [
  { key: 'official', label: '官方作品', shortLabel: 'MV', icon: Film },
  { key: 'teasers', label: '預告與概念', shortLabel: 'TEASER', icon: Sparkles },
  { key: 'behind', label: '幕後花絮', shortLabel: 'BH2ND', icon: Clapperboard },
]

const TONES = {
  sky: { accent: '#43A9D7', wash: 'linear-gradient(135deg, rgba(91,193,232,.34), rgba(255,154,191,.18))' },
  blush: { accent: '#E95F8B', wash: 'linear-gradient(135deg, rgba(255,129,169,.32), rgba(154,202,255,.18))' },
  mint: { accent: '#49BFA9', wash: 'linear-gradient(135deg, rgba(93,214,190,.30), rgba(153,198,255,.18))' },
  night: { accent: '#8EA8FF', wash: 'linear-gradient(135deg, rgba(142,168,255,.34), rgba(255,119,166,.16))' },
}

function getYoutubeId(url) {
  return url.match(/[?&]v=([^&]+)/)?.[1] || ''
}

function getThumb(url) {
  const id = getYoutubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ''
}

function countVideos(work) {
  return GROUPS.reduce((total, group) => total + work.videos[group.key].length, 0)
}

function CoverCard({ work, active, dark, onSelect }) {
  const tone = TONES[work.tone] || TONES.sky

  return (
    <motion.button
      id={`mv-${work.slug}`}
      type="button"
      aria-expanded={active}
      aria-controls={`mv-detail-${work.slug}`}
      onClick={onSelect}
      className="music-cover-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: .36 }}
      style={{
        '--accent': tone.accent,
        '--wash': tone.wash,
        color: '#fff',
        borderColor: active ? tone.accent : (dark ? 'rgba(255,255,255,.16)' : 'rgba(65,112,158,.15)'),
      }}
    >
      <img src={getThumb(work.videos.official[0].url)} alt="" loading="lazy" />
      <span className="music-card-glow" />
      <span className="music-card-title ff-display">{work.title}</span>
    </motion.button>
  )
}

function Stat({ label, value, dark, accent }) {
  return (
    <div style={{
      border: `0.5px solid ${dark ? 'rgba(255,255,255,.14)' : 'rgba(47,74,116,.12)'}`,
      borderRadius: 8,
      background: dark ? 'rgba(255,255,255,.055)' : 'rgba(255,255,255,.62)',
      padding: '12px 14px',
      minWidth: 0,
    }}>
      <div style={{
        fontFamily: 'var(--ff-mono)',
        fontSize: 13.5,
        letterSpacing: '.14em',
        color: accent,
        marginBottom: 5,
      }}>
        {label}
      </div>
      <div style={{ fontSize: 17, lineHeight: 1.45, overflowWrap: 'anywhere' }}>
        {value}
      </div>
    </div>
  )
}

function VideoCard({ item, dark, accent, groupLabel }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="music-video-card"
      style={{
        color: dark ? '#F8FAFF' : '#1A2B45',
        background: dark ? 'rgba(255,255,255,.052)' : 'rgba(255,255,255,.72)',
        borderColor: dark ? 'rgba(255,255,255,.13)' : 'rgba(47,74,116,.11)',
      }}
    >
      <span className="music-video-thumb" style={{ background: dark ? '#15224A' : '#EAF5FF' }}>
        <img src={getThumb(item.url)} alt="" loading="lazy" />
        <span className="music-play-badge">
          <Play size={16} color="#fff" fill="#fff" style={{ marginLeft: 2 }} />
        </span>
      </span>
      <span className="music-video-copy">
        <span style={{
          display: 'block',
          fontFamily: 'var(--ff-mono)',
          fontSize: 12.5,
          letterSpacing: '.14em',
          color: accent,
          marginBottom: 4,
        }}>
          {groupLabel}
        </span>
        <span style={{ display: 'block', fontSize: 16.5, lineHeight: 1.35, overflowWrap: 'anywhere' }}>
          {item.title}
        </span>
        {item.caption && (
          <span style={{
            display: 'block',
            marginTop: 4,
            color: dark ? 'rgba(248,250,255,.58)' : 'rgba(26,43,69,.58)',
            fontSize: 15,
            lineHeight: 1.35,
            overflowWrap: 'anywhere',
          }}>
            {item.caption}
          </span>
        )}
      </span>
    </a>
  )
}

function VideoGroup({ work, group, dark, accent }) {
  const Icon = group.icon
  const items = work.videos[group.key]

  return (
    <details className="music-video-group" open>
      <summary style={{
        color: dark ? '#F8FAFF' : '#1A2B45',
        borderColor: dark ? 'rgba(255,255,255,.12)' : 'rgba(47,74,116,.12)',
      }}>
        <Icon size={17} color={accent} />
        <span>{group.label}</span>
        <span>{items.length}</span>
      </summary>
      <div className="music-video-grid">
        {items.map(item => (
          <VideoCard
            key={`${work.slug}-${group.key}-${item.url}`}
            item={item}
            dark={dark}
            accent={accent}
            groupLabel={group.shortLabel}
          />
        ))}
      </div>
    </details>
  )
}

function DetailPanel({ work, dark }) {
  const tone = TONES[work.tone] || TONES.sky
  const p = dark ? {
    text: '#F8FAFF',
    soft: 'rgba(248,250,255,.62)',
    panel: 'rgba(12,24,54,.78)',
    rule: 'rgba(255,255,255,.12)',
  } : {
    text: '#1A2B45',
    soft: 'rgba(26,43,69,.62)',
    panel: 'rgba(255,255,255,.72)',
    rule: 'rgba(47,74,116,.12)',
  }

  return (
    <motion.article
      id={`mv-detail-${work.slug}`}
      className="music-detail-panel"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .34 }}
      style={{
        background: p.panel,
        borderColor: p.rule,
        color: p.text,
      }}
    >
      <div className="music-detail-hero">
        <div className="music-detail-cover" style={{ background: dark ? '#162452' : '#EAF5FF' }}>
          <img src={getThumb(work.videos.official[0].url)} alt="" loading="lazy" />
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="music-detail-kicker" style={{ color: tone.accent }}>
            {work.category}
          </div>
          <h3 className="ff-display" style={{
            margin: 0,
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 'clamp(42px, 8vw, 92px)',
            lineHeight: .88,
          }}>
            {work.title}
          </h3>
          <p style={{
            margin: '18px 0 0',
            color: p.soft,
            fontSize: 18,
            lineHeight: 1.75,
            maxWidth: 820,
          }}>
            {work.summary}
          </p>

          <div className="music-action-row">
            {work.streaming.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="music-stream-link"
                style={{
                  color: p.text,
                  borderColor: p.rule,
                  background: dark ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.72)',
                }}
              >
                {link.name === 'Spotify' ? <Headphones size={16} color={link.tone} /> : <Music2 size={16} color={link.tone} />}
                <span>{link.name}</span>
                <ExternalLink size={13} color={p.soft} />
              </a>
            ))}
            {work.pages.map(page => (
              <a
                key={page.url}
                href={page.url}
                target="_blank"
                rel="noreferrer"
                className="music-stream-link"
                style={{
                  color: p.text,
                  borderColor: p.rule,
                  background: dark ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.56)',
                }}
              >
                <ExternalLink size={14} color={tone.accent} />
                <span>{page.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="music-stat-grid">
        <Stat label="收錄曲目" value={work.tracks.join(' / ')} dark={dark} accent={tone.accent} />
        <Stat label="影片總數" value={`${countVideos(work)} 支`} dark={dark} accent={tone.accent} />
        <Stat label="原站資料" value={`${work.pages.length} 頁`} dark={dark} accent={tone.accent} />
      </div>

      <div className="music-groups">
        {GROUPS.map(group => (
          <VideoGroup key={`${work.slug}-${group.key}`} work={work} group={group} dark={dark} accent={tone.accent} />
        ))}
      </div>
    </motion.article>
  )
}

export function MusicVideos({ dark }) {
  const [activeSlug, setActiveSlug] = useState(null)
  const activeWork = useMemo(
    () => MUSIC_WORKS.find(work => work.slug === activeSlug),
    [activeSlug],
  )

  useEffect(() => {
    const syncFromHash = () => {
      const slug = window.location.hash.replace('#mv-', '')
      if (MUSIC_WORKS.some(work => work.slug === slug)) setActiveSlug(slug)
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  const p = dark ? {
    bg: 'linear-gradient(180deg, #071229 0%, #101D45 48%, #18214F 100%)',
    text: '#F8FAFF',
    textSoft: 'rgba(248,250,255,.62)',
    rule: 'rgba(255,255,255,.12)',
    accent: '#87CEEB',
  } : {
    bg: 'linear-gradient(180deg, #EEF8FF 0%, #FFF4FB 46%, #F3FBFF 100%)',
    text: '#1A2B45',
    textSoft: 'rgba(26,43,69,.60)',
    rule: 'rgba(47,74,116,.12)',
    accent: '#49A9D7',
  }

  return (
    <section id="mv" aria-labelledby="mv-heading" className="music-section" style={{
      background: p.bg,
      color: p.text,
      fontFamily: 'var(--ff-body)',
    }}>
      <div className="music-intro" style={{ borderBottomColor: p.rule }}>
        <div style={{
          fontFamily: 'var(--ff-mono)',
          fontSize: 16,
          letterSpacing: '.22em',
          color: p.textSoft,
          marginBottom: 14,
        }}>
          MUSIC WORKS / 音樂作品
        </div>
        <div className="music-heading-row">
          <h2 id="mv-heading" className="ff-display" style={{
            margin: 0,
            fontStyle: 'italic',
            fontSize: 'clamp(38px, 6vw, 82px)',
            fontWeight: 500,
            lineHeight: .9,
          }}>
            音樂作品 <span style={{ color: p.accent }}>archive.</span>
          </h2>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: p.textSoft,
            fontFamily: 'var(--ff-mono)',
            fontSize: 15,
            letterSpacing: '.16em',
          }}>
            <ListMusic size={16} color={p.accent} />
            {MUSIC_WORKS.length} WORKS
          </div>
        </div>

        <nav className="music-source-menu" aria-label="音樂作品選單">
          {MUSIC_WORKS.map(work => (
            <a
              key={work.slug}
              href={`#mv-${work.slug}`}
              onClick={() => setActiveSlug(work.slug)}
              style={{
                color: p.text,
                borderColor: activeSlug === work.slug ? p.accent : p.rule,
                background: dark ? 'rgba(255,255,255,.05)' : 'rgba(255,255,255,.56)',
              }}
            >
              {work.title}
            </a>
          ))}
        </nav>
      </div>

      <div className="music-cover-grid">
        {MUSIC_WORKS.map(work => (
          <div className="music-card-slot" key={work.slug}>
            <CoverCard
              work={work}
              active={activeSlug === work.slug}
              dark={dark}
              onSelect={() => setActiveSlug(activeSlug === work.slug ? null : work.slug)}
            />
            {activeWork?.slug === work.slug && <DetailPanel work={activeWork} dark={dark} />}
          </div>
        ))}
      </div>

      <style>{`
        .music-section {
          position: relative;
          overflow: hidden;
        }

        .music-intro {
          padding: clamp(42px, 7vw, 82px) clamp(22px, 5vw, 64px) clamp(24px, 4vw, 42px);
          border-bottom: 0.5px solid;
        }

        .music-heading-row {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
        }

        .music-source-menu {
          display: flex;
          gap: 8px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .music-source-menu a,
        .music-stream-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 38px;
          border: 0.5px solid;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 16px;
          transition: transform .2s ease, border-color .2s ease, background .2s ease;
        }

        .music-source-menu a:hover,
        .music-stream-link:hover,
        .music-video-card:hover {
          transform: translateY(-2px);
        }

        .music-cover-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(14px, 2vw, 22px);
          padding: clamp(24px, 5vw, 60px) clamp(22px, 5vw, 64px) clamp(42px, 7vw, 86px);
        }

        .music-card-slot {
          display: contents;
        }

        .music-cover-card {
          position: relative;
          min-height: clamp(290px, 30vw, 430px);
          border: 0.5px solid;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          padding: 0;
          text-align: left;
          background: #102350;
          isolation: isolate;
          box-shadow: 0 24px 60px rgba(35, 80, 132, .14);
        }

        .music-cover-card img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          transition: transform .36s ease, filter .36s ease;
        }

        .music-cover-card::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(180deg, rgba(8,18,40,.08) 0%, rgba(8,18,40,.18) 42%, rgba(8,18,40,.78) 100%),
            var(--wash);
          mix-blend-mode: normal;
        }

        .music-cover-card:hover img,
        .music-cover-card[aria-expanded="true"] img {
          transform: scale(1.07);
          filter: saturate(1.06) contrast(1.04);
        }

        .music-card-glow {
          position: absolute;
          inset: auto 16px 16px 16px;
          height: 1px;
          z-index: 2;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: .82;
        }

        .music-card-title {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 28px;
          z-index: 2;
          font-size: clamp(38px, 5vw, 72px);
          font-style: italic;
          line-height: .86;
          overflow-wrap: anywhere;
          text-shadow: 0 10px 30px rgba(0,0,0,.35);
        }

        .music-detail-panel {
          grid-column: 1 / -1;
          border: 0.5px solid;
          border-radius: 8px;
          overflow: hidden;
          backdrop-filter: blur(22px);
          box-shadow: 0 28px 80px rgba(35, 80, 132, .14);
        }

        .music-detail-hero {
          display: grid;
          grid-template-columns: minmax(220px, 360px) minmax(0, 1fr);
          gap: clamp(20px, 4vw, 42px);
          padding: clamp(22px, 4vw, 42px);
          align-items: center;
        }

        .music-detail-cover {
          aspect-ratio: 1 / 1;
          border-radius: 8px;
          overflow: hidden;
        }

        .music-detail-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .music-detail-kicker {
          font-family: var(--ff-mono);
          font-size: 14px;
          letter-spacing: .18em;
          margin-bottom: 12px;
        }

        .music-action-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }

        .music-stat-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          padding: 0 clamp(22px, 4vw, 42px) clamp(20px, 3vw, 30px);
        }

        .music-groups {
          padding: 0 clamp(22px, 4vw, 42px) clamp(24px, 4vw, 42px);
          display: grid;
          gap: 12px;
        }

        .music-video-group summary {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          padding: 15px 0;
          list-style: none;
          border-top: 0.5px solid;
        }

        .music-video-group summary::-webkit-details-marker {
          display: none;
        }

        .music-video-group summary span:first-of-type {
          font-family: var(--ff-mono);
          font-size: 15px;
          letter-spacing: .16em;
        }

        .music-video-group summary span:last-of-type {
          margin-left: auto;
          opacity: .58;
          font-size: 16px;
        }

        .music-video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(282px, 1fr));
          gap: 10px;
          padding-bottom: 12px;
        }

        .music-video-card {
          display: grid;
          grid-template-columns: 98px minmax(0, 1fr);
          min-height: 76px;
          border: 0.5px solid;
          border-radius: 8px;
          overflow: hidden;
          transition: transform .2s ease, border-color .2s ease, background .2s ease;
        }

        .music-video-thumb {
          position: relative;
          min-height: 76px;
        }

        .music-video-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: .94;
        }

        .music-play-badge {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,.26);
        }

        .music-video-copy {
          padding: 10px 12px;
          min-width: 0;
        }

        @media (max-width: 1120px) {
          .music-cover-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .music-cover-grid {
            grid-template-columns: 1fr;
          }

          .music-cover-card {
            min-height: 320px;
          }

          .music-detail-hero {
            grid-template-columns: 1fr;
          }

          .music-detail-cover {
            aspect-ratio: 16 / 10;
          }

          .music-stat-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .music-video-grid {
            grid-template-columns: 1fr;
          }

          .music-video-card {
            grid-template-columns: 88px minmax(0, 1fr);
          }
        }
      `}</style>
    </section>
  )
}
