import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { ThemeWrapper } from './components/ThemeWrapper'

function NavItem({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-1 rounded-xl transition hover:opacity-90 ${isActive ? 'bg-white text-black' : 'border border-white/15'}`
      }
    >
      {children}
    </NavLink>
  )
}

export default function App() {
  const loc = useLocation()
  const theme =
    loc.pathname === '/' ? 'cats' :
    loc.pathname.startsWith('/apps') || loc.pathname.startsWith('/map') ? 'space' :
    'data'

  return (
    <ThemeWrapper theme={theme}>
      <div className="min-h-dvh bg-grad/40">
        <header className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <span className="text-xl">🐾</span>
            </div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">O-52 – Hub</h1>
          </div>
          <nav className="flex items-center gap-2">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/apps">Apps</NavItem>
            <NavItem to="/map">Map</NavItem>
            <NavItem to="/ritual">Ritual</NavItem>
            <NavItem to="/archive">Archive</NavItem>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto px-4 pb-14">
          <Outlet />
        </main>
        <footer className="max-w-6xl mx-auto px-4 pb-8 text-sm text-white/60">
          Built with React + Vite • Cats → Space → Data • © {new Date().getFullYear()}
        </footer>
      </div>
    </ThemeWrapper>
  )
}
