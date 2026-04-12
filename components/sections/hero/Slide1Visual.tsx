'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* ─── Service nodes data ──────────────────────── */
const NODES = [
  { id: 'web',    label: 'Web Apps',       color: '#C0392B', angle: -30,  r: 130, icon: '⬡', delay: 0 },
  { id: 'mobile', label: 'Mobile Apps',    color: '#1B998B', angle: 45,   r: 150, icon: '◈', delay: 0.4 },
  { id: 'ai',     label: 'AI Agents',      color: '#C9A84C', angle: 125,  r: 120, icon: '◇', delay: 0.8 },
  { id: 'saas',   label: 'SaaS Products',  color: '#C0392B', angle: 195,  r: 145, icon: '◉', delay: 1.2 },
  { id: 'pwa',    label: 'PWA',            color: '#1B998B', angle: 270,  r: 115, icon: '▣', delay: 1.6 },
  { id: 'consult',label: 'Consultation',   color: '#C9A84C', angle: 330,  r: 140, icon: '✦', delay: 2.0 },
]

/* ─── SVG connection lines ────────────────────── */
const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  [0, 3], [1, 4], [2, 5],
]

function degToRad(d: number) { return d * (Math.PI / 180) }

function nodePos(angle: number, r: number, cx = 200, cy = 200) {
  return {
    x: cx + r * Math.cos(degToRad(angle)),
    y: cy + r * Math.sin(degToRad(angle)),
  }
}

/* ─── Animated connection line ────────────────── */
function PulseLine({ x1, y1, x2, y2, color, delay }: {
  x1: number; y1: number; x2: number; y2: number
  color: string; delay: number
}) {
  const len = Math.hypot(x2 - x1, y2 - y1)

  return (
    <g>
      {/* Base dim line */}
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth="0.5" opacity="0.08" />

      {/* Animated pulse dot travelling along line */}
      <circle r="2" fill={color} opacity="0.7">
        <animateMotion dur={`${2.5 + delay * 0.4}s`} repeatCount="indefinite" begin={`${delay * 0.3}s`}>
          <mpath>
            <path d={`M${x1},${y1} L${x2},${y2}`} />
          </mpath>
        </animateMotion>
        <animate attributeName="opacity" values="0;0.8;0" dur={`${2.5 + delay * 0.4}s`} repeatCount="indefinite" begin={`${delay * 0.3}s`} />
      </circle>

      {/* Reverse pulse */}
      <circle r="1.5" fill={color} opacity="0.5">
        <animateMotion dur={`${3 + delay * 0.3}s`} repeatCount="indefinite" begin={`${delay * 0.5 + 1.2}s`} keyPoints="1;0" keyTimes="0;1" calcMode="linear">
          <mpath>
            <path d={`M${x1},${y1} L${x2},${y2}`} />
          </mpath>
        </animateMotion>
        <animate attributeName="opacity" values="0;0.6;0" dur={`${3 + delay * 0.3}s`} repeatCount="indefinite" begin={`${delay * 0.5 + 1.2}s`} />
      </circle>
    </g>
  )
}

/* ─── Floating node ───────────────────────────── */
function ServiceNode({ node, index, isActive }: {
  node: typeof NODES[0]; index: number; isActive: boolean
}) {
  const pos = nodePos(node.angle, node.r)
  const floatY = Math.sin(index * 1.3) * 8

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: node.delay * 0.3, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
    >
      {/* Float animation wrapper via CSS */}
      <g style={{ animation: `float-node-${index} ${3.5 + index * 0.4}s ease-in-out infinite`, animationDelay: `${index * 0.6}s` }}>
        {/* Outer glow ring */}
        <circle cx={pos.x} cy={pos.y} r={isActive ? 28 : 22}
          fill="none" stroke={node.color} strokeWidth="1"
          opacity={isActive ? 0.4 : 0.15}
          style={{ transition: 'all 0.4s ease' }}
        />
        {/* Second ring pulse */}
        <circle cx={pos.x} cy={pos.y} r="18" fill={node.color} opacity={isActive ? 0.12 : 0.06}
          style={{ transition: 'all 0.4s ease' }}>
          <animate attributeName="r" values="18;24;18" dur="3s" repeatCount="indefinite"
            begin={`${index * 0.4}s`} />
          <animate attributeName="opacity" values={isActive ? "0.12;0.04;0.12" : "0.06;0.02;0.06"}
            dur="3s" repeatCount="indefinite" begin={`${index * 0.4}s`} />
        </circle>
        {/* Core circle */}
        <circle cx={pos.x} cy={pos.y} r="14"
          fill={node.color} opacity={isActive ? 0.25 : 0.1}
          style={{ transition: 'all 0.4s ease' }} />
        {/* Icon */}
        <text x={pos.x} y={pos.y + 1}
          textAnchor="middle" dominantBaseline="central"
          fontSize="10" fill={node.color} opacity={isActive ? 1 : 0.7}
          style={{ fontFamily: 'monospace', transition: 'all 0.4s ease' }}>
          {node.icon}
        </text>
        {/* Label */}
        <text x={pos.x} y={pos.y + 26}
          textAnchor="middle" dominantBaseline="central"
          fontSize="8.5" fill={node.color} opacity={isActive ? 0.8 : 0.4}
          style={{ fontFamily: 'sans-serif', fontWeight: 500, transition: 'all 0.4s ease' }}>
          {node.label}
        </text>
      </g>
    </motion.g>
  )
}

