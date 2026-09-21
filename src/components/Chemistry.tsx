import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { SplitText } from './Typography'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  side: 0 | 1
  r: number
  life: number
}

function sketch(container: HTMLElement, onReady: () => void) {
  return (p: p5) => {
    let particles: Particle[] = []
    const COUNT = 170
    const STORM = [82, 255, 184]
    const KNOW = [255, 107, 61]

    let aX = 0
    let aY = 0
    let bX = 0
    let bY = 0

    p.setup = () => {
      const c = p.createCanvas(container.offsetWidth, container.offsetHeight)
      c.parent(container)
      p.noStroke()
      for (let i = 0; i < COUNT; i++) spawn()
      onReady()
    }

    function spawn(): void {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-0.4, 0.4),
        vy: p.random(-0.4, 0.4),
        side: (i => (i % 2 === 0 ? 0 : 1))(particles.length),
        r: p.random(1.2, 2.6),
        life: p.random(180, 420),
      })
    }

    p.draw = () => {
      p.background(10, 10, 12, 36)

      const t = p.frameCount * 0.012
      const hovering =
        p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height

      aX = hovering ? p.mouseX : p.width / 2 + Math.cos(t) * p.width * 0.16
      aY = hovering ? p.mouseY : p.height / 2 + Math.sin(t * 1.3) * p.height * 0.18
      bX = p.width / 2 + Math.cos(t + Math.PI) * p.width * 0.16
      bY = p.height / 2 + Math.sin(t + Math.PI + 0.6) * p.height * 0.18

      p.push()
      drawAttractor(aX, aY, STORM)
      drawAttractor(bX, bY, KNOW)
      p.pop()

      for (const pt of particles) {
        const tx = pt.side === 0 ? aX : bX
        const ty = pt.side === 0 ? aY : bY
        const dx = tx - pt.x
        const dy = ty - pt.y
        const d = Math.max(dx * dx + dy * dy, 400)
        pt.vx += (dx / d) * 22
        pt.vy += (dy / d) * 22
        pt.vx += p.noise(pt.x * 0.002, pt.y * 0.002, t * 0.4) - 0.5
        pt.vy += p.noise(pt.y * 0.002, pt.x * 0.002, t * 0.4 + 40) - 0.5
        pt.vx *= 0.95
        pt.vy *= 0.95
        pt.x += pt.vx
        pt.y += pt.vy
        pt.life -= 1
        if (pt.life <= 0 || pt.x < -60 || pt.x > p.width + 60 || pt.y < -60 || pt.y > p.height + 60) {
          pt.x = p.random(p.width)
          pt.y = p.random(p.height)
          pt.vx = pt.vy = 0
          pt.life = p.random(220, 480)
        }
      }

      p.blendMode(p.ADD)
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i]
        const col = pi.side === 0 ? STORM : KNOW
        p.fill(col[0], col[1], col[2], 200)
        p.circle(pi.x, pi.y, pi.r)

        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j]
          const d = p.dist(pi.x, pi.y, pj.x, pj.y)
          if (d < 74 && pi.side !== pj.side) {
            const alpha = p.map(d, 0, 74, 95, 0)
            const g = p.lerpColor(
              p.color(STORM[0], STORM[1], STORM[2]),
              p.color(KNOW[0], KNOW[1], KNOW[2]),
              0.5,
            )
            g.setAlpha(alpha)
            p.stroke(g)
            p.strokeWeight(0.7)
            p.line(pi.x, pi.y, pj.x, pj.y)
            p.noStroke()
          }
        }
      }
      p.blendMode(p.BLEND)
    }

    function drawAttractor(x: number, y: number, col: number[]): void {
      for (let i = 4; i > 0; i--) {
        p.fill(col[0], col[1], col[2], 9)
        p.circle(x, y, i * 26)
      }
      p.fill(255, 255, 255, 230)
      p.circle(x, y, 5)
    }

    p.windowResized = () => {
      p.resizeCanvas(container.offsetWidth, container.offsetHeight)
    }
  }
}

export default function Chemistry() {
  const hostRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const instance = new p5(sketch(host, () => {
      if (fadeRef.current) fadeRef.current.style.opacity = '0'
    }))
    return () => instance.remove()
  }, [])

  return (
    <section id="chemistry" className="relative border-y border-bone/10 bg-ink-2 pb-32 md:pb-40">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 pt-20 md:px-10">
        <span className="pill-tag w-fit border-bone/20 text-fog">laboratorio — nuestra química</span>
        <h2 className="mt-6 max-w-4xl font-display text-4xl leading-[0.95] text-bone md:text-6xl">
          <span className="block"><SplitText text="Mueve el cursor." /></span>
          <span className="mt-3 block font-serif italic text-storm">
            <SplitText text="Observa la reacción." delay={0.4} />
          </span>
        </h2>
        <p className="mt-4 max-w-lg font-serif text-lg italic text-fog">
          Una carga eres tú, la otra es Aranxita. Donde se cruzan, aparecen líneas:
          una pequeña prueba de que lo vuestro también tiene su propia gravedad.
        </p>
      </div>

      <div className="relative mx-auto my-10 aspect-[16/9] w-[min(92%,1200px)] overflow-hidden rounded-2xl border border-bone/10 neon-storm">
        <div ref={hostRef} className="absolute inset-0" />
        <div
          ref={fadeRef}
          className="pointer-events-none absolute inset-0 grid place-items-center bg-ink transition-opacity duration-1000"
          style={{ opacity: 1 }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-storm">
            incubando…
          </span>
        </div>
        <div className="pointer-events-none absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
          render: p5.js — nuestra frecuencia
        </div>
      </div>
    </section>
  )
}
