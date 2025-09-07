import React, { useEffect, useRef, useState } from 'react'
import { saveDoc } from '../utils/docs'

type Step = { title: string; minutes: number; text: string }
const FLOW: Step[] = [
  { title: '2-Minute Reset', minutes: 2, text: 'Breathe: in 4, hold 4, out 6. Shoulders down.' },
  { title: '5-Minute Stretch', minutes: 5, text: 'Neck rolls • Cat-cow • Hip hinges • Forward fold • Wrist circles.' },
  { title: '10-Minute Sprint', minutes: 10, text: 'Pick ONE tiny task. No tabs. No phone. Go.' },
]

const GESTURES = [
  'Leave a sticky note where they’ll find it later.',
  'Make a warm drink without being asked.',
  'Send a 20-second voice note of appreciation.',
  'Tidy one shared hotspot for 3 minutes.',
  'Queue a song that means something to you both.'
]

const FOCUS = [
  'Ship a micro-improvement to today’s app.',
  'Write 3 bullets for tonight’s reflection.',
  'Document one decision in the project log.',
  'Close one loop you’ve been avoiding.',
  'Rename messy files you touch today.'
]

export default function RitualLite() {
  const [i, setI] = useState(0)
  const [seconds, setSeconds] = useState(FLOW[0].minutes*60)
  const [running, setRunning] = useState(false)
  const [zen, setZen] = useState(false)
  const timerRef = useRef<number | null>(null)

  const start = () => { setRunning(true) }
  const stop = () => { setRunning(false) }
  const next = () => {
    const ni = Math.min(FLOW.length-1, i+1)
    setI(ni); setSeconds(FLOW[ni].minutes*60); setRunning(false)
  }
  const reset = () => { setI(0); setSeconds(FLOW[0].minutes*60); setRunning(false) }

  useEffect(() => {
    if (!running) return
    timerRef.current = window.setInterval(() => {
      setSeconds(s => {
        if (s <= 1) { clearInterval(timerRef.current!); setRunning(false); return 0 }
        return s-1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [running, i])

  // Keyboard-only controls in Zen mode
  useEffect(() => {
    if (!zen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ') { e.preventDefault(); running ? stop() : start(); }
      else if (e.key.toLowerCase() === 'n' || e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key.toLowerCase() === 'r') { e.preventDefault(); reset(); }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zen, running, i])

  const mm = String(Math.floor(seconds/60)).padStart(2,'0')
  const ss = String(seconds%60).padStart(2,'0')

  const generate = () => {
    const pick = (arr:string[], n:number) => [...arr].sort(()=>0.5-Math.random()).slice(0,n)
    const text = `# Morning Booster (${new Date().toLocaleString()})

    ## Quick Wins
    - ${pick(FOCUS,3).join('\n- ')}

    ## Gestures
    - ${pick(GESTURES,3).join('\n- ')}
    `
    const id = saveDoc(text)
    window.location.href = `/archive#doc-${id}`
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Morning Ritual (Lite)</h2>
        <label className="text-sm flex items-center gap-2 select-none">
          <input type="checkbox" checked={zen} onChange={e=>setZen(e.target.checked)} />
          Zen Mode (keyboard only)
        </label>
      </div>

      <section className="rounded-3xl p-6 bg-white/5 border border-white/10">
        <div className="text-sm text-white/70 mb-1">Guided Flow</div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="text-lg font-semibold">{FLOW[i].title}</div>
            <div className="text-white/80">{FLOW[i].text}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-3xl tabular-nums">{mm}:{ss}</div>
            {!zen && (
              <>
                {!running ? (
                  <button className="px-4 py-2 rounded-xl bg-white text-black" onClick={start}>Start</button>
                ) : (
                  <button className="px-4 py-2 rounded-xl border border-white/15" onClick={stop}>Pause</button>
                )}
                <button className="px-3 py-2 rounded-xl border border-white/15" onClick={next} disabled={i===FLOW.length-1}>Next</button>
                <button className="px-3 py-2 rounded-xl border border-white/15" onClick={reset}>Reset</button>
              </>
            )}
          </div>
        </div>
        {zen && (
          <div className="text-xs text-white/60 mt-2">Controls: Space = start/pause • N/→ = next • R = reset</div>
        )}
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
          <div className="text-sm text-white/70 mb-1">One-Tap</div>
          <button className="px-4 py-2 rounded-xl bg-white text-black" onClick={generate}>Generate Today’s Boost</button>
          <div className="text-xs text-white/60 mt-2">Creates a prefilled note in Archive.</div>
        </div>
        <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
          <div className="text-sm text-white/70 mb-1">Micro-Focus</div>
          <div className="text-white/80">Pick the smallest shippable improvement. 10 minutes max.</div>
        </div>
        <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
          <div className="text-sm text-white/70 mb-1">Mood</div>
          <div className="text-white/80">Play one energizing track while you set up.</div>
        </div>
      </section>
    </div>
  )
}
