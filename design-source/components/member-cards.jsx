// Member cards — three style variants share the same data shape.
// Polaroid is the default; Magazine and Minimal are tweak alternatives.

const MEMBERS = [
  { en:"Jiwoo",  kr:"지우",   zh:"崔志宇",   role:"Leader · Vocalist · Visual", mbti:"ISTJ", bday:"2006.09.07", emoji:"🍓", tone:"sky"   },
  { en:"Carmen", kr:"카르멘", zh:"Coming Soon", role:"Coming Soon", mbti:"—", bday:"Coming Soon", emoji:"☁️", tone:"blush" },
  { en:"Yuha",   kr:"유하",   zh:"Coming Soon", role:"Coming Soon", mbti:"—", bday:"Coming Soon", emoji:"🌙", tone:"sky"   },
  { en:"Stella", kr:"스텔라", zh:"Coming Soon", role:"Coming Soon", mbti:"—", bday:"Coming Soon", emoji:"✦",  tone:"cream" },
  { en:"Juun",   kr:"준",     zh:"Coming Soon", role:"Coming Soon", mbti:"—", bday:"Coming Soon", emoji:"🦋", tone:"sky"   },
  { en:"A-na",   kr:"아나",   zh:"Coming Soon", role:"Coming Soon", mbti:"—", bday:"Coming Soon", emoji:"🍒", tone:"blush" },
  { en:"Ian",    kr:"이안",   zh:"Coming Soon", role:"Coming Soon", mbti:"—", bday:"Coming Soon", emoji:"🌷", tone:"cream" },
  { en:"Ye-on",  kr:"예온",   zh:"Coming Soon", role:"Coming Soon", mbti:"—", bday:"Coming Soon", emoji:"🍑", tone:"sky"   },
];

// Polaroid — white frame, hand-written name, slight tilt + drop shadow
function PolaroidCard({ m, tilt = 0 }) {
  return (
    <div style={{
      width:200, background:"#FFFCF7", padding:"14px 14px 18px",
      boxShadow:"0 12px 28px rgba(26,43,69,.18), 0 1px 0 rgba(0,0,0,.04)",
      transform:`rotate(${tilt}deg)`, transition:"transform .25s ease, box-shadow .25s",
      cursor:"pointer", position:"relative",
    }}
    onMouseEnter={(e)=>{ e.currentTarget.style.transform=`rotate(0deg) translateY(-6px)`; e.currentTarget.style.boxShadow="0 22px 40px rgba(26,43,69,.28)"; }}
    onMouseLeave={(e)=>{ e.currentTarget.style.transform=`rotate(${tilt}deg)`; e.currentTarget.style.boxShadow="0 12px 28px rgba(26,43,69,.18), 0 1px 0 rgba(0,0,0,.04)"; }}
    >
      <Placeholder label={`${m.en.toUpperCase()} · PHOTO`} tone={m.tone} style={{width:"100%", aspectRatio:"3/4"}}/>
      <div className="ff-script" style={{
        marginTop:14, fontSize:30, lineHeight:1, color:"#1A2B45", textAlign:"center",
        fontWeight:600,
      }}>
        {m.en} <span style={{color:"#FF8AA8", fontSize:22}}>{m.emoji}</span>
      </div>
      <div style={{
        textAlign:"center", marginTop:6, fontFamily:'"JetBrains Mono", monospace',
        fontSize:9.5, letterSpacing:".22em", color:"rgba(26,43,69,.55)",
      }}>{m.kr} · {m.bday === "Coming Soon" ? "—" : m.bday}</div>
      {/* Tape */}
      <div style={{
        position:"absolute", top:-8, left:"50%", transform:"translateX(-50%) rotate(-3deg)",
        width:54, height:18, background:"rgba(135,206,235,.55)",
        boxShadow:"0 1px 2px rgba(0,0,0,.06)",
      }}/>
    </div>
  );
}

// Magazine — bold portrait, big italic name, role on side
function MagazineCard({ m }) {
  return (
    <div style={{
      width:230, background:"#FFFCF7", border:".5px solid rgba(26,43,69,.12)",
      cursor:"pointer", transition:"box-shadow .2s",
    }}
    onMouseEnter={(e)=>e.currentTarget.style.boxShadow="0 18px 40px rgba(26,43,69,.18)"}
    onMouseLeave={(e)=>e.currentTarget.style.boxShadow="none"}
    >
      <Placeholder label={`${m.en.toUpperCase()}`} tone={m.tone} style={{width:"100%", aspectRatio:"3/4.2"}}/>
      <div style={{padding:"14px 14px 16px"}}>
        <div style={{
          fontFamily:'"JetBrains Mono", monospace', fontSize:9.5, letterSpacing:".22em",
          color:"rgba(26,43,69,.55)", marginBottom:6,
        }}>NO.0{MEMBERS.indexOf(m)+1} — {m.kr}</div>
        <div className="ff-display" style={{fontStyle:"italic", fontSize:32, fontWeight:500, lineHeight:1, color:"#1A2B45"}}>
          {m.en}.
        </div>
        <div style={{height:1, background:"rgba(26,43,69,.12)", margin:"10px 0"}}/>
        <div style={{fontSize:11, color:"rgba(26,43,69,.65)", lineHeight:1.5}}>
          {m.role}
          <div style={{marginTop:4, fontFamily:'"JetBrains Mono", monospace', fontSize:9.5, letterSpacing:".18em", color:"rgba(26,43,69,.5)"}}>
            {m.bday === "Coming Soon" ? "BIRTHDAY · TBD" : m.bday} · MBTI {m.mbti}
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal — soft rounded, tonal background, micro typography
function MinimalCard({ m }) {
  const tones = { sky:"#E6F4FB", blush:"#FFE5EC", cream:"#FAF6F0" };
  return (
    <div style={{
      width:210, padding:14, borderRadius:18, background: tones[m.tone] || tones.sky,
      cursor:"pointer", transition:"transform .25s, box-shadow .25s",
    }}
    onMouseEnter={(e)=>{ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 14px 28px rgba(26,43,69,.14)"; }}
    onMouseLeave={(e)=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
    >
      <Placeholder label={m.en.toUpperCase()} tone={m.tone}
        style={{width:"100%", aspectRatio:"1/1", borderRadius:12, overflow:"hidden"}}/>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:12}}>
        <div>
          <div className="ff-display" style={{fontStyle:"italic", fontSize:22, fontWeight:500, lineHeight:1, color:"#1A2B45"}}>{m.en}</div>
          <div style={{fontSize:10.5, color:"rgba(26,43,69,.55)", marginTop:3, letterSpacing:".06em"}}>{m.kr} · {m.zh === "Coming Soon" ? "—" : m.zh}</div>
        </div>
        <div style={{fontSize:18}}>{m.emoji}</div>
      </div>
      <div style={{
        marginTop:10, paddingTop:10, borderTop:"1px dashed rgba(26,43,69,.18)",
        display:"flex", justifyContent:"space-between",
        fontFamily:'"JetBrains Mono", monospace', fontSize:9, letterSpacing:".16em", color:"rgba(26,43,69,.55)",
      }}>
        <span>{m.bday === "Coming Soon" ? "—" : m.bday}</span>
        <span>{m.mbti}</span>
      </div>
    </div>
  );
}

window.MEMBERS = MEMBERS;
window.PolaroidCard = PolaroidCard;
window.MagazineCard = MagazineCard;
window.MinimalCard  = MinimalCard;
