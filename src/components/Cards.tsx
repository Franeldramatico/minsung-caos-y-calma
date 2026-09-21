import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useLayoutEffect, useRef } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { gsap } from '../lib/gsap'
import { SplitText } from './Typography'

type Card = {
  title: string
  pair: [string, string]
  body: string
  tone: 'storm' | 'know'
}

const CARDS: Card[] = [
  {
    title: 'El intercambio',
    pair: ['él le presta el caos', 'él le devuelve el ritmo'],
    body: 'Una coreografía donde el error se convierte en firma: donde uno improvisa, el otro aterriza y lo hace parecer intención.',
    tone: 'storm',
  },
  {
    title: 'Gravedad compartida',
    pair: ['dos centros distintos', 'una sola órbita'],
    body: 'Se mueven como si el espacio entre ellos tuviera masa propia: se juntan, se separan, y la física decide mirar hacia otro lado.',
    tone: 'know',
  },
  {
    title: 'El idioma',
    pair: ['pandemonium', 'onix'],
    body: 'Un vocabulario de empujones, miradas de tres segundos y risas que no necesitan traducción. Hablan en frecuencias que el resto escucha como ruido.',
    tone: 'storm',
  },
  {
    title: 'La fotografía',
    pair: ['flash: desorden', 'revelado: orden'],
    body: 'Él atrapa al otro en movimiento perfecto; el otro lo desordena todo con un gesto. En ambas fotos sale la misma historia.',
    tone: 'know',
  },
]

function TiltCard({ card, index }: { card: Card; index: number }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    mx.set(px)
    my.set(py)
    rotateY.set((px - 0.5) * 14)
    rotateX.set(-(py - 0.5) * 14)
  }
  const onLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    mx.set(0.5)
    my.set(0.5)
  }

  const glare = useMotionTemplate`radial-gradient(circle at ${useTransform(
    mx,
    (v) => `${(v * 100).toFixed(1)}%`,
  )} ${useTransform(my, (v) => `${(v * 100).toFixed(1)}%`)}%, rgba(255,255,255,0.14), transparent 60%)`
  const accent = card.tone === 'storm' ? 'text-storm' : 'text-know'
  const ring = card.tone === 'storm' ? 'group-hover:shadow-[0_0_40px_rgba(82,255,184,0.18)]' : 'group-hover:shadow-[0_0_40px_rgba(255,107,61,0.18)]'

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
      className="group"
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`glass shine-border relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-8 transition-shadow duration-500 ${ring}`}
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: glare }}
        />
        <div data-index={index}>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
            artefacto 0{index + 1}
          </p>
          <h3 className={`mt-3 font-serif text-3xl italic ${accent}`}>{card.title}</h3>
          <p className="mt-5 font-serif text-lg leading-relaxed text-bone/80">{card.body}</p>
        </div>
        <div className="mt-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]" style={{ transform: 'translateZ(40px)' }}>
          <span className="text-storm">{card.pair[0]}</span>
          <span className="text-fog">×</span>
          <span className="text-know">{card.pair[1]}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Cards() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from('.cards-heading', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%' },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="cards" className="relative mx-auto max-w-6xl px-6 py-32 md:px-10">
      <div className="cards-heading mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-xl font-display text-4xl leading-tight text-bone md:text-5xl">
          <SplitText text="Cuatro formas" />
          <br />
          <span className="text-outline">
            <SplitText text="de decir lo mismo" delay={0.2} />
          </span>
        </h2>
        <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-fog">
          piezas de un mismo sistema binario — pasa el cursor para inclinar la gravedad
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {CARDS.map((c, i) => (
          <TiltCard key={c.title} card={c} index={i} />
        ))}
      </div>
    </section>
  )
}
