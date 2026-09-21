import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const TEXT =
  'No hace falta llamarlo ship cuando ya es nuestro idioma: tú empiezas la frase y Aranxita la termina con un gesto.'

export default function Statement() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      type Span = HTMLSpanElement
      const words = gsap.utils.toArray<Span>('.word')
      gsap.to(words, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.045,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 55%', scrub: true },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative mx-auto max-w-4xl px-6 py-32 text-center">
      <span className="absolute left-6 top-10 font-serif text-8xl text-storm/20 md:left-12">
        “
      </span>
      <div ref={ref} className="font-serif text-3xl leading-snug text-bone md:text-5xl">
        {TEXT.split(' ').map((w, i) => (
          <span key={i} className="word inline-block opacity-[0.09]">
            {w}&nbsp;
          </span>
        ))}
      </div>
      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.4em] text-fog">
        manifiesto — para Aranxita, con amor
      </p>
    </section>
  )
}
