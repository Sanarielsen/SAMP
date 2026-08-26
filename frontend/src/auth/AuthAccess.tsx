import { Navigate, Outlet, useLocation } from 'react-router'
import { useEffect, useState } from 'react'

import { useAuth } from '@/auth/AuthProvider'

type RequireRoleProps = {
  allowedRoles?: string[]
}

export function RequireAuth() {
  const { token } = useAuth()
  const location = useLocation()

  if (!token) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

export function RequireRole({ allowedRoles = [] }: RequireRoleProps) {
  const { token, role } = useAuth()
  const location = useLocation()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (token) {
      setIsChecking(false)
    }
  }, [token, role])

  if (!token) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />
  }

  if (isChecking) {
    return null
  }

  if (!role || !allowedRoles.includes(role)) {
    return (
      <Navigate
        to="/inicio"
        replace
        state={{
          permissionDenied: true,
          requestedPath: location.pathname,
          userRole: role,
          allowedRoles,
        }}
      />
    )
  }

  return <Outlet />
}
