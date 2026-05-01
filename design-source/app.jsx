// app.jsx — wires everything onto a DesignCanvas + Tweaks panel.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "darkMode": false,
  "memberCardStyle": "polaroid",
  "heroFeature": "dreamy"
}/*EDITMODE-END*/;

const CARD_STYLES = [
  { value:"polaroid", label:"Polaroid", zh:"拍立得" },
  { value:"magazine", label:"Magazine", zh:"雜誌" },
  { value:"minimal",  label:"Minimal",  zh:"極簡" },
];

function CardStyleSwitcher({ value, onChange, dark }) {
  // In-design switcher — themed segmented control with a sky-blue ribbon thumb
  // and an italic serif label. Ties to the dreamy/postcard motif.
  const idx = Math.max(0, CARD_STYLES.findIndex(o => o.value === value));
  return (
    <div style={{
      display:"inline-flex", alignItems:"center", gap:14,
      padding:"6px 10px 6px 18px", borderRadius:999,
      background: dark ? "rgba(255,255,255,.06)" : "rgba(255,252,247,.92)",
      border:`.5px solid ${dark ? "rgba(255,255,255,.16)" : "rgba(26,43,69,.12)"}`,
      boxShadow: dark
        ? "0 8px 22px rgba(0,0,0,.35)"
        : "0 8px 22px rgba(26,43,69,.10), inset 0 1px 0 rgba(255,255,255,.6)",
      backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)",
    }}>
      <span style={{display:"inline-flex", alignItems:"center", gap:8}}>
        <Heart size={13} color="#FF8AA8"/>
        <span className="ff-display" style={{
          fontStyle:"italic", fontSize:14, fontWeight:600,
          color: dark? "#F8FAFF":"#1A2B45", whiteSpace:"nowrap",
        }}>card style</span>
      </span>
      <div style={{
        position:"relative", display:"inline-flex",
        background: dark? "rgba(0,0,0,.25)" : "#E6F4FB",
        borderRadius:999, padding:3, gap:0,
      }}>
        <div style={{
          position:"absolute", top:3, bottom:3, left: 3 + idx * (98 + 0),
          width:98, borderRadius:999,
          background: dark ? "linear-gradient(180deg,#5AB3D9,#3A8FB7)" : "linear-gradient(180deg,#FFFCF7,#FFF)",
          boxShadow: dark? "0 2px 6px rgba(90,179,217,.4)" : "0 2px 6px rgba(26,43,69,.15)",
          transition:"left .28s cubic-bezier(.34,1.4,.64,1)",
        }}/>
        {CARD_STYLES.map((o, i) => (
          <button key={o.value} onClick={()=>onChange(o.value)} style={{
            appearance:"none", border:"none", cursor:"pointer", background:"transparent",
            position:"relative", zIndex:1, width:98, padding:"7px 0",
            fontFamily:'"Noto Sans TC", system-ui', fontSize:12, fontWeight: i===idx?600:500,
            color: i===idx
              ? (dark? "#0B1530" : "#1A2B45")
              : (dark? "rgba(248,250,255,.65)" : "rgba(26,43,69,.55)"),
            transition:"color .2s",
          }}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const memberCard = (m, i) => {
    if (t.memberCardStyle === "magazine") return <MagazineCard key={m.en} m={m}/>;
    if (t.memberCardStyle === "minimal")  return <MinimalCard  key={m.en} m={m}/>;
    return <PolaroidCard key={m.en} m={m} tilt={(i%2===0?-1:1) * (2 + (i%3))}/>;
  };

  return (
    <>
      <DesignCanvas>
        <DCSection id="hero" title="Hero · 兩個方向" subtitle="Dreamy Romantic 與 High-end Editorial — 並列比較。Tweaks 可切換暗色模式。">
          <DCArtboard id="hero-dreamy"   label="A · Dreamy Romantic · 雲朵與星光" width={1440} height={900}>
            <HeroDreamy dark={t.darkMode}/>
          </DCArtboard>
          <DCArtboard id="hero-editorial" label="B · High-end Editorial · 雜誌感" width={1440} height={900}>
            <HeroEditorial dark={t.darkMode}/>
          </DCArtboard>
        </DCSection>

        <DCSection id="styleguide" title="Style Guide · 整體視覺系統" subtitle="色彩、字體、組件、成員卡片三種風格、視覺語彙。">
          <DCArtboard id="sg" label="Style Guide v0.1" width={1100} height={1820}>
            <StyleGuide dark={t.darkMode}/>
          </DCArtboard>
        </DCSection>

        <DCSection id="members-preview" title="Member Cards · 八位成員預覽" subtitle="目前僅 Jiwoo 有實際資料；其餘以 Coming Soon 占位。從頁內切換按鈕直接更換卡片樣式。">
          <DCArtboard id="members-grid" label={`預覽 · ${t.memberCardStyle === "magazine" ? "Magazine" : t.memberCardStyle === "minimal" ? "Minimal" : "Polaroid"} 風格`} width={1100} height={860}>
            <div style={{
              position:"relative",
              width:"100%", height:"100%",
              background: t.darkMode ? "#0B1530" : "#FFFCF7",
              display:"flex", flexDirection:"column",
            }}>
              {/* Header strip with title + switcher */}
              <div style={{
                display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"28px 40px 18px",
                borderBottom: t.darkMode? ".5px solid rgba(255,255,255,.1)" : ".5px solid rgba(26,43,69,.08)",
              }}>
                <div>
                  <div style={{
                    fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".24em",
                    color: t.darkMode? "rgba(248,250,255,.55)" : "rgba(26,43,69,.55)", marginBottom:6,
                  }}>MEMBERS · 008</div>
                  <h2 className="ff-display" style={{
                    margin:0, fontStyle:"italic", fontSize:32, fontWeight:500,
                    color: t.darkMode? "#F8FAFF" : "#1A2B45",
                  }}>
                    Eight hearts, <span style={{color:"#5AB3D9"}}>one beat.</span>
                  </h2>
                </div>
                <CardStyleSwitcher
                  value={t.memberCardStyle}
                  onChange={(v)=>setTweak("memberCardStyle", v)}
                  dark={t.darkMode}
                />
              </div>

              {/* Cards */}
              <div style={{
                flex:1, padding:"32px 36px", overflow:"hidden",
                display:"flex", flexWrap:"wrap", gap:24, alignContent:"flex-start", justifyContent:"center",
                alignItems: t.memberCardStyle === "polaroid" ? "flex-start" : "stretch",
              }}>
                {MEMBERS.map((m, i) => memberCard(m, i))}
              </div>
            </div>
          </DCArtboard>
        </DCSection>

        <DCSection id="brief" title="設計筆記 · 給用戶看的 Brief" subtitle="本輪設定的方向、開放問題、下一步建議。">
          <DCArtboard id="notes" label="Design Notes" width={780} height={780}>
            <Brief/>
          </DCArtboard>
        </DCSection>

        <DCSection id="members-page" title="Members 完整頁" subtitle="八位成員介紹頁，含 Spotlight 區塊。">
          <DCArtboard id="members-full" label="Members · 完整頁" width={1440} height={1900}>
            <MembersPage dark={t.darkMode} cardStyle={t.memberCardStyle}/>
          </DCArtboard>
        </DCSection>

        <DCSection id="discography" title="Discography · 音樂作品集" subtitle="出道至今的時間軸。">
          <DCArtboard id="disco" label="Discography · Timeline" width={1440} height={1700}>
            <DiscographyPage dark={t.darkMode}/>
          </DCArtboard>
        </DCSection>

        <DCSection id="schedule" title="Schedule · 行程與倒數" subtitle="即時倒數 + 月曆 + 行程清單。">
          <DCArtboard id="sch" label="Schedule" width={1440} height={1280}>
            <SchedulePage dark={t.darkMode}/>
          </DCArtboard>
        </DCSection>

        <DCSection id="gallery" title="Gallery · 相簿" subtitle="瀑布流 + 分類篩選。">
          <DCArtboard id="gal" label="Gallery" width={1440} height={1700}>
            <GalleryPage dark={t.darkMode}/>
          </DCArtboard>
        </DCSection>

        <DCSection id="fanwall" title="Fan Wall · 粉絲留言牆" subtitle="便利貼風格留言 + 撰寫框 + 熱門標籤。">
          <DCArtboard id="fw" label="Fan Wall" width={1440} height={1480}>
            <FanWallPage dark={t.darkMode}/>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="主題" />
        <TweakToggle label="暗色模式 · 深藍夜空" value={t.darkMode}
                     onChange={(v)=>setTweak("darkMode", v)} />

        <TweakSection label="Hero 版型" />
        <TweakRadio label="預設 Hero" value={t.heroFeature}
                    options={[{value:"dreamy", label:"Dreamy"},{value:"editorial", label:"Editorial"}]}
                    onChange={(v)=>setTweak("heroFeature", v)} />
        <div style={{fontSize:10.5, color:"rgba(41,38,27,.55)", marginTop:-2}}>
          * 兩種版型都會顯示在 Canvas 上比較；此設定為決定後的「主推」版本。
        </div>

        <TweakSection label="成員卡片風格" />
        <TweakRadio label="風格" value={t.memberCardStyle}
                    options={[
                      {value:"polaroid",  label:"Polaroid"},
                      {value:"magazine",  label:"Magazine"},
                      {value:"minimal",   label:"Minimal"},
                    ]}
                    onChange={(v)=>setTweak("memberCardStyle", v)} />
      </TweaksPanel>
    </>
  );
}

function Brief() {
  const Row = ({ k, children }) => (
    <div style={{display:"grid", gridTemplateColumns:"110px 1fr", gap:14, padding:"10px 0", borderTop:".5px solid rgba(26,43,69,.1)"}}>
      <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em", color:"rgba(26,43,69,.55)", paddingTop:2}}>{k}</div>
      <div style={{fontSize:13, lineHeight:1.7, color:"#1A2B45"}}>{children}</div>
    </div>
  );
  return (
    <div style={{width:"100%", height:"100%", padding:"36px 40px", background:"#FFFCF7", overflow:"auto"}}>
      <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:".22em", color:"rgba(26,43,69,.55)"}}>BRIEF · v0.1 · 2026.04.28</div>
      <h1 className="ff-display" style={{fontStyle:"italic", fontSize:42, fontWeight:500, lineHeight:1.05, margin:"6px 0 8px"}}>
        Hearts<span style={{color:"#5AB3D9"}}>2</span>Hearts<br/>
        <span style={{fontSize:24, color:"rgba(26,43,69,.6)"}}>繁中粉絲資訊站 · 設計方向</span>
      </h1>
      <p style={{fontSize:13, color:"rgba(26,43,69,.6)", lineHeight:1.7, marginTop:0}}>
        本輪交付：Hero 兩個方向比較 + 整體視覺系統 Style Guide + 成員卡片三風格預覽。
        待決定方向後，再延伸至 Members、Discography、Schedule、Gallery、Fan Wall。
      </p>

      <div style={{marginTop:18}}>
        <Row k="主色">應援色 Sky Blue <b>#87CEEB</b>，搭配 Cream / Pearl 奶油白與 Blush 淡粉。深色模式採深藍夜空 #0B1530。</Row>
        <Row k="字體">Playfair Display Italic（英文標題情緒）+ Noto Sans TC（中文閱讀）+ Caveat（手寫貼紙）+ JetBrains Mono（編號/時間/標籤）</Row>
        <Row k="氛圍">甜美夢幻 — 雲朵、星光、心形貼紙；保留高級感的留白、細線與雜誌感編號。</Row>
        <Row k="互動">標題字母逐一淡入；星光呼吸閃爍；卡片 hover 微抬升 + 陰影。</Row>
        <Row k="Tweaks">暗色模式切換 / Hero 版型切換 / 成員卡片風格切換（Polaroid · Magazine · Minimal）</Row>
        <Row k="占位">所有照片以斜紋條紋 + monospace 標註「PHOTO」呈現，後續直接替換為實際照片。</Row>
      </div>

      <div style={{marginTop:22, padding:"14px 16px", background:"#E6F4FB", borderRadius:10}}>
        <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:".22em", color:"#1A2B45", marginBottom:8}}>NEXT STEPS — 請選擇</div>
        <ol style={{margin:0, paddingLeft:18, fontSize:12.5, lineHeight:1.85, color:"#1A2B45"}}>
          <li>確認 Hero 主推方向（A Dreamy / B Editorial / 混合）</li>
          <li>確認成員卡片風格（Polaroid / Magazine / Minimal）</li>
          <li>延伸 Members 完整頁、Discography 時間軸、Schedule 日曆 + 倒數區</li>
          <li>導覽列、頁尾、Lightbox、深色模式細節打磨</li>
          <li>提供成員實際照片與資料後，替換 placeholder</li>
        </ol>
      </div>

      <div style={{marginTop:18, fontFamily:'"Caveat", cursive', fontSize:22, color:"#FF8AA8", textAlign:"right"}}>
        made with 💙 by S2U
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
