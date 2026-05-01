// Hero direction A — Dreamy Romantic
// Soft cloud layers, sky-blue gradient, twinkling stars, big italic display title
// with letter-by-letter reveal, sticker-style hearts.

function HeroDreamy({ dark = false }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  const title = "Hearts2Hearts";
  const palette = dark ? {
    bgTop:"#0B1530", bgMid:"#15224A", bgBot:"#1F2E5E",
    text:"#F8FAFF", textSoft:"rgba(248,250,255,.7)", accent:"#BFE3F2", chip:"rgba(255,255,255,.10)",
    cloud:"rgba(191,227,242,.18)", star:"#FFF6C9", heart:"#FFC1D0", border:"rgba(255,255,255,.18)",
  } : {
    bgTop:"#E6F4FB", bgMid:"#CDE8F5", bgBot:"#FFF2F6",
    text:"#1A2B45", textSoft:"rgba(26,43,69,.65)", accent:"#5AB3D9", chip:"rgba(255,255,255,.7)",
    cloud:"rgba(255,255,255,.85)", star:"#5AB3D9", heart:"#FF8AA8", border:"rgba(26,43,69,.10)",
  };

  // Twinkling star field — deterministic positions
  const stars = React.useMemo(() => {
    const seed = [
      [6,12,1],[14,7,1.3],[22,18,.8],[31,9,1.1],[42,5,1.4],[55,12,.9],[66,7,1.2],
      [78,15,1],[88,9,1.3],[94,22,.8],[3,32,1.1],[19,42,.9],[36,38,1.3],[48,46,.8],
      [62,40,1],[74,48,1.2],[85,44,.9],[91,38,1.1],[8,58,.8],[22,68,1],[40,72,.9],
      [58,68,1.2],[72,76,.8],[86,72,1.1],[12,82,1],[30,88,.9],[48,84,1.1],[66,90,.8],[80,86,1.2],
    ];
    return seed.map(([l,t,s],i)=>({ l, t, s, d: (i*0.13)%1.6 }));
  }, []);

  return (
    <div data-screen-label="Hero · Dreamy" style={{
      position:"relative", width:"100%", height:"100%", overflow:"hidden",
      background:`linear-gradient(180deg, ${palette.bgTop} 0%, ${palette.bgMid} 55%, ${palette.bgBot} 100%)`,
      color: palette.text, fontFamily:'"Noto Sans TC", system-ui, sans-serif',
    }}>
      {/* Top nav */}
      <header style={{
        position:"absolute", top:0, left:0, right:0, zIndex:10,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"22px 48px",
      }}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <Heart size={20} color={palette.heart} />
          <span className="ff-display" style={{fontStyle:"italic", fontSize:22, fontWeight:600, letterSpacing:".01em"}}>Hearts2Hearts</span>
        </div>
        <nav style={{display:"flex", gap:34, fontSize:13, fontWeight:500, color:palette.textSoft}}>
          {["首頁","成員","音樂","行程","相簿","Fan Wall"].map(x=>(
            <a key={x} href="#" style={{color:"inherit", textDecoration:"none"}}>{x}</a>
          ))}
        </nav>
        <div style={{display:"flex", alignItems:"center", gap:12, fontSize:12, color:palette.textSoft}}>
          <span style={{padding:"6px 12px", borderRadius:999, border:`.5px solid ${palette.border}`, background: palette.chip}}>繁中</span>
          <span style={{opacity:.5}}>EN</span>
          <span style={{opacity:.5}}>한</span>
        </div>
      </header>

      {/* Star layer */}
      <div style={{position:"absolute", inset:0, pointerEvents:"none"}}>
        {stars.map((s,i)=>(
          <Star key={i} size={6+s.s*4} color={palette.star}
            style={{
              position:"absolute", left:`${s.l}%`, top:`${s.t}%`,
              opacity: mounted ? .9 : 0, transition:`opacity 1.6s ease ${0.4 + s.d}s`,
              filter:`drop-shadow(0 0 6px ${palette.star})`,
              animation: mounted ? `twinkle 3.${i%9}s ease-in-out ${s.d}s infinite alternate` : "none",
            }}/>
        ))}
      </div>

      {/* Cloud layer — bottom, soft layered shapes */}
      <div style={{position:"absolute", left:0, right:0, bottom:0, height:"55%", pointerEvents:"none"}}>
        <Cloud size={420} color={palette.cloud} opacity={.55} style={{position:"absolute", left:"-4%", bottom:"-8%", filter:"blur(.4px)"}}/>
        <Cloud size={520} color={palette.cloud} opacity={.7} style={{position:"absolute", right:"-6%", bottom:"-12%"}}/>
        <Cloud size={300} color={palette.cloud} opacity={.5} style={{position:"absolute", left:"22%", bottom:"6%"}}/>
        <Cloud size={240} color={palette.cloud} opacity={.6} style={{position:"absolute", right:"28%", bottom:"14%", filter:"blur(.6px)"}}/>
      </div>

      {/* Center group photo placeholder, behind text */}
      <div style={{
        position:"absolute", left:"50%", top:"54%", transform:"translate(-50%,-50%)",
        width:"58%", height:"58%", zIndex:1,
        opacity: mounted ? .85 : 0, transition:"opacity 1.4s ease .4s",
      }}>
        <Placeholder label="GROUP CONCEPT PHOTO · 8 MEMBERS" tone={dark?"night":"sky"} rounded={6}
          style={{width:"100%", height:"100%",
            maskImage:"radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 80%)",
            WebkitMaskImage:"radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 80%)",
            border:`.5px solid ${palette.border}`,
          }}/>
      </div>

      {/* Title block */}
      <div style={{
        position:"absolute", left:0, right:0, top:"38%", transform:"translateY(-50%)",
        textAlign:"center", zIndex:3, padding:"0 40px",
      }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:10,
          padding:"6px 16px", borderRadius:999,
          background: palette.chip, border:`.5px solid ${palette.border}`,
          fontSize:11, letterSpacing:".24em", color:palette.textSoft, marginBottom:24,
          backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
          opacity: mounted ? 1 : 0, transition:"opacity .8s ease .2s",
        }}>
          <Sparkle size={12} color={palette.accent}/>
          <span>OFFICIAL FAN HUB · 2025 — </span>
          <Sparkle size={12} color={palette.accent}/>
        </div>

        {/* Letter-by-letter title */}
        <h1 className="ff-display" style={{
          margin:0, fontStyle:"italic", fontWeight:500,
          fontSize:"clamp(64px, 9vw, 168px)", lineHeight:.95, letterSpacing:"-.01em",
        }}>
          {title.split("").map((ch, i) => (
            <span key={i} style={{
              display:"inline-block", whiteSpace:"pre",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(28px)",
              transition: `opacity .6s ease ${0.05 + i*0.06}s, transform .8s cubic-bezier(.2,.7,.3,1) ${0.05 + i*0.06}s`,
            }}>{ch}</span>
          ))}
          <span style={{
            display:"inline-block", verticalAlign:"middle", marginLeft:18,
            opacity: mounted ? 1 : 0, transform: mounted ? "scale(1)" : "scale(.5)",
            transition:`opacity .6s ease ${0.05 + title.length*0.06}s, transform .9s cubic-bezier(.34,1.56,.64,1) ${0.05 + title.length*0.06}s`,
          }}>
            <Heart size={56} color={palette.heart} style={{filter:`drop-shadow(0 6px 14px ${palette.heart}44)`}}/>
          </span>
        </h1>

        <p style={{
          margin:"22px auto 0", maxWidth:540, fontSize:15, lineHeight:1.7,
          color:palette.textSoft, fontWeight:400,
          opacity: mounted ? 1 : 0, transition:"opacity .9s ease 1.2s",
        }}>
          <span className="ff-display" style={{fontStyle:"italic", fontSize:17, color:palette.text}}>Connect Hearts, Beat as One</span>
          <br/>
          相遇於 SM Entertainment · 八位少女的夢幻啟程 · 應援色 Sky Blue
        </p>

        <div style={{
          marginTop:32, display:"flex", justifyContent:"center", alignItems:"center", gap:22,
          opacity: mounted ? 1 : 0, transition:"opacity .9s ease 1.4s",
        }}>
          {/* Primary CTA — "Open the Letter" envelope-stamp style.
              A pearl envelope with a torn paper edge on top, sky-blue ribbon on the left,
              italic serif label, and a heart wax seal that lifts on hover.
              Hand-stamped offset shadow ties it to the postcard/letter motif. */}
          <button
            className="h2h-letter-cta"
            style={{
              appearance:"none", border:"none", cursor:"pointer", position:"relative",
              padding:"16px 30px 16px 56px",
              background: dark ? "#F8FAFF" : "#FFFCF7",
              color:"#1A2B45",
              fontFamily:'"Playfair Display", serif', fontStyle:"italic", fontWeight:600,
              fontSize:16, letterSpacing:".01em",
              boxShadow:`4px 5px 0 0 ${dark? "#5AB3D9" : "#1A2B45"}, 0 14px 32px rgba(26,43,69,.22)`,
              clipPath:"polygon(0 0, 4% 8%, 9% 0, 14% 8%, 19% 0, 24% 8%, 29% 0, 34% 8%, 39% 0, 44% 8%, 49% 0, 54% 8%, 59% 0, 64% 8%, 69% 0, 74% 8%, 79% 0, 84% 8%, 89% 0, 94% 8%, 100% 0, 100% 100%, 0 100%)",
              transition:"transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s",
            }}
            onMouseEnter={(e)=>{
              e.currentTarget.style.transform="translate(-2px,-2px)";
              e.currentTarget.style.boxShadow=`6px 7px 0 0 ${dark? "#5AB3D9" : "#1A2B45"}, 0 18px 38px rgba(26,43,69,.28)`;
              const seal = e.currentTarget.querySelector(".h2h-seal");
              if (seal) seal.style.transform = "translateY(-50%) rotate(-12deg) scale(1.08)";
            }}
            onMouseLeave={(e)=>{
              e.currentTarget.style.transform="translate(0,0)";
              e.currentTarget.style.boxShadow=`4px 5px 0 0 ${dark? "#5AB3D9" : "#1A2B45"}, 0 14px 32px rgba(26,43,69,.22)`;
              const seal = e.currentTarget.querySelector(".h2h-seal");
              if (seal) seal.style.transform = "translateY(-50%) rotate(-8deg) scale(1)";
            }}
          >
            {/* Wax seal — heart with rim highlight */}
            <span className="h2h-seal" style={{
              position:"absolute", left:14, top:"58%", transform:"translateY(-50%) rotate(-8deg)",
              width:32, height:32, borderRadius:"50%",
              background:"radial-gradient(circle at 35% 30%, #FFB0C4 0%, #FF6F8E 55%, #C73B5C 100%)",
              boxShadow:"inset 0 -2px 4px rgba(0,0,0,.25), inset 0 2px 3px rgba(255,255,255,.4), 0 2px 4px rgba(0,0,0,.18)",
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"transform .3s cubic-bezier(.34,1.56,.64,1)",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="rgba(255,255,255,.85)" d="M12 21s-7.5-4.6-9.3-9.4C1.4 8.2 3.6 4.5 7 4.5c2 0 3.5 1 5 2.7 1.5-1.7 3-2.7 5-2.7 3.4 0 5.6 3.7 4.3 7.1C19.5 16.4 12 21 12 21z"/>
              </svg>
            </span>
            <span style={{position:"relative"}}>
              開啟信件
              <span className="ff-mono" style={{
                fontStyle:"normal", fontFamily:'"JetBrains Mono", monospace',
                fontSize:9, letterSpacing:".24em", color:"#5AB3D9",
                display:"block", marginTop:1, fontWeight:500,
              }}>OPEN&nbsp;·&nbsp;THE&nbsp;LETTER</span>
            </span>
          </button>

          <button style={{
            appearance:"none", cursor:"pointer",
            padding:"13px 22px", borderRadius:999,
            background:"transparent", color: palette.text,
            fontSize:13, fontWeight:500, letterSpacing:".04em",
            border:`.5px solid ${palette.border}`,
            display:"inline-flex", alignItems:"center", gap:8,
          }}>
            <span style={{
              display:"inline-flex", width:22, height:22, borderRadius:"50%",
              background: palette.text, color: dark?"#0B1530":"#FFF",
              alignItems:"center", justifyContent:"center", fontSize:9, paddingLeft:1,
            }}>▶</span>
            聆聽最新作品
          </button>
        </div>
      </div>

      {/* Bottom info strip — comeback countdown chip */}
      <div style={{
        position:"absolute", left:48, bottom:36, zIndex:5,
        opacity: mounted ? 1 : 0, transition:"opacity .9s ease 1.6s",
      }}>
        <div style={{fontSize:10, letterSpacing:".24em", color:palette.textSoft, marginBottom:8}}>NEXT EVENT ✦ NEXT EVENT</div>
        <div style={{display:"flex", alignItems:"baseline", gap:14}}>
          <span className="ff-display" style={{fontStyle:"italic", fontSize:32, fontWeight:500}}>HEARTS 2 HOUSE</span>
          <span style={{fontSize:12, color:palette.textSoft}}>Fanmeeting · Olympic Hall, Seoul</span>
        </div>
        <div style={{display:"flex", gap:18, marginTop:10, fontFamily:'"JetBrains Mono", monospace'}}>
          {[["29","DAYS"],["12","HRS"],["44","MIN"],["08","SEC"]].map(([n,l],i)=>(
            <div key={i} style={{textAlign:"left"}}>
              <div style={{fontSize:26, fontWeight:500, color:palette.text}}>{n}</div>
              <div style={{fontSize:9, letterSpacing:".2em", color:palette.textSoft}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position:"absolute", right:48, bottom:36, zIndex:5, fontSize:11,
        color:palette.textSoft, display:"flex", alignItems:"center", gap:10,
        opacity: mounted ? 1 : 0, transition:"opacity .9s ease 1.8s",
      }}>
        <span className="ff-mono" style={{letterSpacing:".18em"}}>SCROLL</span>
        <span style={{display:"inline-block", width:1, height:32, background:palette.border, position:"relative", overflow:"hidden"}}>
          <span style={{position:"absolute", top:0, left:0, right:0, height:14, background:palette.text, animation:"scrollDot 2.4s ease-in-out infinite"}}/>
        </span>
      </div>

      <style>{`
        @keyframes twinkle { 0%{opacity:.3; transform:scale(.85)} 100%{opacity:1; transform:scale(1.1)} }
        @keyframes scrollDot { 0%{transform:translateY(-100%)} 60%{transform:translateY(120%)} 100%{transform:translateY(120%)} }
      `}</style>
    </div>
  );
}

window.HeroDreamy = HeroDreamy;
