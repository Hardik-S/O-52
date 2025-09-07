import React from 'react'
import { listDocs } from '../utils/docs'

export default function Archive() {
  const docs = listDocs()
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Archive</h2>
      <div className="space-y-4">
        {docs.length === 0 && <div className="text-white/70">No docs yet. Use Ritual → Generate Today’s Boost.</div>}
        {docs.map(d => (
          <div key={d.id} id={`doc-${d.id}`} className="rounded-2xl p-4 bg-white/5 border border-white/10">
            <div className="text-sm text-white/60">{new Date(d.createdAt).toLocaleString()}</div>
            <pre className="whitespace-pre-wrap text-sm mt-2">{d.content}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}
