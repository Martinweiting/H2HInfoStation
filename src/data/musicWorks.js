const MUSIC_ROOT = 'https://sites.google.com/view/hearts2hearts-tw/%E9%9F%B3%E6%A8%82%E4%BD%9C%E5%93%81'

const video = (title, url, caption = '') => ({ title, url, caption })

const pages = slug => [
  { label: '作品頁', title: slug, url: `${MUSIC_ROOT}/${slug}` },
  { label: '預告', title: `${slug} 預告`, url: `${MUSIC_ROOT}/${slug}/${slug}-預告` },
  { label: '幕後花絮', title: `${slug} 幕後花絮`, url: `${MUSIC_ROOT}/${slug}/${slug}-幕後花絮` },
]

const streaming = (spotify, appleMusic) => [
  { name: 'Spotify', url: spotify, tone: '#1DB954' },
  { name: 'Apple Music', url: appleMusic, tone: '#FA586A' },
]

export const MUSIC_WORKS = [
  {
    slug: 'the-chase',
    title: 'The Chase',
    category: '出道單曲',
    tone: 'sky',
    sourcePath: '音樂作品 / The Chase',
    sourceUrl: `${MUSIC_ROOT}/the-chase`,
    tracks: ['The Chase', 'Butterflies'],
    summary: '出道作品收錄 The Chase 與 Butterflies，整理官方 MV、Performance、Dance Practice、Lyric / Karaoke 影片，以及預告與 BH2ND 幕後內容。',
    streaming: streaming(
      'https://open.spotify.com/album/2IjkSbisATTpSpVIlFVNkN',
      'https://music.apple.com/us/album/the-chase-single/1796402197',
    ),
    pages: pages('the-chase'),
    videos: {
      official: [
        video('The Chase MV', 'https://www.youtube.com/watch?v=kxUA2wwYiME'),
        video('The Chase Performance Video', 'https://www.youtube.com/watch?v=GtPPT-qSXj8'),
        video('The Chase Dance Practice', 'https://www.youtube.com/watch?v=38bNr6gy4CE'),
        video('The Chase Lyric Video', 'https://www.youtube.com/watch?v=80-Q7b1qaFg'),
        video('Butterflies MV', 'https://www.youtube.com/watch?v=hJ9Wp3PO3c8'),
        video('Butterflies Karaoke Video', 'https://www.youtube.com/watch?v=baEB2UduZ_M'),
      ],
      teasers: [
        video('THE FUTURE SM 30', 'https://www.youtube.com/watch?v=T0KTvZVkYKc', 'Ian 先行亮相'),
        video('Chase Your Choice', 'https://www.youtube.com/watch?v=srEUps3-5mo', 'Hearts2Hearts 出道預告'),
        video('The Chase Trailer', 'https://www.youtube.com/watch?v=clVrZJeuqqk'),
        video('The Chase Mood Sampler', 'https://www.youtube.com/watch?v=blSCP-wFWUI'),
        video('The Chase MV Teaser', 'https://www.youtube.com/watch?v=nF2gPfU6Kqg'),
      ],
      behind: [
        video('The Chase Recording BH2ND', 'https://www.youtube.com/watch?v=1QBBD4zEMbA'),
        video('The Chase Cheering Guide', 'https://www.youtube.com/watch?v=3ycS2cJvAN4'),
        video('The Chase MV Commentary', 'https://www.youtube.com/watch?v=iHNHdNlSWxA'),
        video('Debut Trailer BH2ND', 'https://www.youtube.com/watch?v=0TowNuWl3Ck'),
        video('The Chase Jacket BH2ND', 'https://www.youtube.com/watch?v=3VxvujFYxek'),
        video('The Chase MV BH2ND #1', 'https://www.youtube.com/watch?v=X7a7XbHzIrk'),
        video('The Chase MV BH2ND #2', 'https://www.youtube.com/watch?v=ao3-xlU1H3g'),
        video('The Chase Dance Practice BH2ND', 'https://www.youtube.com/watch?v=pFsf73HNL6Q'),
        video('Butterflies MV BH2ND', 'https://www.youtube.com/watch?v=dFKIabiefsY'),
        video('The Chase Music Show BH2ND #1', 'https://www.youtube.com/watch?v=C-AEpv4hw20'),
        video('The Chase Music Show BH2ND #2', 'https://www.youtube.com/watch?v=UzotXp59tbY'),
        video('Debut Showcase BH2ND', 'https://www.youtube.com/watch?v=F-qx8VX25Wk'),
      ],
    },
  },
  {
    slug: 'style',
    title: 'STYLE',
    category: '數位單曲',
    tone: 'mint',
    sourcePath: '音樂作品 / STYLE',
    sourceUrl: `${MUSIC_ROOT}/style`,
    tracks: ['STYLE'],
    summary: 'STYLE 作品區整理官方 MV、Dance Practice、Teenieping 合作版 MV、預告與完整 BH2ND 製作花絮。',
    streaming: streaming(
      'https://open.spotify.com/album/2bCF7nrdJWft8Y7S9ES4wC',
      'https://music.apple.com/us/album/style-single/1819694545',
    ),
    pages: pages('style'),
    videos: {
      official: [
        video('STYLE MV', 'https://www.youtube.com/watch?v=n7kFRxFIPrI'),
        video('STYLE Dance Practice', 'https://www.youtube.com/watch?v=NLjMZJKMOIc'),
        video('Teenieping X Hearts2Hearts STYLE MV', 'https://www.youtube.com/watch?v=qrXX2eS3IBE'),
      ],
      teasers: [
        video('STYLE MV Teaser', 'https://www.youtube.com/watch?v=tutJS_co0QU'),
      ],
      behind: [
        video('STYLE Recording BH2ND', 'https://www.youtube.com/watch?v=rIdaOPJbdQ8'),
        video('STYLE Cheering Guide', 'https://www.youtube.com/watch?v=FDOec4bINIQ'),
        video('STYLE MV Commentary', 'https://www.youtube.com/watch?v=qYoa9m8iL-Y'),
        video('STYLE Jacket BH2ND', 'https://www.youtube.com/watch?v=_jQo1JKg5gk'),
        video('STYLE MV BH2ND #1', 'https://www.youtube.com/watch?v=DL7UNtK-Kok'),
        video('STYLE MV BH2ND #2', 'https://www.youtube.com/watch?v=IZFtAPpEk9I'),
        video('STYLE MV BH2ND #3', 'https://www.youtube.com/watch?v=Fk54DzRap88'),
        video('STYLE Dance Practice BH2ND', 'https://www.youtube.com/watch?v=VDNP_yS_Yr4'),
        video('STYLE Music Show BH2ND', 'https://www.youtube.com/watch?v=XGUkgN_4VCo'),
      ],
    },
  },
  {
    slug: 'focus',
    title: 'FOCUS',
    category: '首張迷你專輯',
    tone: 'blush',
    sourcePath: '音樂作品 / FOCUS',
    sourceUrl: `${MUSIC_ROOT}/focus`,
    tracks: ['FOCUS'],
    summary: 'FOCUS 作品區收錄官方 MV、Dance Practice、概念預告、Mood Sampler 與幕後花絮。',
    streaming: streaming(
      'https://open.spotify.com/album/0SVlu6q4xo8dCjP8sYbRwH',
      'https://music.apple.com/us/album/focus-the-1st-mini-album-ep/1841828519',
    ),
    pages: pages('focus'),
    videos: {
      official: [
        video('FOCUS MV', 'https://www.youtube.com/watch?v=Ur7aK4FvK-U'),
        video('FOCUS Dance Practice', 'https://www.youtube.com/watch?v=C9McWCeK6QA'),
      ],
      teasers: [
        video('FOCUS Trailer', 'https://www.youtube.com/watch?v=tPNGxVu5d68'),
        video('FOCUS Mood Sampler #1 | Chapter 1. How2getHearts', 'https://www.youtube.com/watch?v=fKFJMwIzZOY'),
        video('FOCUS Mood Sampler #2 | Chapter 2. Hard2Hide', 'https://www.youtube.com/watch?v=SngpMKBb5Gc'),
        video('FOCUS MV Teaser', 'https://www.youtube.com/watch?v=kz4SUbfHc4M'),
      ],
      behind: [
        video('FOCUS Dance Practice BH2ND', 'https://www.youtube.com/watch?v=_xqnBLjzdzQ'),
        video('FOCUS Recording BH2ND', 'https://www.youtube.com/watch?v=XVdM_RZGnok'),
        video('FOCUS Cheering Guide', 'https://www.youtube.com/watch?v=0pmDQ1iovVo'),
        video('FOCUS MV Commentary', 'https://www.youtube.com/watch?v=4sNQ7h86FN0'),
        video('FOCUS Mood Sampler BH2ND', 'https://www.youtube.com/watch?v=u8U1OSW5acA'),
        video('FOCUS Jacket BH2ND', 'https://www.youtube.com/watch?v=ITmv7JLimQI'),
        video('FOCUS Trailer BH2ND', 'https://www.youtube.com/watch?v=larrvLIMWDk'),
        video('FOCUS MV BH2ND #1', 'https://www.youtube.com/watch?v=WyeJAh9iIIY'),
        video('FOCUS MV BH2ND #2', 'https://www.youtube.com/watch?v=RE89HeUXOSM'),
        video('FOCUS Music Show BH2ND #1', 'https://www.youtube.com/watch?v=JJwiWgmraoA'),
        video('FOCUS Music Show BH2ND #2', 'https://www.youtube.com/watch?v=XUbdua2mS1k'),
      ],
    },
  },
  {
    slug: 'pretty-please',
    title: 'Pretty Please',
    category: '數位單曲',
    tone: 'coral',
    sourcePath: '音樂作品 / Pretty Please',
    sourceUrl: `${MUSIC_ROOT}/focus`,
    tracks: ['Pretty Please'],
    summary: 'Pretty Please 作品區獨立整理官方 MV、Dance Practice、MV Teaser 與 BH2ND 幕後內容。',
    streaming: streaming(
      'https://open.spotify.com/album/0SVlu6q4xo8dCjP8sYbRwH',
      'https://music.apple.com/us/album/focus-the-1st-mini-album-ep/1841828519',
    ),
    pages: pages('focus'),
    videos: {
      official: [
        video('Pretty Please MV', 'https://www.youtube.com/watch?v=ufwB9Uja_wM'),
        video('Pretty Please Dance Practice', 'https://www.youtube.com/watch?v=zbrqDulNSaA'),
      ],
      teasers: [
        video('Pretty Please MV Teaser', 'https://www.youtube.com/watch?v=WiAwc6-0kbo'),
      ],
      behind: [
        video('Pretty Please MV BH2ND #1', 'https://www.youtube.com/watch?v=DuaAX0i3U40'),
        video('Pretty Please MV BH2ND #2', 'https://www.youtube.com/watch?v=qL69VSEeL5U'),
        video('Pretty Please Music Show BH2ND', 'https://www.youtube.com/watch?v=Nc6vB6u49go'),
      ],
    },
  },
  {
    slug: 'rude',
    title: 'RUDE!',
    category: '數位單曲',
    tone: 'night',
    sourcePath: '音樂作品 / RUDE!',
    sourceUrl: `${MUSIC_ROOT}/rude`,
    tracks: ['RUDE!'],
    summary: 'RUDE! 作品區整理官方 MV、Dance Practice、概念預告、個人 Mood Sampler 與完整 BH2ND 幕後內容。',
    streaming: streaming(
      'https://open.spotify.com/track/2bAQsNqdo62T8akkIvWzGl',
      'https://music.apple.com/us/album/rude-single/1837583754',
    ),
    pages: pages('rude'),
    videos: {
      official: [
        video('RUDE! MV', 'https://www.youtube.com/watch?v=F7sGJVUrkjQ'),
        video('RUDE! Dance Practice', 'https://www.youtube.com/watch?v=RXQCY_zxz-E'),
      ],
      teasers: [
        video('How to Behave When the Heart is Missing', 'https://www.youtube.com/watch?v=9V3t4N6tvMc'),
        video('RUDE! Mood Sampler CARMEN', 'https://www.youtube.com/watch?v=i8c1SXtMr2k'),
        video('RUDE! Mood Sampler JIWOO', 'https://www.youtube.com/watch?v=QCJqdtgoFEM'),
        video('RUDE! Mood Sampler YUHA', 'https://www.youtube.com/watch?v=0cy6wsUjbC0'),
        video('RUDE! Mood Sampler STELLA', 'https://www.youtube.com/watch?v=QttkpndZXoI'),
        video('RUDE! Mood Sampler JUUN', 'https://www.youtube.com/watch?v=OMyCbdH3KTY'),
        video('RUDE! Mood Sampler A-NA', 'https://www.youtube.com/watch?v=PArwInNjZ4A'),
        video('RUDE! Mood Sampler IAN', 'https://www.youtube.com/watch?v=Mf2MbILK200'),
        video('RUDE! Mood Sampler YE-ON', 'https://www.youtube.com/watch?v=bcDV__7_lpE'),
      ],
      behind: [
        video('RUDE! Recording BH2ND', 'https://www.youtube.com/watch?v=0oRul0_3mdo'),
        video('RUDE! Cheering Guide', 'https://www.youtube.com/watch?v=AjK78uAd6pA'),
        video('RUDE! Trailer BH2ND', 'https://www.youtube.com/watch?v=tjSPledGrnU'),
        video('RUDE! Dance Practice BH2ND', 'https://www.youtube.com/watch?v=-SuUEoYEDVw'),
        video('RUDE! Jacket BH2ND', 'https://www.youtube.com/watch?v=I_E7r7aVdpM'),
        video('RUDE! MV BH2ND #1', 'https://www.youtube.com/watch?v=zQ-XkGm0zvI'),
        video('RUDE! MV BH2ND #2', 'https://www.youtube.com/watch?v=UZ2Z1w7TRds'),
        video('RUDE! Music Show BH2ND #1', 'https://www.youtube.com/watch?v=UT-x2ImpDF0'),
        video('RUDE! Music Show BH2ND #2', 'https://www.youtube.com/watch?v=Y-p6I1ZEN3M'),
      ],
    },
  },
  {
    slug: 'remixes',
    title: 'Remixes',
    category: 'REMIX COLLECTION',
    tone: 'remix',
    coverImage: '/images/music/remixes.jpg',
    sourcePath: '音樂作品 / Remixes',
    sourceUrl: 'https://www.youtube.com/watch?v=Txyb_mVaPyE',
    tracks: ['FOCUS Remixes', 'RUDE! Remixes'],
    summary: 'Remixes 區整理 FOCUS 與 RUDE! 的官方 remix 發行，依歌曲分組收錄各版本音源。',
    streaming: [
      { name: 'FOCUS Remixes', url: 'https://www.youtube.com/watch?v=Txyb_mVaPyE', tone: '#FA586A' },
      { name: 'RUDE! Remixes', url: 'https://www.youtube.com/watch?v=EU8zYwRc9js', tone: '#FA586A' },
    ],
    pages: [],
    groups: [
      { key: 'focusRemixes', label: 'FOCUS Remixes', shortLabel: 'FOCUS' },
      { key: 'rudeRemixes', label: 'RUDE! Remixes', shortLabel: 'RUDE!' },
    ],
    videos: {
      focusRemixes: [
        video('FOCUS - Jaebin Remix', 'https://www.youtube.com/watch?v=mVdLdTUmlu4', '2025.11.21'),
        video('FOCUS - DJ Seinfeld Remix', 'https://www.youtube.com/watch?v=Txyb_mVaPyE', '2025.11.21'),
        video('FOCUS - Young Franco Remix', 'https://www.youtube.com/watch?v=1ovWlw0EiB8', '2025.11.21'),
        video('FOCUS - sooyeon Remix', 'https://www.youtube.com/watch?v=NNBfrX-KfkQ', '2025.11.21'),
        video('FOCUS', 'https://www.youtube.com/watch?v=Ur7aK4FvK-U', 'International only'),
      ],
      rudeRemixes: [
        video('RUDE! - Silly Silky Remix', 'https://www.youtube.com/watch?v=EU8zYwRc9js', '2026.03.27'),
        video('RUDE! - yunji Remix', 'https://www.youtube.com/watch?v=QwqjnAh0TDs', '2026.03.27'),
        video('RUDE!', 'https://www.youtube.com/watch?v=F7sGJVUrkjQ', 'International only'),
      ],
    },
  },
]

export const MUSIC_MENU_LINKS = MUSIC_WORKS.map(work => ({
  label: work.title,
  href: `#mv-${work.slug}`,
}))
