import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import FloorMap from '../components/navigation/FloorMap'
import StoreSearch from '../components/navigation/StoreSearch'
import { stores } from '../data/stores'
import { graphNodes } from '../data/graphNodes'
import { dijkstra, getFloorsInPath } from '../utils/dijkstra'
import './NavigationPage.css'

export default function NavigationPage() {
  const location = useLocation()
  const initFloor = location.state?.floor || 1
  const initTo = location.state?.toStore || null

  const [floor, setFloor] = useState(initFloor)
  const [fromStore, setFromStore] = useState(null)
  const [toStore, setToStore] = useState(initTo)
  const [routePath, setRoutePath] = useState([])
  const [crossFloorInfo, setCrossFloorInfo] = useState(null)

  const floorStores = useMemo(() => stores.filter(s => s.floor === floor), [floor])

  function buildRoute() {
    if (!fromStore || !toStore) return
    const path = dijkstra(fromStore.nodeId, toStore.nodeId)
    setRoutePath(path)
    const floors = getFloorsInPath(path)
    setCrossFloorInfo(floors.length > 1 ? floors : null)
    setFloor(fromStore.floor)
  }

  function handleStoreClick(store) {
    if (!toStore) {
      setToStore(store)
      setFloor(store.floor)
    } else if (!fromStore && store.id !== toStore.id) {
      setFromStore(store)
    }
  }

  function clearRoute() {
    setFromStore(null)
    setToStore(null)
    setRoutePath([])
    setCrossFloorInfo(null)
  }

  const routePoints = useMemo(() => {
    if (routePath.length < 2) return []
    const nodeMap = {}
    for (const n of graphNodes) nodeMap[n.id] = n
    const floorPath = routePath.filter(id => nodeMap[id]?.floor === floor)
    return floorPath.map(id => ({ x: nodeMap[id].x, y: nodeMap[id].y }))
  }, [routePath, floor])

  const crossFloorSteps = useMemo(() => {
    if (!crossFloorInfo || !fromStore || !toStore) return []
    return crossFloorInfo.map((f, i) => ({
      floor: f,
      action: i === 0
        ? `Пройдіть на ${crossFloorInfo[i + 1] > f ? 'ескалатор вгору' : 'ескалатор вниз'}`
        : i === crossFloorInfo.length - 1
          ? `Знайдіть ${toStore.name}`
          : `Поверх ${f}: продовжуйте до ескалатора`,
    }))
  }, [crossFloorInfo, fromStore, toStore])

  return (
    <div className="nav-page">
      <div className="nav-search-box">
        <StoreSearch
          label="Звідки"
          value={fromStore}
          stores={stores}
          onSelect={s => { setFromStore(s); setFloor(s.floor); setRoutePath([]); setCrossFloorInfo(null) }}
          onClear={() => { setFromStore(null); setRoutePath([]); setCrossFloorInfo(null) }}
        />
        <div className="nav-search-divider">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19,12 12,19 5,12" />
          </svg>
        </div>
        <StoreSearch
          label="Куди"
          value={toStore}
          stores={stores}
          onSelect={s => { setToStore(s); setRoutePath([]); setCrossFloorInfo(null) }}
          onClear={() => { setToStore(null); setRoutePath([]); setCrossFloorInfo(null) }}
        />

        <div className="nav-actions">
          <button className="btn-route" onClick={buildRoute} disabled={!fromStore || !toStore}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polygon points="3,11 22,2 13,21 11,13" />
            </svg>
            Прокласти маршрут
          </button>
          {(fromStore || toStore) && (
            <button className="btn-clear" onClick={clearRoute}>Очистити</button>
          )}
        </div>
      </div>

      <div className="floor-selector">
        <span className="floor-selector-label">Поверх</span>
        <div className="floor-selector-track">
          <div
            className="floor-selector-pill"
            style={{ transform: `translateX(${(floor - 1) * 100}%)` }}
          />
          {[1, 2, 3, 4].map(f => (
            <button
              key={f}
              className={`floor-btn ${floor === f ? 'floor-btn--active' : ''}`}
              onClick={() => setFloor(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {crossFloorInfo && (
        <div className="cross-floor-info">
          <div className="cross-floor-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Маршрут через кілька поверхів
          </div>
          <div className="cross-floor-steps">
            {crossFloorInfo.map((f, i) => (
              <div key={f} className="cf-step">
                <div className={`cf-badge ${f === floor ? 'cf-badge--active' : ''}`}>{f}</div>
                <span className="cf-text" onClick={() => setFloor(f)}>
                  Поверх {f} {f === fromStore?.floor ? `→ від ${fromStore.name}` : f === toStore?.floor ? `→ до ${toStore.name}` : '→ ескалатор'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="nav-map-wrap">
        <FloorMap
          floor={floor}
          stores={stores}
          routePoints={routePoints}
          fromStore={fromStore}
          toStore={toStore}
          onStoreClick={handleStoreClick}
        />
      </div>

      {routePath.length > 0 && !crossFloorInfo && (
        <div className="route-summary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20,6 9,17 4,12" />
          </svg>
          Маршрут побудовано: {fromStore?.name} → {toStore?.name}
        </div>
      )}

      <div className="store-list-section">
        <p className="store-list-title">Магазини на {floor}-му поверсі</p>
        <div className="store-chips">
          {floorStores.map(s => (
            <button
              key={s.id}
              className={`store-chip ${fromStore?.id === s.id ? 'chip-from' : toStore?.id === s.id ? 'chip-to' : ''}`}
              onClick={() => handleStoreClick(s)}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
