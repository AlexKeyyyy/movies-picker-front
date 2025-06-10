import api from './client'

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
}

export const login = (data: LoginData) => api.post('/login', data)
export const register = (data: RegisterData) => api.post('/register', data)
