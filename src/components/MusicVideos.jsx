import { motion } from 'framer-motion'
import { Clapperboard, ExternalLink, Film, FolderOpen, ListMusic, Play, Sparkles } from 'lucide-react'
import { MUSIC_WORKS } from '../data/musicWorks.js'

const GROUPS = [
  { key: 'official', label: '主頁影片', shortLabel: 'MV', icon: Film },
  { key: 'teasers', label: '預告', shortLabel: 'TEASER', icon: Sparkles },
  { key: 'behind', label: '活動花絮', shortLabel: 'BH2ND', icon: Clapperboard },
]

const TONES = {
  sky: { accent: '#5AB3D9', soft: 'rgba(90,179,217,.14)', chip: '#DDF3FB' },
  blush: { accent: '#E86E90', soft: 'rgba(255,138,168,.16)', chip: '#FFE5EC' },
  cream: { accent: '#C7A76B', soft: 'rgba(199,167,107,.16)', chip: '#FFF6D8' },
  night: { accent: '#8EA8FF', soft: 'rgba(142,168,255,.16)', chip: '#E7EBFF' },
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

function Field({ label, value, dark, accent }) {
  return (
    <div style={{
      border: `0.5px solid ${dark ? 'rgba(255,255,255,.12)' : 'rgba(26,43,69,.1)'}`,
      borderRadius: 8,
      padding: '12px 14px',
      minWidth: 0,
      background: dark ? 'rgba(255,255,255,.035)' : 'rgba(255,255,255,.44)',
    }}>
      <div style={{
        fontFamily: 'var(--ff-mono)',
        fontSize: 13.5,
        letterSpacing: '.18em',
        color: accent,
        marginBottom: 6,
      }}>
        {label}
      </div>
      <div style={{ fontSize: 18, lineHeight: 1.45, overflowWrap: 'anywhere' }}>{value}</div>
    </div>
  )
}

function VideoCard({ item, dark, accent, groupLabel }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'grid',
        gridTemplateColumns: '96px minmax(0, 1fr)',
        minHeight: 74,
        border: `0.5px solid ${dark ? 'rgba(255,255,255,.12)' : 'rgba(26,43,69,.1)'}`,
        borderRadius: 8,
        overflow: 'hidden',
        background: dark ? 'rgba(255,255,255,.035)' : 'rgba(255,255,255,.52)',
      }}
    >
      <div style={{ position: 'relative', background: dark ? '#15224A' : '#FAF6F0' }}>
        <img
          src={getThumb(item.url)}
          alt=""
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: .92 }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,.24)',
        }}>
          <Play size={18} color="#fff" fill="#fff" style={{ marginLeft: 2 }} />
        </div>
      </div>
      <div style={{ padding: '10px 12px', minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--ff-mono)',
          fontSize: 12.5,
          letterSpacing: '.14em',
          color: accent,
          marginBottom: 4,
        }}>
          {groupLabel}
        </div>
        <div style={{
          color: dark ? '#F8FAFF' : '#1A2B45',
          fontSize: 17,
          lineHeight: 1.35,
          overflowWrap: 'anywhere',
        }}>
          {item.title}
        </div>
        {item.caption && (
          <div style={{
            marginTop: 4,
            color: dark ? 'rgba(248,250,255,.56)' : 'rgba(26,43,69,.56)',
            fontSize: 15.5,
            lineHeight: 1.35,
            overflowWrap: 'anywhere',
          }}>
            {item.caption}
          </div>
        )}
      </div>
    </a>
  )
}

function VideoGroup({ work, group, dark, accent }) {
  const Icon = group.icon
  const items = work.videos[group.key]

  return (
    <details className="music-video-group" open>
      <summary style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        color: dark ? '#F8FAFF' : '#1A2B45',
        padding: '14px 0',
        listStyle: 'none',
      }}>
        <Icon size={17} color={accent} />
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.18em' }}>{group.label}</span>
        <span style={{
          marginLeft: 'auto',
          color: dark ? 'rgba(248,250,255,.5)' : 'rgba(26,43,69,.5)',
          fontSize: 16,
        }}>
          {items.length}
        </span>
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

