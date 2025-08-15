'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedShoeModel() {
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
      
      // Bounce when clicked
      if (clicked) {
        meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 8) * 0.05
      }
    }
  })

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 1000)
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
        {/* Shoe Sole - Dark grey */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[2, 0.2, 0.8]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        
        {/* Shoe Upper - Light purple */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.8, 0.6]} />
          <meshStandardMaterial color="#b8a9c9" />
        </mesh>
        
        {/* Shoe Laces - White */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.2, 0.1, 0.4]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
        {/* Shoe Logo - White circle */}
        <mesh position={[0.6, 0.3, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
        {/* Purple stripe on side */}
        <mesh position={[-0.4, 0.1, 0.4]}>
          <boxGeometry args={[0.8, 0.4, 0.1]} />
          <meshStandardMaterial color="#8b5cf6" />
        </mesh>
        
        {/* Additional details */}
        <mesh position={[0, -0.3, 0.45]}>
          <boxGeometry args={[1.6, 0.1, 0.1]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
      </group>
    </Float>
  )
}

export default function AnimatedShoe() {
  return (
    <div className="animated-shoe-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} />
        
        <AnimatedShoeModel />
        
        <Environment preset="sunset" />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
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
