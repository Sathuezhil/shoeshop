'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

// Custom hook for GLB loading with error handling
function useGLBLoader(url: string) {
  const [gltf, setGltf] = useState<any>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    
    const loadGLB = async () => {
      try {
        setLoading(true)
        setError(false)
        
        // Try to load the GLB file
        const loader = new GLTFLoader()
        const result = await loader.loadAsync(url)
        
        if (mounted) {
          setGltf(result)
          setLoading(false)
        }
      } catch (err) {
        if (mounted) {
          console.log('GLB loading failed, falling back to simple shoe:', err)
          setError(true)
          setLoading(false)
        }
      }
    }

    loadGLB()

    return () => {
      mounted = false
    }
  }, [url])

  return { gltf, error, loading }
}

function GLBShoe({ url }: { url: string }) {
  const { gltf, error, loading } = useGLBLoader(url)
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // If there's an error or still loading, return null (fallback will handle it)
  if (error || loading || !gltf) {
    return null
  }

  useFrame((state) => {
    if (meshRef.current) {
      // Continuous rotation
      meshRef.current.rotation.y += 0.01
      
      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
      
      // Scale on hover
      if (hovered) {
        meshRef.current.scale.setScalar(1.1)
      } else {
        meshRef.current.scale.setScalar(1)
      }
      
      // Bounce effect when clicked
      if (clicked) {
        meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 4) * 0.15
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1
      }
    }
  })

  useEffect(() => {
    if (gltf.scene) {
      // Center the model
      const box = new THREE.Box3().setFromObject(gltf.scene)
      const center = box.getCenter(new THREE.Vector3())
      gltf.scene.position.sub(center)
      
      // Scale the model to fit in view
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2 / maxDim
      gltf.scene.scale.setScalar(scale)
    }
  }, [gltf])

  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <primitive
        ref={meshRef}
        object={gltf.scene}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      />
    </Float>
  )
}

function SimpleShoe() {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Continuous rotation
      meshRef.current.rotation.y += 0.01
      
      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
      
      // Scale on hover
      if (hovered) {
        meshRef.current.scale.setScalar(1.1)
      } else {
        meshRef.current.scale.setScalar(1)
      }
      
      // Bounce effect when clicked
      if (clicked) {
        meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 4) * 0.15
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1
      }
    }
  })

  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        {/* Shoe Sole */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[2, 0.2, 0.8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        
        {/* Shoe Upper */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.8, 0.6]} />
          <meshStandardMaterial color="#95a5a6" />
        </mesh>
        
        {/* Purple Toe Box */}
        <mesh position={[0.5, 0.2, 0]}>
          <boxGeometry args={[0.8, 0.4, 0.5]} />
          <meshStandardMaterial color="#8e44ad" />
        </mesh>
        
        {/* Shoe Laces */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.2, 0.1, 0.4]} />
          <meshStandardMaterial color="#bdc3c7" />
        </mesh>
        
        {/* Shoe Logo */}
        <mesh position={[0.6, 0.3, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      </group>
    </Float>
  )
}

function ShoeScene({ useGLB = true }: { useGLB?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      <Suspense fallback={<SimpleShoe />}>
        {useGLB ? (
          <GLBShoe url="/models/shoe.glb" />
        ) : (
          <SimpleShoe />
        )}
      </Suspense>
      
      <Environment preset="sunset" />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}



export default function AnimatedGLBShoe() {
  const [useGLB, setUseGLB] = useState(true)

  return (
    <div className="animated-shoe-container">
      <ShoeScene useGLB={useGLB} />
      
      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              animationDelay: `${i * 0.5}s`,
              left: `${20 + i * 15}%`
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
