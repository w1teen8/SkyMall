import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/layout/Header'
import TabBar from './components/layout/TabBar'
import AuthModal from './components/home/AuthModal'
import ProfileModal from './components/home/ProfileModal'
import HomePage from './pages/HomePage'
import NavigationPage from './pages/NavigationPage'
import NewsPage from './pages/NewsPage'
import ParkingPage from './pages/ParkingPage'
import './App.css'

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('skymall_user')) } catch { return null }
  })
  const [showAuth, setShowAuth] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  function handleProfileClick() {
    if (user) setShowProfile(true)
    else setShowAuth(true)
  }

  return (
    <div className="app-shell">
      <Header user={user} onProfileClick={handleProfileClick} />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/parking" element={<ParkingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <TabBar />

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={u => { setUser(u); setShowAuth(false) }}
        />
      )}

      {showProfile && user && (
        <ProfileModal
          user={user}
          onClose={() => setShowProfile(false)}
          onUpdate={setUser}
          onLogout={() => setUser(null)}
        />
      )}
    </div>
  )
}
