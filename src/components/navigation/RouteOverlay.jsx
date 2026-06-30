import { useEffect, useRef } from 'react'
import './RouteOverlay.css'

export default function RouteOverlay({ points }) {
  const pathRef = useRef(null)

  const pointsStr = points.map(p => `${p.x},${p.y}`).join(' ')

  useEffect(() => {
    if (!pathRef.current || points.length < 2) return
    const length = pathRef.current.getTotalLength()
    pathRef.current.style.strokeDasharray = length
    pathRef.current.style.strokeDashoffset = length
    void pathRef.current.getBoundingClientRect()
    pathRef.current.style.transition = 'stroke-dashoffset 0.8s ease'
    pathRef.current.style.strokeDashoffset = '0'
  }, [pointsStr])

  if (points.length < 2) return null

  return (
    <svg
      className="route-overlay"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#1565C0" />
        </marker>
      </defs>
      <polyline
        ref={pathRef}
        points={pointsStr}
        fill="none"
        stroke="#1565C0"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2.5 1"
        opacity="0.9"
      />
      {points.map((p, i) => {
        if (i === 0 || i === points.length - 1) return null
        return <circle key={i} cx={p.x} cy={p.y} r="0.5" fill="#42A5F5" opacity="0.6" />
      })}
      <circle cx={points[0].x} cy={points[0].y} r="1.5" fill="#4CAF50" stroke="#fff" strokeWidth="0.4" />
      <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="1.5" fill="#F44336" stroke="#fff" strokeWidth="0.4" />
    </svg>
  )
}
