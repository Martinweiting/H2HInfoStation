// Fan Wall — sticky-note style messages, composer, trending tags.

const FAN_MESSAGES = [
  { name:"@s2u_lily",     msg:"看完 Music Bank 直播心臟還在跳！Jiwoo unnie 一個眼神就讓我哭出來。", tag:"#我們的指南針", tone:"sky"   },
  { name:"@hearts_chichi",msg:"今天是支持 H2H 的第 365 天。從第一首〈The Chase〉到現在，我們真的沒有錯過任何一個瞬間 💙", tag:"#H2H_1YEAR", tone:"blush" },
  { name:"@minty_juun",   msg:"Juun 在 V Live 推薦的咖啡廳超棒！下次首爾朝聖名單 +1。", tag:"#Juun_cafe", tone:"cream" },
  { name:"@yeon_ssi",     msg:"買到 Hearts 2 House 兩天票了，從台北飛首爾 ✈️ 等不及見面了！", tag:"#H2HOUSE", tone:"sky"   },
  { name:"@stella_pocket",msg:"Stella 翻唱影片在循環播放中，求出 OST！", tag:"#Stella_voice", tone:"blush" },
  { name:"@carmen_fan",   msg:"Carmen 在 fancam 裡的笑容真的太治癒了 🥺", tag:"#Carmen_smile", tone:"cream" },
];

