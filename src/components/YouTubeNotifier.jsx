import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Bell, BellRing, ExternalLink, RefreshCw, X } from 'lucide-react'

const CHANNEL_ID = 'UC7Q3HUnJA3nvjZR2JeMn2Cw'
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
const POLL_MS = 5 * 60 * 1000
const LATEST_VIDEO_KEY = 'h2h-youtube-latest-video-id'
const UNREAD_VIDEO_KEY = 'h2h-youtube-unread-video-ids'

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback))
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

function getNodeText(entry, tagName) {
  return entry.getElementsByTagName(tagName)[0]?.textContent?.trim() || ''
}

function parseYouTubeFeed(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml')
  const entries = Array.from(doc.getElementsByTagName('entry'))

  return entries.map(entry => {
    const id = getNodeText(entry, 'yt:videoId')
    const title = getNodeText(entry, 'title')
    const published = getNodeText(entry, 'published')
    const link = entry.getElementsByTagName('link')[0]?.getAttribute('href') || `https://www.youtube.com/watch?v=${id}`
    const thumbnail =
      entry.getElementsByTagName('media:thumbnail')[0]?.getAttribute('url') ||
      `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

    return { id, title, published, link, thumbnail }
  }).filter(video => video.id && video.title)
}

async function loadFeed() {
  const sources = [
    FEED_URL,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(FEED_URL)}`,
  ]

  let lastError
  for (const source of sources) {
    try {
      const response = await fetch(source, { cache: 'no-store' })
      if (!response.ok) throw new Error(`Feed request failed: ${response.status}`)
      const text = await response.text()
      const videos = parseYouTubeFeed(text)
      if (videos.length) return videos
    } catch (error) {
      lastError = error
    }
  }

  throw lastError || new Error('Unable to load YouTube feed')
}

function formatDate(value) {
  if (!value) return ''
  try {
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value))
  } catch {
    return ''
  }
}

function showBrowserNotification(video) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return

  const notice = new Notification('New Hearts2Hearts YouTube video', {
    body: video.title,
    icon: video.thumbnail,
    image: video.thumbnail,
    tag: `h2h-youtube-${video.id}`,
  })

  notice.onclick = () => {
    window.focus()
    window.open(video.link, '_blank', 'noopener,noreferrer')
    notice.close()
  }
}

