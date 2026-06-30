import { useState } from 'react'
import './PaymentModal.css'

const TARIFF = [
  { label: 'Перша година', price: 'Безкоштовно' },
  { label: 'Кожна наступна', price: '40 грн' },
  { label: 'Максимум на добу', price: '200 грн' },
]

function CardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  )
}

function CashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg className="pay-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M21 12a9 9 0 1 1-6.22-8.56" />
    </svg>
  )
}

export default function PaymentModal({ plate, spot, onPay, onClose }) {
  const [method, setMethod] = useState('card')
  const [cardNum, setCardNum] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [paying, setPaying] = useState(false)
  const [success, setSuccess] = useState(false)
  const [closing, setClosing] = useState(false)

  function dismiss() {
    setClosing(true)
    setTimeout(onClose, 280)
  }

  function formatCard(val) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
  }
  function formatExpiry(val) {
    const v = val.replace(/\D/g, '').slice(0, 4)
    return v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v
  }

  function handlePay(e) {
    e?.preventDefault()
    setPaying(true)
    setTimeout(() => {
      setSuccess(true)
      setTimeout(onPay, 900)
    }, 1300)
  }

  if (success) {
    return (
      <div className="payment-backdrop">
        <div className="payment-sheet payment-sheet--success">
          <div className="payment-handle" />
          <div className="success-circle">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="payment-title">Оплата успішна!</h3>
          <p className="payment-sub">Авто {plate} — місце {spot}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`payment-backdrop${closing ? ' backdrop-closing' : ''}`} onClick={dismiss}>
      <div className={`payment-sheet${closing ? ' sheet-closing' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="payment-handle" />

        <div className="payment-spot-badge">
          <span className="spot-letter">{spot[0]}</span>
          <span className="spot-num">{spot.slice(1)}</span>
        </div>

        <h3 className="payment-title">Місце {spot}</h3>
        <p className="payment-plate-tag">{plate}</p>

        <div className="payment-tariff">
          {TARIFF.map(t => (
            <div key={t.label} className="tariff-row">
              <span className="tariff-label">{t.label}</span>
              <span className="tariff-price">{t.price}</span>
            </div>
          ))}
        </div>

        <div className="payment-methods">
          <button
            className={`method-tab ${method === 'card' ? 'active' : ''}`}
            onClick={() => setMethod('card')}
          >
            <CardIcon /> Картка
          </button>
          <button
            className={`method-tab ${method === 'cash' ? 'active' : ''}`}
            onClick={() => setMethod('cash')}
          >
            <CashIcon /> Готівка
          </button>
        </div>

        {method === 'card' ? (
          <form className="card-form" onSubmit={handlePay}>
            <input
              className="card-input"
              type="text"
              placeholder="Номер картки"
              value={cardNum}
              onChange={e => setCardNum(formatCard(e.target.value))}
              inputMode="numeric"
              autoComplete="cc-number"
            />
            <div className="card-row">
              <input
                className="card-input"
                type="text"
                placeholder="ММ/РР"
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                inputMode="numeric"
                autoComplete="cc-exp"
              />
              <input
                className="card-input"
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                inputMode="numeric"
                autoComplete="cc-csc"
              />
            </div>
            <button type="submit" className="pay-btn" disabled={paying}>
              {paying ? <><SpinnerIcon /> Обробка...</> : 'Оплатити · 0 грн'}
            </button>
          </form>
        ) : (
          <div className="cash-block">
            <p className="cash-note">Оплата при виїзді на касі паркінгу (рівень A).</p>
            <p className="cash-note">Перша година — безкоштовно.</p>
            <button className="pay-btn" onClick={handlePay} disabled={paying}>
              {paying ? <><SpinnerIcon /> Обробка...</> : 'Підтвердити паркування'}
            </button>
          </div>
        )}

        <button className="payment-cancel" onClick={dismiss}>Скасувати</button>
      </div>
    </div>
  )
}
