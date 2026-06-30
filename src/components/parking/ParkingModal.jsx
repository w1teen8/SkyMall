import { useState } from 'react'
import './ParkingModal.css'

export default function ParkingModal({ onClose, onSubmit }) {
  const [plate, setPlate] = useState('')
  const [error, setError] = useState('')
  const [closing, setClosing] = useState(false)

  function dismiss() {
    setClosing(true)
    setTimeout(onClose, 280)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const value = plate.trim().toUpperCase()
    if (!value) { setError('Введіть номер автомобіля'); return }
    if (value.length < 4) { setError('Мінімум 4 символи'); return }
    onSubmit(value)
  }

  function handleChange(e) {
    setPlate(e.target.value.toUpperCase())
    setError('')
  }

  return (
    <div className={`parking-backdrop${closing ? ' backdrop-closing' : ''}`} onClick={dismiss}>
      <div className={`parking-sheet${closing ? ' sheet-closing' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="parking-sheet-handle" />

        <div className="parking-sheet-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
            <circle cx="12" cy="14" r="2" />
          </svg>
        </div>

        <h3 className="parking-sheet-title">Запаркувати авто</h3>
        <p className="parking-sheet-sub">Введіть номерний знак вашого автомобіля</p>

        <form onSubmit={handleSubmit} className="parking-form">
          <input
            className={`plate-input${error ? ' plate-input--error' : ''}`}
            type="text"
            value={plate}
            onChange={handleChange}
            placeholder="АА1234ВВ"
            maxLength={10}
            autoFocus
            autoComplete="off"
          />
          {error && <p className="parking-error">{error}</p>}
          <button type="submit" className="parking-submit">
            Підтвердити
          </button>
          <button type="button" className="parking-cancel" onClick={dismiss}>
            Скасувати
          </button>
        </form>
      </div>
    </div>
  )
}
