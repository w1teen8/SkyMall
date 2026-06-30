import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { stores } from '../../data/stores'
import './PromoModal.css'

const SALE_IDS = [1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 19, 20, 22]
const NEW_IDS  = [10, 12, 14, 15, 20, 22, 24]
const FOOD_IDS = [26, 27, 28, 7]

const DISCOUNTS = { 1:'-30%', 2:'-40%', 3:'-25%', 4:'-35%', 5:'-20%', 6:'-30%', 10:'-50%', 11:'-40%', 12:'-45%', 13:'-30%', 14:'-35%', 15:'-40%', 16:'-25%', 19:'-40%', 20:'-50%', 22:'-20%' }

const CONFIGS = {
  sale: {
    title: 'Літній розпродаж',
    subtitle: 'Магазини-учасники акції',
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #E91E63 100%)',
    ids: SALE_IDS,
    badge: id => DISCOUNTS[id] || '-20%',
  },
  new: {
    title: 'Нові магазини',
    subtitle: 'Щойно відкрились на 2-му поверсі',
    gradient: 'linear-gradient(135deg, #1565C0 0%, #00BCD4 100%)',
    ids: NEW_IDS,
    badge: () => 'Новий',
  },
  food: {
    title: 'Ресторани SkyMall',
    subtitle: 'Фуд-корт на 3-му поверсі',
    gradient: 'linear-gradient(135deg, #7B1FA2 0%, #3F51B5 100%)',
    ids: FOOD_IDS,
    badge: () => '3-й пов.',
  },
}

export default function PromoModal({ type, onClose }) {
  const [closing, setClosing] = useState(false)
  const navigate = useNavigate()
  const cfg = CONFIGS[type]

  function dismiss() {
    setClosing(true)
    setTimeout(onClose, 280)
  }

  function handleStoreClick(store) {
    dismiss()
    setTimeout(() => {
      navigate('/navigation', { state: { toStore: store, floor: store.floor } })
    }, 300)
  }

  const list = stores.filter(s => cfg.ids.includes(s.id))

  return (
    <div className={`promo-modal-backdrop${closing ? ' pm-bd-closing' : ''}`} onClick={dismiss}>
      <div className={`promo-modal-sheet${closing ? ' pm-sheet-closing' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="pm-handle" />

        <div className="pm-header" style={{ background: cfg.gradient }}>
          <h3 className="pm-title">{cfg.title}</h3>
          <p className="pm-subtitle">{cfg.subtitle}</p>
        </div>

        <p className="pm-hint">Натисніть на магазин, щоб прокласти маршрут</p>

        <div className="pm-list">
          {list.map(store => (
            <button key={store.id} className="pm-store-row" onClick={() => handleStoreClick(store)}>
              <div className="pm-store-info">
                <span className="pm-store-name">{store.name}</span>
                <span className="pm-store-floor">{store.floor}-й поверх · {store.category}</span>
              </div>
              <span className="pm-badge">{cfg.badge(store.id)}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}
        </div>

        <button className="pm-close" onClick={dismiss}>Закрити</button>
      </div>
    </div>
  )
}
