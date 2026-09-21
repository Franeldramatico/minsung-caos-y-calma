import { motion } from 'framer-motion'
import { useMemo } from 'react'
import type { CSSProperties } from 'react'

export function SplitText({
  text,
  className,
  charDelay = 0.045,
  delay = 0,
}: {
  text: string
  className?: string
  charDelay?: number
  delay?: number
}) {
  const chars = useMemo(() => text.split(''), [text])
  return (
    <span className={className} aria-label={text}>
      {chars.map((c, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={{ y: '0.9em', opacity: 0, rotateX: -70 }}
          whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{
            duration: 0.7,
            delay: delay + i * charDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  )
}

function SparkleIcon({ style, delay }: { style: CSSProperties; delay: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="absolute h-3 w-3 pointer-events-none"
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0.2, 1, 0.2], rotate: [0, 90, 180] }}
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" fill="#52ffb8" />
    </motion.svg>
  )
}

export function SparklesText({ text, className }: { text: string; className?: string }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        top: `${8 + Math.random() * 84}%`,
        left: `${4 + (i / 9) * 92 + Math.random() * 6}%`,
        delay: Math.random() * 2.5,
      })),
    [],
  )
  return (
    <span className={`relative inline-block ${className ?? ''}`}>
      {text}
      {sparks.map((s, i) => (
        <SparkleIcon key={i} style={{ top: s.top, left: s.left }} delay={s.delay} />
      ))}
    </span>
  )
}
