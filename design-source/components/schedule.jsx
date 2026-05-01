// Schedule — countdown hero + monthly calendar + upcoming list

const SCHEDULE = [
  { d:"2026.05.10", t:"19:30", title:"Music Bank · KBS", type:"BROADCAST", loc:"Seoul · KR", color:"sky" },
  { d:"2026.05.17", t:"20:00", title:"Hearts 2 House · Day 1", type:"FANMEETING", loc:"Olympic Hall, Seoul", color:"blush" },
  { d:"2026.05.18", t:"19:00", title:"Hearts 2 House · Day 2", type:"FANMEETING", loc:"Olympic Hall, Seoul", color:"blush" },
  { d:"2026.05.24", t:"全日",  title:"Jiwoo Birthday Project", type:"FAN EVENT", loc:"S2U Cafe, 弘大", color:"cream" },
  { d:"2026.06.01", t:"21:00", title:"Comeback Showcase · Live", type:"BROADCAST", loc:"YouTube Live", color:"sky" },
  { d:"2026.06.07", t:"18:00", title:"Music Bank in Taipei", type:"CONCERT", loc:"Taipei · 台北小巨蛋", color:"blush" },
];

function CountdownChip({ days, hours, mins, secs, palette }) {
  const cell = (n, l) => (
    <div style={{textAlign:"center"}}>
      <div className="ff-display" style={{fontStyle:"italic", fontSize:64, lineHeight:1, fontWeight:500, color:palette.text}}>{n}</div>
      <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".24em", color:palette.textSoft, marginTop:6}}>{l}</div>
    </div>
  );
  return (
    <div style={{display:"flex", gap:36, alignItems:"center"}}>
      {cell(days,"DAYS")}
      <span className="ff-display" style={{fontStyle:"italic", fontSize:48, color:palette.textSoft}}>:</span>
      {cell(hours,"HRS")}
      <span className="ff-display" style={{fontStyle:"italic", fontSize:48, color:palette.textSoft}}>:</span>
      {cell(mins,"MIN")}
      <span className="ff-display" style={{fontStyle:"italic", fontSize:48, color:palette.textSoft}}>:</span>
      {cell(secs,"SEC")}
    </div>
  );
}

