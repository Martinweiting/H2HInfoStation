import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clapperboard,
  ExternalLink,
  Film,
  Headphones,
  ListMusic,
  Music2,
  Play,
  Sparkles,
} from 'lucide-react'
import { MUSIC_WORKS } from '../data/musicWorks.js'

const DEFAULT_GROUPS = [
  { key: 'official', label: '官方作品', shortLabel: 'MV', icon: Film },
  { key: 'teasers', label: '預告與概念', shortLabel: 'TEASER', icon: Sparkles },
  { key: 'behind', label: '幕後花絮', shortLabel: 'BH2ND', icon: Clapperboard },
]

const TONES = {
  sky: { accent: '#43A9D7', wash: 'linear-gradient(135deg, rgba(91,193,232,.34), rgba(255,154,191,.18))' },
  blush: { accent: '#E95F8B', wash: 'linear-gradient(135deg, rgba(255,129,169,.32), rgba(154,202,255,.18))' },
  mint: { accent: '#49BFA9', wash: 'linear-gradient(135deg, rgba(93,214,190,.30), rgba(153,198,255,.18))' },
  coral: { accent: '#F0768E', wash: 'linear-gradient(135deg, rgba(240,118,142,.30), rgba(90,192,213,.20))' },
  remix: { accent: '#A56BFF', wash: 'linear-gradient(135deg, rgba(165,107,255,.36), rgba(56,204,217,.18))' },
  night: { accent: '#8EA8FF', wash: 'linear-gradient(135deg, rgba(142,168,255,.34), rgba(255,119,166,.16))' },
}

const LOOP_COUNT = 3
const LOOP_MIDDLE = 1

function getYoutubeId(url) {
  return url.match(/[?&]v=([^&]+)/)?.[1] || ''
}

function getThumb(url) {
  const id = getYoutubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ''
}

function countVideos(work) {
  return (work.groups || DEFAULT_GROUPS).reduce((total, group) => total + (work.videos[group.key]?.length || 0), 0)
}

function CoverCard({ work, active, dark, onSelect, domId }) {
  const tone = TONES[work.tone] || TONES.sky

  return (
    <motion.button
      id={domId}
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
        boxShadow: active
          ? `0 0 0 4px ${tone.accent}55, 0 30px 76px rgba(24, 45, 82, .32)`
          : '0 24px 60px rgba(35, 80, 132, .14)',
      }}
    >
      <img src={work.coverImage || getThumb(work.videos.official?.[0]?.url || '')} alt="" loading="lazy" />
      {active && <span className="music-card-active-badge">NOW</span>}
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

