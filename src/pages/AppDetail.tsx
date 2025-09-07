import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAppBySlug } from '../utils/content'
import { marked } from 'marked'
import '../styles/index.css'

export default function AppDetail() {
  const { slug } = useParams()
  const app = getAppBySlug(slug!)
  if (!app) return <div>Not found.</div>

  return (
    <article className="prose prose-invert max-w-none">
      <Link to="/apps" className="text-sm underline">← Back</Link>
      <header className="mt-2 mb-6">
        <h1 className="text-3xl font-semibold flex items-center gap-2">{app.emoji || '🧩'} {app.title}</h1>
        <div className="text-white/60 text-sm">Week {app.week} • {app.date || 'TBD'}</div>
      </header>
      {app.screenshot && (
        <img src={app.screenshot} alt="screenshot" className="rounded-xl border border-white/10" />
      )}
      <section
        className="mt-6"
        dangerouslySetInnerHTML={{ __html: marked.parse(app.post || '') }}
      />
      <div className="mt-8 flex flex-wrap gap-2">
        {app.codeUrl && <a className="px-3 py-2 rounded-xl bg-white text-black" href={app.codeUrl} target="_blank">View Code</a>}
        {app.blogUrl && <a className="px-3 py-2 rounded-xl border border-white/15" href={app.blogUrl} target="_blank">Blog Post</a>}
      </div>
    </article>
  )
}
