import { useState, useEffect } from 'react'
import { ChevronDown, Heart, Moon, Sun, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MUSIC_MENU_LINKS } from '../data/musicWorks.js'

const NAV_LINKS = [
  { label: '\u6210\u54e1', href: '#members' },
  { label: '\u97f3\u6a02\u4f5c\u54c1', href: '#mv', children: MUSIC_MENU_LINKS },
  { label: '\u6642\u9593\u8ef8', href: '#discography' },
  { label: '\u884c\u7a0b', href: '#schedule' },
  { label: '\u7167\u7247', href: '#gallery' },
  { label: 'Fan Wall', href: '#fanwall' },
]

export function Header({ dark, onToggleDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const border = dark ? 'rgba(255,255,255,.1)' : 'rgba(26,43,69,.08)'
  const bg = dark
    ? scrolled ? 'rgba(11,21,48,.92)' : 'transparent'
    : scrolled ? 'rgba(255,252,247,.92)' : 'transparent'

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(24px, 4vw, 56px)',
        height: scrolled ? 60 : 76,
        background: bg,
        borderBottom: scrolled ? `0.5px solid ${border}` : 'none',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'height .3s ease, background .3s ease, border-color .3s ease',
      }}
      role="banner"
    >
      {/* Logo */}
      <a href="#hero" className="site-logo" style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }} aria-label="Hearts2Hearts home">
        <Heart size={20} color="#FF8AA8" fill="#FF8AA8" />
        <span className="ff-display" style={{
          fontStyle: 'italic', fontSize: 23, fontWeight: 600,
          color: dark ? '#F8FAFF' : '#1A2B45',
        }}>Hearts2Hearts</span>
      </a>

      {/* Desktop nav */}
      <nav aria-label="Main navigation" style={{ display: 'flex', gap: 32, fontSize: 18, fontWeight: 500 }}>
        {NAV_LINKS.map(l => (
          <div key={l.href} className="nav-item" style={{ position: 'relative' }}>
            <a href={l.href} aria-haspopup={l.children ? 'true' : undefined} style={{
              color: dark ? 'rgba(248,250,255,.75)' : 'rgba(26,43,69,.65)',
              transition: 'color .2s',
              padding: '4px 0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
            }}
            onMouseEnter={e => e.currentTarget.style.color = dark ? '#F8FAFF' : '#1A2B45'}
            onMouseLeave={e => e.currentTarget.style.color = dark ? 'rgba(248,250,255,.75)' : 'rgba(26,43,69,.65)'}
            >
              {l.label}
              {l.children && <ChevronDown size={14} strokeWidth={2.2} />}
            </a>
            {l.children && (
              <div
                className="nav-child-menu"
                style={{
                  background: dark ? 'rgba(11,21,48,.96)' : 'rgba(255,252,247,.96)',
                  border: `0.5px solid ${border}`,
                  boxShadow: dark ? '0 18px 36px rgba(0,0,0,.32)' : '0 18px 36px rgba(26,43,69,.12)',
                }}
              >
                {l.children.map(child => (
                  <a
                    key={child.href}
                    href={child.href}
                    style={{
                      color: dark ? 'rgba(248,250,255,.78)' : 'rgba(26,43,69,.72)',
                    }}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Right actions */}
      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button
          onClick={onToggleDark}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            appearance: 'none', border: 'none', cursor: 'pointer', background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: 999,
            color: dark ? 'rgba(248,250,255,.7)' : 'rgba(26,43,69,.55)',
            transition: 'background .2s, color .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = dark ? 'rgba(255,255,255,.1)' : 'rgba(26,43,69,.06)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            appearance: 'none', border: 'none', cursor: 'pointer', background: 'transparent',
            color: dark ? '#F8FAFF' : '#1A2B45',
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: .22 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: dark ? 'rgba(11,21,48,.96)' : 'rgba(255,252,247,.96)',
              backdropFilter: 'blur(16px)',
              borderBottom: `0.5px solid ${border}`,
              padding: '16px 24px',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(l => (
              <div key={l.href} style={{ borderBottom: `0.5px solid ${border}` }}>
                <a href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 0',
                    color: dark ? 'rgba(248,250,255,.8)' : 'rgba(26,43,69,.75)',
                    fontSize: 19.5, fontWeight: 500,
                  }}
                >
                  {l.label}
                  {l.children && <ChevronDown size={15} />}
                </a>
                {l.children && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 6, padding: '0 0 12px' }}>
                    {l.children.map(child => (
                      <a
                        key={child.href}
                        href={child.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: 'block',
                          borderRadius: 8,
                          padding: '8px 10px',
                          background: dark ? 'rgba(255,255,255,.06)' : 'rgba(26,43,69,.05)',
                          color: dark ? 'rgba(248,250,255,.74)' : 'rgba(26,43,69,.68)',
                          fontSize: 17,
                          overflowWrap: 'anywhere',
                        }}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          header[role="banner"] {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
          nav[aria-label="Main navigation"] { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }

        .nav-child-menu {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(6px);
          min-width: 168px;
          border-radius: 8px;
          padding: 8px;
          display: grid;
          gap: 2px;
          opacity: 0;
          pointer-events: none;
          transition: opacity .18s ease, transform .18s ease;
        }

        .nav-child-menu a {
          display: block;
          padding: 8px 10px;
          border-radius: 6px;
          font-size: 16.5px;
          line-height: 1.2;
          white-space: nowrap;
        }

        .nav-child-menu a:hover {
          background: ${dark ? 'rgba(255,255,255,.08)' : 'rgba(26,43,69,.06)'};
        }

        .nav-item:hover .nav-child-menu,
        .nav-item:focus-within .nav-child-menu {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        @media (max-width: 420px) {
          header[role="banner"] {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .site-logo {
            gap: 8px !important;
          }
          .site-logo span {
            font-size: 21px !important;
            white-space: nowrap;
          }
          .header-actions {
            gap: 8px !important;
          }
        }
      `}</style>
    </header>
  )
}
