"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import type { BloomEffect } from "postprocessing";
import { easing } from "maath";
import * as THREE from "three";

/**
 * Hero "galáxia" v2: espiral grand-design de 2 braços PLANA (a inclinação vem
 * só da câmera, posicionada acima e à frente) girando ao redor da logo DEVCLUB
 * reconstruída como nuvem de partículas (core branco-quente + halo verde),
 * energizada por Bloom.
 *
 * Toda a animação por frame vive num único useFrame em GalaxyScene, mutando
 * apenas refs locais — exigência das regras react-hooks/immutability e purity
 * do ESLint deste projeto.
 */

// ---------------------------------------------------------------------------
// Espiral
// ---------------------------------------------------------------------------

const ARM_COUNT = 24000;
const DUST_COUNT = 3000;
const PARTICLE_SEED = 1337;
const R_MIN = 1.35;
const R_MAX = 5.8;
const RADIAL_BIAS = 0.78;
const SPIN = 0.82;
const ARM_SCATTER_BASE = 0.07;
const ARM_SCATTER_GROWTH = 0.06;
const THICKNESS = 0.09;

const COLOR_ARM_INNER = "#eef3ff";
const COLOR_ARM_OUTER = "#4a6bff";
const DUST_DIMMING = 0.35;

const BASE_SPIN_SPEED = 0.05;
const REDUCED_SPIN_SPEED = 0.008;
const DRAG_FRICTION = 0.94;

// ---------------------------------------------------------------------------
// Logo
// ---------------------------------------------------------------------------

/**
 * Marca DEVCLUB em módulos 13×13, extraída do PNG oficial (1024×1024).
 * Regenerar com `node scripts/extract-logo-matrix.mjs` se a marca mudar.
 */
const LOGO_GRID: readonly string[] = [
  "###.#.###.#.#",
  "#.#.........#",
  "###.#######.#",
  "...........#.",
  "#.###...##..#",
  "#.#..#.#..#.#",
  "#.#..#.#....#",
  "..#..#.#....#",
  "#.###...###.#",
  ".............",
  "#....#..#.###",
  ".#..#..#..#.#",
  "#..#....#.###",
];
const LOGO_MODULES = LOGO_GRID.length;
const LOGO_SIZE = 2.1;
const CORE_PER_MODULE = 12;
const GLOW_PER_MODULE = 5;
const FILL_PER_MODULE = 1;

const COLOR_LOGO_CORE_A = "#eafff1";
const COLOR_LOGO_CORE_B = "#ffffff";
const COLOR_LOGO_GLOW = "#39d968";

const BLOOM_BASE_INTENSITY = 1.1;
const BLOOM_HOVER_BONUS = 0.8;

const BACKGROUND_GRADIENT =
  "radial-gradient(ellipse 90% 70% at 50% 40%, #0d1230 0%, #05060d 70%)";

// ---------------------------------------------------------------------------
// Utilitários
// ---------------------------------------------------------------------------

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onStoreChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
}

/** PRNG mulberry32 — determinístico para manter a geração dos buffers pura. */
function createRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Amostra gaussiana via Box-Muller. */
function gaussian(random: () => number, mean: number, stdDev: number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = random();
  while (v === 0) v = random();
  return (
    mean + stdDev * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
  );
}

// ---------------------------------------------------------------------------
// Geração de buffers
// ---------------------------------------------------------------------------

interface SpiralBuffers {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
}

