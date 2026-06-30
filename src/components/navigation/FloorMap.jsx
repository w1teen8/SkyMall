import { useState, useRef, useEffect, useCallback } from 'react'
import RouteOverlay from './RouteOverlay'
import './FloorMap.css'

const MIN_SCALE = 1
const MAX_SCALE = 4

function clamp(val, min, max) { return Math.max(min, Math.min(max, val)) }

function clampOffset(container, ox, oy, sc) {
  if (!container) return { x: ox, y: oy }
  const { width, height } = container.getBoundingClientRect()
  const maxX = (width * (sc - 1)) / 2
  const maxY = (height * (sc - 1)) / 2
  return { x: clamp(ox, -maxX, maxX), y: clamp(oy, -maxY, maxY) }
}

export default function FloorMap({ floor, stores, routePoints, fromStore, toStore, onStoreClick }) {
  const [imgError, setImgError] = useState(false)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const containerRef = useRef(null)
  const stateRef = useRef({ scale: 1, offset: { x: 0, y: 0 } })
  const dragRef = useRef(null)
  const pinchRef = useRef(null)
  const lastTapRef = useRef(0)

  stateRef.current = { scale, offset }

  // Reset zoom when floor changes
  useEffect(() => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }, [floor])

  // Non-passive touch listeners (needed for e.preventDefault)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function handleTouchStart(e) {
      if (e.touches.length === 2) {
        pinchRef.current = {
          startDist: Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          ),
          startScale: stateRef.current.scale,
        }
        dragRef.current = null
      } else if (e.touches.length === 1) {
        const { scale, offset } = stateRef.current
        dragRef.current = {
          startX: e.touches[0].clientX,
          startY: e.touches[0].clientY,
          startOX: offset.x,
          startOY: offset.y,
        }
        // Double-tap zoom
        const now = Date.now()
        if (now - lastTapRef.current < 300) {
          if (scale > 1) {
            setScale(1); setOffset({ x: 0, y: 0 })
          } else {
            setScale(2.5)
          }
          dragRef.current = null
        }
        lastTapRef.current = now
      }
    }

    function handleTouchMove(e) {
      e.preventDefault()
      if (e.touches.length === 2 && pinchRef.current) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        )
        const newScale = clamp(pinchRef.current.startScale * (dist / pinchRef.current.startDist), MIN_SCALE, MAX_SCALE)
        setScale(newScale)
        if (newScale <= 1) {
          setOffset({ x: 0, y: 0 })
        } else {
          setOffset(o => clampOffset(containerRef.current, o.x, o.y, newScale))
        }
      } else if (e.touches.length === 1 && dragRef.current) {
        const { scale } = stateRef.current
        if (scale <= 1) return
        const dx = e.touches[0].clientX - dragRef.current.startX
        const dy = e.touches[0].clientY - dragRef.current.startY
        setOffset(clampOffset(containerRef.current, dragRef.current.startOX + dx, dragRef.current.startOY + dy, scale))
      }
    }

    function handleTouchEnd(e) {
      if (e.touches.length < 2) pinchRef.current = null
      if (e.touches.length === 0) dragRef.current = null
    }

    el.addEventListener('touchstart', handleTouchStart, { passive: false })
    el.addEventListener('touchmove', handleTouchMove, { passive: false })
    el.addEventListener('touchend', handleTouchEnd)
    return () => {
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchmove', handleTouchMove)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  // Scroll wheel zoom (desktop)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    function handleWheel(e) {
      e.preventDefault()
      const { scale, offset } = stateRef.current
      const newScale = clamp(scale * (e.deltaY > 0 ? 0.85 : 1.18), MIN_SCALE, MAX_SCALE)
      setScale(newScale)
      if (newScale <= 1) setOffset({ x: 0, y: 0 })
      else setOffset(clampOffset(containerRef.current, offset.x, offset.y, newScale))
    }
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  // Mouse drag (desktop)
  const onMouseDown = useCallback((e) => {
    if (stateRef.current.scale <= 1) return
    const { offset } = stateRef.current
    const start = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y }
    function onMove(e) {
      const { scale } = stateRef.current
      setOffset(clampOffset(containerRef.current, start.ox + e.clientX - start.x, start.oy + e.clientY - start.y, scale))
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])

  function zoomIn() {
    const { scale, offset } = stateRef.current
    const newScale = clamp(scale * 1.5, MIN_SCALE, MAX_SCALE)
    setScale(newScale)
    setOffset(clampOffset(containerRef.current, offset.x, offset.y, newScale))
  }
  function zoomOut() {
    const { scale, offset } = stateRef.current
    const newScale = clamp(scale / 1.5, MIN_SCALE, MAX_SCALE)
    setScale(newScale)
    if (newScale <= 1) setOffset({ x: 0, y: 0 })
    else setOffset(clampOffset(containerRef.current, offset.x, offset.y, newScale))
  }
  function zoomReset() { setScale(1); setOffset({ x: 0, y: 0 }) }

  const visibleStores = stores.filter(s => s.floor === floor)

  return (
    <div className="floor-map-container">
      <div
        ref={containerRef}
        className="floor-map-viewport"
        onMouseDown={onMouseDown}
        style={{ cursor: scale > 1 ? 'grab' : 'default' }}
      >
        <div
          className="floor-map-wrap"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          {imgError ? (
            <div className="floor-map-placeholder">
              <div className="placeholder-grid">
                {visibleStores.map(s => (
                  <div
                    key={s.id}
                    className={`placeholder-store ${fromStore?.id === s.id ? 'from' : toStore?.id === s.id ? 'to' : ''}`}
                    onClick={() => onStoreClick(s)}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
              <p className="placeholder-hint">Додайте floor{floor}.png до папки public/</p>
            </div>
          ) : (
            <img
              src={`/floor${floor}.png`}
              alt={`Поверх ${floor}`}
              className="floor-map-img"
              onError={() => setImgError(true)}
              draggable={false}
            />
          )}

          {!imgError && (
            <>
              <RouteOverlay points={routePoints} />
              {visibleStores.map(store => {
                const isFrom = fromStore?.id === store.id
                const isTo = toStore?.id === store.id
                return (
                  <button
                    key={store.id}
                    className={`store-marker ${isFrom ? 'marker-from' : isTo ? 'marker-to' : ''}`}
                    style={{ left: `${store.x}%`, top: `${store.y}%` }}
                    onClick={() => onStoreClick(store)}
                    title={store.name}
                  >
                    <span className="marker-dot" />
                    <span className="marker-label">{store.name}</span>
                  </button>
                )
              })}
            </>
          )}
        </div>
      </div>

      <div className="zoom-controls">
        <button className="zoom-btn" onClick={zoomIn} disabled={scale >= MAX_SCALE} aria-label="Збільшити">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        {scale > 1.05 && (
          <button className="zoom-btn zoom-reset" onClick={zoomReset} aria-label="Скинути">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.51 9a9 9 0 1 1-.51 3" /><polyline points="3 3 3 9 9 9" />
            </svg>
          </button>
        )}
        <button className="zoom-btn" onClick={zoomOut} disabled={scale <= MIN_SCALE} aria-label="Зменшити">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
