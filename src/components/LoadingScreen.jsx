import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState('show') // show → fade → gone

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fade'), 1800)
    const t2 = setTimeout(() => { setPhase('gone'); onDone?.() }, 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'fade' ? 0 : 1 }}
          transition={{ duration: .55, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#FFFCF7',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 20,
          }}
          aria-hidden="true"
        >
          {/* Pulsing heart */}
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [1, .7, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: 44, lineHeight: 1, userSelect: 'none' }}
          >
            🩵
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .18, duration: .5 }}
            className="ff-display"
            style={{
              fontStyle: 'italic', fontSize: 28, fontWeight: 500,
              color: '#1A2B45', letterSpacing: '.02em',
            }}
          >
            Hearts2Hearts
          </motion.div>

          {/* Sub label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: .45 }}
            transition={{ delay: .45, duration: .5 }}
            style={{
              fontFamily: 'var(--ff-mono)', fontSize: 10,
              letterSpacing: '.28em', color: '#1A2B45',
            }}
          >
            OFFICIAL FAN HUB · S2U
          </motion.div>

          {/* Progress bar */}
          <motion.div
            style={{
              position: 'absolute', bottom: 0, left: 0, height: 2,
              background: 'linear-gradient(90deg, #87CEEB, #FF8AA8)',
              transformOrigin: 'left',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
