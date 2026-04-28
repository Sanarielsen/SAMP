import { Routes, Route } from "react-router";

import ForgotPasswordPage from "@/features/auth/pages/ForgotPassword";
import LoginPage from "@/features/auth/pages/Login";

export default function Router() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  )
}