"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import useEventTracking from "@/hooks/useEventTracking";
import { EventName } from "@/types/analytics";
import type { Mesh } from "three";

// Props interface for Scene3D
interface Scene3DProps {
  trackEvent: (name: string, params?: Record<string, string | number | boolean>) => void;
}

// Cube component that spins and changes color
function Cube() {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const trackEvent = useEventTracking();
  
  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });
  
  return (
    <mesh
      ref={meshRef}
      position={[-2, 0, 0]}
      onClick={() => {
        trackEvent(EventName.BUTTON_CLICK, { element_id: "3d_cube", element_type: "3d_object" });
      }}
      onPointerOver={() => {
        setHovered(true);
        trackEvent(EventName.HOVER, { element_id: "3d_cube", element_type: "3d_object" });
      }}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

// Sphere component that floats
function Sphere() {
  const meshRef = useRef<Mesh>(null!);
  const trackEvent = useEventTracking();
  const [hovered, setHovered] = useState(false);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t) * 0.5;
  });
  
  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      onClick={() => {
        trackEvent(EventName.BUTTON_CLICK, { element_id: "3d_sphere", element_type: "3d_object" });
      }}
      onPointerOver={() => {
        setHovered(true);
        trackEvent(EventName.HOVER, { element_id: "3d_sphere", element_type: "3d_object" });
      }}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color={hovered ? 'lightblue' : 'royalblue'} />
    </mesh>
  );
}

// Torus component that moves
function Torus() {
  const meshRef = useRef<Mesh>(null!);
  const trackEvent = useEventTracking();
  const [hovered, setHovered] = useState(false);
  
  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.z += 0.01;
  });
  
  return (
    <mesh
      ref={meshRef}
      position={[2, 0, 0]}
      onClick={() => {
        trackEvent(EventName.BUTTON_CLICK, { element_id: "3d_torus", element_type: "3d_object" });
      }}
      onPointerOver={() => {
        setHovered(true);
        trackEvent(EventName.HOVER, { element_id: "3d_torus", element_type: "3d_object" });
      }}
      onPointerOut={() => setHovered(false)}
    >
      <torusGeometry args={[0.6, 0.2, 16, 32]} />
      <meshStandardMaterial color={hovered ? 'lightgreen' : 'green'} />
    </mesh>
  );
}

// Main Scene3D component
export default function Scene3D({ trackEvent }: Scene3DProps) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <Cube />
      <Sphere />
      <Torus />
      
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.4} />
      <Environment preset="city" />
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
        onChange={() => {
          trackEvent(EventName.BUTTON_CLICK, {
            component: "3d_scene_controls",
            action: "camera_move",
            section: "interactive_scene"
          });
        }}
      />
    </Canvas>
  );
} 