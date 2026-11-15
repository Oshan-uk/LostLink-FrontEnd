import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import {
  loginUser,
  registerUser,
  logoutUser,
  getStoredUser,
  verifyUser,
  type User,
  type LoginData,
  type RegisterData,
} from '../services/auth.service'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('lostlink_token')
      const storedUser = getStoredUser()

      if (!token || !storedUser) {
        logoutUser()
        setIsLoading(false)
        return
      }

      const isValid = await verifyUser()

      if (isValid) {
        setUser(storedUser)
      } else {
        logoutUser()
        setUser(null)
      }

      setIsLoading(false)
    }

    initializeAuth()
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}