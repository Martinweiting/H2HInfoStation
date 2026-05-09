import { useState, useEffect } from 'react'
import { ChevronDown, Heart, Moon, Sun, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MUSIC_MENU_LINKS } from '../data/musicWorks.js'
import { YouTubeNotifier } from './YouTubeNotifier.jsx'

const NAV_LINKS = [
  { label: '\u5718\u9ad4\u4ecb\u7d39', href: '#about' },
  { label: '\u6210\u54e1', href: '#members' },
  { label: '\u97f3\u6a02\u4f5c\u54c1', href: '#mv', children: MUSIC_MENU_LINKS },
  { label: '\u7ad9\u5b50\u8490\u96c6', href: '#fan-sites' },
  {
    label: '\u63a2\u7d22\u66f4\u591a',
    href: '#discography',
    children: [
      { label: '\u6642\u9593\u8ef8', href: '#discography' },
      { label: '\u884c\u7a0b', href: '#schedule' },
      { label: '\u7167\u7247', href: '#gallery' },
      { label: 'Fan Wall', href: '#fanwall' },
    ],
  },
]

export function Header({ dark, onToggleDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const border = dark ? 'rgba(255,255,255,.1)' : 'rgba(26,43,69,.08)'
  const bg = dark
    ? scrolled ? 'rgba(11,21,48,.92)' : 'transparent'
          : scrolled ? 'rgba(248,252,255,.88)' : 'transparent'

  const handleTopNavClick = (event, item) => {
    if (!item.children) return
    event.preventDefault()
    setOpenDropdown(current => current === item.href ? null : item.href)
  }

  const closeMenus = () => {
    setMenuOpen(false)
    setOpenDropdown(null)
  }

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(28px, 4vw, 64px)',
        height: scrolled ? 76 : 96,
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
      <nav aria-label="Main navigation" style={{ display: 'flex', gap: 'clamp(16px, 1.8vw, 30px)', fontSize: 'clamp(18px, 1.15vw, 21px)', fontWeight: 600 }}>
        {NAV_LINKS.map(l => (
          <div key={l.href} className={`nav-item ${openDropdown === l.href ? 'nav-item--open' : ''}`} style={{ position: 'relative' }}>
            <a href={l.href}
            aria-haspopup={l.children ? 'true' : undefined}
            aria-expanded={l.children ? openDropdown === l.href : undefined}
            onClick={e => handleTopNavClick(e, l)}
            style={{
              color: dark ? 'rgba(248,250,255,.75)' : 'rgba(26,43,69,.65)',
              transition: 'color .2s',
              padding: '4px 0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
            onMouseEnter={e => e.currentTarget.style.color = dark ? '#F8FAFF' : '#1A2B45'}
            onMouseLeave={e => e.currentTarget.style.color = dark ? 'rgba(248,250,255,.75)' : 'rgba(26,43,69,.65)'}
            >
              {l.label}
              {l.children && <ChevronDown size={17} strokeWidth={2.2} />}
            </a>
            {l.children && (
              <div
                className="nav-child-menu"
                style={{
                  background: dark ? 'rgba(11,21,48,.96)' : 'rgba(248,252,255,.96)',
                  border: `0.5px solid ${border}`,
                  boxShadow: dark ? '0 18px 36px rgba(0,0,0,.32)' : '0 18px 36px rgba(26,43,69,.12)',
                }}
              >
                {l.children.map(child => (
                  <a
                    key={child.href}
                    href={child.href}
                    onClick={() => setOpenDropdown(null)}
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
        <YouTubeNotifier dark={dark} border={border} />

        <button
          className="header-icon-button"
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
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Mobile hamburger */}
        <button
          className="header-icon-button mobile-menu-btn"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            appearance: 'none', border: 'none', cursor: 'pointer', background: 'transparent',
            color: dark ? '#F8FAFF' : '#1A2B45',
          }}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
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
              background: dark ? 'rgba(11,21,48,.98)' : 'rgba(248,252,255,.98)',
              backdropFilter: 'blur(16px)',
              borderBottom: `0.5px solid ${border}`,
              padding: '16px 24px max(22px, env(safe-area-inset-bottom))',
              display: 'flex', flexDirection: 'column', gap: 4,
              maxHeight: 'calc(100svh - 72px)',
              overflowY: 'auto',
            }}
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(l => (
              <div key={l.href} style={{ borderBottom: `0.5px solid ${border}` }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: l.children ? 'minmax(0, 1fr) 44px' : 'minmax(0, 1fr)',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  <a href={l.href}
                    onClick={closeMenus}
                    style={{
                      display: 'flex', alignItems: 'center',
                      minHeight: 48,
                      padding: '10px 0',
                      color: dark ? 'rgba(248,250,255,.88)' : 'rgba(26,43,69,.82)',
                      fontSize: 22, fontWeight: 600,
                    }}
                  >
                    {l.label}
                  </a>
                  {l.children && (
                    <button
                      type="button"
                      onClick={(e) => handleTopNavClick(e, l)}
                      aria-label={`展開 ${l.label} 子選單`}
                      aria-expanded={openDropdown === l.href}
                      style={{
                        width: 44,
                        height: 44,
                        border: 'none',
                        borderRadius: 999,
                        background: openDropdown === l.href
                          ? (dark ? 'rgba(255,255,255,.13)' : 'rgba(26,43,69,.08)')
                          : 'transparent',
                        color: dark ? 'rgba(248,250,255,.82)' : 'rgba(26,43,69,.70)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <ChevronDown size={20} style={{
                        transform: openDropdown === l.href ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform .18s ease',
                      }} />
                    </button>
                  )}
                </div>
                {l.children && openDropdown === l.href && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 7, padding: '2px 0 14px' }}>
                    <a
                      href={l.href}
                      onClick={closeMenus}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: 44,
                        borderRadius: 8,
                        padding: '9px 12px',
                        background: dark ? 'rgba(135,206,235,.14)' : 'rgba(90,179,217,.12)',
                        color: dark ? '#F8FAFF' : '#1A2B45',
                        fontSize: 18,
                        fontWeight: 700,
                        overflowWrap: 'anywhere',
                      }}
                    >
                      前往{l.label}
                    </a>
                    {l.children.map(child => (
                      <a
                        key={child.href}
                        href={child.href}
                        onClick={closeMenus}
                        style={{
                          display: 'block',
                          borderRadius: 8,
                          minHeight: 44,
                          padding: '10px 12px',
                          background: dark ? 'rgba(255,255,255,.06)' : 'rgba(26,43,69,.05)',
                          color: dark ? 'rgba(248,250,255,.74)' : 'rgba(26,43,69,.68)',
                          fontSize: 19,
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
          header[role="banner"] {
            height: 72px !important;
            background: ${dark ? 'rgba(11,21,48,.96)' : 'rgba(248,252,255,.94)'} !important;
            backdrop-filter: blur(16px) !important;
            -webkit-backdrop-filter: blur(16px) !important;
            border-bottom: 0.5px solid ${border} !important;
          }
          .header-icon-button {
            width: 44px !important;
            height: 44px !important;
          }
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
        .nav-item:focus-within .nav-child-menu,
        .nav-item--open .nav-child-menu {
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
            min-height: 44px !important;
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
