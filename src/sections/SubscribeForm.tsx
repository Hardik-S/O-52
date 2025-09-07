import React, { useState } from 'react'
import { saveSubscriber, exportSubscribersCsv } from '../utils/subscribers'

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOk(null); setErr(null)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr('Please enter a valid email.')
      return
    }
    saveSubscriber(email)
    setOk('Subscribed! (Saved locally for now)')
    setEmail('')
  }

  return (
    <div className="rounded-3xl p-6 bg-white/5 border border-white/10">
      <h3 className="text-lg font-semibold mb-3">Subscribe for Weekly Updates</h3>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="email"
          className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/15 outline-none"
          placeholder="you@example.com"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />
        <button className="px-4 py-2 rounded-xl bg-white text-black" type="submit">Subscribe</button>
      </form>
      {ok && <div className="text-green-300 text-sm mt-2">{ok}</div>}
      {err && <div className="text-rose-300 text-sm mt-2">{err}</div>}
      <div className="mt-4 text-sm text-white/70">
        Emails are stored in your browser (no server yet). Export CSV and add to your mailing tool.
      </div>
      <button onClick={exportSubscribersCsv} className="mt-2 text-sm underline">Export subscribers.csv</button>
    </div>
  )
}
