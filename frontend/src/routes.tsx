import { Routes, Route } from "react-router";

import Dashboard from "@/layout/Dashboard";

import LoginPage from "@/features/auth/pages/Login";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPassword";

import ClientPage from "@/features/client/pages/ClientPage";
import ManageClientPage from "@/features/client/pages/ManageClientPage";

import RepresentativePage from "@/features/representative/pages/RepresentativePage";
import RepresentativeManagePage from "@/features/representative/pages/RepresentativeManagePage";

import OrderServicesPage from "@/features/order/pages/OrderServicesPage";
import OrderServiceManagePage from "@/features/order/pages/OrderServicesManagePage";

import AboutPage from "@/features/about/pages/AboutPage";

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
        <Route path="representante" element={<RepresentativeManagePage />} />
        <Route path="representante/:id" element={<RepresentativeManagePage />} />

        <Route path="oss" element={<OrderServicesPage />} />
        <Route path="os/" element={<OrderServiceManagePage />} />
        <Route path="os/:id" element={<OrderServiceManagePage />} />
        
        <Route path="sobre" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}