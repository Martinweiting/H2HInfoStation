import { useState, useEffect } from 'react'
import { Heart, Moon, Sun, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: '\u95dc\u65bc', href: '#about' },
  { label: '\u6210\u54e1', href: '#members' },
  { label: '\u97f3\u6a02\u4f5c\u54c1', href: '#mv' },
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
      <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10 }} aria-label="Hearts2Hearts home">
        <Heart size={20} color="#FF8AA8" fill="#FF8AA8" />
        <span className="ff-display" style={{
          fontStyle: 'italic', fontSize: 20, fontWeight: 600,
          color: dark ? '#F8FAFF' : '#1A2B45',
        }}>Hearts2Hearts</span>
      </a>

      {/* Desktop nav */}
      <nav aria-label="Main navigation" style={{ display: 'flex', gap: 32, fontSize: 13, fontWeight: 500 }}>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href} style={{
            color: dark ? 'rgba(248,250,255,.75)' : 'rgba(26,43,69,.65)',
            transition: 'color .2s',
            padding: '4px 0',
          }}
          onMouseEnter={e => e.currentTarget.style.color = dark ? '#F8FAFF' : '#1A2B45'}
          onMouseLeave={e => e.currentTarget.style.color = dark ? 'rgba(248,250,255,.75)' : 'rgba(26,43,69,.65)'}
          >{l.label}</a>
        ))}
      </nav>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
              <a key={l.href} href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block', padding: '10px 0',
                  color: dark ? 'rgba(248,250,255,.8)' : 'rgba(26,43,69,.75)',
                  fontSize: 16, fontWeight: 500,
                  borderBottom: `0.5px solid ${border}`,
                }}
              >{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          nav[aria-label="Main navigation"] { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
