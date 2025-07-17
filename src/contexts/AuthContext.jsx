import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  // Mock authentication for demo purposes
  const signInWithEmail = async (email, password) => {
    setLoading(true)
    try {
      // For demo, we'll simulate a successful login
      setTimeout(() => {
        setUser({ email, id: 'demo-user-123' })
        setLoading(false)
      }, 800)
      return { data: { user: { email } }, error: null }
    } catch (error) {
      setLoading(false)
      return { data: null, error: { message: 'Authentication failed' } }
    }
  }

  const signUpWithEmail = async (email, password) => {
    setLoading(true)
    try {
      // For demo, simulate successful signup
      setTimeout(() => {
        setUser({ email, id: 'new-user-123' })
        setLoading(false)
      }, 800)
      return { data: { user: { email } }, error: null }
    } catch (error) {
      setLoading(false)
      return { data: null, error: { message: 'Registration failed' } }
    }
  }

  const signOut = async () => {
    setUser(null)
    return { error: null }
  }

  const value = {
    user,
    loading,
    authError,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}