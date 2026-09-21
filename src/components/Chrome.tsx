import { motion } from 'framer-motion'

const LINKS = [
  { href: '#duality', label: 'dualidad' },
  { href: '#cards', label: 'artefactos' },
  { href: '#chemistry', label: 'reacción' },
  { href: '#timeline', label: 'fanzine' },
]

export function Nav() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-10 md:py-5"
    >
      <a href="#hero" className="nav-shell font-mono text-xs uppercase tracking-[0.35em] text-bone">
        <span>min</span><span className="text-storm">×</span><span>sung</span>
      </a>
      <nav aria-label="Navegación principal" className="nav-shell hidden gap-7 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/70 md:flex">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="transition-colors hover:text-storm">
            {l.label}
          </a>
        ))}
      </nav>
      <nav aria-label="Navegación móvil" className="nav-shell flex max-w-[calc(100vw-7rem)] gap-4 overflow-x-auto font-mono text-[9px] uppercase tracking-[0.2em] text-bone/60 md:hidden">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="shrink-0 transition-colors hover:text-storm">
            {l.label}
          </a>
        ))}
      </nav>
    </motion.header>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-bone/10 pb-10 pt-0">
      <div className="border-b border-bone/10 py-6">
        <div className="marquee-track font-serif text-4xl italic text-bone/25 select-none md:text-6xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex shrink-0 items-center">
              {['caos', 'calma', 'rap', 'baile', 'pandemonium', 'onix'].map((w) => (
                <span key={w} className="mx-8 flex items-center gap-8">
                  {w} <span className="text-storm/60 not-italic">×</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 pt-10 text-center">
        <p className="font-serif text-xl italic text-bone">
          "Dos órbitas, un solo cielo. Para Aranxita."
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
          fan edit no oficial · hecho con three.js · gsap · lenis · p5.js · framer motion
        </p>
      </div>
    </footer>
  )
}
