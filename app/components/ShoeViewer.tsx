'use client'

import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from 'three';

// GLB Shoe Model Component
function GLBShoe() {
  const { scene } = useGLTF("/model.glb");
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  console.log("GLB model loaded successfully:", scene);
  return <primitive object={scene} ref={meshRef} scale={[1, 1, 1]} position={[0, 3, 0]} />;
}

// Simple 3D Shoe Component (fallback)
function SimpleShoe() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={meshRef} position={[0, 3, 0]}>
      {/* Shoe sole */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 0.2, 1]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
      
      {/* Shoe upper */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
      
      {/* Shoe laces */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh position={[0, 2, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function ShoeViewer() {
  return (
    <div className="shoe-viewer-container">
      <Canvas 
        camera={{ position: [0, 3, 8], fov: 50 }}
        style={{ 
          width: '400px',
          height: '400px',
          margin: '0 auto',
          display: 'block',
          background: 'transparent'
        }}
        onCreated={(state) => {
          console.log("Three.js canvas created successfully");
        }}
        onError={(error) => {
          console.error("Canvas error:", error);
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} />
        <pointLight position={[-5, 5, 5]} intensity={0.8} />
        
        {/* Try to load GLB model, fallback to simple shoe */}
        <Suspense fallback={<LoadingFallback />}>
          <GLBShoe />
        </Suspense>
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={5}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
}
