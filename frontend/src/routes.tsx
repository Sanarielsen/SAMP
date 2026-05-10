import { Routes, Route } from "react-router";

import AboutPage from "@/features/about/pages/AboutPage";
import ClientPage from "@/features/client/pages/ClientPage";
import Dashboard from "@/layout/Dashboard";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPassword";
import LoginPage from "@/features/auth/pages/Login";
import ManageClientPage from "@/features/client/pages/ManageClientPage";
import RepresentativePage from "@/features/representative/pages/RepresentativePage";

export default function Router() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="recuperar-senha" element={<ForgotPasswordPage />} />

      <Route element={<Dashboard />}>
        <Route path="clientes" element={<ClientPage />} />

        <Route path="cliente" element={<ManageClientPage />} />
        <Route path="cliente/:id" element={<ManageClientPage />} />

        <Route path="representantes" element={<RepresentativePage />} />
        <Route path="sobre" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}