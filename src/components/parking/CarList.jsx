import { useState, useEffect } from 'react'
import { formatTime } from '../../utils/parking'
import './CarList.css'

function elapsed(timestamp) {
  const diff = Math.floor((Date.now() - timestamp) / 1000)
  const h = Math.floor(diff / 3600)
  const m = Math.floor((diff % 3600) / 60)
  const s = diff % 60
  if (h > 0) return `${h} год ${String(m).padStart(2, '0')} хв`
  if (m > 0) return `${m} хв ${String(s).padStart(2, '0')} с`
  return `${s} с`
}

function CarTimer({ timestamp }) {
  const [, tick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => tick(n => n + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.floor((Date.now() - timestamp) / 1000)
  const isFree = diff < 3600
  const cost = isFree ? 'Безкоштовно' : `${Math.ceil((diff - 3600) / 3600) * 40} грн`

  return (
    <div className="car-timer">
      <span className="car-elapsed">{elapsed(timestamp)}</span>
      <span className={`car-cost ${isFree ? 'cost-free' : 'cost-paid'}`}>{cost}</span>
    </div>
  )
}

export default function CarList({ cars, onRemove }) {
  if (cars.length === 0) return null

  return (
    <div className="car-list">
      <h3 className="car-list-title">Запарковані авто</h3>
      <div className="car-list-items">
        {cars.map(car => (
          <div key={car.plate} className="car-item">
            <div className="car-plate-badge">
              <span className="car-plate-text">{car.plate}</span>
            </div>
            <div className="car-info">
              <span className="car-spot">Місце {car.spot}</span>
              <span className="car-time">з {formatTime(car.time)}</span>
              <CarTimer timestamp={car.time} />
            </div>
            <button className="car-leave" onClick={() => onRemove(car.plate)}>
              Виїхав
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
