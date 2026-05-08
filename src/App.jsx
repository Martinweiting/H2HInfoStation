import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { Header } from './components/Header.jsx'
import { Hero } from './components/Hero.jsx'
import { About } from './components/About.jsx'
import { Members } from './components/Members.jsx'
import { FanSites } from './components/FanSites.jsx'
import { MusicVideos } from './components/MusicVideos.jsx'
import { Discography } from './components/Discography.jsx'
import { Schedule } from './components/Schedule.jsx'
import { Gallery } from './components/Gallery.jsx'
import { FanWall } from './components/FanWall.jsx'
import { Footer } from './components/Footer.jsx'
import { LoadingScreen } from './components/LoadingScreen.jsx'

export default function App() {
  // Dark mode — persisted in localStorage
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('h2h-dark') === 'true' } catch { return false }
  })

  // Loading screen
  const [loaded, setLoaded] = useState(false)

  // Back to top visibility
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
    try { localStorage.setItem('h2h-dark', dark) } catch {}
  }, [dark])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const rule = dark ? '0.5px solid rgba(255,255,255,.1)' : '0.5px solid rgba(26,43,69,.08)'

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />

      <Header dark={dark} onToggleDark={() => setDark(v => !v)} />

      <main style={{ opacity: loaded ? 1 : 0, transition: 'opacity .4s ease .1s' }}>
        <Hero dark={dark} />
        <hr style={{ border: 'none', borderTop: rule }} />
        <About dark={dark} />
        <hr style={{ border: 'none', borderTop: rule }} />
        <Members dark={dark} />
        <hr style={{ border: 'none', borderTop: rule }} />
        <MusicVideos dark={dark} />
        <hr style={{ border: 'none', borderTop: rule }} />
        <FanSites dark={dark} />
        <hr style={{ border: 'none', borderTop: rule }} />
        <Discography dark={dark} />
        <hr style={{ border: 'none', borderTop: rule }} />
        <Schedule dark={dark} />
        <hr style={{ border: 'none', borderTop: rule }} />
        <Gallery dark={dark} />
        <hr style={{ border: 'none', borderTop: rule }} />
        <FanWall dark={dark} />
      </main>

      <Footer dark={dark} />

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-top"
            initial={{ opacity: 0, scale: .8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .8, y: 10 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="回到頂部"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: .95 }}
            style={{
              position: 'fixed', bottom: 28, right: 24, zIndex: 500,
              width: 44, height: 44, borderRadius: 999,
              background: dark
                ? 'linear-gradient(135deg, #5AB3D9, #3A8FB7)'
                : 'linear-gradient(135deg, #FF8AA8, #E86E90)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: dark
                ? '0 6px 20px rgba(90,179,217,.45)'
                : '0 6px 20px rgba(255,138,168,.45)',
            }}
          >
            <ChevronUp size={20} color="#fff" strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
