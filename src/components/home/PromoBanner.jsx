import { useState, useEffect } from 'react'
import PromoModal from './PromoModal'
import './PromoBanner.css'

const slides = [
  {
    title: 'Літній розпродаж',
    subtitle: 'Знижки до 50% у понад 30 магазинах',
    badge: 'до -50%',
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #E91E63 100%)',
    modalType: 'sale',
  },
  {
    title: 'Нові магазини',
    subtitle: 'Відкриття нових брендів на 2-му поверсі',
    badge: 'Новинка',
    gradient: 'linear-gradient(135deg, #1565C0 0%, #00BCD4 100%)',
    modalType: 'new',
  },
  {
    title: 'Ресторани SkyMall',
    subtitle: 'Фуд-корт відкритий до 23:00 щодня',
    badge: '3-й поверх',
    gradient: 'linear-gradient(135deg, #7B1FA2 0%, #3F51B5 100%)',
    modalType: 'food',
  },
]

export default function PromoBanner() {
  const [current, setCurrent] = useState(0)
  const [openModal, setOpenModal] = useState(null)

  useEffect(() => {
    if (openModal) return
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4000)
    return () => clearInterval(timer)
  }, [openModal])

  const slide = slides[current]

  return (
    <>
      <button
        className="promo-banner"
        style={{ background: slide.gradient }}
        onClick={() => setOpenModal(slide.modalType)}
        aria-label={slide.title}
      >
        <div className="promo-content">
          <span className="promo-badge">{slide.badge}</span>
          <h2 className="promo-title">{slide.title}</h2>
          <p className="promo-subtitle">{slide.subtitle}</p>
        </div>
        <div className="promo-tap-hint">Натисніть для деталей →</div>
        <div className="promo-dots" onClick={e => e.stopPropagation()}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`promo-dot${i === current ? ' promo-dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
      </button>

      {openModal && (
        <PromoModal type={openModal} onClose={() => setOpenModal(null)} />
      )}
    </>
  )
}