function WorkArticle({ work, index, dark }) {
  const tone = TONES[work.tone] || TONES.sky
  const p = dark ? {
    panel: '#0B1530',
    alt: '#15224A',
    text: '#F8FAFF',
    soft: 'rgba(248,250,255,.58)',
    rule: 'rgba(255,255,255,.1)',
  } : {
    panel: '#FFFCF7',
    alt: '#FAF6F0',
    text: '#1A2B45',
    soft: 'rgba(26,43,69,.58)',
    rule: 'rgba(26,43,69,.1)',
  }

  return (
    <motion.article
      id={`mv-${work.slug}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * .04, duration: .38 }}
      style={{
        scrollMarginTop: 92,
        borderTop: `0.5px solid ${p.rule}`,
        background: p.panel,
      }}
    >
      <div className="music-work-layout">
        <div className="music-cover" style={{ background: p.alt }}>
          <img
            src={getThumb(work.videos.official[0].url)}
            alt={`${work.title} thumbnail`}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: dark
              ? 'linear-gradient(180deg, rgba(11,21,48,.06), rgba(11,21,48,.72))'
              : 'linear-gradient(180deg, rgba(255,252,247,.02), rgba(26,43,69,.46))',
          }} />
          <div style={{
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 16,
            color: '#fff',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 12,
          }}>
            <div>
              <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 14, letterSpacing: '.18em', opacity: .78 }}>
                {work.category}
              </div>
              <div className="ff-display" style={{ fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1 }}>
                {work.title}
              </div>
            </div>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: 'rgba(255,255,255,.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,.36)',
              flexShrink: 0,
            }}>
              <Play size={17} color="#fff" fill="#fff" style={{ marginLeft: 2 }} />
            </div>
          </div>
        </div>

        <div style={{ minWidth: 0 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 10px',
            borderRadius: 999,
            background: dark ? tone.soft : tone.chip,
            color: dark ? '#F8FAFF' : '#1A2B45',
            marginBottom: 14,
          }}>
            <FolderOpen size={14} color={tone.accent} />
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 14, letterSpacing: '.16em' }}>
              {work.sourcePath}
            </span>
          </div>

          <h3 className="ff-display" style={{
            margin: 0,
            color: p.text,
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 'clamp(34px, 6vw, 72px)',
            lineHeight: .94,
          }}>
            {work.title}
          </h3>

          <p style={{
            margin: '16px 0 0',
            color: p.soft,
            fontSize: 19,
            lineHeight: 1.75,
            maxWidth: 760,
          }}>
            {work.summary}
          </p>

          <div className="music-field-grid">
            <Field label="分類" value={work.category} dark={dark} accent={tone.accent} />
            <Field label="曲目" value={work.tracks.join(' / ')} dark={dark} accent={tone.accent} />
            <Field label="影片總數" value={`${countVideos(work)} 支`} dark={dark} accent={tone.accent} />
            <Field label="來源頁數" value={`${work.pages.length} 頁`} dark={dark} accent={tone.accent} />
          </div>

          <div className="music-page-links">
            {work.pages.map(page => (
              <a
                key={page.url}
                href={page.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  color: p.text,
                  border: `0.5px solid ${p.rule}`,
                  borderRadius: 8,
                  padding: '8px 11px',
                  fontSize: 16,
                  background: dark ? 'rgba(255,255,255,.035)' : 'rgba(255,255,255,.45)',
                }}
              >
                <ExternalLink size={14} color={tone.accent} />
                <span>{page.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="music-groups" style={{ borderTop: `0.5px solid ${p.rule}` }}>
        {GROUPS.map(group => (
          <VideoGroup key={`${work.slug}-${group.key}`} work={work} group={group} dark={dark} accent={tone.accent} />
        ))}
      </div>
    </motion.article>
  )
}

export function MusicVideos({ dark }) {
  const p = dark ? {
    bg: '#0B1530',
    text: '#F8FAFF',
    textSoft: 'rgba(248,250,255,.58)',
    rule: 'rgba(255,255,255,.1)',
    accent: '#87CEEB',
  } : {
    bg: '#FFFCF7',
    text: '#1A2B45',
    textSoft: 'rgba(26,43,69,.55)',
    rule: 'rgba(26,43,69,.1)',
    accent: '#5AB3D9',
  }

  return (
    <section id="mv" aria-labelledby="mv-heading" style={{
      background: p.bg,
      color: p.text,
      fontFamily: 'var(--ff-body)',
    }}>
      <div style={{
        padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px) clamp(22px, 3vw, 34px)',
        borderBottom: `0.5px solid ${p.rule}`,
      }}>
        <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 16.5, letterSpacing: '.24em', color: p.textSoft, marginBottom: 14 }}>
          MUSIC WORKS / 音樂作品
        </div>
        <div className="music-heading-row">
          <h2 id="mv-heading" className="ff-display" style={{
            margin: 0,
            fontStyle: 'italic',
            fontSize: 'clamp(34px, 5vw, 70px)',
            fontWeight: 500,
            lineHeight: .95,
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

        <nav className="music-source-menu" aria-label="音樂作品子選單">
          {MUSIC_WORKS.map(work => (
            <a
              key={work.slug}
              href={`#mv-${work.slug}`}
              style={{
                color: p.text,
                border: `0.5px solid ${p.rule}`,
                background: dark ? 'rgba(255,255,255,.035)' : 'rgba(255,255,255,.45)',
              }}
            >
              {work.title}
            </a>
          ))}
        </nav>
      </div>

      <div>
        {MUSIC_WORKS.map((work, index) => (
          <WorkArticle key={work.slug} work={work} index={index} dark={dark} />
        ))}
      </div>

      <style>{`
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

        .music-source-menu a {
          display: inline-flex;
          align-items: center;
          min-height: 36px;
          border-radius: 8px;
          padding: 7px 12px;
          font-size: 17px;
          transition: transform .2s ease, border-color .2s ease;
        }

        .music-source-menu a:hover {
          transform: translateY(-1px);
        }

        .music-work-layout {
          display: grid;
          grid-template-columns: minmax(260px, 420px) minmax(0, 1fr);
          gap: clamp(22px, 4vw, 46px);
          padding: clamp(28px, 5vw, 58px) clamp(24px, 5vw, 64px);
          align-items: start;
        }

        .music-cover {
          position: sticky;
          top: 84px;
          aspect-ratio: 16 / 10;
          border-radius: 8px;
          overflow: hidden;
          min-height: 260px;
        }

        .music-field-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          margin-top: 22px;
        }

        .music-page-links {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }

        .music-groups {
          padding: 0 clamp(24px, 5vw, 64px) clamp(30px, 5vw, 58px);
          display: grid;
          gap: 12px;
        }

        .music-video-group summary::-webkit-details-marker {
          display: none;
        }

        .music-video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 10px;
          padding-bottom: 10px;
        }

        @media (max-width: 900px) {
          .music-work-layout {
            grid-template-columns: 1fr;
          }

          .music-cover {
            position: relative;
            top: auto;
            min-height: 220px;
          }

          .music-field-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 540px) {
          .music-field-grid {
            grid-template-columns: 1fr;
          }

          .music-video-grid {
            grid-template-columns: 1fr;
          }

          .music-video-grid a {
            grid-template-columns: 84px minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
