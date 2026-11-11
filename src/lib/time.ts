// Lightweight relative time formatter (no external dep)
// Returns Indonesian-style relative time, e.g. "5 menit lalu"

function pad(n: number): string {
  return n < 10 ? '0' + n : String(n)
}

export function formatDistanceToNow(
  date: number | Date,
  _opts?: { addSuffix?: boolean },
): string {
  const d = typeof date === 'number' ? new Date(date) : date
  const now = Date.now()
  const diff = Math.max(0, now - d.getTime())
  const sec = Math.floor(diff / 1000)
  const min = Math.floor(sec / 60)
  const hr = Math.floor(min / 60)
  const day = Math.floor(hr / 24)

  if (sec < 10) return 'baru saja'
  if (sec < 60) return `${sec} detik lalu`
  if (min < 60) return `${min} menit lalu`
  if (hr < 24) return `${hr} jam lalu`
  if (day < 7) return `${day} hari lalu`

  // Fallback: tanggal
  return `${d.getDate()}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
}

export function formatDate(
  date: number | Date,
  opts: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  },
): string {
  const d = typeof date === 'number' ? new Date(date) : date
  return new Intl.DateTimeFormat('id-ID', opts).format(d)
}
