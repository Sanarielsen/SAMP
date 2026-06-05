import { createContext, useContext, useState, type ReactNode } from 'react'

import { jwtDecode } from 'jwt-decode'

type TokenPayload = {
  sub: string | null
  role: string | null
} | null

interface AuthContextProps {
  children: ReactNode;
}

type AuthContextType = {
  token: string | null
  role: string | null
  signIn: (token: string) => void
  signOut: () => void
  getUserId: () => string | null
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthContextProps) {
  const [role, setRole] = useState<string | null>(null)
  const [token, setToken] = useState(
    localStorage.getItem('token')
  )

  function signIn(token: string) {
    localStorage.setItem('token', token)
    setToken(token)
  }

  function signOut() {
    localStorage.removeItem('token')
    setToken(null)
  }

  function getUserId(): string | null {
    const token = localStorage.getItem('token')

    if (!token) return null

    const decoded = jwtDecode<TokenPayload>(token)

    setRole(decoded?.role ?? null)

    return decoded?.sub ?? null
  }

  return (
    <AuthContext.Provider value={{ token, role, signIn, signOut, getUserId }}>
      {children}
    </AuthContext.Provider>
  )
}

/* eslint-disable react-refresh/only-export-components */
export const useAuth = () => {
  return useContext(AuthContext)
};