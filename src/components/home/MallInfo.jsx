import { useNavigate } from 'react-router-dom'
import './MallInfo.css'

const infoCards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
      </svg>
    ),
    title: 'Години роботи',
    lines: ['Пн – Нд: 10:00 – 22:00', 'Ресторани: до 23:00'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Адреса',
    lines: ['м. Київ', 'просп. Степана Бандери, 6'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 3.18 2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    title: 'Контакти',
    lines: ['+38 (044) 333-55-77', 'info@skymall.com.ua'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <circle cx="12" cy="14" r="2" />
      </svg>
    ),
    title: 'Паркінг',
    lines: ['800 паркомісць', 'Зарядні станції для EV'],
  },
]

const FLOORS = [
  { floor: 1, desc: 'Спорт, взуття, авто' },
  { floor: 2, desc: 'Одяг, електроніка, супермаркет' },
  { floor: 3, desc: 'Ресторани та фуд-корт' },
  { floor: 4, desc: 'Розваги та дитячий центр' },
]

export default function MallInfo() {
  const navigate = useNavigate()

  return (
    <section className="mall-info">
      <h3 className="mall-info-title">Інформація</h3>
      <div className="mall-info-grid">
        {infoCards.map((card, i) => (
          <div key={i} className="info-card">
            <div className="info-card-icon">{card.icon}</div>
            <div>
              <p className="info-card-title">{card.title}</p>
              {card.lines.map((line, j) => (
                <p key={j} className="info-card-line">{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mall-floors">
        <h3 className="mall-info-title">Поверхи</h3>
        {FLOORS.map(({ floor, desc }) => (
          <button
            key={floor}
            className="floor-row floor-row--link"
            onClick={() => navigate('/navigation', { state: { floor } })}
          >
            <div className="floor-badge">{floor}</div>
            <span className="floor-desc">{desc}</span>
            <svg className="floor-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </div>
    </section>
  )
}
