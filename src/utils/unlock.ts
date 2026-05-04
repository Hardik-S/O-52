const START_DATE_ISO = '2025-09-01' // adjust as needed

function parseUnlockOverride(value: string | null): number | undefined {
  if (value === null) return undefined
  const trimmed = value.trim()
  if (!/^\d+$/.test(trimmed)) return undefined
  return Math.min(52, Math.max(1, Number.parseInt(trimmed, 10)))
}

export function computeUnlocked(): number {
  const urlN = new URLSearchParams(location.search).get('unlock')
  const override = parseUnlockOverride(urlN)
  if (override !== undefined) return override
  const start = new Date(START_DATE_ISO + 'T00:00:00')
  const now = new Date()
  const ms = now.getTime() - start.getTime()
  const weeks = Math.floor(ms / (7*24*3600*1000)) + 1
  return Math.max(1, Math.min(52, weeks))
}
