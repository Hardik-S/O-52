import React from 'react'

const PROMPTS = [
  'Ship something small today; iteration beats perfection.',
  'Document the journey—future you will thank you.',
  'Ask a sharper question; depth follows curiosity.',
  'Make one thing delightful, not ten things average.',
  'What would “future me” be proud I did today?'
]

export function Inspiration() {
  const i = Math.floor((Date.now() / 86400000) % PROMPTS.length)
  const msg = PROMPTS[i]
  return (
    <div className="rounded-3xl p-6 bg-white/5 border border-white/10">
      <h3 className="text-lg font-semibold mb-3">Inspiration Spark</h3>
      <p className="text-white/80">{msg}</p>
    </div>
  )
}