export function YouTubeNotifier({ dark, border }) {
  const [open, setOpen] = useState(false)
  const [videos, setVideos] = useState([])
  const [unreadIds, setUnreadIds] = useState(() => readJson(UNREAD_VIDEO_KEY, []))
  const [toastVideo, setToastVideo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [permission, setPermission] = useState(() => ('Notification' in window ? Notification.permission : 'unsupported'))

  const palette = useMemo(() => dark ? {
    text: '#F8FAFF',
    textSoft: 'rgba(248,250,255,.68)',
    panel: 'rgba(11,21,48,.96)',
    item: 'rgba(255,255,255,.07)',
    hover: 'rgba(255,255,255,.11)',
    accent: '#87CEEB',
    shadow: '0 18px 46px rgba(0,0,0,.34)',
  } : {
    text: '#1A2B45',
    textSoft: 'rgba(26,43,69,.62)',
    panel: 'rgba(248,252,255,.98)',
    item: 'rgba(26,43,69,.05)',
    hover: 'rgba(26,43,69,.08)',
    accent: '#5AB3D9',
    shadow: '0 18px 46px rgba(26,43,69,.14)',
  }, [dark])

  const pollVideos = useCallback(async ({ manual = false } = {}) => {
    if (manual) setLoading(true)
    setError('')

    try {
      const nextVideos = await loadFeed()
      setVideos(nextVideos)

      const latest = nextVideos[0]
      if (!latest) return

      const previousLatestId = localStorage.getItem(LATEST_VIDEO_KEY)
      if (!previousLatestId) {
        localStorage.setItem(LATEST_VIDEO_KEY, latest.id)
        return
      }

      if (latest.id !== previousLatestId) {
        const newVideos = nextVideos.slice(0, Math.max(1, nextVideos.findIndex(v => v.id === previousLatestId)))
        const nextUnread = Array.from(new Set([...newVideos.map(v => v.id), ...readJson(UNREAD_VIDEO_KEY, [])]))
        setUnreadIds(nextUnread)
        writeJson(UNREAD_VIDEO_KEY, nextUnread)
        localStorage.setItem(LATEST_VIDEO_KEY, latest.id)
        setToastVideo(newVideos[0])
        showBrowserNotification(newVideos[0])
      }
    } catch {
      setError('YouTube feed is temporarily unavailable.')
    } finally {
      if (manual) setLoading(false)
    }
  }, [])

  useEffect(() => {
    pollVideos()
    const timer = window.setInterval(() => pollVideos(), POLL_MS)
    return () => window.clearInterval(timer)
  }, [pollVideos])

  useEffect(() => {
    if (!toastVideo) return
    const timer = window.setTimeout(() => setToastVideo(null), 9000)
    return () => window.clearTimeout(timer)
  }, [toastVideo])

  const requestNotificationPermission = async () => {
    if (!('Notification' in window) || Notification.permission !== 'default') return
    const nextPermission = await Notification.requestPermission()
    setPermission(nextPermission)
  }

  const toggleOpen = async () => {
    const nextOpen = !open
    setOpen(nextOpen)
    if (nextOpen) {
      await requestNotificationPermission()
      if (unreadIds.length) {
        setUnreadIds([])
        writeJson(UNREAD_VIDEO_KEY, [])
      }
    }
  }

  const unreadCount = unreadIds.length

  return (
    <div className="youtube-notifier" style={{ position: 'relative' }}>
      <button
        className="youtube-notifier-button"
        type="button"
        onClick={toggleOpen}
        aria-label="YouTube video notifications"
        aria-expanded={open}
        style={{
          appearance: 'none',
          border: 'none',
          cursor: 'pointer',
          background: 'transparent',
          width: 36,
          height: 36,
          borderRadius: 999,
          color: dark ? 'rgba(248,250,255,.78)' : 'rgba(26,43,69,.58)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'background .2s, color .2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = dark ? 'rgba(255,255,255,.1)' : 'rgba(26,43,69,.06)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      >
        {unreadCount > 0 ? <BellRing size={20} color={palette.accent} /> : <Bell size={20} />}
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: 3,
            right: 2,
            minWidth: 17,
            height: 17,
            padding: '0 4px',
            borderRadius: 999,
            background: '#FF8AA8',
            color: '#fff',
            fontSize: 11,
            lineHeight: '17px',
            fontWeight: 700,
            textAlign: 'center',
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: .98 }}
            transition={{ duration: .18 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 14px)',
              right: 0,
              width: 'min(360px, calc(100vw - 32px))',
              maxHeight: 'min(520px, calc(100vh - 120px))',
              overflow: 'auto',
              borderRadius: 14,
              background: palette.panel,
              border: `0.5px solid ${border}`,
              boxShadow: palette.shadow,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              padding: 12,
              zIndex: 300,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
              <div>
                <div className="ff-display" style={{
                  fontStyle: 'italic',
                  fontSize: 22,
                  fontWeight: 600,
                  color: palette.text,
                  lineHeight: 1.05,
                }}>
                  YouTube Alerts
                </div>
                <div style={{ marginTop: 3, fontSize: 14, color: palette.textSoft }}>
                  Polls Hearts2Hearts every 5 minutes
                </div>
              </div>
              <button
                type="button"
                onClick={() => pollVideos({ manual: true })}
                aria-label="Refresh YouTube feed"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  border: 'none',
                  background: palette.item,
                  color: palette.text,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RefreshCw size={15} className={loading ? 'youtube-notifier-spin' : ''} />
              </button>
            </div>

            {permission === 'default' && (
              <button
                type="button"
                onClick={requestNotificationPermission}
                style={{
                  width: '100%',
                  border: 'none',
                  borderRadius: 10,
                  background: dark ? 'rgba(135,206,235,.16)' : 'rgba(90,179,217,.12)',
                  color: palette.text,
                  padding: '9px 10px',
                  cursor: 'pointer',
                  fontSize: 15,
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                Enable browser notifications
              </button>
            )}

            {error && (
              <div style={{
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                color: palette.textSoft,
                background: palette.item,
                borderRadius: 10,
                padding: '9px 10px',
                marginBottom: 10,
                fontSize: 14,
              }}>
                <AlertCircle size={15} color="#FF8AA8" />
                {error}
              </div>
            )}

            <div style={{ display: 'grid', gap: 8 }}>
              {videos.slice(0, 6).map(video => (
                <a
                  key={video.id}
                  href={video.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '92px minmax(0, 1fr) 18px',
                    gap: 10,
                    alignItems: 'center',
                    padding: 8,
                    borderRadius: 10,
                    background: unreadIds.includes(video.id) ? (dark ? 'rgba(135,206,235,.14)' : 'rgba(90,179,217,.12)') : palette.item,
                    color: palette.text,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = palette.hover }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = unreadIds.includes(video.id)
                      ? (dark ? 'rgba(135,206,235,.14)' : 'rgba(90,179,217,.12)')
                      : palette.item
                  }}
                >
                  <img
                    src={video.thumbnail}
                    alt=""
                    loading="lazy"
                    style={{ width: 92, aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 7 }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontSize: 15.5,
                      fontWeight: 650,
                      lineHeight: 1.35,
                      color: palette.text,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {video.title}
                    </div>
                    <div style={{ marginTop: 4, fontSize: 13, color: palette.textSoft }}>
                      {formatDate(video.published)}
                    </div>
                  </div>
                  <ExternalLink size={15} color={palette.accent} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastVideo && (
          <motion.a
            href={toastVideo.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: -12, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: .98 }}
            transition={{ duration: .22 }}
            style={{
              position: 'fixed',
              top: 102,
              right: 24,
              zIndex: 700,
              width: 'min(390px, calc(100vw - 32px))',
              display: 'grid',
              gridTemplateColumns: '104px minmax(0, 1fr) 22px',
              gap: 12,
              alignItems: 'center',
              padding: 10,
              borderRadius: 14,
              background: palette.panel,
              border: `0.5px solid ${border}`,
              boxShadow: palette.shadow,
              color: palette.text,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <img
              src={toastVideo.thumbnail}
              alt=""
              style={{ width: 104, aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 8 }}
            />
            <div style={{ minWidth: 0 }}>
              <div className="ff-mono" style={{ fontSize: 12, letterSpacing: '.12em', color: palette.accent, marginBottom: 3 }}>
                NEW YOUTUBE VIDEO
              </div>
              <div style={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: 1.35,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {toastVideo.title}
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                setToastVideo(null)
              }}
              aria-label="Dismiss notification"
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                border: 'none',
                background: palette.item,
                color: palette.text,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={13} />
            </button>
          </motion.a>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes youtube-notifier-spin {
          to { transform: rotate(360deg); }
        }

        .youtube-notifier-spin {
          animation: youtube-notifier-spin .8s linear infinite;
        }

        @media (max-width: 480px) {
          .youtube-notifier-button {
            width: 44px !important;
            height: 44px !important;
          }

          .youtube-notifier > div[style*="position: absolute"] {
            position: fixed !important;
            top: 76px !important;
            left: 12px !important;
            right: 12px !important;
            width: auto !important;
            max-height: calc(100svh - 96px) !important;
            border-radius: 14px !important;
          }

          .youtube-notifier a[style*="position: fixed"] {
            top: 82px !important;
            left: 12px !important;
            right: 12px !important;
            width: auto !important;
            grid-template-columns: 88px minmax(0, 1fr) 32px !important;
          }
        }
      `}</style>
    </div>
  )
}
