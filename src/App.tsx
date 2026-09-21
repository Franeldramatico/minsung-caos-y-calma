import { useSmoothScroll } from './lib/lenis'
import { Nav, Footer } from './components/Chrome'
import Hero from './components/Hero'
import Duality from './components/Duality'
import Statement from './components/Statement'
import Cards from './components/Cards'
import Chemistry from './components/Chemistry'
import Timeline from './components/Timeline'

export default function App() {
  useSmoothScroll()
  return (
    <div className="grain site-grid relative min-h-screen bg-ink text-bone">
      <Nav />
      <main>
        <Hero />
        <Duality />
        <Statement />
        <Cards />
        <Chemistry />
        <Timeline />
      </main>
      <Footer />
    </div>
  )
}
