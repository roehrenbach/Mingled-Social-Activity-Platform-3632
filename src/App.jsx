import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Header from './components/layout/Header'
import Navigation from './components/navigation/Navigation'
import AuthForm from './components/auth/AuthForm'
import ProfileSetup from './components/profile/ProfileSetup'
import ActivityFeed from './components/activities/ActivityFeed'
import HostDashboard from './components/host/HostDashboard'
import AttendanceTracker from './components/attendance/AttendanceTracker'
import UserProfile from './components/profile/UserProfile'
import './App.css'

const AppContent = () => {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('discover')
  const [hasProfile, setHasProfile] = useState(false)

  useEffect(() => {
    // Check if user has completed profile setup
    if (user) {
      // In a real app, you'd check this from your database
      setHasProfile(true)
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen bg-mingled-gradient flex items-center justify-center">
        <div className="text-white font-questrial text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  if (!hasProfile) {
    return <ProfileSetup onComplete={() => setHasProfile(true)} />
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'discover':
        return <ActivityFeed />
      case 'host':
        return <HostDashboard />
      case 'attendance':
        return <AttendanceTracker />
      case 'profile':
        return <UserProfile />
      default:
        return <ActivityFeed />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App