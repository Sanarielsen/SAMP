import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/auth/AuthProvider";
import HeaderMenu from "@/components/HeaderMenu";

export default function Dashboard() {

  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/" replace />
  }

  return (
    <div>
      <header>
        <HeaderMenu />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}