function generateSpiralBuffers(seed: number): SpiralBuffers {
  const random = createRandom(seed);
  const total = ARM_COUNT + DUST_COUNT;
  const positions = new Float32Array(total * 3);
  const colors = new Float32Array(total * 3);
  const sizes = new Float32Array(total);
  const inner = new THREE.Color(COLOR_ARM_INNER);
  const outer = new THREE.Color(COLOR_ARM_OUTER);
  const sample = new THREE.Color();

  for (let i = 0; i < ARM_COUNT; i++) {
    // 2 braços grand-design: viés radial concentra partículas perto do centro.
    const arm = (i % 2) * Math.PI;
    const radius = R_MIN + (R_MAX - R_MIN) * Math.pow(random(), RADIAL_BIAS);
    const theta = arm + radius * SPIN;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);

    // Dispersão perpendicular à tangente do braço, crescendo com o raio →
    // ridge nítido no centro, difuso na borda.
    let tangentX = cos - radius * sin * SPIN;
    let tangentZ = sin + radius * cos * SPIN;
    const tangentLength = Math.hypot(tangentX, tangentZ);
    tangentX /= tangentLength;
    tangentZ /= tangentLength;

    const scatter = ARM_SCATTER_BASE + radius * ARM_SCATTER_GROWTH;
    const perp = gaussian(random, 0, scatter);
    const along = gaussian(random, 0, scatter * 0.6);

    positions[i * 3] = cos * radius - tangentZ * perp + tangentX * along;
    positions[i * 3 + 1] = gaussian(random, 0, THICKNESS);
    positions[i * 3 + 2] = sin * radius + tangentX * perp + tangentZ * along;

    const t = Math.min((radius - R_MIN) / (R_MAX - R_MIN), 1);
    sample.copy(inner).lerp(outer, t);
    colors[i * 3] = sample.r;
    colors[i * 3 + 1] = sample.g;
    colors[i * 3 + 2] = sample.b;

    sizes[i] = 0.5 + random() * 0.9;
  }

  // Poeira esparsa, fraca e azulada, envolvendo o disco.
  for (let i = ARM_COUNT; i < total; i++) {
    const radius = 0.9 + Math.pow(random(), 0.6) * (R_MAX - 0.4);
    const theta = random() * Math.PI * 2;
    positions[i * 3] = Math.cos(theta) * radius;
    positions[i * 3 + 1] = gaussian(random, 0, 0.28);
    positions[i * 3 + 2] = Math.sin(theta) * radius;

    sample.copy(outer).multiplyScalar(DUST_DIMMING);
    colors[i * 3] = sample.r;
    colors[i * 3 + 1] = sample.g;
    colors[i * 3 + 2] = sample.b;

    sizes[i] = 0.4 + random() * 0.8;
  }

  return { positions, colors, sizes };
}

interface LogoBuffers {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  phases: Float32Array;
  alphas: Float32Array;
}

function generateLogoBuffers(seed: number): LogoBuffers {
  const random = createRandom(seed);
  const cell = LOGO_SIZE / LOGO_MODULES;
  const filled: Array<{ x: number; y: number }> = [];

  for (let row = 0; row < LOGO_MODULES; row++) {
    for (let col = 0; col < LOGO_MODULES; col++) {
      if (LOGO_GRID[row][col] !== "#") continue;
      filled.push({
        x: (col + 0.5 - LOGO_MODULES / 2) * cell,
        y: (LOGO_MODULES / 2 - row - 0.5) * cell,
      });
    }
  }

  const perModule = CORE_PER_MODULE + GLOW_PER_MODULE + FILL_PER_MODULE;
  const total = filled.length * perModule;
  const positions = new Float32Array(total * 3);
  const colors = new Float32Array(total * 3);
  const sizes = new Float32Array(total);
  const phases = new Float32Array(total);
  const alphas = new Float32Array(total);

  const coreA = new THREE.Color(COLOR_LOGO_CORE_A);
  const coreB = new THREE.Color(COLOR_LOGO_CORE_B);
  const glow = new THREE.Color(COLOR_LOGO_GLOW);
  const sample = new THREE.Color();

  let index = 0;
  for (const center of filled) {
    for (let p = 0; p < perModule; p++) {
      const isCore = p < CORE_PER_MODULE;
      const isGlow = !isCore && p < CORE_PER_MODULE + GLOW_PER_MODULE;

      // CORE: jitter uniforme contido na célula → espinha nítida da marca.
      // GLOW: jitter gaussiano mais largo → halo verde ao redor.
      // FILL: blob central grande e suave → funde os módulos numa forma sólida.
      const jitter = isCore
        ? () => (random() - 0.5) * 0.62 * cell
        : isGlow
          ? () => gaussian(random, 0, 0.4 * cell)
          : () => (random() - 0.5) * 0.1 * cell;

      positions[index * 3] = center.x + jitter();
      positions[index * 3 + 1] = center.y + jitter();
      positions[index * 3 + 2] = gaussian(random, 0, 0.01);

      if (isCore) {
        sample.copy(coreA).lerp(coreB, random());
        sizes[index] = 2.0 + random() * 1.0;
        alphas[index] = 1;
      } else if (isGlow) {
        sample.copy(glow);
        sizes[index] = 6.5 + random() * 3.0;
        alphas[index] = 0.24;
      } else {
        // Dimensionado para cobrir a célula inteira (~cell*1.2 em pixels).
        sample.copy(glow).lerp(coreB, 0.3);
        sizes[index] = 7.0 + random() * 1.0;
        alphas[index] = 0.45;
      }
      colors[index * 3] = sample.r;
      colors[index * 3 + 1] = sample.g;
      colors[index * 3 + 2] = sample.b;

      phases[index] = random() * Math.PI * 2;
      index++;
    }
  }

  return { positions, colors, sizes, phases, alphas };
}

