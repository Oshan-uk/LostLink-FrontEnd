import api from "../lib/api"

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
    "/auth/register",
    data
  )

  localStorage.setItem("lostlink_token", response.data.token)

  return response.data
}

export const loginUser = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    data
  )

  localStorage.setItem("lostlink_token", response.data.token)

  return response.data
}

export const logoutUser = (): void => {
  localStorage.removeItem("lostlink_token")
}