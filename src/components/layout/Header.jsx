import './Header.css'

export default function Header({ user, onProfileClick }) {
  return (
    <header className="header">
      <div className="header-logo">
        <span className="header-logo-sky">Sky</span>
        <span className="header-logo-mall">Mall</span>
      </div>
      <button className="header-profile" onClick={onProfileClick} aria-label="Профіль">
        {user ? (
          <div className="header-avatar">
            {user.avatar
              ? <img src={user.avatar} alt="" className="header-avatar-img" />
              : (user.name ? user.name[0].toUpperCase() : '?')
            }
          </div>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        )}
      </button>
    </header>
  )
}
