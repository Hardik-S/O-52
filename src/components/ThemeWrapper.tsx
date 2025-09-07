import React from 'react'
import BackgroundFX from './BackgroundFX'

export function ThemeWrapper({ theme, children }: { theme: 'cats' | 'space' | 'data', children: React.ReactNode }) {
  const themeClass = theme === 'cats' ? 'theme-cats' : theme === 'space' ? 'theme-space' : 'theme-data'
  return (
    <div className={themeClass}>
      <BackgroundFX theme={theme} />
      {children}
    </div>
  )
}
