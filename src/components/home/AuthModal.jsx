import { useState } from 'react'
import './AuthModal.css'

export default function AuthModal({ onClose, onLogin }) {
  const [tab, setTab] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Заповніть всі поля')
      return
    }
    if (password.length < 6) {
      setError('Пароль — мінімум 6 символів')
      return
    }
    if (tab === 'register' && !name.trim()) {
      setError('Введіть ім\'я')
      return
    }

    const user = { name: tab === 'register' ? name.trim() : (email.split('@')[0]), email }
    localStorage.setItem('skymall_user', JSON.stringify(user))
    onLogin(user)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-tabs">
          <button className={`modal-tab${tab === 'login' ? ' modal-tab--active' : ''}`} onClick={() => setTab('login')}>
            Увійти
          </button>
          <button className={`modal-tab${tab === 'register' ? ' modal-tab--active' : ''}`} onClick={() => setTab('register')}>
            Реєстрація
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {tab === 'register' && (
            <div className="form-group">
              <label className="form-label">Ім'я</label>
              <input
                className="form-input"
                type="text"
                placeholder="Ваше ім'я"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Пароль</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button className="form-submit" type="submit">
            {tab === 'login' ? 'Увійти' : 'Зареєструватися'}
          </button>
        </form>
      </div>
    </div>
  )
}
