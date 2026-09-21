import { useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'

const COLOR_STORM = '#52ffb8'
const COLOR_KNOW = '#ff6b3d'

function OrbitRing({
  radius,
  count,
  color,
  size,
  tilt,
  speed,
  seed,
}: {
  radius: number
  count: number
  color: string
  size: number
  tilt: [number, number, number]
  speed: number
  seed: number
}) {
  const inner = useRef<THREE.Points>(null!)

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const rnd = mulberry32(seed)
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      const jr = radius + (rnd() - 0.5) * 0.55
      positions[i * 3] = Math.cos(a) * jr
      positions[i * 3 + 1] = Math.sin(a) * jr
      positions[i * 3 + 2] = (rnd() - 0.5) * 0.5
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    return { geometry: geo, material: mat }
  }, [count, radius, color, size, seed])

  useFrame((_, dt) => {
    inner.current.rotation.z += speed * dt
  })

  return (
    <group rotation={tilt}>
      <points ref={inner} geometry={geometry} material={material} />
    </group>
  )
}

function Core({ color, offset }: { color: string; offset: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  const halo = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const pulse = 1 + Math.sin(t * 2.2 + offset * 3) * 0.18
    ref.current.scale.setScalar(pulse)
    halo.current.scale.setScalar(1 + Math.sin(t * 1.4 + offset) * 0.25)
    const x = Math.sin(t * 0.5 + offset * Math.PI) * 0.55
    ref.current.position.x = x
    halo.current.position.x = x
  })
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function Parallax({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null!)
  useFrame((state) => {
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.35,
      0.04,
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.22,
      0.04,
    )
  })
  return <group ref={group}>{children}</group>
}

function Scene() {
  return (
    <Parallax>
      <OrbitRing
        radius={3}
        count={650}
        color={COLOR_STORM}
        size={0.035}
        tilt={[1.35, 0.35, 0.2]}
        speed={0.12}
        seed={7}
      />
      <OrbitRing
        radius={2.7}
        count={650}
        color={COLOR_KNOW}
        size={0.03}
        tilt={[-0.9, -0.5, 0.6]}
        speed={-0.16}
        seed={21}
      />
      <OrbitRing
        radius={4.6}
        count={260}
        color="#ece6da"
        size={0.015}
        tilt={[1.1, -0.4, 0]}
        speed={0.05}
        seed={99}
      />
      <Core color={COLOR_STORM} offset={0} />
      <Core color={COLOR_KNOW} offset={1} />
      <Sparkles count={90} scale={9} size={1.6} speed={0.35} color={COLOR_STORM} opacity={0.5} />
      <Sparkles count={90} scale={9} size={1.4} speed={0.3} color={COLOR_KNOW} opacity={0.4} />
    </Parallax>
  )
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
      >
        <Stars radius={60} depth={40} count={1600} factor={3} saturation={0} fade speed={0.6} />
        <Scene />
      </Canvas>
    </div>
  )
}

function mulberry32(a: number) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