function FanWallPage({ dark = false }) {
  const palette = dark ? {
    bg:"#0B1530", panel:"#15224A", text:"#F8FAFF", textSoft:"rgba(248,250,255,.62)",
    rule:"rgba(255,255,255,.16)", accent:"#87CEEB",
  } : {
    bg:"#FFFCF7", panel:"#FAF6F0", text:"#1A2B45", textSoft:"rgba(26,43,69,.55)",
    rule:"rgba(26,43,69,.10)", accent:"#5AB3D9",
  };

  const noteColors = {
    sky:   { bg:"#E6F4FB", tape:"#5AB3D9" },
    blush: { bg:"#FFE5EC", tape:"#FF8AA8" },
    cream: { bg:"#FFF4D6", tape:"#E0B860" },
  };

  return (
    <div data-screen-label="Fan Wall" style={{
      width:"100%", minHeight:"100%", background:palette.bg, color:palette.text,
      fontFamily:'"Noto Sans TC", system-ui, sans-serif',
    }}>
      {/* Header */}
      <div style={{padding:"56px 56px 32px", borderBottom:`.5px solid ${palette.rule}`, position:"relative", overflow:"hidden"}}>
        <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".24em", color:palette.textSoft, marginBottom:14}}>
          FAN WALL · 1,284 LETTERS · LIVE
        </div>
        <h1 className="ff-display" style={{margin:0, fontStyle:"italic", fontSize:72, fontWeight:500, lineHeight:.95}}>
          Letters from <span style={{color:palette.accent}}>S2U.</span>
        </h1>
        <p style={{maxWidth:560, fontSize:14, lineHeight:1.7, color:palette.textSoft, marginTop:18}}>
          把心意貼上牆。每一張便利貼都是一封寫給 Hearts2Hearts 的小信。
        </p>
      </div>

      {/* Composer */}
      <div style={{padding:"36px 56px", background:palette.panel, borderBottom:`.5px solid ${palette.rule}`}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 280px", gap:32}}>
          <div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".22em", color:palette.textSoft, marginBottom:10}}>
              ✎ WRITE A LETTER
            </div>
            <div style={{
              background: dark? "rgba(255,255,255,.06)" : "#FFFCF7",
              border:`.5px solid ${palette.rule}`, borderRadius:12, padding:18,
            }}>
              <div style={{fontFamily:'"Caveat", cursive', fontSize:24, color:palette.textSoft, lineHeight:1.4, minHeight:80}}>
                寫下你想對 Hearts2Hearts 說的話…
              </div>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:14, paddingTop:14, borderTop:`.5px solid ${palette.rule}`}}>
                <div style={{display:"flex", gap:8}}>
                  {Object.entries(noteColors).map(([k,v]) => (
                    <span key={k} style={{
                      width:22, height:22, borderRadius:6, background:v.bg,
                      border: k==="sky" ? `1.5px solid ${palette.accent}` : `.5px solid ${palette.rule}`,
                      cursor:"pointer",
                    }}/>
                  ))}
                  <span style={{padding:"4px 10px", borderRadius:6, background: dark? "rgba(255,255,255,.06)":"#FAF6F0", fontSize:11, color:palette.textSoft, marginLeft:8}}>#添加標籤</span>
                </div>
                <button style={{
                  appearance:"none", border:"none", cursor:"pointer", position:"relative",
                  padding:"10px 22px 10px 38px",
                  background: dark? "#F8FAFF" : "#FFFCF7", color:"#1A2B45",
                  fontFamily:'"Playfair Display", serif', fontStyle:"italic", fontWeight:600, fontSize:13,
                  boxShadow:`3px 3px 0 0 ${dark? "#5AB3D9" : "#1A2B45"}`,
                }}>
                  <span style={{
                    position:"absolute", left:10, top:"50%", transform:"translateY(-50%) rotate(-8deg)",
                    width:22, height:22, borderRadius:"50%",
                    background:"radial-gradient(circle at 35% 30%, #FFB0C4 0%, #FF6F8E 55%, #C73B5C 100%)",
                    boxShadow:"inset 0 -1px 2px rgba(0,0,0,.25), inset 0 1px 2px rgba(255,255,255,.4)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <Heart size={11} color="rgba(255,255,255,.9)"/>
                  </span>
                  寄出
                </button>
              </div>
            </div>
          </div>

          <div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".22em", color:palette.textSoft, marginBottom:10}}>
              # TRENDING
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:8}}>
              {[
                ["#H2H_1YEAR", 482],
                ["#我們的指南針", 312],
                ["#H2HOUSE", 268],
                ["#Connect_Hearts", 198],
                ["#Stella_voice", 134],
              ].map(([tag, n]) => (
                <div key={tag} style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", padding:"8px 14px", borderRadius:8, background: dark?"rgba(255,255,255,.04)":"#FFFCF7", border:`.5px solid ${palette.rule}`}}>
                  <span style={{fontSize:13, color:palette.text, fontWeight:500}}>{tag}</span>
                  <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".18em", color:palette.textSoft}}>{n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wall */}
      <div style={{padding:"40px 56px"}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:24}}>
          {FAN_MESSAGES.map((m, i) => {
            const c = noteColors[m.tone];
            const tilt = (i%2===0?-1:1) * (1 + (i%3));
            return (
              <div key={i} style={{
                position:"relative", padding:"28px 22px 22px",
                background: c.bg, color:"#1A2B45",
                transform:`rotate(${tilt}deg)`,
                boxShadow:"0 12px 28px rgba(26,43,69,.18)",
                transition:"transform .25s ease",
              }}
              onMouseEnter={(e)=>e.currentTarget.style.transform="rotate(0deg) translateY(-4px)"}
              onMouseLeave={(e)=>e.currentTarget.style.transform=`rotate(${tilt}deg)`}
              >
                <div style={{
                  position:"absolute", top:-8, left:"50%", transform:"translateX(-50%) rotate(-3deg)",
                  width:64, height:18, background:c.tape, opacity:.6,
                  boxShadow:"0 1px 2px rgba(0,0,0,.06)",
                }}/>
                <div className="ff-script" style={{fontSize:18, lineHeight:1.5, color:"#1A2B45", minHeight:90}}>
                  {m.msg}
                </div>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", marginTop:14, paddingTop:12, borderTop:"1px dashed rgba(26,43,69,.2)"}}>
                  <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".18em", color:"rgba(26,43,69,.7)"}}>{m.name}</span>
                  <span style={{fontSize:10, color:"#5AB3D9", fontWeight:600}}>{m.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

window.FanWallPage = FanWallPage;
