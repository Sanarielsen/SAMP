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
  name: string | null
  role: string | null
}

interface AuthContextProps {
  children: ReactNode
}

type AuthContextType = {
  token: string | null
  name: string | null
  role: string | null
  isAdmin: boolean
  signIn: (token: string) => void
  signOut: () => void
  getUserId: () => string | null
}

const AuthContext = createContext({} as AuthContextType)

function decodeFromToken(token: string, prop: string): string | null {
  try {
    const decoded = jwtDecode<TokenPayload>(token)

    switch (prop) {
      case 'role':
        return decoded.role ?? null
      break;
      case 'name':
        return decoded.name ?? null
      break
    }
    
  } catch {
    return null
  }
}

export function AuthProvider({ children }: AuthContextProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )
  const [nameUser, setNameUser] = useState<string | null>()

  const [role, setRole] = useState<string | null>(() => {
    const storedToken = localStorage.getItem('token')
    return storedToken ? decodeFromToken(storedToken, 'role') : null
  })

  useEffect(() => {
    if (!token) {
      setRole(null)
      return
    }

    setRole(decodeFromToken(token, 'role'))
    setNameUser(decodeFromToken(token, 'name'))
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
        name: nameUser,
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