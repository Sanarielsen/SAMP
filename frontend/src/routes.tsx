import { Routes, Route } from "react-router";

import Dashboard from "@/layout/Dashboard";

import LoginPage from "@/features/auth/pages/Login";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPassword";

import Home from "@/features/home/page/Home";

import ClientPage from "@/features/client/pages/ClientPage";
import ManageClientPage from "@/features/client/pages/ManageClientPage";
import { PanelInformations as ClientPanelInformations } from "@/features/client/components/PanelInformations";
import ManageUpdateAppointment from "@/features/client/pages/ManageUpdateAppointment";
import ManageNewAppointment from "@/features/client/pages/ManageNewAppointment";

import RepresentativePage from "@/features/representative/pages/RepresentativePage";
import RepresentativeManagePage from "@/features/representative/pages/RepresentativeManagePage";

import OrderServicesPage from "@/features/order/pages/OrderServicesPage";
import OrderServiceManagePage from "@/features/order/pages/OrderServicesManagePage";

import AboutPage from "@/features/about/pages/AboutPage";

import ProfilePage from "@/features/profile/pages/ProfilePage";
import AdminManageVariablesPage from "@/features/admin/page/ManageVariables";
import ManageUsers from "@/features/admin/page/ManageUsers";
import ManageUser from "@/features/admin/page/ManageUser";
import { DetailsPanel as OrderDetailsPanel } from "@/features/order/pages/DetailsPanel";
import OrderNewPayment from "@/features/order/pages/OrderNewPayment";
import PaymentDetails from "@/features/payment/pages/PaymentDetails";
import HomeProcess from "./features/process/page/HomeProcess";
import ManageImportedMagazine from "./features/process/page/ManageImportedMagazine";
import NewProcess from "./features/process/page/NewProcess";


export default function Router() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="recuperar-senha" element={<ForgotPasswordPage />} />

      <Route element={<Dashboard />}>
        <Route path="inicio" element={<Home />} />

        <Route path="clientes" element={<ClientPage />} />
        <Route path="cliente" element={<ManageClientPage />} />
        <Route path="cliente/:id" element={<ManageClientPage />} />
        <Route path="cliente/:id/detalhes" element={<ClientPanelInformations />} />
        <Route path="cliente/:id/agenda" element={<ManageNewAppointment />} />
        <Route path="cliente/:clienteId/agenda/:agendaId" element={<ManageUpdateAppointment />} />

        <Route path="representantes" element={<RepresentativePage />} />
        <Route path="representante" element={<RepresentativeManagePage />} />
        <Route path="representante/:id" element={<RepresentativeManagePage />} />

        <Route path="oss" element={<OrderServicesPage />} />
        <Route path="os/" element={<OrderServiceManagePage />} />
        <Route path="os/:id" element={<OrderServiceManagePage />} />
        <Route path="os/detalhes/:id" element={<OrderDetailsPanel />} />

        <Route path="os/detalhes/:id/pagamento" element={<OrderNewPayment />} />

        <Route path="pagamento/:id/parcelas" element={<PaymentDetails />} />

        <Route path="processos" element={<HomeProcess />} />
        <Route path="processos/importacao" element={<ManageImportedMagazine />} />
        <Route path="processo" element={<NewProcess />} />

        <Route path="perfil" element={<ProfilePage />} />
        <Route path="admin/variaveis" element={<AdminManageVariablesPage />} />
        <Route path="admin/usuarios" element={<ManageUsers />} />
        <Route path="admin/usuario" element={<ManageUser />} />
        
        <Route path="sobre" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}