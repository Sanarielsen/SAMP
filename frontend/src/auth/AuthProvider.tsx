import { createContext, useContext, useState, type ReactNode } from 'react'

interface AuthContextProps {
  children: ReactNode;
}

type AuthContextType = {
  token: string | null
  signIn: (token: string) => void
  signOut: () => void
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthContextProps) {
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

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
};