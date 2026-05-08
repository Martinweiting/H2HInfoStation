import { motion } from 'framer-motion'
import { ExternalLink, Sparkles } from 'lucide-react'

const FUTURE_FEATURES = [
  '\u82F1\u6587\u8A9E\u8A00\u652F\u63F4',
  '\u97D3\u6587\u8A9E\u8A00\u652F\u63F4',
  'STAGE\u3001\u6F14\u5531\u6703\u5167\u5BB9\u6574\u7406',
  '\u5404\u6B4C\u66F2\u61C9\u63F4\u6CD5\u6559\u5B78',
  '\u5B98\u65B9\u8207\u975E\u5B98\u65B9\u7269\u6599\u6574\u7406',
]

const TITLE_KICKER = 'FUTURE FEATURES / \u672A\u4F86\u529F\u80FD'
const CONTACT_TEXT = '\u82E5\u6709\u4EFB\u4F55\u5EFA\u8B70\u6216\u52D8\u8AA4\u8ACB\u79C1\u8A0A\u672C\u4EBA'

export function FutureFeatures({ dark }) {
  const palette = dark ? {
    bg: 'linear-gradient(180deg, #0B1530 0%, #101D45 100%)',
    panel: 'rgba(255,255,255,.06)',
    card: 'rgba(255,255,255,.075)',
    text: '#F8FAFF',
    textSoft: 'rgba(248,250,255,.62)',
    rule: 'rgba(255,255,255,.14)',
    accent: '#87CEEB',
    accentSoft: 'rgba(135,206,235,.14)',
  } : {
    bg: 'linear-gradient(180deg, #F4F2FF 0%, #F3FAFF 54%, #FFF4FA 100%)',
    panel: 'rgba(255,255,255,.70)',
    card: 'rgba(255,255,255,.82)',
    text: '#1A2B45',
    textSoft: 'rgba(26,43,69,.58)',
    rule: 'rgba(26,43,69,.10)',
    accent: '#5AB3D9',
    accentSoft: 'rgba(90,179,217,.14)',
  }

  return (
    <section id="future-features" aria-labelledby="future-features-heading" style={{
      background: palette.bg,
      color: palette.text,
      fontFamily: 'var(--ff-body)',
    }}>
      <div style={{
        padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px)',
        borderBottom: `0.5px solid ${palette.rule}`,
      }}>
        <div style={{
          fontFamily: 'var(--ff-mono)',
          fontSize: 16.5,
          letterSpacing: '.24em',
          color: palette.textSoft,
          marginBottom: 14,
        }}>
          {TITLE_KICKER}
        </div>
        <h2 id="future-features-heading" className="ff-display" style={{
          margin: 0,
          fontStyle: 'italic',
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 500,
          lineHeight: .95,
        }}>
          Planned <span style={{ color: palette.accent }}>Features</span>
        </h2>
      </div>

      <div style={{
        padding: 'clamp(28px, 4vw, 50px) clamp(24px, 5vw, 64px) clamp(42px, 6vw, 76px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'clamp(12px, 2vw, 18px)',
          marginBottom: 24,
        }}>
          {FUTURE_FEATURES.map((feature, index) => (
            <motion.article
              key={feature}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: .42, delay: index * .05 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto minmax(0, 1fr)',
                alignItems: 'center',
                gap: 14,
                padding: '16px 18px',
                borderRadius: 8,
                background: palette.card,
                border: `0.5px solid ${palette.rule}`,
                boxShadow: dark ? '0 16px 34px rgba(0,0,0,.18)' : '0 16px 34px rgba(26,43,69,.08)',
              }}
            >
              <span style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: palette.accentSoft,
                color: palette.accent,
                fontFamily: 'var(--ff-mono)',
                fontSize: 15,
                letterSpacing: '.08em',
                fontWeight: 700,
              }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span style={{
                fontSize: 19,
                lineHeight: 1.5,
                fontWeight: 600,
                overflowWrap: 'anywhere',
              }}>
                {feature}
              </span>
            </motion.article>
          ))}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexWrap: 'wrap',
          padding: '16px 18px',
          borderRadius: 8,
          background: palette.panel,
          border: `0.5px solid ${palette.rule}`,
          color: palette.textSoft,
          fontSize: 18,
          lineHeight: 1.6,
        }}>
          <Sparkles size={18} color={palette.accent} />
          <span>
            {CONTACT_TEXT}{' '}
            <a
              href="https://www.threads.com/@dry_martinim"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: palette.accent,
                fontWeight: 700,
                textDecoration: 'underline',
                textDecorationThickness: '1px',
                textUnderlineOffset: '4px',
              }}
            >
              Threads
            </a>
          </span>
          <ExternalLink size={16} color={palette.accent} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
