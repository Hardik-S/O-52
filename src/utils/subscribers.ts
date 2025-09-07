interface Sub { email: string; ts: number }
const KEY = 'subs'

export function saveSubscriber(email: string) {
  const list = listSubscribers()
  if (!list.find(s => s.email.toLowerCase() === email.toLowerCase())) {
    list.push({ email, ts: Date.now() })
    localStorage.setItem(KEY, JSON.stringify(list))
  }
}

export function listSubscribers(): Sub[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

export function exportSubscribersCsv() {
  const list = listSubscribers()
  const lines = ['email,timestamp']
  for (const s of list) lines.push(`${s.email},${new Date(s.ts).toISOString()}`)
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'subscribers.csv'; a.click()
  URL.revokeObjectURL(url)
}