function VideoCard({ item, dark, accent, groupLabel, fallbackImage }) {
  const thumb = item.coverImage || getThumb(item.url) || fallbackImage

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
        {thumb && <img src={thumb} alt="" loading="lazy" />}
        <span className="music-play-badge">
          {getYoutubeId(item.url)
            ? <Play size={16} color="#fff" fill="#fff" style={{ marginLeft: 2 }} />
            : <ExternalLink size={16} color="#fff" />}
        </span>
      </span>
      <span className="music-video-copy">
        <span style={{
          display: 'block',
          fontFamily: 'var(--ff-mono)',
          fontSize: 13.5,
          letterSpacing: '.14em',
          color: accent,
          marginBottom: 4,
        }}>
          {groupLabel}
        </span>
        <span style={{ display: 'block', fontSize: 22, lineHeight: 1.25, overflowWrap: 'anywhere' }}>
          {item.title}
        </span>
        {item.caption && (
          <span style={{
            display: 'block',
            marginTop: 4,
            color: dark ? 'rgba(248,250,255,.58)' : 'rgba(26,43,69,.58)',
            fontSize: 16.5,
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
  const Icon = group.icon || Music2
  const items = work.videos[group.key] || []
  const carouselRef = useRef(null)
  const hasVideoNav = items.length > 1

  const scrollVideos = direction => {
    const carousel = carouselRef.current
    const item = carousel?.querySelector('.music-video-card')
    if (!carousel || !item) return

    const styles = window.getComputedStyle(carousel)
    const gap = parseFloat(styles.columnGap || styles.gap || 0) || 0
    const maxScroll = carousel.scrollWidth - carousel.clientWidth
    const step = item.getBoundingClientRect().width + gap

    if (maxScroll <= 2) {
      carousel.scrollTo({ left: direction > 0 ? carousel.scrollWidth : 0, behavior: 'smooth' })
      return
    }

    const currentLeft = carousel.scrollLeft

    if (direction > 0) {
      carousel.scrollTo({
        left: currentLeft >= maxScroll - 4 ? 0 : Math.min(currentLeft + step, maxScroll),
        behavior: 'smooth',
      })
      return
    }

    carousel.scrollTo({
      left: currentLeft <= 4 ? maxScroll : Math.max(currentLeft - step, 0),
      behavior: 'smooth',
    })
  }

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
      <div className={`music-video-carousel-shell${hasVideoNav ? ' has-video-nav' : ''}`}>
        {hasVideoNav && (
          <button
            type="button"
            className="music-video-nav music-video-nav-prev"
            aria-label="上一支影片"
            onClick={() => scrollVideos(-1)}
            style={{
              '--video-nav-accent': accent,
              '--video-nav-bg': dark ? 'rgba(12, 24, 54, .96)' : 'rgba(255, 255, 255, .98)',
              '--video-nav-border': dark ? 'rgba(255,255,255,.32)' : 'rgba(47,74,116,.22)',
            }}
          >
            <ChevronLeft size={24} strokeWidth={2.8} />
          </button>
        )}
        <div className="music-video-grid" ref={carouselRef} tabIndex={0} aria-label={`${group.label} 影片輪播`}>
          {items.map(item => (
            <VideoCard
              key={`${work.slug}-${group.key}-${item.url}`}
              item={item}
              dark={dark}
              accent={accent}
              groupLabel={group.shortLabel}
              fallbackImage={work.coverImage}
            />
          ))}
        </div>
        {hasVideoNav && (
          <button
            type="button"
            className="music-video-nav music-video-nav-next"
            aria-label="下一支影片"
            onClick={() => scrollVideos(1)}
            style={{
              '--video-nav-accent': accent,
              '--video-nav-bg': dark ? 'rgba(12, 24, 54, .96)' : 'rgba(255, 255, 255, .98)',
              '--video-nav-border': dark ? 'rgba(255,255,255,.32)' : 'rgba(47,74,116,.22)',
            }}
          >
            <ChevronRight size={24} strokeWidth={2.8} />
          </button>
        )}
      </div>
    </details>
  )
}

function DetailPanel({ work, dark, onClose }) {
  const tone = TONES[work.tone] || TONES.sky
  const groups = work.groups || DEFAULT_GROUPS
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
      initial={{ opacity: 0, y: -26, scaleY: .96 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .34, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: p.panel,
        borderColor: p.rule,
        color: p.text,
      }}
    >
      <button
        type="button"
        className="music-collapse-hint"
        onClick={onClose}
        style={{
          color: p.text,
          borderColor: p.rule,
          background: dark ? 'rgba(255,255,255,.065)' : 'rgba(255,255,255,.76)',
        }}
      >
        <ChevronUp size={18} color={tone.accent} />
        <span>收起</span>
      </button>

      <div className="music-detail-hero">
        <div className="music-detail-cover" style={{ background: dark ? '#162452' : '#EAF5FF' }}>
          <img src={work.coverImage || getThumb(work.videos.official?.[0]?.url || '')} alt="" loading="lazy" />
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
          </div>
        </div>
      </div>

      <div className="music-stat-grid">
        <Stat label="收錄曲目" value={work.tracks.join(' / ')} dark={dark} accent={tone.accent} />
        <Stat label="影片總數" value={`${countVideos(work)} 支`} dark={dark} accent={tone.accent} />
      </div>

      <div className="music-groups">
        {groups.map(group => (
          <VideoGroup key={`${work.slug}-${group.key}`} work={work} group={group} dark={dark} accent={tone.accent} />
        ))}
      </div>
    </motion.article>
  )
}

export function MusicVideos({ dark }) {
  const [activeSlug, setActiveSlug] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef(null)
  const activeWork = useMemo(
    () => MUSIC_WORKS.find(work => work.slug === activeSlug),
    [activeSlug],
  )
  const loopedWorks = useMemo(
    () => Array.from({ length: LOOP_COUNT }, (_, setIndex) => (
      MUSIC_WORKS.map(work => ({ ...work, loopKey: `${setIndex}-${work.slug}`, setIndex }))
    )).flat(),
    [],
  )

  const getCycleWidth = carousel => carousel.scrollWidth / LOOP_COUNT
  const getItemWidth = carousel => {
    const item = carousel?.querySelector('.music-carousel-item')
    if (!carousel || !item) return 0
    const styles = window.getComputedStyle(carousel)
    return item.getBoundingClientRect().width + parseFloat(styles.columnGap || styles.gap || 0)
  }

  const bringCardIntoView = slug => {
    window.requestAnimationFrame(() => {
      const carousel = carouselRef.current
      const target = carousel?.querySelector(`[data-carousel-slug="${slug}"][data-loop-set="${LOOP_MIDDLE}"]`)
      if (!carousel || !target) return

      const targetLeft = target.offsetLeft + (target.offsetWidth / 2) - (carousel.clientWidth / 2)
      carousel.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      })
    })
  }

  const openWork = slug => {
    setActiveSlug(slug)
    bringCardIntoView(slug)
    if (window.location.hash !== `#mv-${slug}`) {
      window.history.replaceState(null, '', `#mv-${slug}`)
    }
  }

  const toggleWork = slug => {
    const nextSlug = activeSlug === slug ? null : slug
    setActiveSlug(nextSlug)
    if (nextSlug) bringCardIntoView(nextSlug)
  }

  const scrollCarousel = direction => {
    const carousel = carouselRef.current
    const itemWidth = getItemWidth(carousel)
    if (!carousel || !itemWidth) return

    carousel.scrollBy({
      left: direction * itemWidth,
      behavior: 'smooth',
    })
  }

  const goToSlide = index => {
    const carousel = carouselRef.current
    const itemWidth = getItemWidth(carousel)
    if (!carousel || !itemWidth) return

    carousel.scrollTo({
      left: getCycleWidth(carousel) + (index * itemWidth),
      behavior: 'smooth',
    })
    setCurrentSlide(index)
  }

  const keepCarouselLooped = () => {
    const carousel = carouselRef.current
    if (!carousel) return

    const cycleWidth = getCycleWidth(carousel)
    if (!cycleWidth) return

    if (carousel.scrollLeft < cycleWidth * .5) {
      carousel.scrollLeft += cycleWidth
    } else if (carousel.scrollLeft > cycleWidth * 1.5) {
      carousel.scrollLeft -= cycleWidth
    }

    const itemWidth = getItemWidth(carousel)
    if (!itemWidth) return

    const index = Math.round((carousel.scrollLeft - cycleWidth) / itemWidth)
    setCurrentSlide(((index % MUSIC_WORKS.length) + MUSIC_WORKS.length) % MUSIC_WORKS.length)
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    window.requestAnimationFrame(() => {
      carousel.scrollLeft = getCycleWidth(carousel)
    })
  }, [])

  useEffect(() => {
    const syncFromHash = () => {
      const slug = window.location.hash.replace('#mv-', '')
      if (MUSIC_WORKS.some(work => work.slug === slug)) {
        setActiveSlug(slug)
        bringCardIntoView(slug)
      }
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
      <div className="music-hash-targets" aria-hidden="true">
        {MUSIC_WORKS.map(work => (
          <span key={`target-${work.slug}`} id={`mv-${work.slug}`} />
        ))}
      </div>

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
            boîte à  <span style={{ color: p.accent }}>musique</span>
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
              onClick={event => {
                event.preventDefault()
                openWork(work.slug)
              }}
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

      <div className="music-carousel-shell">
        <button
          type="button"
          className="music-carousel-button music-carousel-button-prev"
          aria-label="上一個音樂作品"
          title="上一個作品"
          onClick={() => scrollCarousel(-1)}
          style={{
            color: p.text,
            borderColor: p.rule,
            background: dark ? 'rgba(255,255,255,.055)' : 'rgba(255,255,255,.64)',
          }}
        >
          <ChevronLeft size={22} />
        </button>

        <div className="music-cover-carousel" ref={carouselRef} onScroll={keepCarouselLooped}>
          {loopedWorks.map(work => (
            <div
              className="music-carousel-item"
              key={work.loopKey}
              data-carousel-slug={work.slug}
              data-loop-set={work.setIndex}
            >
              <CoverCard
                work={work}
                active={activeSlug === work.slug}
                dark={dark}
                onSelect={() => toggleWork(work.slug)}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="music-carousel-button music-carousel-button-next"
          aria-label="下一個音樂作品"
          title="下一個作品"
          onClick={() => scrollCarousel(1)}
          style={{
            color: p.text,
            borderColor: p.rule,
            background: dark ? 'rgba(255,255,255,.055)' : 'rgba(255,255,255,.64)',
          }}
        >
          <ChevronRight size={22} />
        </button>

        <div className="music-carousel-dots" aria-label="音樂作品輪播位置">
          {MUSIC_WORKS.map((work, index) => (
            <button
              key={`dot-${work.slug}`}
              type="button"
              className="music-carousel-dot"
              aria-label={`前往 ${work.title}`}
              aria-current={currentSlide === index}
              onClick={() => goToSlide(index)}
              style={{
                '--dot-accent': (TONES[work.tone] || TONES.sky).accent,
              }}
            />
          ))}
        </div>
      </div>

      {activeWork && (
        <div className="music-detail-wrap">
          <DetailPanel key={activeWork.slug} work={activeWork} dark={dark} onClose={() => setActiveSlug(null)} />
        </div>
      )}

      <style>{`
        .music-section {
          position: relative;
          overflow: hidden;
        }

        .music-hash-targets {
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 1px;
          overflow: hidden;
          pointer-events: none;
        }

        .music-hash-targets span {
          position: absolute;
          top: 0;
          left: 0;
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

        .music-carousel-shell {
          position: relative;
          padding: clamp(24px, 5vw, 60px) clamp(22px, 5vw, 64px) 22px;
        }

        .music-carousel-button {
          position: absolute;
          top: calc(50% - 18px);
          z-index: 4;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border: 0.5px solid;
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(24, 45, 82, .18);
          transition: transform .2s ease, border-color .2s ease, background .2s ease, box-shadow .2s ease;
        }

        .music-carousel-button:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 16px 36px rgba(24, 45, 82, .24);
        }

        .music-carousel-button-prev {
          left: clamp(26px, 5vw, 72px);
        }

        .music-carousel-button-next {
          right: clamp(26px, 5vw, 72px);
        }

        .music-cover-carousel {
          display: flex;
          gap: clamp(14px, 2vw, 22px);
          overflow-x: auto;
          overflow-y: hidden;
          overscroll-behavior-x: contain;
          scroll-snap-type: x mandatory;
          scroll-padding-inline: 2px;
          padding: 4px 2px 16px;
          scrollbar-width: none;
        }

        .music-cover-carousel::-webkit-scrollbar {
          display: none;
        }

        .music-carousel-item {
          flex: 0 0 clamp(390px, 31vw, 520px);
          min-width: 0;
          scroll-snap-align: start;
        }

        .music-detail-wrap {
          padding: 0 clamp(22px, 5vw, 64px) clamp(42px, 7vw, 86px);
        }

        .music-carousel-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 20px;
        }

        .music-carousel-dot {
          width: 7px;
          height: 7px;
          border: 0;
          border-radius: 999px;
          padding: 0;
          background: rgba(87, 104, 142, .36);
          cursor: pointer;
          transition: width .24s ease, height .24s ease, background .24s ease, box-shadow .24s ease, transform .24s ease;
        }

        .music-carousel-dot[aria-current="true"] {
          width: 26px;
          height: 8px;
          background: var(--dot-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--dot-accent) 22%, transparent);
        }

        .music-carousel-dot:hover {
          transform: scale(1.18);
          background: var(--dot-accent);
        }

        .music-cover-card {
          position: relative;
          display: block;
          width: 100%;
          min-height: clamp(290px, 30vw, 430px);
          border: 0.5px solid;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          padding: 0;
          text-align: left;
          background: #102350;
          isolation: isolate;
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
          transform: scale(1.09);
          filter: saturate(1.14) contrast(1.08);
        }

        .music-cover-card[aria-expanded="true"]::before {
          background:
            linear-gradient(180deg, rgba(8,18,40,.02) 0%, rgba(8,18,40,.14) 38%, rgba(8,18,40,.88) 100%),
            linear-gradient(135deg, color-mix(in srgb, var(--accent) 42%, transparent), rgba(255,255,255,.08));
        }

        .music-card-glow {
          position: absolute;
          inset: auto 16px 16px 16px;
          height: 1px;
          z-index: 2;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: .82;
        }

        .music-cover-card[aria-expanded="true"] .music-card-glow {
          height: 4px;
          inset-inline: 14px;
          opacity: 1;
          border-radius: 999px;
          box-shadow: 0 0 22px var(--accent);
        }

        .music-card-active-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 3;
          min-width: 56px;
          border: 1px solid rgba(255,255,255,.72);
          border-radius: 999px;
          padding: 7px 12px;
          background: var(--accent);
          color: #fff;
          font-family: var(--ff-mono);
          font-size: 13px;
          letter-spacing: .16em;
          text-align: center;
          box-shadow: 0 10px 28px rgba(0,0,0,.26);
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
          position: relative;
          transform-origin: top center;
          grid-column: 1 / -1;
          border: 0.5px solid;
          border-radius: 8px;
          overflow: hidden;
          backdrop-filter: blur(22px);
          box-shadow: 0 28px 80px rgba(35, 80, 132, .14);
        }

        .music-collapse-hint {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 42px;
          height: 42px;
          border: 0.5px solid;
          border-radius: 999px;
          padding: 0;
          font-size: 0;
          cursor: pointer;
          backdrop-filter: blur(14px);
          box-shadow: 0 12px 30px rgba(24, 45, 82, .18);
          transition: transform .2s ease, border-color .2s ease, background .2s ease, box-shadow .2s ease;
        }

        .music-collapse-hint:hover {
          transform: translateX(-50%) translateY(-2px) scale(1.04);
          box-shadow: 0 16px 36px rgba(24, 45, 82, .24);
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
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          padding: 0 clamp(22px, 4vw, 42px) clamp(20px, 3vw, 30px);
        }

        .music-groups {
          padding: 0 clamp(22px, 4vw, 42px) clamp(24px, 4vw, 42px);
          display: grid;
          gap: 12px;
          min-width: 0;
        }

        .music-video-group {
          min-width: 0;
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
          display: flex;
          flex-wrap: nowrap;
          gap: clamp(12px, 1.5vw, 18px);
          overflow-x: auto;
          overflow-y: hidden;
          overscroll-behavior-x: contain;
          scroll-snap-type: x mandatory;
          padding: 4px 0 16px;
          scrollbar-width: none;
          min-width: 0;
        }

        .music-video-carousel-shell.has-video-nav {
          max-width: min(100%, 1260px);
          margin-inline: auto;
        }

        .music-video-carousel-shell.has-video-nav .music-video-grid {
          padding-inline: 72px;
          scroll-padding-inline: 72px;
        }

        .music-video-grid::-webkit-scrollbar {
          display: none;
        }

        .music-video-carousel-shell {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-width: 0;
        }

        .music-video-carousel-shell::before,
        .music-video-carousel-shell::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 18px;
          z-index: 2;
          width: 70px;
          pointer-events: none;
          opacity: 0;
          transition: opacity .18s ease;
        }

        .music-video-carousel-shell.has-video-nav::before,
        .music-video-carousel-shell.has-video-nav::after {
          opacity: 1;
        }

        .music-video-carousel-shell::before {
          left: 0;
          background: linear-gradient(90deg, rgba(12,24,54,.38), transparent);
        }

        .music-video-carousel-shell::after {
          right: 0;
          background: linear-gradient(270deg, rgba(12,24,54,.38), transparent);
        }

        .music-video-nav {
          position: absolute;
          top: 50%;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 56px;
          border: 0.5px solid var(--video-nav-border, rgba(47,74,116,.18));
          border-radius: 999px;
          background: var(--video-nav-bg, rgba(255,255,255,.95));
          color: var(--video-nav-accent, #49A9D7);
          cursor: pointer;
          box-shadow: 0 14px 30px rgba(24, 45, 82, .25);
          transform: translateY(-50%);
          pointer-events: auto;
          transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease, border-color .2s ease;
        }

        .music-video-nav:hover {
          transform: translateY(-50%) scale(1.06);
          border-color: var(--video-nav-accent, #49A9D7);
          box-shadow: 0 16px 32px rgba(24, 45, 82, .28);
        }

        .music-video-nav:active {
          transform: translateY(-50%) scale(.98);
        }

        .music-video-nav:focus-visible {
          outline: 2px solid var(--video-nav-accent, #49A9D7);
          outline-offset: 3px;
        }

        .music-video-nav-prev {
          left: 18px;
        }

        .music-video-nav-next {
          right: 18px;
        }

        .music-video-card {
          display: flex;
          flex: 0 0 clamp(380px, 46vw, 620px);
          flex-direction: column;
          min-height: clamp(270px, 24vw, 380px);
          border: 0.5px solid;
          border-radius: 8px;
          overflow: hidden;
          scroll-snap-align: start;
          transition: transform .2s ease, border-color .2s ease, background .2s ease;
        }

        .music-video-thumb {
          position: relative;
          display: block;
          aspect-ratio: 16 / 9;
          min-height: 170px;
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
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          padding: clamp(16px, 2.2vw, 26px);
          min-width: 0;
        }

        @media (max-width: 760px) {
          .music-intro {
            padding: 36px 18px 18px;
          }

          .music-source-menu {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 6px;
            margin-inline: -18px;
            padding-inline: 18px;
            scroll-snap-type: x proximity;
            scrollbar-width: none;
          }

          .music-source-menu::-webkit-scrollbar {
            display: none;
          }

          .music-source-menu a {
            flex: 0 0 auto;
            min-height: 44px;
            scroll-snap-align: start;
          }

          .music-carousel-shell {
            padding-inline: clamp(14px, 5vw, 28px);
          }

          .music-carousel-button {
            width: 38px;
            height: 38px;
          }

          .music-carousel-item {
            flex-basis: min(78vw, 360px);
          }

          .music-cover-card {
            min-height: 320px;
          }

          .music-detail-hero {
            grid-template-columns: 1fr;
            padding-top: 64px;
          }

          .music-detail-cover {
            aspect-ratio: 16 / 10;
          }

          .music-collapse-hint {
            top: 12px;
            left: 50%;
            right: auto;
          }

          .music-stat-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .music-carousel-button,
          .music-video-nav {
            display: none !important;
          }

          .music-carousel-shell {
            padding: 20px 18px 18px;
          }

          .music-carousel-item {
            flex-basis: min(82vw, 330px);
          }

          .music-cover-card {
            min-height: 300px;
          }

          .music-card-title {
            left: 16px;
            right: 16px;
            bottom: 24px;
            font-size: clamp(35px, 14vw, 54px);
          }

          .music-detail-wrap {
            padding: 0 18px 36px;
          }

          .music-detail-panel {
            border-radius: 12px;
          }

          .music-detail-hero {
            padding: 60px 16px 20px;
            gap: 18px;
          }

          .music-detail-hero h3 {
            font-size: 42px !important;
            line-height: .95 !important;
          }

          .music-action-row {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
          }

          .music-stream-link {
            min-height: 44px;
            justify-content: center;
          }

          .music-video-card {
            flex-basis: min(86vw, 330px);
            min-height: 250px;
          }

          .music-video-thumb {
            min-height: 145px;
          }

          .music-video-carousel-shell.has-video-nav .music-video-grid {
            padding-inline: 0;
            scroll-padding-inline: 0;
          }

          .music-video-carousel-shell::before,
          .music-video-carousel-shell::after {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
