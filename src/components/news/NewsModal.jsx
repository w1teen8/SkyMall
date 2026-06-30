import { useState, useEffect } from 'react'
import './NewsModal.css'

function formatDate(date) {
  return new Date(date).toLocaleDateString('uk-UA', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function NewsModal({ item, onClose }) {
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function dismiss() {
    setClosing(true)
    setTimeout(onClose, 300)
  }

  // Split body into paragraphs
  const paragraphs = item.body.split('\n').filter(p => p.trim())

  return (
    <div className={`news-modal-overlay${closing ? ' nm-closing' : ''}`}>
      <div className={`news-modal${closing ? ' nm-sheet-closing' : ''}`}>

        <div className="nm-header">
          <button className="nm-back" onClick={dismiss} aria-label="Назад">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Назад
          </button>
          <span className="nm-header-label">Новини</span>
          <div style={{ width: 72 }} />
        </div>

        <div className="nm-scroll">
          <div className="nm-img-wrap">
            <img src={item.imageUrl} alt={item.title} className="nm-img" />
            <span className="nm-category">{item.category}</span>
          </div>

          <div className="nm-content">
            <p className="nm-date">{formatDate(item.date)}</p>
            <h2 className="nm-title">{item.title}</h2>
            <div className="nm-body">
              {paragraphs.map((p, i) => (
                <p key={i} className="nm-paragraph">{p}</p>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
