import React, { useMemo, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { getAllApps, AppMeta } from '../utils/content'
import { computeUnlocked } from '../utils/unlock'
import { confettiAt } from '../utils/confetti'

function UnlockBadge() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <div className="w-24 h-24 rounded-full border-2 border-white/30 animate-unlockBurst" />
    </div>
  )
}

function Tile({ app, locked, highlight }: { app: AppMeta, locked: boolean, highlight: boolean }) {
  const handleClick = (e: MouseEvent) => {
    if (!locked) {
      confettiAt(e.clientX, e.clientY)
    }
  }
  return (
    <div className={`rounded-2xl border border-white/10 p-4 relative overflow-hidden ${locked ? 'opacity-40' : ''}`}>
      {highlight && !locked && <UnlockBadge />}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/0 to-white/5" />
      <div className="text-4xl">{app.emoji || '🧩'}</div>
      <div className="mt-2 font-semibold">{app.title}</div>
      <div className="text-xs text-white/60">Week {app.week.toString().padStart(2, '0')}</div>
      <div className="mt-3">
        {locked ? (
          <div className="text-sm text-white/60">🔒 Unlocks soon</div>
        ) : (
          <Link to={`/apps/${app.slug}`} className="text-sm underline" onClick={handleClick}>Open</Link>
        )}
      </div>
    </div>
  )
}

export function TileGrid() {
  const apps = useMemo(() => getAllApps().sort((a,b)=>a.week-b.week), [])
  const unlockedCount = computeUnlocked()

  return (
    <section className="rounded-3xl p-6 md:p-10 bg-white/5 border border-white/10 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">52-Week App Journey</h3>
        <div className="text-sm text-white/70">Unlocked: {unlockedCount} / 52</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {apps.map(a => (
          <Tile key={a.slug} app={a} locked={a.week > unlockedCount} highlight={a.week === unlockedCount} />
        ))}
      </div>
    </section>
  )
}
