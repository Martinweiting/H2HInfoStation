const TONE_COLORS = {
  sky:   { bg: 'linear-gradient(145deg, #BFE3F2 0%, #87CEEB 100%)', text: '#1A2B45' },
  blush: { bg: 'linear-gradient(145deg, #FFE5EC 0%, #FFC8D6 100%)', text: '#1A2B45' },
  cream: { bg: 'linear-gradient(145deg, #F5F0FF 0%, #EAF5FF 100%)', text: '#1A2B45' },
  night: { bg: 'linear-gradient(145deg, #15224A 0%, #0B1530 100%)', text: 'rgba(248,250,255,.55)' },
}

export function Placeholder({ label = '', tone = 'sky', ratio, rounded = 8, style = {} }) {
  const c = TONE_COLORS[tone] || TONE_COLORS.sky
  return (
    <div
      aria-label={label}
      style={{
        background: c.bg,
        borderRadius: rounded,
        aspectRatio: ratio,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...style,
      }}
    >
      <span style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 15.5,
        letterSpacing: '.2em',
        color: c.text,
        opacity: .5,
        textAlign: 'center',
        padding: '0 12px',
        userSelect: 'none',
      }}>
        {label}
      </span>
    </div>
  )
}