/* ─── Central hub ─────────────────────────────── */
function CentralHub({ isVisible }: { isVisible: boolean }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ transformOrigin: '200px 200px' }}
    >
      {/* Outer rotating ring */}
      <circle cx="200" cy="200" r="38" fill="none" stroke="#C0392B" strokeWidth="0.5"
        strokeDasharray="8 4" opacity="0.3">
        <animateTransform attributeName="transform" type="rotate"
          from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite" />
      </circle>
      {/* Counter-rotating ring */}
      <circle cx="200" cy="200" r="32" fill="none" stroke="#1B998B" strokeWidth="0.5"
        strokeDasharray="5 8" opacity="0.25">
        <animateTransform attributeName="transform" type="rotate"
          from="0 200 200" to="-360 200 200" dur="15s" repeatCount="indefinite" />
      </circle>
      {/* Core */}
      <circle cx="200" cy="200" r="22" fill="#0A0A0F" stroke="#C0392B" strokeWidth="1" opacity="0.9" />
      <circle cx="200" cy="200" r="18" fill="#C0392B" opacity="0.12">
        <animate attributeName="r" values="18;24;18" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.12;0.04;0.12" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <text x="200" y="198" textAnchor="middle" dominantBaseline="central"
        fontSize="10" fill="#F0EEF8" opacity="0.9"
        style={{ fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: '0.05em' }}>
        Z3
      </text>
      <text x="200" y="210" textAnchor="middle" dominantBaseline="central"
        fontSize="6.5" fill="#C0392B" opacity="0.8"
        style={{ fontFamily: 'sans-serif', letterSpacing: '0.12em' }}>
        YMO
      </text>
    </motion.g>
  )
}

/* ─── Main Component ──────────────────────────── */
export default function Slide1Visual({ isActive }: { isActive: boolean }) {
  const nodePositions = NODES.map((n) => nodePos(n.angle, n.r))

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Float animation keyframes */}
      <style>{`
        ${NODES.map((_, i) => `
          @keyframes float-node-${i} {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(${-6 - i * 1.5}px); }
          }
        `).join('')}
        @media (prefers-reduced-motion: reduce) {
          ${NODES.map((_, i) => `@keyframes float-node-${i} { 0%, 100% { transform: none; } }`).join('')}
        }
      `}</style>

      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-105"
        style={{ overflow: 'visible' }}
      >
        {/* Background subtle grid */}
        <defs>
          <pattern id="grid-s1" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
          </pattern>
          <radialGradient id="vignette-s1" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        <rect width="400" height="400" fill="url(#grid-s1)" className="text-void dark:text-whisper" />

        {/* Connection lines */}
        {CONNECTIONS.map(([a, b], i) => {
          const p1 = nodePositions[a]
          const p2 = nodePositions[b]
          return (
            <PulseLine key={i}
              x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              color={NODES[a].color} delay={i * 0.3}
            />
          )
        })}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <ServiceNode key={node.id} node={node} index={i} isActive={isActive} />
        ))}

        {/* Central hub */}
        <CentralHub isVisible={isActive} />
      </svg>

      {/* Corner label */}
      <div className="absolute bottom-2 right-2 text-[10px] tracking-[0.15em] uppercase text-void/20 dark:text-whisper/20 font-medium">
        Our ecosystem
      </div>
    </div>
  )
}
