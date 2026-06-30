import { useState } from 'react'
import ParkingModal from '../components/parking/ParkingModal'
import PaymentModal from '../components/parking/PaymentModal'
import CarList from '../components/parking/CarList'
import { getParkedCars, addParkedCar, removeParkedCar, generateSpot } from '../utils/parking'
import './ParkingPage.css'

const TOTAL_SPOTS = 800

export default function ParkingPage() {
  const [showModal, setShowModal] = useState(false)
  const [cars, setCars] = useState(getParkedCars)
  const [pendingCar, setPendingCar] = useState(null) // { plate, spot }
  const [toast, setToast] = useState(null)

  const availableSpots = TOTAL_SPOTS - cars.length
  const spotsColor = availableSpots < 50 ? '#E53935' : availableSpots < 150 ? '#FF6B35' : '#1565C0'

  const stats = [
    { label: 'Вільних місць', value: availableSpots, color: spotsColor },
    { label: 'EV-станцій', value: '12', color: '#4CAF50' },
    { label: 'Рівнів', value: '6', color: '#FF6B35' },
  ]

  function handlePlateSubmit(plate) {
    const spot = generateSpot()
    setPendingCar({ plate, spot })
    setShowModal(false)
  }

  function handlePayment() {
    if (!pendingCar) return
    const updated = addParkedCar(pendingCar.plate, pendingCar.spot)
    setCars(updated)
    setToast(`Авто ${pendingCar.plate} запарковано на місці ${pendingCar.spot}`)
    setPendingCar(null)
    setTimeout(() => setToast(null), 3500)
  }

  function handleRemove(plate) {
    setCars(removeParkedCar(plate))
  }

  return (
    <div className="parking-page">
      <div className="parking-hero">
        <div className="parking-hero-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
            <circle cx="12" cy="14" r="2" />
            <line x1="12" y1="12" x2="12" y2="7" />
          </svg>
        </div>
        <h2 className="parking-hero-title">Паркінг SkyMall</h2>
        <p className="parking-hero-sub">800 місць · Рівні A–F · Зарядні EV-станції</p>

        <button className="parking-main-btn" onClick={() => setShowModal(true)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          Запаркувати машину
        </button>
      </div>

      <div className="parking-stats">
        {stats.map(stat => (
          <div key={stat.label} className="parking-stat">
            <span className="stat-value" style={{ color: stat.color }}>{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {cars.length > 0 && <CarList cars={cars} onRemove={handleRemove} />}

      {cars.length === 0 && (
        <div className="parking-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
          </svg>
          <p>Немає запаркованих авто</p>
          <span>Натисніть кнопку вище, щоб запаркуватись</span>
        </div>
      )}

      {showModal && (
        <ParkingModal
          onClose={() => setShowModal(false)}
          onSubmit={handlePlateSubmit}
        />
      )}

      {pendingCar && (
        <PaymentModal
          plate={pendingCar.plate}
          spot={pendingCar.spot}
          onPay={handlePayment}
          onClose={() => setPendingCar(null)}
        />
      )}

      {toast && (
        <div className="parking-toast">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20,6 9,17 4,12" />
          </svg>
          {toast}
        </div>
      )}
    </div>
  )
}
