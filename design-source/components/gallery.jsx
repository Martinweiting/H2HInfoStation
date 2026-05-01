// Gallery — masonry of photos with category filter chips & lightbox affordance.

function GalleryPage({ dark = false }) {
  const palette = dark ? {
    bg:"#0B1530", panel:"#15224A", text:"#F8FAFF", textSoft:"rgba(248,250,255,.62)",
    rule:"rgba(255,255,255,.16)", accent:"#87CEEB", chip:"rgba(255,255,255,.06)",
  } : {
    bg:"#FFFCF7", panel:"#FAF6F0", text:"#1A2B45", textSoft:"rgba(26,43,69,.55)",
    rule:"rgba(26,43,69,.10)", accent:"#5AB3D9", chip:"rgba(26,43,69,.04)",
  };

  const [filter, setFilter] = React.useState("all");
  const cats = [
    { v:"all",      label:"全部"     , n:42 },
    { v:"concept",  label:"Concept"  , n:12 },
    { v:"behind",   label:"Behind"   , n:14 },
    { v:"stage",    label:"Stage"    , n:9  },
    { v:"selca",    label:"Selca"    , n:7  },
  ];

  // Masonry layout — fixed ratios per index
  const tiles = [
    { cat:"concept", ratio:"3/4", label:"CONCEPT · 01", tone:"sky" },
    { cat:"behind",  ratio:"4/3", label:"BEHIND · MV STUDIO", tone:"blush" },
    { cat:"stage",   ratio:"3/4", label:"STAGE · MUSIC BANK", tone:"sky" },
    { cat:"selca",   ratio:"1/1", label:"SELCA · JIWOO", tone:"cream" },
    { cat:"concept", ratio:"4/5", label:"CONCEPT · 02", tone:"blush" },
    { cat:"behind",  ratio:"3/4", label:"BEHIND · DANCE PRACTICE", tone:"sky" },
    { cat:"stage",   ratio:"4/5", label:"STAGE · COMEBACK SHOWCASE", tone:"sky" },
    { cat:"concept", ratio:"1/1", label:"CONCEPT · 03 · GROUP", tone:"cream" },
    { cat:"selca",   ratio:"3/4", label:"SELCA · CARMEN", tone:"blush" },
    { cat:"behind",  ratio:"3/4", label:"BEHIND · WAITING ROOM", tone:"sky" },
    { cat:"stage",   ratio:"4/3", label:"STAGE · INKIGAYO", tone:"blush" },
    { cat:"concept", ratio:"3/4", label:"CONCEPT · 04", tone:"sky" },
  ];

  const visible = filter === "all" ? tiles : tiles.filter(t => t.cat === filter);

  return (
    <div data-screen-label="Gallery" style={{
      width:"100%", minHeight:"100%", background:palette.bg, color:palette.text,
      fontFamily:'"Noto Sans TC", system-ui, sans-serif',
    }}>
      {/* Header */}
      <div style={{padding:"56px 56px 28px", borderBottom:`.5px solid ${palette.rule}`}}>
        <div style={{display:"flex", alignItems:"baseline", justifyContent:"space-between"}}>
          <div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".24em", color:palette.textSoft, marginBottom:14}}>
              GALLERY · 042 PHOTOS · UPDATED 2026.04.28
            </div>
            <h1 className="ff-display" style={{margin:0, fontStyle:"italic", fontSize:72, fontWeight:500, lineHeight:.95}}>
              Captured <span style={{color:palette.accent}}>moments.</span>
            </h1>
          </div>
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <Sparkle size={22} color={palette.accent}/>
            <span style={{fontSize:12, color:palette.textSoft}}>點擊任一張開啟 Lightbox（→ ← Esc）</span>
          </div>
        </div>

        {/* Filters */}
        <div style={{display:"flex", gap:8, marginTop:24, flexWrap:"wrap"}}>
          {cats.map(c => (
            <button key={c.v} onClick={()=>setFilter(c.v)} style={{
              appearance:"none", cursor:"pointer", padding:"8px 16px", borderRadius:999,
              background: filter===c.v ? palette.text : "transparent",
              color: filter===c.v ? (dark?"#0B1530":"#FFFCF7") : palette.text,
              border:`.5px solid ${filter===c.v ? palette.text : palette.rule}`,
              fontSize:12, fontWeight:500, letterSpacing:".04em",
              display:"inline-flex", alignItems:"center", gap:8,
              transition:"all .2s",
            }}>
              <span>{c.label}</span>
              <span style={{
                fontFamily:'"JetBrains Mono", monospace', fontSize:9, letterSpacing:".16em",
                opacity:.6,
              }}>{String(c.n).padStart(2,"0")}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Masonry */}
      <div style={{padding:"32px 56px", columnCount:4, columnGap:16}}>
        {visible.map((tile, i) => (
          <div key={i} style={{
            breakInside:"avoid", marginBottom:16, position:"relative",
            cursor:"pointer", transition:"transform .25s ease",
          }}
          onMouseEnter={(e)=>e.currentTarget.style.transform="translateY(-4px)"}
          onMouseLeave={(e)=>e.currentTarget.style.transform="translateY(0)"}
          >
            <Placeholder label={tile.label} tone={tile.tone} ratio={tile.ratio}
              style={{width:"100%", borderRadius:8}}/>
            <div style={{
              position:"absolute", left:10, bottom:10,
              padding:"4px 10px", borderRadius:999,
              background:"rgba(255,252,247,.85)", backdropFilter:"blur(8px)",
              fontFamily:'"JetBrains Mono", monospace', fontSize:9, letterSpacing:".18em",
              color:"#1A2B45",
            }}>{tile.cat.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.GalleryPage = GalleryPage;
