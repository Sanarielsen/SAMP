import { Routes, Route } from "react-router";

import { ProtectedRoute } from "@/routes/ProtectedRoute";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPassword";
import LoginPage from "@/features/auth/pages/Login";

export default function Router() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<> LOGADO </>} />
      </Route>
    </Routes>
  )
}