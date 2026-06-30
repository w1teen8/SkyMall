import { NavLink } from 'react-router-dom'
import './TabBar.css'

const tabs = [
  {
    to: '/',
    label: 'Головна',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <polyline points="9,21 9,12 15,12 15,21" />
      </svg>
    ),
  },
  {
    to: '/navigation',
    label: 'Навігація',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3,11 22,2 13,21 11,13" />
      </svg>
    ),
  },
  {
    to: '/news',
    label: 'Новини',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
        <polyline points="17,1 17,7 23,7" />
        <line x1="9" y1="11" x2="15" y2="11" />
        <line x1="9" y1="15" x2="13" y2="15" />
      </svg>
    ),
  },
  {
    to: '/parking',
    label: 'Паркінг',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <circle cx="12" cy="14" r="2" />
        <line x1="12" y1="12" x2="12" y2="7" />
      </svg>
    ),
  },
]

export default function TabBar() {
  return (
    <nav className="tab-bar">
      {tabs.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) => `tab-item${isActive ? ' tab-item--active' : ''}`}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
