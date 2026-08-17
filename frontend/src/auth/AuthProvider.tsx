import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import { jwtDecode } from 'jwt-decode'

type TokenPayload = {
  sub: string | null
  role: string | null
}

interface AuthContextProps {
  children: ReactNode
}

type AuthContextType = {
  token: string | null
  role: string | null
  isAdmin: boolean
  signIn: (token: string) => void
  signOut: () => void
  getUserId: () => string | null
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthContextProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )

  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setRole(null)
      return
    }

    const decoded = jwtDecode<TokenPayload>(token)

    setRole(decoded.role ?? null)
  }, [token])

  function signIn(token: string) {
    localStorage.setItem('token', token)
    setToken(token)
  }

  function signOut() {
    localStorage.removeItem('token')
    setToken(null)
  }

  function getUserId(): string | null {
    if (!token) return null

    const decoded = jwtDecode<TokenPayload>(token)

    return decoded.sub ?? null
  }

  const isAdmin = role === 'ADMIN'

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        isAdmin,
        signIn,
        signOut,
        getUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/* eslint-disable react-refresh/only-export-components */
export const useAuth = () => useContext(AuthContext)