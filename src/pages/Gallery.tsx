import React from 'react'
import { TileGrid } from '../sections/TileGrid'

export default function Gallery() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">All Apps</h2>
      <TileGrid />
    </div>
  )
}
