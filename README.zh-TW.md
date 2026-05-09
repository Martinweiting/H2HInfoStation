# H2H Info Station

[English](./README.md) | [繁體中文](./README.zh-TW.md)

H2H Info Station 是為 Hearts2Hearts 與 S2U 製作的非官方 React 與 Vite 粉絲網站。網站以資訊站形式整理團體介紹、成員資料、音樂作品、站子連結、時間軸、行程、照片、粉絲留言展示與未來功能規劃。

本專案為粉絲自製網站，並非 Hearts2Hearts 或 SM Entertainment 官方網站。

## 網站概覽

本網站是單頁式前端應用程式。導覽列會以錨點捲動到各區塊，彈窗、篩選、輪播、深色模式與圖片燈箱都在瀏覽器端執行。

| 區塊 | 目前內容 | 狀態 |
| --- | --- | --- |
| 首頁 Hero | 全螢幕首頁、Hearts2Hearts 標題、視覺背景、標語、CTA 按鈕、活動狀態與捲動提示。 | 前端區塊已存在 |
| 團體介紹 | 團體概念、標籤、官方帳號、出道日、所屬公司、粉絲名稱、代表色與團體訊號。 | 前端區塊已存在 |
| 成員 | Carmen、Jiwoo、Yuha、Stella、Juun、A-na、Ian、Ye-on 八位成員卡片，可切換 Polaroid、Magazine、Minimal 三種樣式。 | 前端區塊已存在 |
| 音樂作品 | The Chase、STYLE、FOCUS、Pretty Please、RUDE!、Remixes 的作品輪播與詳細面板。 | 前端區塊已存在 |
| 站子蒐集 | 依成員整理 X / Twitter 站子帳號。 | 前端區塊已存在 |
| 時間軸 | 整理出道前、預告、出道、發行、活動與相關紀錄。 | static display |
| 行程 | HEARTS 2 HOUSE 摘要、2026 年 2 月月曆與活動列表。 | static display |
| 照片 | 相簿篩選與圖片燈箱，分類包含 All、Group、Unit、Solo。 | static display，含前端互動 |
| Fan Wall | 粉絲信件風格卡片與熱門標籤範例。 | static display，含前端互動 |
| 未來功能 | 語言支援、舞台與演唱會資料、應援法與物料整理等規劃項目。 | future roadmap |
| 頁尾 | 聯絡連結、頁面錨點、官方項目列表與非官方聲明。 | 前端區塊已存在 |

## 主要區塊

### Hero / 首頁區塊

首頁以大型 Hearts2Hearts 標題、動態視覺元素、天空藍與粉色調呈現網站入口。區塊內有前往成員與音樂作品的按鈕，也顯示 HEARTS 2 HOUSE 的活動狀態。

### 團體介紹

團體介紹區塊整理 Hearts2Hearts 作為 SM Entertainment 八人女子團體的網站摘要。內容包含快速標籤、H2H 視覺卡、官方帳號、出道資訊、所屬公司、粉絲名稱、代表色與團體訊號。

### 成員

成員區塊呈現八位成員的互動卡片。訪客可以切換卡片樣式，並開啟彈窗查看角色定位、生日、MBTI、身高、國籍、出生地、專長、補充資料與標籤。

### 音樂作品

音樂區塊依前端資料列出目前作品。每個作品可開啟詳細面板，顯示曲目資訊、串流連結、官方影片、預告與幕後花絮等資料。

目前作品包含：

- The Chase
- STYLE
- FOCUS
- Pretty Please
- RUDE!
- Remixes

### 站子蒐集

站子蒐集區塊依成員整理粉絲站帳號，並連到 X / Twitter。每張成員卡片會開啟該成員的站子清單彈窗。

### 時間軸

時間軸區塊展示 Hearts2Hearts 相關事件。主畫面顯示部分項目，完整時間軸可透過彈窗查看。

### 行程

行程區塊以 HEARTS 2 HOUSE 為主要內容，包含巡演摘要、城市卡片、2026 年 2 月月曆與活動列表。

### 照片

照片區塊以瀑布流方式展示圖片，可依 All、Group、Unit、Solo 篩選。點擊圖片會開啟燈箱預覽。

### Fan Wall

Fan Wall 以便利貼風格呈現粉絲留言卡片與熱門標籤範例。

### 未來功能

未來功能區塊是 roadmap 顯示區，列出的項目屬於規劃內容，並非已完成模組。

### 頁尾

頁尾包含聯絡連結、站內頁面錨點、官方項目列表與網站的非官方聲明。

