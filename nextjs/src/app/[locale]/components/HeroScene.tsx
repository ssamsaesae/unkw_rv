"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Wireframe Icosahedron ─── */
function WireSphere({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const edgesRef = useRef<THREE.LineSegments>(null);
  const innerRef = useRef<THREE.LineSegments>(null);

  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.8, 2), []);
  const innerGeo = useMemo(() => new THREE.IcosahedronGeometry(1.1, 1), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  const innerEdgesGeo = useMemo(() => new THREE.EdgesGeometry(innerGeo), [innerGeo]);

  useFrame((_, delta) => {
    if (edgesRef.current) {
      edgesRef.current.rotation.y += delta * 0.15;
      edgesRef.current.rotation.x += delta * 0.08;
      if (mouse.current) {
        const targetRotX = mouse.current.y * 0.3;
        const targetRotZ = mouse.current.x * 0.2;
        edgesRef.current.rotation.x += (targetRotX - edgesRef.current.rotation.x) * 0.02;
        edgesRef.current.rotation.z += (targetRotZ - edgesRef.current.rotation.z) * 0.02;
      }
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.1;
      innerRef.current.rotation.z += delta * 0.12;
      if (mouse.current) {
        const targetRotX = -mouse.current.y * 0.2;
        const targetRotZ = -mouse.current.x * 0.15;
        innerRef.current.rotation.x += (targetRotX - innerRef.current.rotation.x) * 0.015;
        innerRef.current.rotation.z += (targetRotZ - innerRef.current.rotation.z) * 0.015;
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group>
        {/* Outer wireframe */}
        <lineSegments ref={edgesRef} geometry={edgesGeo}>
          <lineBasicMaterial color="#E94710" transparent opacity={0.35} />
        </lineSegments>

        {/* Inner wireframe */}
        <lineSegments ref={innerRef} geometry={innerEdgesGeo}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.08} />
        </lineSegments>

        {/* Vertex dots on outer sphere */}
        <points geometry={geo}>
          <pointsMaterial color="#E94710" size={0.03} transparent opacity={0.6} sizeAttenuation />
        </points>

        {/* Center glow */}
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#E94710" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Floating Particles ─── */
function Particles() {
  const count = 60;
  const ref = useRef<THREE.Points>(null);

  const particlesGeo = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geometry;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={ref} geometry={particlesGeo}>
      <pointsMaterial color="#ffffff" size={0.015} transparent opacity={0.2} sizeAttenuation />
    </points>
  );
}

/* ─── Main Scene ─── */
export default function HeroScene({
  mouseRef,
}: {
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <WireSphere mouse={mouseRef} />
      <Particles />
    </Canvas>
  );
}
