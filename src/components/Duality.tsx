import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { SplitText } from './Typography'

const STORM = [
  { t: 'energía imparable', d: 'un verso que entra sin tocar la puerta' },
  { t: 'risa en mitad del break', d: 'el caos como forma de honestidad' },
  { t: 'el mundo es un playground', d: 'saltar primero, aterrizar después' },
]

const KNOW = [
  { t: 'precisión felina', d: 'cada músculo sabe exactamente a dónde va' },
  { t: 'silencio que dirige', d: 'la calma no es ausencia: es control' },
  { t: 'lo salvaje contenido', d: 'un volcán que aprendió a posar' },
]

export default function Duality() {
  const section = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = section.current
    if (!el) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: true,
          },
        })
        tl.to('.dual-left', { yPercent: -38, ease: 'none' }, 0)
          .to('.dual-right', { yPercent: -12, ease: 'none' }, 0)
          .to('.dual-divider span', { scaleY: 2.4, ease: 'none' }, 0)
          .to('.dual-left h2', { letterSpacing: '0.06em', ease: 'none' }, 0)
          .to('.dual-right h2', { letterSpacing: '0.06em', ease: 'none' }, 0)
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={section}
      id="duality"
      className="relative grid min-h-[130svh] grid-cols-1 overflow-visible py-24 md:h-screen md:min-h-0 md:overflow-hidden md:py-0 md:grid-cols-[1fr_auto_1fr]"
    >
      {/* CAOS */}
      <div className="dual-left flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <span className="pill-tag mb-8 w-fit border-storm/40 text-storm">01 — caos / rap</span>
        <h2 className="glow-text-storm font-serif text-[16vw] italic leading-none text-storm md:text-[7.5vw]">
          <SplitText text="CAOS" charDelay={0.12} />
        </h2>
        <div className="mt-10 flex max-w-sm flex-col gap-6">
          {STORM.map((s, i) => (
            <div
              key={s.t}
              className="border-l border-storm/25 pl-5 transition-colors hover:border-storm"
            >
              <p className="font-display text-sm uppercase tracking-[0.2em] text-bone">
                {String(i + 1).padStart(2, '0')} — {s.t}
              </p>
              <p className="mt-1 font-serif text-base italic text-fog">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* divisor */}
      <div className="dual-divider relative flex h-px w-full items-center justify-center bg-bone/10 md:h-auto md:w-px">
        <span className="absolute top-1/2 left-1/2 h-px w-40 -translate-x-1/2 -translate-y-1/2 origin-center bg-gradient-to-r from-storm via-transparent to-know md:h-40 md:w-px md:bg-gradient-to-b" />
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.5em] text-fog md:rotate-90">
          la frontera es fina
        </span>
      </div>

      {/* CALMA */}
      <div className="dual-right flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <span className="pill-tag mb-8 w-fit border-know/40 text-know">02 — calma / baile</span>
        <h2 className="glow-text-know font-serif text-[16vw] leading-none text-know md:text-[7.5vw]">
          <SplitText text="CALMA" charDelay={0.12} delay={0.1} />
        </h2>
        <div className="mt-10 flex max-w-sm flex-col gap-6 md:ml-auto">
          {KNOW.map((s, i) => (
            <div
              key={s.t}
              className="border-r border-know/25 pr-5 text-right transition-colors hover:border-know"
            >
              <p className="font-display text-sm uppercase tracking-[0.2em] text-bone">
                {String(i + 1).padStart(2, '0')} — {s.t}
              </p>
              <p className="mt-1 font-serif text-base italic text-fog">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
