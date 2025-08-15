'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Text, useGLTF, Html } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

// Realistic Nike Pegasus 36 3D Model
function NikePegasus36() {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth floating animation
      const floatSpeed = clicked ? 2.5 : 1.2
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * floatSpeed) * 0.08
      
      // Gentle rotation to show all angles
      const rotationSpeed = clicked ? 1.2 : 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed
      
      // Bounce effect when clicked
      if (clicked) {
        meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 4) * 0.15
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1
      }
      
      // Smooth scaling effects
      const targetScale = hovered ? 1.08 : clicked ? 1.12 : 1.0
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08)
    }
  })

  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.3}>
      <group 
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        {/* Main shoe sole - white midsole */}
        <mesh castShadow receiveShadow position={[0, -0.1, 1]}>
          <extrudeGeometry 
            args={[
              new THREE.Shape()
                .moveTo(-2.2, 0)
                .quadraticCurveTo(-2.2, -0.3, -1.8, -0.4)
                .lineTo(1.8, -0.4)
                .quadraticCurveTo(2.2, -0.3, 2.2, 0)
                .lineTo(2.0, 0.2)
                .quadraticCurveTo(1.8, 0.4, 1.6, 0.4)
                .lineTo(-1.6, 0.4)
                .quadraticCurveTo(-1.8, 0.4, -2.0, 0.2)
                .closePath(),
              {
                depth: 1.4,
                bevelEnabled: true,
                bevelThickness: 0.08,
                bevelSize: 0.08,
                bevelOffset: 0,
                bevelSegments: 8
              }
            ]}
          />
          <meshStandardMaterial 
            color="#ffffff"
            roughness={0.3}
            metalness={0.0}
          />
        </mesh>

        {/* Outsole - reddish brown rubber */}
        <mesh castShadow receiveShadow position={[0, -0.25, 1]}>
          <extrudeGeometry 
            args={[
              new THREE.Shape()
                .moveTo(-2.1, 0)
                .quadraticCurveTo(-2.1, -0.2, -1.7, -0.25)
                .lineTo(1.7, -0.25)
                .quadraticCurveTo(2.1, -0.2, 2.1, 0)
                .lineTo(1.9, 0.15)
                .quadraticCurveTo(1.7, 0.25, 1.5, 0.25)
                .lineTo(-1.5, 0.25)
                .quadraticCurveTo(-1.7, 0.25, -1.9, 0.15)
                .closePath(),
              {
                depth: 1.3,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelOffset: 0,
                bevelSegments: 6
              }
            ]}
          />
          <meshStandardMaterial 
            color="#8B4513"
            roughness={0.9}
            metalness={0.0}
          />
        </mesh>

        {/* Shoe upper - grey speckled knit */}
        <mesh castShadow receiveShadow position={[0, 0.3, 1]}>
          <extrudeGeometry 
            args={[
              new THREE.Shape()
                .moveTo(-1.8, 0)
                .lineTo(1.8, 0)
                .lineTo(1.7, 0.6)
                .quadraticCurveTo(1.6, 1.1, 1.4, 1.4)
                .lineTo(1.2, 1.7)
                .quadraticCurveTo(1.0, 1.9, 0, 1.7)
                .lineTo(-1.0, 1.4)
                .quadraticCurveTo(-1.2, 1.1, -1.3, 0.6)
                .lineTo(-1.4, 0.1)
                .closePath(),
              {
                depth: 1.2,
                bevelEnabled: true,
                bevelThickness: 0.06,
                bevelSize: 0.06,
                bevelOffset: 0,
                bevelSegments: 8
              }
            ]}
          />
          <meshStandardMaterial 
            color={hovered ? "#95a5a6" : "#7f8c8d"}
            roughness={0.7}
            metalness={0.0}
            emissive={hovered ? "#95a5a6" : "#000000"}
            emissiveIntensity={hovered ? 0.15 : 0}
          />
        </mesh>

        {/* Toe box area */}
        <mesh castShadow receiveShadow position={[1.2, 0.4, 1]}>
          <extrudeGeometry 
            args={[
              new THREE.Shape()
                .moveTo(0, 0)
                .lineTo(0.6, 0)
                .quadraticCurveTo(0.7, 0.2, 0.7, 0.4)
                .quadraticCurveTo(0.7, 0.6, 0.6, 0.8)
                .lineTo(0, 0.8)
                .quadraticCurveTo(-0.1, 0.6, -0.1, 0.4)
                .quadraticCurveTo(-0.1, 0.2, 0, 0)
                .closePath(),
              {
                depth: 0.9,
                bevelEnabled: true,
                bevelThickness: 0.04,
                bevelSize: 0.04,
                bevelOffset: 0,
                bevelSegments: 5
              }
            ]}
          />
          <meshStandardMaterial 
            color="#95a5a6"
            roughness={0.7}
            metalness={0.0}
          />
        </mesh>

        {/* Heel counter */}
        <mesh castShadow receiveShadow position={[-1.2, 0.4, 1]}>
          <extrudeGeometry 
            args={[
              new THREE.Shape()
                .moveTo(0, 0)
                .lineTo(-0.6, 0)
                .quadraticCurveTo(-0.7, 0.2, -0.7, 0.4)
                .quadraticCurveTo(-0.7, 0.6, -0.6, 0.8)
                .lineTo(0, 0.8)
                .quadraticCurveTo(0.1, 0.6, 0.1, 0.4)
                .quadraticCurveTo(0.1, 0.2, 0, 0)
                .closePath(),
              {
                depth: 0.9,
                bevelEnabled: true,
                bevelThickness: 0.04,
                bevelSize: 0.04,
                bevelOffset: 0,
                bevelSegments: 5
              }
            ]}
          />
          <meshStandardMaterial 
            color="#95a5a6"
            roughness={0.7}
            metalness={0.0}
          />
        </mesh>

        {/* Ankle collar */}
        <mesh castShadow receiveShadow position={[0, 1.6, 1]}>
          <torusGeometry args={[0.7, 0.18, 8, 16]} />
          <meshStandardMaterial 
            color="#2c3e50"
            roughness={0.6}
            metalness={0.0}
          />
        </mesh>

        {/* Lacing system */}
        <group position={[0, 1.1, 1.61]}>
          {/* Eyelets */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={`eyelets-${i}`} position={[0, i * 0.14, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.02, 8]} />
              <meshStandardMaterial color="#2c3e50" />
            </mesh>
          ))}
          
          {/* Laces */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={`lace-${i}`} position={[0, i * 0.14, 0]} castShadow>
              <boxGeometry args={[1.8, 0.03, 0.03]} />
              <meshStandardMaterial 
                color={clicked ? "#ffff00" : "#bdc3c7"}
                emissive={clicked ? "#ffff00" : "#000000"}
                emissiveIntensity={clicked ? 0.4 : 0}
              />
            </mesh>
          ))}
        </group>

        {/* Nike Swoosh - black logo */}
        <mesh position={[0.8, 1.0, 1.61]} rotation={[0, 0, Math.PI / 6]}>
          <extrudeGeometry 
            args={[
              new THREE.Shape()
                .moveTo(0, 0)
                .quadraticCurveTo(0.15, 0.15, 0.3, 0.3)
                .quadraticCurveTo(0.45, 0.45, 0.6, 0.6)
                .quadraticCurveTo(0.75, 0.75, 0.9, 0.9)
                .quadraticCurveTo(1.05, 1.05, 1.2, 1.2)
                .quadraticCurveTo(1.05, 1.35, 0.9, 1.2)
                .quadraticCurveTo(0.75, 1.05, 0.6, 0.9)
                .quadraticCurveTo(0.45, 0.75, 0.3, 0.6)
                .quadraticCurveTo(0.15, 0.45, 0, 0.3)
                .closePath(),
              {
                depth: 0.02,
                bevelEnabled: false
              }
            ]}
          />
          <meshStandardMaterial 
            color={hovered ? "#e74c3c" : "#000000"}
            emissive={hovered ? "#e74c3c" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : 0}
          />
        </mesh>

        {/* "36" branding on toe box */}
        <mesh position={[1.4, 0.6, 1.61]} rotation={[0, 0, -Math.PI / 6]}>
          <extrudeGeometry 
            args={[
              new THREE.Shape()
                .moveTo(0, 0)
                .lineTo(0.4, 0)
                .lineTo(0.4, 0.3)
                .lineTo(0, 0.3)
                .closePath(),
              {
                depth: 0.01,
                bevelEnabled: false
              }
            ]}
          />
          <meshStandardMaterial 
            color="#000000"
            emissive={hovered ? "#ffffff" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : 0}
          />
        </mesh>

        {/* "ZOOM" branding on midsole */}
        <mesh position={[0, 0.1, 1.71]} rotation={[0, 0, 0]}>
          <extrudeGeometry 
            args={[
              new THREE.Shape()
                .moveTo(-0.6, 0)
                .lineTo(0.6, 0)
                .lineTo(0.6, 0.15)
                .lineTo(-0.6, 0.15)
                .closePath(),
              {
                depth: 0.01,
                bevelEnabled: false
              }
            ]}
          />
          <meshStandardMaterial 
            color="#000000"
            emissive={clicked ? "#ffff00" : "#000000"}
            emissiveIntensity={clicked ? 0.3 : 0}
          />
        </mesh>

        {/* Enhanced hover effect */}
        {hovered && (
          <mesh position={[0, 0.8, 1]}>
            <extrudeGeometry 
              args={[
                new THREE.Shape()
                  .moveTo(-1.9, 0)
                  .lineTo(1.9, 0)
                  .lineTo(1.8, 0.8)
                  .quadraticCurveTo(1.7, 1.3, 1.5, 1.6)
                  .lineTo(1.3, 1.9)
                  .quadraticCurveTo(1.1, 2.1, 0, 1.9)
                  .lineTo(-1.1, 1.6)
                  .quadraticCurveTo(-1.3, 1.3, -1.4, 0.8)
                  .lineTo(-1.5, 0.1)
                  .closePath(),
                {
                  depth: 1.3,
                  bevelEnabled: false
                }
              ]}
            />
            <meshBasicMaterial 
              color="#00ffff" 
              transparent 
              opacity={0.12}
              wireframe
            />
          </mesh>
        )}

        {/* Click indicator */}
        {clicked && (
          <Html position={[0, 2.8, 1]} center>
            <div style={{
              background: 'rgba(0,0,0,0.85)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '25px',
              fontSize: '16px',
              whiteSpace: 'nowrap',
              border: '2px solid #e74c3c'
            }}>
              🚀 NIKE PEGASUS 36 - ANIMATED! 🚀
            </div>
          </Html>
        )}
      </group>
    </Float>
  )
}

