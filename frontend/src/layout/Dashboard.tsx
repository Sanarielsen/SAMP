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
      <HeaderMenu />
      <main>
        <Outlet />
      </main>
    </div>
  )
}