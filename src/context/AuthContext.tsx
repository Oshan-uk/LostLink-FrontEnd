import {
  useEffect,
  useState,
  type ReactNode
} from 'react'

import AuthContext from './auth-context'

import {
  loginUser,
  registerUser,
  logoutUser,
  getStoredUser,
  verifyUser,
  type User,
  type LoginData,
  type RegisterData
} from '../services/auth.service'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const initializeAuth = async () => {
      const token = localStorage.getItem('lostlink_token')
      const storedUser = getStoredUser()

      if (!token || !storedUser) {
        logoutUser()

        if (isMounted) {
          setIsLoading(false)
        }

        return
      }

      try {
        const isValid = await verifyUser()

        if (!isMounted) return

        if (isValid) {
          setUser(storedUser)
        } else {
          logoutUser()
          setUser(null)
        }
      } catch {
        if (!isMounted) return

        logoutUser()
        setUser(null)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    initializeAuth()

    return () => {
      isMounted = false
    }
  }, [])

  const login = async (data: LoginData) => {
    const response = await loginUser(data)
    setUser(response.user)
  }

  const register = async (data: RegisterData) => {
    const response = await registerUser(data)
    setUser(response.user)
  }

  const logout = () => {
    logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}