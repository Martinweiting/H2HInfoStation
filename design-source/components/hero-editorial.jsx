// Hero direction B — High-end Editorial
// Magazine-style split layout, large image right + serif type left,
// thin rules, monospace metadata, restrained color (sky as accent only).

function HeroEditorial({ dark = false }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  const palette = dark ? {
    bg:"#0B1530", panel:"#0F1B3D", text:"#F8FAFF", textSoft:"rgba(248,250,255,.62)",
    accent:"#87CEEB", rule:"rgba(255,255,255,.18)", chip:"rgba(255,255,255,.06)",
    heart:"#FFC1D0",
  } : {
    bg:"#FFFCF7", panel:"#FAF6F0", text:"#1A2B45", textSoft:"rgba(26,43,69,.55)",
    accent:"#5AB3D9", rule:"rgba(26,43,69,.14)", chip:"rgba(26,43,69,.04)",
    heart:"#FF8AA8",
  };

  const reveal = (delay) => ({
    opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(14px)",
    transition:`opacity .8s ease ${delay}s, transform .9s cubic-bezier(.2,.7,.3,1) ${delay}s`,
  });

  const title = "Hearts2Hearts";

  return (
    <div data-screen-label="Hero · Editorial" style={{
      position:"relative", width:"100%", height:"100%", overflow:"hidden",
      background: palette.bg, color: palette.text,
      fontFamily:'"Noto Sans TC", system-ui, sans-serif',
    }}>
      {/* Top bar */}
      <header style={{
        position:"absolute", top:0, left:0, right:0, zIndex:10,
        display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"center",
        padding:"20px 40px", borderBottom:`.5px solid ${palette.rule}`,
        fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".18em",
      }}>
        <div style={{color:palette.textSoft}}>VOL. 01 — H2H · OFFICIAL S2U HUB</div>
        <div style={{display:"flex", alignItems:"center", gap:8, color:palette.text}}>
          <Heart size={11} color={palette.heart}/>
          <span style={{letterSpacing:".24em", fontWeight:500}}>HEARTS&nbsp;2&nbsp;HEARTS</span>
          <Heart size={11} color={palette.heart}/>
        </div>
        <div style={{justifySelf:"end", display:"flex", gap:18, color:palette.textSoft}}>
          <span style={{color:palette.text}}>繁中</span><span style={{opacity:.4}}>EN</span><span style={{opacity:.4}}>한</span>
        </div>
      </header>

      {/* Side rail nav — dedicated column, vertical text */}
      <nav style={{
        position:"absolute", left:40, top:78, bottom:50, width:48, zIndex:6,
        display:"flex", flexDirection:"column", gap:22, alignItems:"center",
        justifyContent:"center",
        fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".24em",
        borderRight:`.5px solid ${palette.rule}`,
        ...reveal(.3),
      }}>
        {[["01","HOME"],["02","MEMBERS"],["03","MUSIC"],["04","SCHEDULE"],["05","GALLERY"],["06","FAN WALL"]].map(([n,l],i)=>(
          <a key={l} href="#" style={{
            color: i===0? palette.text : palette.textSoft, textDecoration:"none",
            writingMode:"vertical-rl", transform:"rotate(180deg)",
            display:"flex", alignItems:"center", gap:8,
          }}>
            <span style={{color:palette.accent}}>{n}</span>
            <span>{l}</span>
          </a>
        ))}
      </nav>

      {/* Main grid — leaves 100px on the left for the rail */}
      <div style={{
        position:"absolute", inset:"68px 40px 60px 130px",
        display:"grid", gridTemplateColumns:"minmax(0,1.05fr) minmax(0,1fr)", gap:48,
      }}>
        {/* LEFT — type column */}
        <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", paddingTop:24}}>
          <div>
            <div style={{...reveal(.15), fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".22em", color:palette.textSoft, marginBottom:36}}>
              ISSUE №.001 / DEBUT — 2025.02.24
              <div style={{height:1, background:palette.rule, marginTop:14, width:"60%"}}/>
            </div>

            <h1 className="ff-display" style={{
              margin:0, fontWeight:400, fontSize:"clamp(60px, 7.6vw, 132px)",
              lineHeight:.92, letterSpacing:"-.015em",
            }}>
              <span style={{display:"block"}}>
                {"Hearts ".split("").map((ch,i)=>(
                  <span key={"a"+i} style={{display:"inline-block", whiteSpace:"pre",
                    opacity: mounted?1:0, transform: mounted?"translateY(0)":"translateY(20px)",
                    transition:`opacity .6s ease ${0.1 + i*0.05}s, transform .8s cubic-bezier(.2,.7,.3,1) ${0.1 + i*0.05}s`,
                  }}>{ch}</span>
                ))}
                <span style={{
                  fontStyle:"italic", color:palette.accent, fontSize:".82em", verticalAlign:"baseline",
                  display:"inline-block", opacity: mounted?1:0, transform: mounted?"scale(1)":"scale(.6)",
                  transition:`opacity .7s ease .6s, transform .9s cubic-bezier(.34,1.56,.64,1) .6s`,
                }}>2</span>
              </span>
              <span style={{display:"block", fontStyle:"italic", marginTop:-6}}>
                {"Hearts.".split("").map((ch,i)=>(
                  <span key={"b"+i} style={{display:"inline-block", whiteSpace:"pre",
                    opacity: mounted?1:0, transform: mounted?"translateY(0)":"translateY(20px)",
                    transition:`opacity .6s ease ${0.7 + i*0.05}s, transform .8s cubic-bezier(.2,.7,.3,1) ${0.7 + i*0.05}s`,
                  }}>{ch}</span>
                ))}
              </span>
            </h1>

            <div style={{...reveal(1.3), height:1, background:palette.rule, margin:"34px 0 22px", width:"42%"}}/>

            <p style={{...reveal(1.4), margin:0, maxWidth:440, fontSize:14.5, lineHeight:1.75, color:palette.textSoft}}>
              八位少女、八種光譜、一顆共振的心。<br/>
              來自 SM Entertainment 的全新女團 Hearts2Hearts，<br/>
              將心意傳遞給每一位 <span style={{color:palette.text, fontWeight:500}}>S2U</span>。
            </p>
          </div>

          <div style={{...reveal(1.6), display:"flex", flexDirection:"column", gap:14}}>
            <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
              <button style={{
                appearance:"none", border:"none", cursor:"pointer",
                padding:"14px 22px", borderRadius:0,
                background: palette.text, color: dark?"#0B1530":"#FFFCF7",
                fontSize:11, fontWeight:600, letterSpacing:".22em",
                fontFamily:'"JetBrains Mono", monospace',
              }}>READ THE STORY ↗</button>
              <button style={{
                appearance:"none", cursor:"pointer",
                padding:"14px 22px", borderRadius:0,
                background:"transparent", color: palette.text,
                fontSize:11, fontWeight:600, letterSpacing:".22em",
                fontFamily:'"JetBrains Mono", monospace',
                border:`.5px solid ${palette.rule}`,
              }}>DISCOGRAPHY</button>
            </div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:palette.textSoft, letterSpacing:".18em", display:"flex", gap:18}}>
              <span>SM ENTERTAINMENT</span>
              <span>SEOUL · KR</span>
            </div>
          </div>
        </div>

        {/* RIGHT — image column */}
        <div style={{position:"relative", ...reveal(.5)}}>
          <Placeholder label="EDITORIAL CONCEPT PHOTO" tone={dark?"night":"sky"}
            style={{position:"absolute", inset:0}}/>
          {/* Editorial caption block */}
          <div style={{
            position:"absolute", left:0, right:0, bottom:0,
            padding:"18px 20px",
            background: dark?"rgba(11,21,48,.78)":"rgba(255,252,247,.86)",
            backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)",
            borderTop:`.5px solid ${palette.rule}`,
            display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:24,
          }}>
            <div>
              <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em", color:palette.textSoft, marginBottom:6}}>
                FIG. 001 — DEBUT FRAME
              </div>
              <div className="ff-display" style={{fontStyle:"italic", fontSize:18, fontWeight:500}}>
                "Connect Hearts, Beat as One."
              </div>
            </div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:palette.textSoft, letterSpacing:".18em", whiteSpace:"nowrap"}}>
              p. 001 / 008
            </div>
          </div>
          {/* Floating member roster vertical strip */}
          <div style={{
            position:"absolute", top:0, right:-1, height:"100%", width:32,
            background: palette.bg, borderLeft:`.5px solid ${palette.rule}`,
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <div style={{
              transform:"rotate(-90deg)", whiteSpace:"nowrap",
              fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".32em",
              color:palette.textSoft,
            }}>
              JIWOO · CARMEN · YUHA · STELLA · JUUN · A-NA · IAN · YE-ON
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <footer style={{
        position:"absolute", left:40, right:40, bottom:0, height:40,
        borderTop:`.5px solid ${palette.rule}`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em",
        color:palette.textSoft, ...reveal(1.8),
      }}>
        <div>NEXT — HEARTS 2 HOUSE FANMEETING / 2026.02.21 / OLYMPIC HALL</div>
        <div style={{display:"flex", gap:16}}>
          <span>OFFICIAL COLOR · <span style={{color:palette.accent}}>#87CEEB</span></span>
          <span>FANBASE · S2U</span>
        </div>
      </footer>
    </div>
  );
}

window.HeroEditorial = HeroEditorial;
