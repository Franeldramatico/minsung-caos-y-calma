import { motion } from 'framer-motion'
import Hero3D from './Hero3D'
import { SparklesText } from './Typography'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      <Hero3D />

      <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-between px-6 font-mono text-[10px] uppercase tracking-[0.3em] text-fog md:px-10">
        <span>file: minsung.exe</span>
        <span className="hidden md:block">dualidad · n.º 01</span>
        <span>seúl — neverland</span>
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.45em] text-storm"
        >
          una experiencia sobre gravedad compartida
        </motion.p>

        <h1 className="flex flex-col leading-[0.86]">
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[19vw] italic text-bone md:text-[13.5vw]"
          >
            MIN
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-outline-storm font-serif text-[19vw] md:text-[13.5vw]"
            style={{ marginLeft: '12vw' }}
          >
            SUNG
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-fog"
        >
          <span className="h-px w-12 bg-fog/40" />
          <SparklesText text="caos & calma" className="text-bone" />
          <span className="h-px w-12 bg-fog/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.35 }}
          className="mt-4 max-w-md font-serif text-lg italic text-bone/70"
        >
          Dos órbitas distintas, un mismo centro. La historia de lo que pasa cuando
          la tormenta encuentra a la calma.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <a
          href="#duality"
          className="group flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-fog transition-colors hover:text-storm"
        >
          scroll
          <span className="relative block h-12 w-px overflow-hidden bg-bone/20">
            <motion.span
              className="absolute inset-x-0 top-0 h-4 bg-storm"
              animate={{ y: [-16, 48] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </a>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />
    </section>
  )
}