// Animated particles component
function AnimatedParticles() {
  const particlesRef = useRef<THREE.InstancedMesh>(null)
  const count = 150
  
  useEffect(() => {
    if (particlesRef.current) {
      const positions = new Float32Array(count * 3)
      
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 35
        positions[i * 3 + 1] = (Math.random() - 0.5) * 35
        positions[i * 3 + 2] = (Math.random() - 0.5) * 35
      }
      
      particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    }
  }, [])
  
  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < count; i++) {
        const matrix = new THREE.Matrix4()
        const x = particlesRef.current.geometry.attributes.position.array[i * 3]
        const y = particlesRef.current.geometry.attributes.position.array[i * 3 + 1]
        const z = particlesRef.current.geometry.attributes.position.array[i * 3 + 2]
        
        // Animate particle positions
        const newY = y + Math.sin(time * 0.4 + i * 0.1) * 0.08
        const newX = x + Math.cos(time * 0.25 + i * 0.1) * 0.04
        
        matrix.setPosition(newX, newY, z)
        particlesRef.current.setMatrixAt(i, matrix)
      }
      
      particlesRef.current.instanceMatrix.needsUpdate = true
    }
  })
  
  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.025, 8, 6]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={0.25}
        transparent
        opacity={0.5}
      />
    </instancedMesh>
  )
}

