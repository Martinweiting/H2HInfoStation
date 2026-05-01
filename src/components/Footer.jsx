import { Heart, Star, Sparkles } from 'lucide-react'

export function Footer({ dark }) {
  const p = dark ? {
    bg: '#0B1530', border: 'rgba(255,255,255,.1)', text: '#F8FAFF',
    textSoft: 'rgba(248,250,255,.45)',
  } : {
    bg: '#FAF6F0', border: 'rgba(26,43,69,.1)', text: '#1A2B45',
    textSoft: 'rgba(26,43,69,.45)',
  }

  return (
    <footer style={{
      background: p.bg, borderTop: `0.5px solid ${p.border}`,
      fontFamily: 'var(--ff-body)',
    }} role="contentinfo">
      <div style={{ padding: 'clamp(28px, 4vw, 48px) clamp(24px, 5vw, 64px)' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 32, marginBottom: 32,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Heart size={18} color="#FF8AA8" fill="#FF8AA8" />
              <span className="ff-display" style={{ fontStyle: 'italic', fontSize: 18, fontWeight: 600, color: p.text }}>
                Hearts2Hearts
              </span>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: p.textSoft, maxWidth: 240 }}>
              SM Entertainment 旗下八人女子組合。出道日：2025.02.24。
              代表色 Sky Blue。S2U，我們愛你們。
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.24em', color: p.textSoft, marginBottom: 12 }}>
              PAGES
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['\u6210\u54e1', '#members'], ['\u97f3\u6a02\u4f5c\u54c1', '#mv'], ['\u6642\u9593\u8ef8', '#discography'], ['\u884c\u7a0b', '#schedule'], ['\u7167\u7247', '#gallery'], ['Fan Wall', '#fanwall']].map(([l, h]) => (
                <li key={h}>
                  <a href={h} style={{ fontSize: 18, color: p.textSoft, transition: 'color .2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = p.text}
                    onMouseLeave={e => e.currentTarget.style.color = p.textSoft}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.24em', color: p.textSoft, marginBottom: 12 }}>
              OFFICIAL
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['Instagram', '#'], ['X (Twitter)', '#'], ['YouTube', '#'], ['TikTok', '#'], ['Weverse', '#']].map(([l, h]) => (
                <li key={l}>
                  <a href={h} aria-label={`${l} 官方帳號`} style={{ fontSize: 18, color: p.textSoft, transition: 'color .2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = p.text}
                    onMouseLeave={e => e.currentTarget.style.color = p.textSoft}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 20, borderTop: `0.5px solid ${p.border}`,
          flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={14} color="#5AB3D9" />
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 15.5, letterSpacing: '.18em', color: p.textSoft }}>
              FAN-MADE · NOT OFFICIAL · FOR S2U
            </span>
            <Sparkles size={14} color="#FF8AA8" />
          </div>
          <span className="ff-script" style={{ fontSize: 21.5, color: '#FF8AA8' }}>
            made with love · S2U 💙
          </span>
        </div>
      </div>
    </footer>
  )
}
