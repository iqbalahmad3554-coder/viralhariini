'use client'

import * as React from 'react'

// ============================================================
// useTTS — Text-to-Speech via Web Speech API
// ============================================================
export interface TTSState {
  speaking: boolean
  paused: boolean
  progress: number // 0-100
  currentPara: number
  supported: boolean
}

export function useTTS() {
  const [speaking, setSpeaking] = React.useState(false)
  const [paused, setPaused] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [currentPara, setCurrentPara] = React.useState(-1)
  const utterancesRef = React.useRef<SpeechSynthesisUtterance[]>([])
  const cancelledRef = React.useRef(false)

  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  const stop = React.useCallback(() => {
    if (!supported) return
    cancelledRef.current = true
    window.speechSynthesis.cancel()
    setSpeaking(false)
    setPaused(false)
    setProgress(0)
    setCurrentPara(-1)
    utterancesRef.current = []
  }, [supported])

  const speak = React.useCallback(
    (paragraphs: string[]) => {
      if (!supported || !paragraphs.length) return
      stop()
      cancelledRef.current = false

      // Bahasa Indonesia, dengan rate normal
      const total = paragraphs.length
      const utts = paragraphs.map((p, i) => {
        const u = new SpeechSynthesisUtterance(p)
        u.lang = 'id-ID'
        u.rate = 1
        u.pitch = 1
        u.volume = 1
        u.onstart = () => {
          if (cancelledRef.current) return
          setCurrentPara(i)
          setProgress(Math.round((i / total) * 100))
        }
        u.onend = () => {
          if (cancelledRef.current) return
          if (i === total - 1) {
            setSpeaking(false)
            setPaused(false)
            setProgress(100)
            setCurrentPara(-1)
          }
        }
        return u
      })
      utterancesRef.current = utts
      setSpeaking(true)
      setPaused(false)
      // Speak sequentially
      utts.forEach((u) => window.speechSynthesis.speak(u))
    },
    [supported, stop],
  )

  const pause = React.useCallback(() => {
    if (!supported || !speaking) return
    window.speechSynthesis.pause()
    setPaused(true)
  }, [supported, speaking])

  const resume = React.useCallback(() => {
    if (!supported || !paused) return
    window.speechSynthesis.resume()
    setPaused(false)
  }, [supported, paused])

  // Cleanup saat unmount
  React.useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel()
    }
  }, [supported])

  return {
    speaking,
    paused,
    progress,
    currentPara,
    supported,
    speak,
    stop,
    pause,
    resume,
  }
}

// ============================================================
// useComments — komentar pembaca (localStorage)
// ============================================================
export interface Comment {
  id: string
  articleId: string
  author: string
  text: string
  ts: number
  likes: number
  liked?: boolean
}

const COMMENTS_KEY = 'vhi-comments'

function loadComments(): Record<string, Comment[]> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(COMMENTS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveComments(comments: Record<string, Comment[]>) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments))
  } catch {
    /* ignore */
  }
}

// Base komentar (preset) supaya tidak kosong
function getBaseComments(articleId: string): Comment[] {
  const preset = [
    {
      author: 'Pak Wira',
      text: 'Terima kasih infonya, sangat membantu. Semoga situasi cepat jelas.',
      offset: 1800000, // 30 menit lalu
      likes: 47,
    },
    {
      author: 'Bu Endah',
      text: 'Update terus dong ViralHariIni.id, jadi langganan baca di sini.',
      offset: 900000, // 15 menit lalu
      likes: 28,
    },
    {
      author: 'Andi Pratama',
      text: 'Semoga berita yang disajikan tetap objektif dan tidak clickbait.',
      offset: 420000, // 7 menit lalu
      likes: 15,
    },
  ]
  return preset.map((p, i) => ({
    id: `${articleId}-preset-${i}`,
    articleId,
    author: p.author,
    text: p.text,
    ts: Date.now() - p.offset,
    likes: p.likes,
    liked: false,
  }))
}

export function useComments(articleId: string) {
  const [allComments, setAllComments] = React.useState<Record<string, Comment[]>>({})
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setAllComments(loadComments())
    setLoaded(true)
  }, [])

  const comments = React.useMemo(() => {
    const userComments = allComments[articleId] ?? []
    const base = getBaseComments(articleId)
    return [...userComments, ...base].sort((a, b) => b.ts - a.ts)
  }, [allComments, articleId])

  const addComment = React.useCallback(
    (author: string, text: string) => {
      const newComment: Comment = {
        id: `${articleId}-${Date.now()}`,
        articleId,
        author: author || 'Anonim',
        text,
        ts: Date.now(),
        likes: 0,
        liked: false,
      }
      setAllComments((prev) => {
        const next = {
          ...prev,
          [articleId]: [newComment, ...(prev[articleId] ?? [])],
        }
        saveComments(next)
        return next
      })
    },
    [articleId],
  )

  const toggleLike = React.useCallback(
    (commentId: string) => {
      setAllComments((prev) => {
        const list = prev[articleId] ?? []
        const next = list.map((c) =>
          c.id === commentId
            ? {
                ...c,
                likes: c.liked ? c.likes - 1 : c.likes + 1,
                liked: !c.liked,
              }
            : c,
        )
        const updated = { ...prev, [articleId]: next }
        saveComments(updated)
        return updated
      })
    },
    [articleId],
  )

  return { comments, addComment, toggleLike, loaded }
}
