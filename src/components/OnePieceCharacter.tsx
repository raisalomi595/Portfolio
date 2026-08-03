import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Sparkles } from '@react-three/drei'
import { Component, type ReactNode, Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const FLEET = [
  { z: -1.1, scale: 1.05, speed: 1.4, y: 1.45, phase: 0 },
  { z: 1.6, scale: 0.78, speed: 1.85, y: 1.38, phase: 0.85 },
  { z: -6.5, scale: 0.55, speed: 0.8, y: 1.12, phase: 0.45 },
  { z: 4.6, scale: 0.55, speed: 2.1, y: 1.2, phase: 0.62 },
]

function Sun() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(128, 128, 2, 128, 128, 128)
    g.addColorStop(0, 'rgba(255,246,230,1)')
    g.addColorStop(0.22, 'rgba(255,208,150,0.55)')
    g.addColorStop(0.55, 'rgba(255,150,80,0.18)')
    g.addColorStop(1, 'rgba(255,120,60,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 256, 256)
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [])

  const material = useMemo(
    () =>
      new THREE.SpriteMaterial({
        map: texture,
        color: 0xfff1dc,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    [texture],
  )

  return <sprite position={[-8, 7, -16]} scale={[18, 18, 1]} material={material} />
}

function OceanSurface() {
  const { scene } = useGLTF('/models/ocean.glb')
  const root = useRef<THREE.Group>(null)

  useEffect(() => {
    const node = root.current
    if (!node) return
    const clone = scene.clone(true)
    clone.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        ;(obj as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: '#2f86c2',
          roughness: 0.35,
          metalness: 0.08,
          transparent: true,
          opacity: 0.96,
        })
      }
    })
    clone.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(clone)
    const xspan = box.max.x - box.min.x || 1
    const zspan = box.max.z - box.min.z || 1
    const yspan = box.max.y - box.min.y || 1
    const target = 70
    const sx = target / xspan
    const sz = target / zspan
    const sy = 0.7 / yspan
    clone.scale.set(sx, sy, sz)
    const cx = (box.min.x + box.max.x) / 2
    const cz = (box.min.z + box.max.z) / 2
    clone.position.set(-cx * sx, -box.min.y * sy + 0.15, -cz * sz)
    node.add(clone)
    return () => {
      node.clear()
    }
  }, [scene])

  return <group ref={root} />
}

function Ship({ cfg }: { cfg: (typeof FLEET)[number] }) {
  const { scene } = useGLTF('/models/pirate-ship.glb')
  const root = useRef<THREE.Group>(null)
  const x = useRef<number | null>(null)

  useEffect(() => {
    const node = root.current
    if (!node) return
    const clone = scene.clone(true)
    node.add(clone)
    return () => {
      node.clear()
    }
  }, [scene])

  useFrame((state, delta) => {
    const node = root.current
    if (!node) return
    const camZ = state.camera.position.z
    const d0 = camZ - cfg.z
    const half = (state.viewport.width / 2) * (d0 / camZ)
    if (x.current === null) x.current = half * cfg.phase
    x.current -= cfg.speed * delta
    if (x.current < -half) x.current = half

    const t = state.clock.elapsedTime + cfg.z
    node.scale.setScalar(cfg.scale)
    node.position.set(x.current, cfg.y + Math.sin(t * 1.25) * 0.07, cfg.z)
    node.rotation.set(
      Math.sin(t * 0.85) * 0.045,
      -0.95 + Math.sin(t * 0.5) * 0.12,
      Math.sin(t * 1.15) * 0.05,
    )
  })

  return <group ref={root} />
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="relative flex h-full w-full items-center justify-center rounded-3xl bg-gradient-to-b from-[#7fc4e8] via-[#3a8ec8] to-[#1e5f8f]">
          <span className="text-5xl drop-shadow-lg" role="img" aria-label="Ship">
            ⛵
          </span>
        </div>
      )
    }
    return this.props.children
  }
}

export default function OnePieceCharacter() {
  return (
    <div
      aria-hidden="true"
      className="relative h-72 select-none overflow-hidden rounded-3xl border border-cream-300 bg-gradient-to-b from-[#8ecbe8] via-[#4f9cc9] to-[#1e5f8f] md:h-80"
    >
      <SceneBoundary>
        <Canvas
          shadows
          dpr={[1, 1.8]}
          camera={{ position: [0, 2.7, 6.6], near: 0.1, far: 100, fov: 44 }}
          gl={{ antialias: true }}
          style={{ touchAction: 'pan-y' }}
        >
          <fog attach="fog" args={['#9ec8e2', 12, 45]} />
          <ambientLight intensity={0.55} color="#cfe4ff" />
          <directionalLight position={[-5, 8, -8]} intensity={1.6} color="#ffb36b" />
          <directionalLight position={[8, 5, 6]} intensity={1.0} color="#7fb6ff" />
          <directionalLight position={[0, -3, -5]} intensity={0.6} color="#ff7a5c" />
          <Suspense fallback={null}>
            <OceanSurface />
            {FLEET.map((cfg, i) => (
              <Ship key={i} cfg={cfg} />
            ))}
            <Sparkles
              count={100}
              scale={[30, 3, 18]}
              position={[0, 1.5, -2]}
              size={3}
              speed={0.35}
              color="#cfe9ff"
              opacity={0.85}
            />
            <Sun />
          </Suspense>
        </Canvas>
      </SceneBoundary>

      {/* sun glow */}
      <div className="pointer-events-none absolute right-[18%] top-[-30%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,214,150,0.75),transparent_65%)] blur-2xl" />
      {/* gloss highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/25 to-transparent" />
      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#041a2c]/80 via-[#041a2c]/20 to-transparent" />
      {/* inset frame glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[calc(1.5rem-1px)] ring-1 ring-inset ring-white/15" />
      <div className="pointer-events-none absolute top-3 left-4 text-yellow-100/90 text-sm animate-pulse">✦</div>
      <div className="pointer-events-none absolute right-5 top-4 text-yellow-100/70 text-xs animate-pulse [animation-delay:0.6s]">✦</div>
    </div>
  )
}

useGLTF.preload('/models/pirate-ship.glb')
useGLTF.preload('/models/ocean.glb')