// Enhanced floating text
function ShoeText({ text, position, size = 0.4, color = "#ffffff" }: any) {
  const textRef = useRef<THREE.Group>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.35) * 0.08
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.12
      
      // Scale effect on hover
      if (isHovered) {
        textRef.current.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.08)
      } else {
        textRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08)
      }
    }
  })

  return (
    <Float speed={2.5} rotationIntensity={0.25} floatIntensity={0.25}>
      <group 
        ref={textRef} 
        position={position}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <Text
          fontSize={size}
          color={isHovered ? "#ffff00" : color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#000000"
        >
          {text}
        </Text>
      </group>
    </Float>
  )
}

// Main Scene
function Scene() {
  return (
    <>
      {/* Professional lighting setup */}
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[8, 8, 4]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Accent lights */}
      <pointLight position={[-8, 8, -8]} intensity={0.5} color="#3498db" />
      <pointLight position={[8, -8, 8]} intensity={0.5} color="#e74c3c" />
      <pointLight position={[0, 12, 0]} intensity={0.3} color="#f39c12" />
      
      {/* Nike Pegasus 36 3D Model */}
      <NikePegasus36 />
      
      {/* Branding text */}
      <ShoeText
        text="NIKE"
        position={[0, 4.2, 0]}
        size={0.7}
        color="#000000"
      />
      
      <ShoeText
        text="PEGASUS 36"
        position={[0, -4.2, 0]}
        size={0.5}
        color="#e74c3c"
      />
      
      <ShoeText
        text="ZOOM AIR"
        position={[4.5, 0, 0]}
        size={0.4}
        color="#3498db"
      />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial 
          color="#ecf0f1"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Animated particles */}
      <AnimatedParticles />
      
      {/* Background stars */}
      <group>
        {Array.from({ length: 120 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 45,
              (Math.random() - 0.5) * 45,
              (Math.random() - 0.5) * 45
            ]}
          >
            <sphereGeometry args={[0.018, 8, 6]} />
            <meshStandardMaterial
              color={[
                '#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', 
                '#3498db', '#9b59b6', '#e67e22', '#ffffff'
              ][i % 8]}
              emissive={[
                '#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', 
                '#3498db', '#9b59b6', '#e67e22', '#ffffff'
              ][i % 8]}
              emissiveIntensity={0.25}
            />
          </mesh>
        ))}
      </group>
    </>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 55 }}
      shadows
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <Scene />
        <Environment preset="city" />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
          autoRotate={false}
          maxDistance={25}
          minDistance={8}
        />
      </Suspense>
    </Canvas>
  )
}
