import React from 'react'
import { getAllApps } from '../utils/content'
import { computeUnlocked } from '../utils/unlock'

function polarToCartesian(r:number, theta:number) { return { x: r * Math.cos(theta), y: r * Math.sin(theta) } }

export default function MapView() {
  const apps = getAllApps().sort((a,b)=>a.week-b.week)
  const unlocked = computeUnlocked()

  const width = 820, height = 520, cx = width/2, cy = height/2
  const points = apps.map((a, idx) => {
    const r = 12 + idx * 6
    const theta = idx * 0.5
    const { x, y } = polarToCartesian(r, theta)
    return { ...a, x: cx + x, y: cy + y }
  })

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Galaxy Map</h2>
      <div className="rounded-3xl bg-black/40 border border-white/10 overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="white" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width={width} height={height} fill="#0b0a0f"/>
          {points.map(p => (
            <g key={p.slug}>
              <circle cx={p.x} cy={p.y} r="10" fill={p.week <= unlocked ? 'url(#glow)' : '#333'} />
              <a href={`/apps/${p.slug}`}>
                <text x={p.x + 14} y={p.y + 4} fontSize="10" fill="#fff">{p.week.toString().padStart(2,'0')} {p.title}</text>
              </a>
            </g>
          ))}
        </svg>
      </div>
      <div className="text-sm text-white/70 mt-2">Click a node to open its page.</div>
    </div>
  )
}