// ---------------------------------------------------------------------------
// Shaders
// ---------------------------------------------------------------------------

const SPIRAL_VERTEX_SHADER = /* glsl */ `
  attribute float aSize;
  uniform float uSize;
  uniform float uScale;
  varying vec3 vColor;

  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uSize * (uScale / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const SPIRAL_FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    float alpha = pow(1.0 - smoothstep(0.0, 0.5, dist), 2.2);
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

const LOGO_VERTEX_SHADER = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aAlpha;
  uniform float uTime;
  uniform float uHover;
  uniform float uSize;
  uniform float uScale;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Boost >1.0 empurra o core acima do luminanceThreshold do Bloom.
    vColor = color * (1.35 + uHover * 0.5);
    vAlpha = aAlpha;
    vec3 p = position;
    p.z += sin(uTime * 2.0 + aPhase) * (0.015 + uHover * 0.12);
    p.xy *= 1.0 + uHover * 0.10;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * uSize * (uScale / -mvPosition.z) * (1.0 + uHover * 0.6);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const LOGO_FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    float alpha = pow(1.0 - smoothstep(0.0, 0.5, dist), 2.2) * vAlpha;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// ---------------------------------------------------------------------------
// Componentes
// ---------------------------------------------------------------------------

interface SpiralDiscProps {
  pointsRef: RefObject<THREE.Points | null>;
  materialRef: RefObject<THREE.ShaderMaterial | null>;
}

function SpiralDisc({ pointsRef, materialRef }: SpiralDiscProps) {
  const buffers = useMemo(() => generateSpiralBuffers(PARTICLE_SEED), []);
  const uniforms = useMemo<Record<string, THREE.IUniform<number>>>(
    () => ({
      uSize: { value: 0.05 },
      uScale: { value: 450 },
    }),
    [],
  );

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[buffers.positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[buffers.colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[buffers.sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={SPIRAL_VERTEX_SHADER}
        fragmentShader={SPIRAL_FRAGMENT_SHADER}
        uniforms={uniforms}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface LogoParticlesProps {
  groupRef: RefObject<THREE.Group | null>;
  materialRef: RefObject<THREE.ShaderMaterial | null>;
  onHoverChange: (hovered: boolean) => void;
}

function LogoParticles({
  groupRef,
  materialRef,
  onHoverChange,
}: LogoParticlesProps) {
  const buffers = useMemo(() => generateLogoBuffers(PARTICLE_SEED + 1), []);
  const uniforms = useMemo<Record<string, THREE.IUniform<number>>>(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uSize: { value: 0.05 },
      uScale: { value: 450 },
    }),
    [],
  );
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[buffers.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[buffers.colors, 3]}
          />
          <bufferAttribute
            attach="attributes-aSize"
            args={[buffers.sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-aPhase"
            args={[buffers.phases, 1]}
          />
          <bufferAttribute
            attach="attributes-aAlpha"
            args={[buffers.alphas, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={LOGO_VERTEX_SHADER}
          fragmentShader={LOGO_FRAGMENT_SHADER}
          uniforms={uniforms}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Plano invisível só para o raycast de hover. */}
      <mesh
        onPointerOver={() => {
          setHovered(true);
          onHoverChange(true);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHoverChange(false);
        }}
      >
        <planeGeometry args={[LOGO_SIZE * 1.15, LOGO_SIZE * 1.15]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

interface MotionState {
  hovered: boolean;
  hoverBoost: number;
  dragVelocity: number;
}

function GalaxyScene({ reducedMotion }: { reducedMotion: boolean }) {
  const spiralRef = useRef<THREE.Points>(null);
  const spiralMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const logoRef = useRef<THREE.Group>(null);
  const logoMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const bloomRef = useRef<BloomEffect>(null);
  const motionRef = useRef<MotionState>({
    hovered: false,
    hoverBoost: 0,
    dragVelocity: 0,
  });
  const dragRef = useRef({ active: false, lastX: 0 });
  const gl = useThree((state) => state.gl);

  // Arrasto horizontal adiciona momentum à rotação Y da espiral.
  useEffect(() => {
    const element = gl.domElement;

    const onPointerDown = (event: PointerEvent) => {
      dragRef.current.active = true;
      dragRef.current.lastX = event.clientX;
    };
    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag.active) return;
      const deltaX = event.clientX - drag.lastX;
      drag.lastX = event.clientX;
      motionRef.current.dragVelocity = THREE.MathUtils.clamp(
        motionRef.current.dragVelocity + deltaX * 0.0006,
        -0.15,
        0.15,
      );
    };
    const onPointerUp = () => {
      dragRef.current.active = false;
    };

    element.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const motion = motionRef.current;

    // gl_PointSize é em pixels físicos → escala acompanha altura × dpr.
    const pointScale = state.size.height * state.viewport.dpr * 0.5;

    const spiralMaterial = spiralMaterialRef.current;
    if (spiralMaterial) {
      spiralMaterial.uniforms.uScale.value = pointScale;
    }

    // Com reduced-motion o Bloom fica estático: alvo do hover cai para 0
    // (shimmer, escala e brilho extras dependem de uHover).
    easing.damp(
      motion,
      "hoverBoost",
      motion.hovered && !reducedMotion ? 1 : 0,
      0.2,
      delta,
    );

    const logoMaterial = logoMaterialRef.current;
    if (logoMaterial) {
      logoMaterial.uniforms.uScale.value = pointScale;
      logoMaterial.uniforms.uTime.value += delta * (reducedMotion ? 0.15 : 1);
      logoMaterial.uniforms.uHover.value = motion.hoverBoost;
    }

    const spiral = spiralRef.current;
    if (spiral) {
      const baseSpeed = reducedMotion ? REDUCED_SPIN_SPEED : BASE_SPIN_SPEED;
      spiral.rotation.y += baseSpeed * delta + motion.dragVelocity;
    }
    motion.dragVelocity *= DRAG_FRICTION;

    // Billboard manual: a marca sempre encara a câmera e não gira com o disco.
    const logo = logoRef.current;
    if (logo) {
      logo.quaternion.copy(state.camera.quaternion);
      logo.position.y = reducedMotion
        ? 0
        : Math.sin(state.clock.elapsedTime * 1.1) * 0.06;
    }

    const bloom = bloomRef.current;
    if (bloom) {
      bloom.intensity =
        BLOOM_BASE_INTENSITY + motion.hoverBoost * BLOOM_HOVER_BONUS;
    }

    // Parallax de câmera via ponteiro; a inclinação do disco vem só daqui.
    const strength = reducedMotion ? 0.25 : 1;
    easing.damp3(
      state.camera.position,
      [
        state.pointer.x * 0.9 * strength,
        4.2 + state.pointer.y * 0.45 * strength,
        6.8,
      ],
      0.6,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <SpiralDisc pointsRef={spiralRef} materialRef={spiralMaterialRef} />
      <LogoParticles
        groupRef={logoRef}
        materialRef={logoMaterialRef}
        onHoverChange={(hovered) => {
          motionRef.current.hovered = hovered;
        }}
      />
      <EffectComposer multisampling={0}>
        <Bloom
          ref={bloomRef}
          intensity={BLOOM_BASE_INTENSITY}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.8}
        />
      </EffectComposer>
    </>
  );
}

export default function Galaxy() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      role="img"
      aria-label="Espiral de partículas orbitando a logo DEVCLUB"
      className="relative h-svh w-full cursor-grab overflow-hidden active:cursor-grabbing"
      style={{ background: BACKGROUND_GRADIENT }}
    >
      <Canvas
        camera={{ position: [0, 4.2, 6.8], fov: 56 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <GalaxyScene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
