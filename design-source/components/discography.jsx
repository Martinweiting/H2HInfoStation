// Discography — timeline of releases.

const RELEASES = [
  { date:"2025.02.24", type:"SINGLE",     title:"The Chase",        en:"Debut Single", tracks:3, color:"sky",
    note:"出道單曲，主打曲〈The Chase〉以心跳節拍為主軸。", placeholder:"SINGLE 01 · THE CHASE" },
  { date:"2025.06.30", type:"MINI ALBUM", title:"Focus on me",      en:"1st Mini Album", tracks:5, color:"blush",
    note:"首張迷你專輯，呈現少女的細膩心事。", placeholder:"MINI 01 · FOCUS ON ME" },
  { date:"2025.10.14", type:"DIGITAL",    title:"Star Letter",      en:"Digital Single", tracks:1, color:"sky",
    note:"季節限定數位單曲，獻給秋日 S2U。", placeholder:"DIGITAL · STAR LETTER" },
  { date:"2026.02.24", type:"FULL ALBUM", title:"Connect, Hearts.", en:"1st Full Album", tracks:11, color:"cream",
    note:"出道一週年，正規一輯。八位成員自作詞 4 首。", placeholder:"FULL 01 · CONNECT HEARTS" },
];

function DiscographyPage({ dark = false }) {
  const palette = dark ? {
    bg:"#0B1530", panel:"#15224A", text:"#F8FAFF", textSoft:"rgba(248,250,255,.62)",
    rule:"rgba(255,255,255,.16)", accent:"#87CEEB",
  } : {
    bg:"#FFFCF7", panel:"#FAF6F0", text:"#1A2B45", textSoft:"rgba(26,43,69,.55)",
    rule:"rgba(26,43,69,.10)", accent:"#5AB3D9",
  };

  return (
    <div data-screen-label="Discography" style={{
      width:"100%", minHeight:"100%", background:palette.bg, color:palette.text,
      fontFamily:'"Noto Sans TC", system-ui, sans-serif',
    }}>
      <div style={{padding:"56px 56px 28px", borderBottom:`.5px solid ${palette.rule}`}}>
        <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".24em", color:palette.textSoft, marginBottom:14}}>
          DISCOGRAPHY · 2025 — 2026
        </div>
        <h1 className="ff-display" style={{margin:0, fontStyle:"italic", fontSize:72, fontWeight:500, lineHeight:.95}}>
          The chronicle of <span style={{color:palette.accent}}>hearts.</span>
        </h1>
      </div>

      <div style={{padding:"48px 56px", position:"relative"}}>
        {/* Timeline rail */}
        <div style={{position:"absolute", left:120, top:32, bottom:32, width:1, background:palette.rule}}/>
        <div style={{display:"flex", flexDirection:"column", gap:48}}>
          {RELEASES.map((r,i) => (
            <div key={r.title} style={{display:"grid", gridTemplateColumns:"100px 60px 1fr 280px", gap:24, alignItems:"start"}}>
              <div style={{
                fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".18em",
                color:palette.text, paddingTop:10,
              }}>
                {r.date}
                <div style={{color:palette.textSoft, fontSize:10, marginTop:4}}>{r.type}</div>
              </div>
              {/* Dot */}
              <div style={{position:"relative", height:80}}>
                <div style={{
                  position:"absolute", left:18, top:14, width:14, height:14, borderRadius:"50%",
                  background:palette.accent, boxShadow:`0 0 0 4px ${palette.bg}, 0 0 0 5px ${palette.rule}`,
                }}/>
              </div>
              {/* Body */}
              <div>
                <h3 className="ff-display" style={{margin:"0 0 6px", fontStyle:"italic", fontSize:36, fontWeight:500, lineHeight:1, color:palette.text}}>
                  {r.title}
                </h3>
                <div style={{fontSize:13, color:palette.textSoft, marginBottom:10}}>{r.en} · {r.tracks} tracks</div>
                <p style={{margin:0, fontSize:13, lineHeight:1.7, color:palette.text, maxWidth:480}}>{r.note}</p>
                <div style={{display:"flex", gap:8, marginTop:14}}>
                  {["Spotify","Apple","YouTube","Melon"].map(s=>(
                    <span key={s} style={{padding:"4px 12px", borderRadius:999, border:`.5px solid ${palette.rule}`, fontSize:11, color:palette.textSoft, letterSpacing:".04em"}}>{s}</span>
                  ))}
                </div>
              </div>
              <Placeholder label={r.placeholder} tone={r.color} style={{width:"100%", aspectRatio:"1/1", borderRadius:8}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.DiscographyPage = DiscographyPage;
window.RELEASES = RELEASES;
