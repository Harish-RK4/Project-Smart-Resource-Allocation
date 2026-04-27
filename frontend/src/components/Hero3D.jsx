import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const AICore = () => {
  const mesh = useRef();
  
  // Rotating and distorting the sphere
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = time * 0.2;
    mesh.current.rotation.y = time * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.5, 8]} />
        <MeshDistortMaterial
          color="#6366F1"
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.1}
          metalness={0.9}
          emissive="#4338ca"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Outer Glow Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#6366F1" transparent opacity={0.3} />
      </mesh>
      
      {/* Inner Wireframe for detail */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.52, 4]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.1} />
      </mesh>
    </Float>
  );
};

const DataParticles = () => {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#10B981"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Hero3D = () => {
  return (
    <div className="w-full h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366F1" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#10B981" />
        <spotLight position={[0, 5, 10]} angle={0.15} penumbra={1} intensity={2} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <AICore />
        <DataParticles />
        
        {/* Post-processing feel without extra libs */}
        <fog attach="fog" args={['#020617', 5, 20]} />
      </Canvas>
    </div>
  );
};

export default Hero3D;
