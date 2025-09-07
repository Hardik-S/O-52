type Particle = { x:number; y:number; vx:number; vy:number; life:number; color:string; size:number; rot:number; vr:number }
let canvas: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let raf = 0

function ensureCanvas() {
  if (canvas && ctx) return
  canvas = document.createElement('canvas')
  canvas.className = 'fixed inset-0 pointer-events-none z-[9999]'
  document.body.appendChild(canvas)
  ctx = canvas.getContext('2d')!
  const resize = () => {
    canvas!.width = window.innerWidth
    canvas!.height = window.innerHeight
  }
  resize(); window.addEventListener('resize', resize)
}

const PALETTE = ['#f9a8d4','#60a5fa','#34d399','#fde047','#f87171']

function spawn(x:number, y:number, n=80) {
  for (let i=0;i<n;i++) {
    const angle = Math.random()*Math.PI*2
    const speed = 2 + Math.random()*5
    particles.push({
      x, y,
      vx: Math.cos(angle)*speed,
      vy: Math.sin(angle)*speed - 2,
      life: 60 + Math.random()*40,
      color: PALETTE[i % PALETTE.length],
      size: 2 + Math.random()*3,
      rot: Math.random()*Math.PI*2,
      vr: (Math.random()-0.5)*0.2
    })
  }
}

function loop() {
  if (!ctx || !canvas) return
  raf = requestAnimationFrame(loop)
  ctx.clearRect(0,0,canvas.width, canvas.height)
  for (let i=particles.length-1;i>=0;i--) {
    const p = particles[i]
    p.vy += 0.12 // gravity
    p.vx *= 0.99; p.vy *= 0.99 // drag
    p.x += p.vx; p.y += p.vy
    p.rot += p.vr
    p.life -= 1
    if (p.life <= 0) { particles.splice(i,1); continue }
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rot)
    ctx.fillStyle = p.color
    ctx.fillRect(-p.size, -p.size, p.size*2, p.size*2)
    ctx.restore()
  }
  if (particles.length === 0) { cancelAnimationFrame(raf) }
}

export function confettiAt(x:number, y:number) {
  ensureCanvas()
  spawn(x, y, 120)
  if (!raf) { loop() }
}
