// Striped placeholder w/ monospace label — used everywhere we'd put a real photo.
function Placeholder({ label = "PHOTO", w, h, ratio, tone = "sky", style, className, children, rounded = 0 }) {
  const palettes = {
    sky:   { a: "#BFE3F2", b: "#9DD3EA", text: "rgba(26,43,69,.55)" },
    blush: { a: "#FFD9E2", b: "#FFC1D0", text: "rgba(74,32,44,.55)" },
    cream: { a: "#F2EAD8", b: "#E8DCC2", text: "rgba(60,48,30,.55)" },
    night: { a: "#1A2B5A", b: "#0F1B3D", text: "rgba(220,230,255,.55)" },
  };
  const p = palettes[tone] || palettes.sky;
  const stripe = `repeating-linear-gradient(135deg, ${p.a} 0 14px, ${p.b} 14px 28px)`;
  const inner = (
    <>
      <div style={{position:"absolute", inset:0, background: stripe}} />
      <div style={{position:"absolute", inset:0, background: `radial-gradient(120% 80% at 50% 30%, rgba(255,255,255,.18), transparent 60%)`}} />
      <div style={{
        position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)",
        fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".18em",
        color:p.text, textAlign:"center", lineHeight:1.6, padding:"6px 10px",
        background:"rgba(255,255,255,.72)", borderRadius:2, whiteSpace:"nowrap",
      }}>
        {label}
      </div>
      {children}
    </>
  );
  const baseStyle = {
    position:"relative", overflow:"hidden", borderRadius:rounded,
    width: w, height: h,
    aspectRatio: ratio, ...style,
  };
  return <div className={className} style={baseStyle}>{inner}</div>;
}

// Tiny sticker primitives — sky ✦, ✧ stars, hearts, clouds. Inline SVG so they
// inherit currentColor + scale freely.
function Star({ size = 14, color = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      <path fill={color} d="M12 1.5c.3 4.6 1.7 6 6.3 6.3-4.6.3-6 1.7-6.3 6.3-.3-4.6-1.7-6-6.3-6.3 4.6-.3 6-1.7 6.3-6.3z"/>
    </svg>
  );
}
function Sparkle({ size = 18, color = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      <path fill={color} d="M12 2c.4 5.6 1.7 7.6 8 8-6.3.4-7.6 2.4-8 8-.4-5.6-1.7-7.6-8-8 6.3-.4 7.6-2.4 8-8z"/>
      <circle cx="20.5" cy="3.5" r="1" fill={color}/>
      <circle cx="3" cy="20" r=".8" fill={color}/>
    </svg>
  );
}
function Heart({ size = 14, color = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      <path fill={color} d="M12 21s-7.5-4.6-9.3-9.4C1.4 8.2 3.6 4.5 7 4.5c2 0 3.5 1 5 2.7 1.5-1.7 3-2.7 5-2.7 3.4 0 5.6 3.7 4.3 7.1C19.5 16.4 12 21 12 21z"/>
    </svg>
  );
}
function Cloud({ size = 80, color = "white", opacity = 1, style }) {
  return (
    <svg width={size} height={size*0.6} viewBox="0 0 100 60" style={{opacity, ...style}} aria-hidden="true">
      <ellipse cx="25" cy="40" rx="22" ry="18" fill={color}/>
      <ellipse cx="50" cy="32" rx="28" ry="22" fill={color}/>
      <ellipse cx="75" cy="40" rx="20" ry="16" fill={color}/>
      <rect x="10" y="38" width="80" height="20" rx="10" fill={color}/>
    </svg>
  );
}

window.Placeholder = Placeholder;
window.Star = Star;
window.Sparkle = Sparkle;
window.Heart = Heart;
window.Cloud = Cloud;
