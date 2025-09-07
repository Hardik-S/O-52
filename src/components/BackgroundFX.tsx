import React, { useEffect, useRef } from 'react'

interface P { theme: 'cats'|'space'|'data' }
export default function BackgroundFX({ theme }: P) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const hueMap = { cats: 320, space: 210, data: 150 } as const

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    let raf: number
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)

    const hue = hueMap[theme]
    const particles = Array.from({ length: Math.min(140, Math.floor(w*h/12000)) }, () => ({
      x: Math.random()*w,
      y: Math.random()*h,
      vx: (Math.random()-0.5)*0.4,
      vy: (Math.random()-0.5)*0.4,
      r: Math.random()*1.8+0.6
    }))

    let mx = w/2, my = h/2
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    function loop() {
      raf = requestAnimationFrame(loop)
      ctx.fillStyle = 'rgba(10,9,16,0.45)'
      ctx.fillRect(0,0,w,h)

      for (const p of particles) {
        const dx = mx - p.x
        const dy = my - p.y
        p.vx += dx * 0.00002
        p.vy += dy * 0.00002

        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = w+10
        if (p.x > w+10) p.x = -10
        if (p.y < -10) p.y = h+10
        if (p.y > h+10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fillStyle = `hsla(${hue}, 80%, 65%, 0.6)`
        ctx.fill()
      }

      ctx.strokeStyle = `hsla(${hue}, 90%, 70%, 0.12)`
      for (let i=0;i<particles.length;i++){
        const a = particles[i]
        for (let j=i+1;j<i+20 && j<particles.length;j++){
          const b = particles[j]
          const dx = a.x-b.x, dy = a.y-b.y
          const d2 = dx*dx+dy*dy
          if (d2 < 120*120) {
            ;(ctx as any).globalAlpha = 0.15 * (1 - d2/(120*120))
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
            ;(ctx as any).globalAlpha = 1
          }
        }
      }
    }
    loop()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); window.removeEventListener('mousemove', onMove) }
  }, [theme])

  return <canvas ref={ref} className="fixed inset-0 -z-10" />
}
