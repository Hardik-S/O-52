import React from 'react'
import { Link } from 'react-router-dom'
import { SubscribeForm } from '../sections/SubscribeForm'
import { TileGrid } from '../sections/TileGrid'
import { Inspiration } from '../sections/Inspiration'

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl p-6 md:p-10 bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl md:text-3xl font-semibold">Welcome to the Command Center</h2>
            <p className="text-white/80">
              A public-facing hub for building 52 apps in 52 weeks. Follow along, subscribe for weekly updates,
              and use the Ritual to get going—fast.
            </p>
            <div className="flex gap-2">
              <Link to="/apps" className="px-4 py-2 rounded-xl bg-white text-black">Browse Apps</Link>
              <Link to="/ritual" className="px-4 py-2 rounded-xl border border-white/15">Morning Ritual</Link>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-2 animate-floaty">
            <div className="aspect-square rounded-2xl bg-white/5 flex items-center justify-center text-3xl">🐱</div>
            <div className="aspect-square rounded-2xl bg-white/5 flex items-center justify-center text-3xl">✨</div>
            <div className="aspect-square rounded-2xl bg-white/5 flex items-center justify-center text-3xl">📊</div>
          </div>
        </div>
      </section>

      <TileGrid />

      <section className="grid md:grid-cols-2 gap-6">
        <SubscribeForm />
        <Inspiration />
      </section>
    </div>
  )
}
