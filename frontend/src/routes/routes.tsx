import { Routes, Route } from "react-router";

import Dashboard from "@/layout/Dashboard";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPassword";
import LoginPage from "@/features/auth/pages/Login";

export default function Router() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />

      <Route element={<Dashboard />}>
        <Route path="dashboard" element={<> LOGADO </>} />
      </Route>
    </Routes>
  )
}