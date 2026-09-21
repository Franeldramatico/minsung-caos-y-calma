import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = (a as HTMLAnchorElement).getAttribute('href')
        if (!id || id === '#') return
        const target = document.querySelector(id)
        if (target) {
          e.preventDefault()
          lenis.scrollTo(target as HTMLElement, { offset: -80 })
        }
      })
    })

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}