## 功能

| 功能 | 說明 |
| --- | --- |
| 單頁式導覽 | Header 與 Footer 連結會捲動到對應區塊。 |
| 響應式 Header | 支援桌面導覽、下拉選單與手機選單。 |
| 深色模式 | 主題狀態會以 `h2h-dark` 儲存在 `localStorage`。 |
| Loading screen | 主內容顯示前會先出現載入畫面。 |
| 回到頂部按鈕 | 頁面往下捲動後會顯示。 |
| 成員卡片樣式切換 | 成員卡支援 Polaroid、Magazine、Minimal 三種樣式。 |
| 成員資料彈窗 | 點擊成員卡片可查看詳細資料。 |
| 音樂作品輪播 | 音樂作品以橫向輪播呈現，並可展開詳細面板。 |
| 相簿篩選 | 照片可依全部、團體、Unit、Solo 篩選。 |
| 圖片燈箱 | 點擊照片可開啟覆蓋式預覽。 |
| 站子彈窗 | 成員站子列表會以彈窗顯示。 |
| YouTube 通知器 | Header 內含 YouTube 通知面板，會輪詢官方頻道 feed，並可請求瀏覽器通知權限。 |
| Vercel Analytics | 專案匯入並渲染 `@vercel/analytics/react`。 |

## 技術使用

| 類別 | 技術 |
| --- | --- |
| 前端框架 | React 18 |
| 建置工具 | Vite 5 |
| 動畫 | Framer Motion |
| 圖示 | lucide-react |
| 分析 | Vercel Analytics |
| 樣式 | Global CSS、CSS variables、元件內 inline styles |
| 部署 | Vercel |

## 專案結構

```text
.
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
│   ├── favicon.svg
│   ├── fonts/
│   └── images/
│       ├── hero/
│       ├── music/
│       ├── fan-sites/
│       └── gallery/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── Header.jsx
    │   ├── Hero.jsx
    │   ├── About.jsx
    │   ├── Members.jsx
    │   ├── FanSites.jsx
    │   ├── MusicVideos.jsx
    │   ├── Discography.jsx
    │   ├── Schedule.jsx
    │   ├── Gallery.jsx
    │   ├── FanWall.jsx
    │   ├── FutureFeatures.jsx
    │   ├── Footer.jsx
    │   ├── LoadingScreen.jsx
    │   └── YouTubeNotifier.jsx
    ├── components/cards/
    ├── data/
    │   ├── index.js
    │   └── musicWorks.js
    ├── hooks/
    └── styles/
        └── global.css
```

## 本機執行

安裝依賴：

```bash
npm install
```

啟動本機開發伺服器：

```bash
npm run dev
```

Vite 開發伺服器預設使用 `5173` 連接埠。本專案的 `vite.config.js` 也會讀取 `process.env.PORT`，因此可以透過環境變數指定其他連接埠。

## 建置方式

建立正式環境建置檔：

```bash
npm run build
```

在本機預覽正式建置結果：

```bash
npm run preview
```

## 部署方式

本專案設定為 Vite 專案，目前部署於 Vercel。一般 Vercel 設定可使用以下值：

| 設定 | 值 |
| --- | --- |
| Framework preset | Vite |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |

正式網站：

```text
https://hearts2heartsfansite.vercel.app/
```

## 靜態與非功能性說明

- 目前專案是以前端資料與靜態素材組成的 frontend-only 網站。
- 目前原始碼未包含後端、資料庫、登入系統或可持久保存的使用者內容系統。
- 時間軸、行程、照片、站子項目與粉絲留言卡片皆為前端靜態展示資料。
- 部分連結在目前原始碼中使用 `#` 作為 placeholder，代表尚未設定最終外部網址。
- YouTube 通知器依賴公開 YouTube feed 與備援 proxy，實際可用性會受瀏覽器、網路、CORS 規則與通知權限影響。
- 未來功能區塊屬於 roadmap 顯示，不能視為已完成功能。

## 未來規劃

目前網站列出的規劃項目：

- 英文語言支援
- 韓文語言支援
- STAGE、演唱會內容整理
- 各歌曲應援法教學
- 官方與非官方物料整理

## Credits / attribution

Made by Martin. Fan-made, not official, for S2U.

專案在團體介紹區塊中包含 Hearts2Hearts 與 SM Entertainment 相關官方帳號外部連結。本 repository 不宣稱擁有 Hearts2Hearts、SM Entertainment 品牌、官方照片、影片、音樂或相關智慧財產權。

## 授權

Currently not specified.
