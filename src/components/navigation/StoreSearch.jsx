import { useState, useRef, useEffect } from 'react'
import './StoreSearch.css'

export default function StoreSearch({ label, value, stores, onSelect, onClear }) {
  const [query, setQuery] = useState(value ? value.name : '')
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const dropRef = useRef(null)

  const filtered = query.length > 0
    ? stores.filter(s => s.name.toLowerCase().includes(query.toLowerCase()))
    : stores.slice(0, 8)

  useEffect(() => {
    if (value) setQuery(value.name)
  }, [value])

  function handleSelect(store) {
    setQuery(store.name)
    setOpen(false)
    onSelect(store)
  }

  function handleClear() {
    setQuery('')
    setOpen(false)
    onClear()
    inputRef.current?.focus()
  }

  useEffect(() => {
    function handler(e) {
      if (!dropRef.current?.contains(e.target) && e.target !== inputRef.current) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="store-search">
      <div className="search-input-wrap">
        <span className="search-label">{label}</span>
        <div className="search-field">
          <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="Назва магазину..."
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {value && (
            <button className="search-clear" onClick={handleClear} aria-label="Очистити">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {open && filtered.length > 0 && (
        <ul className="search-dropdown" ref={dropRef}>
          {filtered.map(store => (
            <li key={store.id} className="search-option" onMouseDown={() => handleSelect(store)}>
              <span className="option-name">{store.name}</span>
              <span className="option-cat">{store.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
