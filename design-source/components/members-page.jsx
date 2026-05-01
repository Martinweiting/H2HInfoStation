// Members full page — grid of all 8 members with detail-style cards.
// Uses the chosen card style as base; for the dedicated page we use a richer
// editorial layout regardless.

function MembersPage({ dark = false, cardStyle = "polaroid" }) {
  const palette = dark ? {
    bg:"#0B1530", panel:"#15224A", text:"#F8FAFF", textSoft:"rgba(248,250,255,.62)",
    rule:"rgba(255,255,255,.16)", accent:"#87CEEB",
  } : {
    bg:"#FFFCF7", panel:"#FAF6F0", text:"#1A2B45", textSoft:"rgba(26,43,69,.55)",
    rule:"rgba(26,43,69,.10)", accent:"#5AB3D9",
  };

  const renderCard = (m, i) => {
    if (cardStyle === "magazine") return <MagazineCard m={m}/>;
    if (cardStyle === "minimal")  return <MinimalCard m={m}/>;
    return <PolaroidCard m={m} tilt={(i%2===0?-2:2) * (1 + (i%2))}/>;
  };

  return (
    <div data-screen-label="Members Page" style={{
      width:"100%", minHeight:"100%", background:palette.bg, color:palette.text,
      fontFamily:'"Noto Sans TC", system-ui, sans-serif',
    }}>
      {/* Cover */}
      <div style={{padding:"56px 56px 36px", borderBottom:`.5px solid ${palette.rule}`, position:"relative", overflow:"hidden"}}>
        <div style={{position:"absolute", top:24, right:48, opacity:.4}}>
          <Cloud size={180} color={dark? "rgba(191,227,242,.18)":"#E6F4FB"}/>
        </div>
        <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".24em", color:palette.textSoft, marginBottom:14}}>
          MEMBERS · 008 · DEBUT 2025.02.24
        </div>
        <h1 className="ff-display" style={{margin:0, fontStyle:"italic", fontSize:84, fontWeight:500, lineHeight:.95, color:palette.text}}>
          Eight hearts, <span style={{color:palette.accent}}>one beat.</span>
        </h1>
        <p style={{maxWidth:560, fontSize:14, lineHeight:1.7, color:palette.textSoft, marginTop:18}}>
          來自 SM Entertainment 的全新女子組合 Hearts2Hearts，由八位來自韓、日、中的少女組成，
          以「心意傳遞」為核心概念，將每一份心動傳遞給每一位 S2U。
        </p>
      </div>

      {/* Grid */}
      <div style={{
        padding:"40px 56px",
        display:"grid",
        gridTemplateColumns: cardStyle==="polaroid" ? "repeat(4, 1fr)" : "repeat(4, 1fr)",
        gap: cardStyle==="polaroid" ? "32px 24px" : "28px 20px",
        justifyItems:"center",
      }}>
        {MEMBERS.map((m, i) => (
          <div key={m.en}>{renderCard(m, i)}</div>
        ))}
      </div>

      {/* Detail spotlight — Jiwoo */}
      <div style={{padding:"40px 56px", borderTop:`.5px solid ${palette.rule}`, background:palette.panel}}>
        <div style={{display:"flex", alignItems:"baseline", gap:16, marginBottom:20}}>
          <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".24em", color:palette.textSoft}}>SPOTLIGHT · NO.01</span>
          <h2 className="ff-display" style={{margin:0, fontStyle:"italic", fontSize:42, fontWeight:500}}>Jiwoo · 지우</h2>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"320px 1fr", gap:36}}>
          <Placeholder label="JIWOO · SPOTLIGHT" tone="sky" style={{aspectRatio:"3/4", borderRadius:8}}/>
          <div>
            <div style={{display:"grid", gridTemplateColumns:"110px 1fr", gap:"10px 18px", fontSize:13, lineHeight:1.7}}>
              {[
                ["POSITION","Leader · Vocalist · Visual"],
                ["BIRTH","2006.09.07"],
                ["MBTI","ISTJ"],
                ["HEIGHT","165 cm"],
                ["MOTTO","「把每一首歌，都當作給你的信。」"],
                ["FAV. COLOR","Sky Blue · Cream"],
                ["FUN FACT","用左手寫字，右手畫畫。"],
              ].map(([k,v]) => (
                <React.Fragment key={k}>
                  <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em", color:palette.textSoft, paddingTop:3}}>{k}</div>
                  <div style={{color:palette.text}}>{v}</div>
                </React.Fragment>
              ))}
            </div>
            <div style={{marginTop:24, display:"flex", gap:10, flexWrap:"wrap"}}>
              {["#리더지우","#H2H_Jiwoo","#치우","#我們的指南針"].map(t=>(
                <span key={t} style={{padding:"5px 12px", borderRadius:999, background: dark? "rgba(135,206,235,.15)" : "#E6F4FB", fontSize:11, color:palette.text, letterSpacing:".05em"}}>{t}</span>
              ))}
            </div>
            <div className="ff-display" style={{
              marginTop:28, fontStyle:"italic", fontSize:22, fontWeight:500, color:palette.text,
              borderLeft:`2px solid ${palette.accent}`, paddingLeft:16, lineHeight:1.5,
            }}>
              "心臟的節拍，是寫給你最誠實的信。"
              <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, fontStyle:"normal", letterSpacing:".22em", color:palette.textSoft, marginTop:8}}>— JIWOO, DEBUT INTERVIEW</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.MembersPage = MembersPage;
