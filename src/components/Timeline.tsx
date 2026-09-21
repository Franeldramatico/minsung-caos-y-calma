import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

type Page = {
  no: string
  title: string
  body: string
  stamp: string
  tone: 'storm' | 'know' | 'bone'
  rot: number
}

const PAGES: Page[] = [
  {
    no: '01',
    title: 'la teoría del choque',
    body: 'Todo sistema binario empieza igual: dos objetos que no debían encontrarse y una fuerza que no pide permiso.',
    stamp: 'origen',
    tone: 'bone',
    rot: -2,
  },
  {
    no: '02',
    title: 'primera colisión',
    body: 'Una broma que termina demasiado tarde, un pasillo que dura demasiado poco. Nadie anota el marcador.',
    stamp: 'caos',
    tone: 'storm',
    rot: 1.5,
  },
  {
    no: '03',
    title: 'el ensayo general',
    body: 'Él cuenta los tiempos; el otro los rompe. Y de alguna forma, la coreografía sale mejor rota.',
    stamp: 'ritmo',
    tone: 'know',
    rot: -1,
  },
  {
    no: '04',
    title: 'frecuencia pandemonium',
    body: 'Un alias, un apodo, un idioma privado. Lo que para el mundo es ruido, entre ellos es puntuación.',
    stamp: 'lenguaje',
    tone: 'storm',
    rot: 2.2,
  },
  {
    no: '05',
    title: 'la mirada de tres segundos',
    body: 'Cámara 3, plano abierto: dos coreografías sincronizadas sin música. El silencio también baila.',
    stamp: 'calma',
    tone: 'bone',
    rot: -1.8,
  },
  {
    no: '06',
    title: 'órbitas estables',
    body: 'No se reducen el uno al otro: se amplían. La tormenta no deja de llover; la calma no deja de brillar.',
    stamp: 'ahora',
    tone: 'know',
    rot: 1.1,
  },
]

const toneText = {
  storm: 'text-storm border-storm/40',
  know: 'text-know border-know/40',
  bone: 'text-bone border-bone/30',
}

export default function Timeline() {
  const track = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = section.current
    const tr = track.current
    if (!el || !tr) return
    const ctx = gsap.context(() => {
      gsap.to(tr, {
        x: () => -(tr.scrollWidth - window.innerWidth + 48),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${tr.scrollWidth - window.innerWidth + 48}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={section} id="timeline" className="relative overflow-hidden border-t border-bone/10 py-36 md:py-44">
      <div className="mb-14 px-6 md:px-10">
        <span className="pill-tag border-bone/20 text-fog">archivo privado — aranxita + tú</span>
        <h2 className="mt-5 font-serif text-5xl italic text-bone md:text-7xl">
          Crónicas de <span className="text-storm">nosotros</span>
        </h2>
        <p className="mt-5 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.25em] text-fog">
          seis fragmentos de una historia que no necesita explicación
        </p>
      </div>

      <div ref={track} className="flex w-max gap-8 px-6 will-change-transform md:px-10">
        {PAGES.map((pg, i) => (
          <article
            key={pg.no}
            className="relative w-[320px] shrink-0 md:w-[400px]"
            style={{ transform: `rotate(${pg.rot}deg)`, marginTop: i % 2 ? 40 : 0 }}
          >
            <div
              className={`glass relative flex h-[420px] flex-col justify-between rounded-sm border p-8 transition-transform duration-500 hover:scale-[1.03] hover:rotate-0 ${
                pg.tone === 'bone' ? '' : pg.tone === 'storm' ? 'neon-storm' : 'neon-know'
              }`}
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(236,230,218,0.045) 32px)',
              }}
            >
              <span className="absolute -top-3 left-1/2 h-6 w-28 -translate-x-1/2 rotate-[-2deg] bg-bone/15 backdrop-blur-sm" />
              <header className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
                <span className="text-3xl font-light text-bone/80">{pg.no}</span>
                <span className={`pill-tag border ${toneText[pg.tone]}`}>{pg.stamp}</span>
              </header>
              <div>
                <h3 className="font-serif text-[2rem] italic leading-snug text-bone">
                  {pg.title}
                </h3>
                <p className="mt-4 font-display text-[15px] leading-relaxed text-bone/70">
                  {pg.body}
                </p>
              </div>
              <footer className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-fog">
                <span>aranxita + tú · fanzine</span>
                <span>p.{pg.no}/06</span>
              </footer>
            </div>
          </article>
        ))}

        <div className="flex w-[320px] shrink-0 items-center md:w-[420px]">
          <p className="font-serif text-2xl italic text-bone/60">
            …y el resto sigue
            <br />
            <span className="text-outline-storm text-4xl">escribiéndose.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
