import { useState, useRef } from 'react'
import './ProfileModal.css'

export default function ProfileModal({ user, onClose, onUpdate, onLogout }) {
  const [closing, setClosing] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [nameVal, setNameVal] = useState(user.name || '')
  const fileRef = useRef(null)

  function dismiss() {
    setClosing(true)
    setTimeout(onClose, 280)
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const updated = { ...user, avatar: ev.target.result }
      localStorage.setItem('skymall_user', JSON.stringify(updated))
      onUpdate(updated)
    }
    reader.readAsDataURL(file)
  }

  function removeAvatar() {
    const updated = { ...user, avatar: null }
    localStorage.setItem('skymall_user', JSON.stringify(updated))
    onUpdate(updated)
  }

  function saveName() {
    const trimmed = nameVal.trim()
    if (!trimmed) return
    const updated = { ...user, name: trimmed }
    localStorage.setItem('skymall_user', JSON.stringify(updated))
    onUpdate(updated)
    setEditingName(false)
  }

  function handleLogout() {
    localStorage.removeItem('skymall_user')
    onLogout()
    setClosing(true)
    setTimeout(onClose, 280)
  }

  return (
    <div className={`profile-backdrop${closing ? ' profile-bd-closing' : ''}`} onClick={dismiss}>
      <div className={`profile-sheet${closing ? ' profile-sheet-closing' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="profile-handle" />

        {/* Avatar */}
        <div className="profile-avatar-area">
          <button className="profile-avatar-wrap" onClick={() => fileRef.current?.click()} aria-label="Змінити фото">
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" className="profile-avatar-img" />
            ) : (
              <div className="profile-avatar-letter">
                {user.name ? user.name[0].toUpperCase() : '?'}
              </div>
            )}
            <div className="profile-avatar-edit">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </div>
          </button>
          {user.avatar && (
            <button className="profile-avatar-remove" onClick={removeAvatar} title="Видалити фото">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />

        {/* Name */}
        {editingName ? (
          <div className="profile-name-edit">
            <input
              className="profile-name-input"
              value={nameVal}
              onChange={e => setNameVal(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') saveName() }}
              autoFocus
              maxLength={30}
            />
            <div className="profile-name-btns">
              <button className="profile-name-save" onClick={saveName}>Зберегти</button>
              <button className="profile-name-cancel-edit" onClick={() => { setEditingName(false); setNameVal(user.name || '') }}>Скасувати</button>
            </div>
          </div>
        ) : (
          <button className="profile-name-row" onClick={() => setEditingName(true)}>
            <h3 className="profile-name">{user.name}</h3>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/>
            </svg>
          </button>
        )}

        <p className="profile-email">{user.email}</p>
        <p className="profile-hint">Натисніть на фото або ім'я, щоб змінити</p>

        <div className="profile-actions">
          <button className="profile-logout" onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Вийти з акаунту
          </button>
        </div>

        <button className="profile-cancel" onClick={dismiss}>Закрити</button>
      </div>
    </div>
  )
}
