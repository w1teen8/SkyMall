import PromoBanner from '../components/home/PromoBanner'
import MallInfo from '../components/home/MallInfo'
import './HomePage.css'

export default function HomePage({ user }) {
  return (
    <>
      <PromoBanner />
      {user && (
        <div style={{ padding: '12px 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Вітаємо,</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>{user.name}!</span>
        </div>
      )}
      <MallInfo />
      <div className="dev-credit">
        <div className="dev-credit-inner">
          <div className="dev-credit-badge">MVP</div>
          <div className="dev-credit-text">
            <span className="dev-credit-label">Розробник</span>
            <span className="dev-credit-name">Даніїл Заболотний</span>
          </div>
          <div className="dev-credit-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
