// ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/auth/AuthProvider'

export function ProtectedRoute() {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}