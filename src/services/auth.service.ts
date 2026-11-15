import api from '../lib/api'

export interface User {
  id: string
  name: string
  email: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user: User
  token: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export const registerUser = async (
  data: RegisterData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    '/auth/register',
    data
  )

  localStorage.setItem('lostlink_token', response.data.token)
  localStorage.setItem('lostlink_user', JSON.stringify(response.data.user))

  return response.data
}

export const loginUser = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    '/auth/login',
    data
  )

  localStorage.setItem('lostlink_token', response.data.token)
  localStorage.setItem('lostlink_user', JSON.stringify(response.data.user))

  return response.data
}

export const verifyUser = async (): Promise<boolean> => {
  try {
    await api.get('/auth/me')
    return true
  } catch {
    return false
  }
}

export const logoutUser = (): void => {
  localStorage.removeItem('lostlink_token')
  localStorage.removeItem('lostlink_user')
}

export const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem('lostlink_user')

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser) as User
  } catch {
    localStorage.removeItem('lostlink_user')
    return null
  }
}