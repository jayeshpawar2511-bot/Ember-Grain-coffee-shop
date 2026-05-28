import React, { useRef, Component, ReactNode, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

function CoffeeBean({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.005;
      mesh.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={mesh} rotation={rotation} scale={scale} castShadow receiveShadow>
        <capsuleGeometry args={[0.5, 0.5, 4, 16]} />
        <meshStandardMaterial color="#3E2723" roughness={0.7} metalness={0.1} />
      </mesh>
    </Float>
  );
}

function Steam() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((child: any, i) => {
        child.position.y += 0.01;
        child.rotation.z += 0.01;
        child.scale.x = child.scale.y = child.scale.z = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
        child.material.opacity = Math.max(0, 1 - (child.position.y / 5));
        if (child.position.y > 5) {
          child.position.y = -1;
        }
      });
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 2,
            Math.random() * 4,
            (Math.random() - 0.5) * 2
          ]}
        >
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            roughness={1}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      const targetX = (state.pointer.x * 0.5);
      const targetY = (state.pointer.y * 0.5);
      group.current.rotation.y += (targetX - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (-targetY - group.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, -1, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.2, 2.5, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.4, 32]} />
        <meshStandardMaterial color="#2d1a11" roughness={0.9} />
      </mesh>
      <Steam />
      {Array.from({ length: 20 }).map((_, i) => (
        <CoffeeBean
          key={i}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8 + 1,
            (Math.random() - 0.5) * 6 - 2
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          scale={0.2 + Math.random() * 0.3}
        />
      ))}
      <ambientLight intensity={0.2} />
      <spotLight position={[5, 5, 5]} angle={0.4} penumbra={1} intensity={2} color="#f9d71c" castShadow />
      <pointLight position={[-5, 3, -5]} intensity={1} color="#ffaa00" />
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    // swallow WebGL errors silently
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function CSSFallbackScene() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black" data-testid="hero-css-scene">
      {/* Ambient warm glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 70%, rgba(161,88,38,0.35) 0%, rgba(90,40,15,0.2) 50%, transparent 80%)',
        }}
      />
      {/* Top vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,0,0,0.7) 0%, transparent 60%)',
        }}
      />
      {/* Floating beans */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-70"
          style={{
            width: `${10 + (i % 5) * 6}px`,
            height: `${14 + (i % 5) * 7}px`,
            left: `${(i * 31 + 7) % 92}%`,
            top: `${(i * 23 + 5) % 88}%`,
            background: 'radial-gradient(circle at 35% 35%, #6B3A2A, #2d1608)',
            transform: `rotate(${i * 37}deg)`,
            animation: `floatBean${i % 3} ${4 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.4) % 3}s`,
          }}
        />
      ))}
      {/* Steam wisps */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute bottom-1/3 opacity-20"
          style={{
            left: `${42 + i * 4}%`,
            width: '2px',
            height: '60px',
            background: 'linear-gradient(to top, rgba(255,255,255,0.6), transparent)',
            borderRadius: '50%',
            animation: `steamRise ${2 + i * 0.5}s ease-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatBean0 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(180deg)} }
        @keyframes floatBean1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(-120deg)} }
        @keyframes floatBean2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-22px) rotate(90deg)} }
        @keyframes steamRise { 0%{transform:translateY(0) scaleX(1);opacity:0.2} 100%{transform:translateY(-80px) scaleX(2);opacity:0} }
      `}</style>
    </div>
  );
}

function WebGLScene() {
  const [webGLFailed, setWebGLFailed] = useState(false);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!ctx) {
      setWebGLFailed(true);
    }
  }, []);

  if (webGLFailed) {
    return <CSSFallbackScene />;
  }

  return (
    <WebGLErrorBoundary fallback={<CSSFallbackScene />}>
      <div className="absolute inset-0 z-0 pointer-events-auto" data-testid="hero-3d-scene">
        <Canvas
          camera={{ position: [0, 2, 8], fov: 45 }}
          shadows
          onCreated={({ gl }) => {
            if (!gl.getContext()) {
              setWebGLFailed(true);
            }
          }}
        >
          <Scene />
          <Environment preset="night" />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}

export default function HeroScene() {
  return <WebGLScene />;
}
