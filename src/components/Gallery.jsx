import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image, Sparkles, X } from 'lucide-react'
import { GALLERY_TILES } from '../data/index.js'

const CATS = [
  { v: 'all', label: 'All' },
  { v: 'group', label: 'Group' },
  { v: 'unit', label: 'Unit' },
  { v: 'solo', label: 'Solo' },
]

const imageSrc = src => `${src}?v=gallery-fix-20260501`

export function Gallery({ dark }) {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const p = dark ? {
    bg: '#0B1530', text: '#F8FAFF', textSoft: 'rgba(248,250,255,.62)',
    rule: 'rgba(255,255,255,.16)', accent: '#87CEEB',
  } : {
    bg: 'linear-gradient(180deg, #F2FAFF 0%, #FFF4FA 54%, #F2F7FF 100%)', text: '#1A2B45', textSoft: 'rgba(26,43,69,.58)',
    rule: 'rgba(26,43,69,.10)', accent: '#5AB3D9',
  }

  const visible = filter === 'all' ? GALLERY_TILES : GALLERY_TILES.filter(t => t.cat === filter)
  const countFor = cat => cat === 'all' ? GALLERY_TILES.length : GALLERY_TILES.filter(t => t.cat === cat).length

  return (
    <section id="gallery" aria-labelledby="gallery-heading" style={{
      background: p.bg, color: p.text, fontFamily: 'var(--ff-body)',
    }}>
      <div style={{
        padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px) clamp(24px, 3vw, 40px)',
        borderBottom: `0.5px solid ${p.rule}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{
              fontFamily: 'var(--ff-mono)', fontSize: 14, letterSpacing: '.16em',
              color: p.textSoft, marginBottom: 14,
            }}>GALLERY / FOCUS WALLPAPERS / UPDATED 2026.05.01</div>
            <h2 id="gallery-heading" className="ff-display" style={{
              margin: 0, fontStyle: 'italic', fontSize: 'clamp(36px, 6vw, 80px)',
              fontWeight: 500, lineHeight: .95,
            }}>
              Captured <span style={{ color: p.accent }}>moments.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Sparkles size={22} color={p.accent} />
            <span style={{ fontSize: 17, color: p.textSoft }}>Click any photo to open the lightbox.</span>
          </div>
        </div>

        <div role="group" aria-label="Gallery filters" style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
          {CATS.map(c => (
            <button key={c.v} onClick={() => setFilter(c.v)}
              aria-pressed={filter === c.v}
              style={{
                appearance: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: 999,
                background: filter === c.v ? p.text : 'transparent',
                color: filter === c.v ? (dark ? '#0B1530' : '#F8FBFF') : p.text,
                border: `0.5px solid ${filter === c.v ? p.text : p.rule}`,
                fontSize: 17, fontWeight: 500, letterSpacing: '.04em',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'all .2s',
              }}
            >
              <span>{c.label}</span>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.16em', opacity: .6 }}>
                {String(countFor(c.v)).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: 'clamp(24px, 3vw, 40px) clamp(24px, 5vw, 64px)' }}>
        <div className="masonry-grid" style={{ columnCount: 'var(--cols, 4)', columnGap: 14 }}>
          <style>{`
            #gallery .masonry-grid { --cols: 4; }
            @media (max-width: 1024px) { #gallery .masonry-grid { --cols: 3 !important; } }
            @media (max-width: 640px)  { #gallery .masonry-grid { --cols: 2 !important; } }
            @media (max-width: 420px)  { #gallery .masonry-grid { --cols: 1 !important; } }
            @media (max-width: 520px) {
              #gallery [data-gallery-label] {
                max-width: calc(100% - 20px);
                white-space: normal;
                overflow-wrap: anywhere;
                line-height: 1.35;
              }
            }
          `}</style>
          <AnimatePresence>
            {visible.map((tile, i) => (
              <motion.div
                key={`${tile.src}-${i}`}
                layout
                initial={{ opacity: 0, scale: .96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: .96 }}
                transition={{ duration: .28 }}
                style={{ breakInside: 'avoid', marginBottom: 14, position: 'relative', cursor: 'pointer' }}
                onClick={() => setLightbox(tile)}
                onKeyDown={e => e.key === 'Enter' && setLightbox(tile)}
                tabIndex={0}
                role="button"
                aria-label={`Open ${tile.label}`}
              >
                <div style={{ position: 'relative', transition: 'transform .25s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img
                    src={imageSrc(tile.src)}
                    alt={tile.label}
                    loading="lazy"
                    style={{
                      width: '100%',
                      aspectRatio: tile.ratio,
                      objectFit: 'cover',
                      borderRadius: 8,
                      boxShadow: dark ? '0 18px 38px rgba(0,0,0,.28)' : '0 18px 38px rgba(90,116,150,.18)',
                    }}
                  />
                  <div style={{
                    position: 'absolute', left: 10, bottom: 10,
                    padding: '4px 10px', borderRadius: 999,
                    background: 'rgba(255,255,255,.78)', backdropFilter: 'blur(8px)',
                    fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.18em', color: '#1A2B45',
                  }} data-gallery-label>{tile.cat.toUpperCase()}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(11,21,48,.92)', backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 24,
            }}
            onClick={() => setLightbox(null)}
            onKeyDown={e => e.key === 'Escape' && setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.label}
          >
            <motion.div
              initial={{ scale: .92 }} animate={{ scale: 1 }} exit={{ scale: .92 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              style={{ position: 'relative', maxWidth: 980, width: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={imageSrc(lightbox.src)}
                alt={lightbox.label}
                style={{
                  width: '100%',
                  maxHeight: '82vh',
                  objectFit: 'contain',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,.06)',
                }}
              />
              <div style={{
                position: 'absolute', left: 14, bottom: 14,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 12px', borderRadius: 999,
                color: '#fff', background: 'rgba(11,21,48,.62)',
                backdropFilter: 'blur(10px)', fontSize: 15,
              }}>
                <Image size={16} />
                {lightbox.label}
              </div>
              <button
                onClick={() => setLightbox(null)}
                aria-label="Close lightbox"
                style={{
                  position: 'absolute', top: 12, right: 12,
                  appearance: 'none', border: 'none', cursor: 'pointer',
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,.15)', color: '#FFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              ><X size={18} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