function SchedulePage({ dark = false }) {
  const palette = dark ? {
    bg:"#0B1530", panel:"#15224A", text:"#F8FAFF", textSoft:"rgba(248,250,255,.62)",
    rule:"rgba(255,255,255,.16)", accent:"#87CEEB", chip:"rgba(255,255,255,.06)",
  } : {
    bg:"#FFFCF7", panel:"#FAF6F0", text:"#1A2B45", textSoft:"rgba(26,43,69,.55)",
    rule:"rgba(26,43,69,.10)", accent:"#5AB3D9", chip:"rgba(26,43,69,.04)",
  };

  // Live countdown to first event
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => { const i = setInterval(()=>setNow(Date.now()), 1000); return () => clearInterval(i); }, []);
  const target = new Date("2026-05-17T20:00:00+09:00").getTime();
  const diff = Math.max(0, target - now);
  const days  = String(Math.floor(diff / 86400000)).padStart(2,"0");
  const hours = String(Math.floor((diff % 86400000) / 3600000)).padStart(2,"0");
  const mins  = String(Math.floor((diff % 3600000) / 60000)).padStart(2,"0");
  const secs  = String(Math.floor((diff % 60000) / 1000)).padStart(2,"0");

  // May 2026 calendar — Sun=first day. May 1 2026 is a Friday.
  const eventDates = new Set(SCHEDULE.map(s => s.d));
  const cal = [];
  for (let i = 0; i < 5; i++) cal.push(null); // Fri = col 5; pad 5 nulls (Sun=0..Thu=4)
  for (let d = 1; d <= 31; d++) cal.push(d);

  return (
    <div data-screen-label="Schedule" style={{
      width:"100%", minHeight:"100%", background:palette.bg, color:palette.text,
      fontFamily:'"Noto Sans TC", system-ui, sans-serif',
    }}>
      {/* Hero countdown */}
      <div style={{padding:"56px 56px 36px", borderBottom:`.5px solid ${palette.rule}`, position:"relative", overflow:"hidden"}}>
        <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".24em", color:palette.textSoft, marginBottom:14}}>
          NEXT EVENT · COUNTDOWN
        </div>
        <h1 className="ff-display" style={{margin:0, fontStyle:"italic", fontSize:64, fontWeight:500, lineHeight:.95}}>
          Hearts 2 House.
        </h1>
        <div style={{fontSize:14, color:palette.textSoft, marginTop:6}}>2026.05.17 · 20:00 KST · Olympic Hall, Seoul</div>
        <div style={{marginTop:32}}>
          <CountdownChip days={days} hours={hours} mins={mins} secs={secs} palette={palette}/>
        </div>
      </div>

      {/* Calendar + list grid */}
      <div style={{display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:0, borderBottom:`.5px solid ${palette.rule}`}}>
        {/* Calendar */}
        <div style={{padding:"36px 40px", borderRight:`.5px solid ${palette.rule}`}}>
          <div style={{display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:18}}>
            <h2 className="ff-display" style={{margin:0, fontStyle:"italic", fontSize:32, fontWeight:500}}>May 2026</h2>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".22em", color:palette.textSoft}}>2026 / 05</div>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:6}}>
            {["S","M","T","W","T","F","S"].map((d,i)=>(
              <div key={i} style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em", color:palette.textSoft, textAlign:"center", paddingBottom:6}}>{d}</div>
            ))}
            {cal.map((d, i) => {
              if (d === null) return <div key={i}/>;
              const dateStr = `2026.05.${String(d).padStart(2,"0")}`;
              const has = eventDates.has(dateStr);
              return (
                <div key={i} style={{
                  aspectRatio:"1/1", borderRadius:8,
                  background: has ? (dark ? "rgba(135,206,235,.18)" : "#E6F4FB") : "transparent",
                  border: has ? `.5px solid ${palette.accent}` : `.5px solid ${palette.rule}`,
                  display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"space-between",
                  padding:"8px 10px", position:"relative",
                  color: has? palette.text : palette.textSoft, fontWeight: has? 600:400,
                }}>
                  <span style={{fontSize:14}}>{d}</span>
                  {has && <Heart size={9} color="#FF8AA8"/>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming list */}
        <div style={{padding:"36px 40px"}}>
          <h2 className="ff-display" style={{margin:"0 0 18px", fontStyle:"italic", fontSize:32, fontWeight:500}}>Upcoming.</h2>
          <div style={{display:"flex", flexDirection:"column", gap:14}}>
            {SCHEDULE.map((s,i)=>(
              <div key={i} style={{
                display:"grid", gridTemplateColumns:"72px 1fr auto", gap:14, alignItems:"center",
                padding:"14px 16px", borderRadius:10,
                background: i===1 ? (dark? "rgba(135,206,235,.10)" : "#E6F4FB") : palette.chip,
                border: i===1 ? `.5px solid ${palette.accent}` : `.5px solid ${palette.rule}`,
              }}>
                <div style={{textAlign:"center"}}>
                  <div className="ff-display" style={{fontStyle:"italic", fontSize:28, fontWeight:500, lineHeight:1}}>{s.d.slice(-2)}</div>
                  <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:9, letterSpacing:".18em", color:palette.textSoft}}>MAY</div>
                </div>
                <div>
                  <div style={{fontSize:14, fontWeight:600, color:palette.text}}>{s.title}</div>
                  <div style={{fontSize:11, color:palette.textSoft, marginTop:2, fontFamily:'"JetBrains Mono", monospace', letterSpacing:".12em"}}>{s.t} · {s.loc}</div>
                </div>
                <span style={{
                  padding:"4px 10px", borderRadius:999, fontSize:10, letterSpacing:".18em",
                  fontFamily:'"JetBrains Mono", monospace',
                  background: dark? "rgba(255,255,255,.08)" : "#FFFCF7",
                  border:`.5px solid ${palette.rule}`, color:palette.textSoft,
                }}>{s.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.SchedulePage = SchedulePage;
window.SCHEDULE = SCHEDULE;
