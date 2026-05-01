// Style guide artboard — colors, type, components, member-card variants.

function StyleGuide({ dark = false }) {
  const palette = dark ? {
    bg:"#0B1530", panel:"#15224A", text:"#F8FAFF", textSoft:"rgba(248,250,255,.62)",
    rule:"rgba(255,255,255,.18)",
  } : {
    bg:"#FFFCF7", panel:"#FAF6F0", text:"#1A2B45", textSoft:"rgba(26,43,69,.55)",
    rule:"rgba(26,43,69,.10)",
  };

  const Section = ({ n, title, kicker, children, style }) => (
    <section style={{padding:"28px 36px", borderTop:`.5px solid ${palette.rule}`, ...style}}>
      <div style={{display:"flex", alignItems:"baseline", gap:18, marginBottom:22}}>
        <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".22em", color:palette.textSoft}}>§ {n}</span>
        <h2 className="ff-display" style={{margin:0, fontStyle:"italic", fontSize:30, fontWeight:500, color:palette.text}}>{title}</h2>
        <span style={{marginLeft:"auto", fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".18em", color:palette.textSoft}}>{kicker}</span>
      </div>
      {children}
    </section>
  );

  const Swatch = ({ name, hex, tokens, fg = "#1A2B45" }) => (
    <div style={{flex:1, minWidth:140}}>
      <div style={{
        height:96, background: hex, borderRadius:8,
        border:`.5px solid ${palette.rule}`,
        display:"flex", alignItems:"flex-end", padding:10, color:fg,
        fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".14em",
      }}>{hex}</div>
      <div style={{marginTop:8, fontSize:12, fontWeight:600, color:palette.text}}>{name}</div>
      <div style={{fontSize:10.5, color:palette.textSoft, marginTop:2}}>{tokens}</div>
    </div>
  );

  return (
    <div data-screen-label="Style Guide" style={{
      width:"100%", minHeight:"100%", background:palette.bg, color:palette.text,
      fontFamily:'"Noto Sans TC", system-ui, sans-serif',
    }}>
      {/* Cover */}
      <div style={{padding:"40px 36px 28px", borderBottom:`.5px solid ${palette.rule}`, position:"relative"}}>
        <div style={{display:"flex", alignItems:"baseline", justifyContent:"space-between"}}>
          <div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".24em", color:palette.textSoft, marginBottom:14}}>
              STYLE GUIDE · v0.1 · 2026.04.28
            </div>
            <h1 className="ff-display" style={{margin:0, fontStyle:"italic", fontSize:64, fontWeight:500, lineHeight:1, color:palette.text}}>
              Hearts<span style={{color:"#5AB3D9"}}>2</span>Hearts.
            </h1>
            <div style={{marginTop:14, fontSize:13, color:palette.textSoft, maxWidth:520, lineHeight:1.7}}>
              繁中粉絲資訊站視覺系統。應援色 Sky Blue 為主，搭配奶油白與淡粉，營造甜美夢幻氛圍。
              Playfair Display 義體承接英文情緒，Noto Sans TC 處理中文閱讀。
            </div>
          </div>
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <Heart size={18} color="#FF8AA8"/><Star size={14} color="#5AB3D9"/><Sparkle size={20} color="#FFC8D6"/>
          </div>
        </div>
      </div>

      {/* §01 Color */}
      <Section n="01" title="Color Palette" kicker="OKLCH-CONSCIOUS · LOW SATURATION">
        <div style={{display:"flex", gap:14, flexWrap:"wrap", marginBottom:18}}>
          <Swatch name="Sky Blue · 主色" hex="#87CEEB" tokens="--sky · primary"/>
          <Swatch name="Sky Deep" hex="#5AB3D9" tokens="--sky-deep · accent"/>
          <Swatch name="Sky Soft" hex="#BFE3F2" tokens="--sky-soft"/>
          <Swatch name="Sky Mist" hex="#E6F4FB" tokens="--sky-mist · bg"/>
        </div>
        <div style={{display:"flex", gap:14, flexWrap:"wrap", marginBottom:18}}>
          <Swatch name="Cream" hex="#FFFCF7" tokens="--cream · bg-light"/>
          <Swatch name="Pearl" hex="#FAF6F0" tokens="--pearl · panel"/>
          <Swatch name="Blush" hex="#FFE5EC" tokens="--blush"/>
          <Swatch name="Blush Deep" hex="#FFC8D6" tokens="--blush-deep"/>
        </div>
        <div style={{display:"flex", gap:14, flexWrap:"wrap"}}>
          <Swatch name="Ink" hex="#1A2B45" fg="#FFFCF7" tokens="--ink · text"/>
          <Swatch name="Ink Soft" hex="#3E4F6B" fg="#FFFCF7" tokens="--ink-soft"/>
          <Swatch name="Night" hex="#0B1530" fg="#F8FAFF" tokens="--night · dark bg"/>
          <Swatch name="Star" hex="#FFF6C9" tokens="--star · accent"/>
        </div>
      </Section>

      {/* §02 Typography */}
      <Section n="02" title="Typography" kicker="PLAYFAIR · NOTO SANS TC · CAVEAT · MONO">
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:32}}>
          <div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em", color:palette.textSoft, marginBottom:8}}>DISPLAY · PLAYFAIR ITALIC</div>
            <div className="ff-display" style={{fontStyle:"italic", fontSize:64, lineHeight:1, fontWeight:500}}>Hearts2Hearts</div>
            <div className="ff-display" style={{fontStyle:"italic", fontSize:32, lineHeight:1.1, fontWeight:500, marginTop:10, color:palette.textSoft}}>Connect Hearts, Beat as One.</div>

            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em", color:palette.textSoft, marginTop:24, marginBottom:6}}>SCRIPT · CAVEAT</div>
            <div className="ff-script" style={{fontSize:38, color:"#FF8AA8"}}>made with love · S2U</div>
          </div>
          <div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em", color:palette.textSoft, marginBottom:6}}>BODY · NOTO SANS TC</div>
            <div style={{fontSize:24, fontWeight:600, lineHeight:1.4}}>八位少女、八種光譜、一顆共振的心。</div>
            <div style={{fontSize:14, lineHeight:1.75, marginTop:8, color:palette.textSoft}}>
              Hearts2Hearts 是 SM Entertainment 於 2025 年推出的女子組合，由八位成員組成，於 2025 年 2 月 24 日以單曲專輯《The Chase》正式出道。
            </div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".18em", color:palette.textSoft, marginTop:14}}>
              MONO · METADATA · 2025.02.24 / S2U / #87CEEB
            </div>

            <div style={{display:"flex", gap:18, marginTop:18, fontSize:12, color:palette.textSoft}}>
              <div><b style={{color:palette.text, fontSize:36, fontWeight:500}}>Aa</b><div>H1 · 64–132 italic</div></div>
              <div><b style={{color:palette.text, fontSize:24, fontWeight:600}}>Aa</b><div>H2 · 24–32</div></div>
              <div><b style={{color:palette.text, fontSize:14, fontWeight:500}}>Aa</b><div>Body · 14</div></div>
              <div><b style={{color:palette.text, fontSize:11, fontWeight:500, fontFamily:'"JetBrains Mono", monospace', letterSpacing:".18em"}}>AA</b><div>Meta · 11 mono</div></div>
            </div>
          </div>
        </div>
      </Section>

      {/* §03 Components */}
      <Section n="03" title="Components" kicker="BUTTONS · CHIPS · CARDS">
        <div style={{display:"flex", flexWrap:"wrap", gap:14, alignItems:"center"}}>
          {/* Primary CTA — envelope-stamp w/ wax seal */}
          <button style={{
            appearance:"none", border:"none", cursor:"pointer", position:"relative",
            padding:"16px 30px 16px 56px",
            background: dark? "#F8FAFF" : "#FFFCF7", color:"#1A2B45",
            fontFamily:'"Playfair Display", serif', fontStyle:"italic", fontWeight:600,
            fontSize:16, letterSpacing:".01em",
            boxShadow:`4px 5px 0 0 ${dark? "#5AB3D9" : "#1A2B45"}, 0 14px 32px rgba(26,43,69,.18)`,
            clipPath:"polygon(0 0, 4% 8%, 9% 0, 14% 8%, 19% 0, 24% 8%, 29% 0, 34% 8%, 39% 0, 44% 8%, 49% 0, 54% 8%, 59% 0, 64% 8%, 69% 0, 74% 8%, 79% 0, 84% 8%, 89% 0, 94% 8%, 100% 0, 100% 100%, 0 100%)",
          }}>
            <span style={{
              position:"absolute", left:14, top:"58%", transform:"translateY(-50%) rotate(-8deg)",
              width:32, height:32, borderRadius:"50%",
              background:"radial-gradient(circle at 35% 30%, #FFB0C4 0%, #FF6F8E 55%, #C73B5C 100%)",
              boxShadow:"inset 0 -2px 4px rgba(0,0,0,.25), inset 0 2px 3px rgba(255,255,255,.4), 0 2px 4px rgba(0,0,0,.18)",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <Heart size={16} color="rgba(255,255,255,.85)"/>
            </span>
            <span style={{position:"relative"}}>
              開啟信件
              <span style={{
                fontStyle:"normal", fontFamily:'"JetBrains Mono", monospace',
                fontSize:9, letterSpacing:".24em", color:"#5AB3D9",
                display:"block", marginTop:1, fontWeight:500,
              }}>OPEN&nbsp;·&nbsp;THE&nbsp;LETTER</span>
            </span>
          </button>
          <button style={{appearance:"none", cursor:"pointer", padding:"13px 22px", borderRadius:999, background:"transparent", color:palette.text, fontSize:13, fontWeight:500, letterSpacing:".04em", border:`.5px solid ${palette.rule}`, display:"inline-flex", alignItems:"center", gap:8}}>
            <span style={{display:"inline-flex", width:22, height:22, borderRadius:"50%", background:palette.text, color:dark?"#0B1530":"#FFF", alignItems:"center", justifyContent:"center", fontSize:9, paddingLeft:1}}>▶</span>
            Secondary
          </button>
          <button style={{appearance:"none", border:"none", cursor:"pointer", padding:"13px 26px", borderRadius:0, background:palette.text, color: dark?"#0B1530":"#FFFCF7", fontSize:11, fontWeight:600, letterSpacing:".22em", fontFamily:'"JetBrains Mono", monospace'}}>EDITORIAL ↗</button>
          <span style={{padding:"6px 14px", borderRadius:999, background:"#E6F4FB", fontSize:11, color:"#1A2B45", letterSpacing:".06em"}}>♡ Tag · Sky</span>
          <span style={{padding:"6px 14px", borderRadius:999, background:"#FFE5EC", fontSize:11, color:"#1A2B45"}}>♡ Tag · Blush</span>
          <span style={{padding:"6px 14px", borderRadius:999, border:`.5px solid ${palette.rule}`, fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em", color:palette.textSoft}}>2025.02.24</span>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16, marginTop:22}}>
          {/* Discography card */}
          <div style={{background:palette.panel, border:`.5px solid ${palette.rule}`, borderRadius:12, padding:14}}>
            <Placeholder label="ALBUM · THE CHASE" tone="sky" style={{width:"100%", aspectRatio:"1/1", borderRadius:8}}/>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".18em", color:palette.textSoft, marginTop:10}}>SINGLE · 2025.02.24</div>
            <div className="ff-display" style={{fontStyle:"italic", fontSize:22, fontWeight:500, marginTop:2, color:palette.text}}>The Chase</div>
            <div style={{display:"flex", gap:6, marginTop:8, fontSize:10, color:palette.textSoft}}>
              <span style={{padding:"3px 8px", borderRadius:999, border:`.5px solid ${palette.rule}`}}>Spotify</span>
              <span style={{padding:"3px 8px", borderRadius:999, border:`.5px solid ${palette.rule}`}}>Apple</span>
              <span style={{padding:"3px 8px", borderRadius:999, border:`.5px solid ${palette.rule}`}}>YouTube</span>
            </div>
          </div>
          {/* Schedule card */}
          <div style={{background:palette.panel, border:`.5px solid ${palette.rule}`, borderRadius:12, padding:18, display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <div>
              <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em", color:"#5AB3D9", marginBottom:8}}>FANMEETING ✦ UPCOMING</div>
              <div className="ff-display" style={{fontStyle:"italic", fontSize:24, fontWeight:500, lineHeight:1.1}}>Hearts 2 House</div>
              <div style={{fontSize:12, color:palette.textSoft, marginTop:6}}>Olympic Hall, Seoul · 2 Nights</div>
            </div>
            <div style={{display:"flex", gap:12, marginTop:14, fontFamily:'"JetBrains Mono", monospace'}}>
              {[["29","D"],["12","H"],["44","M"]].map(([n,l],i)=>(
                <div key={i}><div style={{fontSize:24, fontWeight:500}}>{n}</div><div style={{fontSize:9, letterSpacing:".18em", color:palette.textSoft}}>{l}</div></div>
              ))}
            </div>
          </div>
          {/* Quote card */}
          <div style={{background:"linear-gradient(160deg, #BFE3F2 0%, #FFE5EC 100%)", borderRadius:12, padding:18, color:"#1A2B45", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Heart size={22} color="#FF8AA8"/>
            <div className="ff-display" style={{fontStyle:"italic", fontSize:22, fontWeight:500, lineHeight:1.3, marginTop:8}}>
              "我們的心 與你的心 一起跳動。"
            </div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em", marginTop:12}}>JIWOO · LEADER</div>
          </div>
        </div>
      </Section>

      {/* §04 Member Cards */}
      <Section n="04" title="Member Cards · 三種風格" kicker="POLAROID · MAGAZINE · MINIMAL">
        <div style={{display:"flex", gap:18, alignItems:"flex-start", flexWrap:"wrap"}}>
          <div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em", color:palette.textSoft, marginBottom:14}}>A · POLAROID</div>
            <PolaroidCard m={MEMBERS[0]} tilt={-3}/>
          </div>
          <div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em", color:palette.textSoft, marginBottom:14}}>B · MAGAZINE</div>
            <MagazineCard m={MEMBERS[0]}/>
          </div>
          <div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em", color:palette.textSoft, marginBottom:14}}>C · MINIMAL</div>
            <MinimalCard m={MEMBERS[0]}/>
          </div>
        </div>
        <div style={{marginTop:24, fontSize:12, color:palette.textSoft, lineHeight:1.7, maxWidth:640}}>
          三種卡片風格共用同一份成員資料結構（韓/英/中名、生日、擔當、MBTI、代表 emoji）。
          可在 Tweaks 面板切換預設風格；缺漏資料統一以 <span className="ff-mono" style={{color:palette.text}}>Coming Soon</span> 顯示。
        </div>
      </Section>

      {/* §05 Visual Language */}
      <Section n="05" title="Visual Language" kicker="STICKERS · MOTIFS">
        <div style={{display:"flex", gap:24, alignItems:"center", flexWrap:"wrap"}}>
          <div style={{textAlign:"center"}}><Heart size={36} color="#FF8AA8"/><div style={{fontSize:10, color:palette.textSoft, marginTop:6, fontFamily:'"JetBrains Mono", monospace', letterSpacing:".18em"}}>HEART · S2 ↔ ❤</div></div>
          <div style={{textAlign:"center"}}><Star size={36} color="#5AB3D9"/><div style={{fontSize:10, color:palette.textSoft, marginTop:6, fontFamily:'"JetBrains Mono", monospace', letterSpacing:".18em"}}>FOUR-POINT STAR</div></div>
          <div style={{textAlign:"center"}}><Sparkle size={42} color="#FFC8D6"/><div style={{fontSize:10, color:palette.textSoft, marginTop:6, fontFamily:'"JetBrains Mono", monospace', letterSpacing:".18em"}}>SPARKLE</div></div>
          <div style={{textAlign:"center"}}><Cloud size={80} color={dark?"rgba(191,227,242,.4)":"#FFFCF7"} style={{filter:"drop-shadow(0 4px 8px rgba(26,43,69,.1))"}}/><div style={{fontSize:10, color:palette.textSoft, marginTop:0, fontFamily:'"JetBrains Mono", monospace', letterSpacing:".18em"}}>CLOUD</div></div>
          <div style={{flex:1, minWidth:240, fontSize:12.5, color:palette.textSoft, lineHeight:1.7}}>
            視覺元素以心形（呼應團名 Hearts2Hearts）、星光與雲朵為核心。
            禁止使用過度卡通化的造型；所有插畫元素皆為簡化幾何，搭配柔光陰影即可。
          </div>
        </div>
      </Section>
    </div>
  );
}

window.StyleGuide = StyleGuide;
