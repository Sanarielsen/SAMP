import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import AppointmentsTimeline from "@/features/home/components/AppointmentsTimeline";
import HeaderPage from "@/components/HeaderPage";
import ToastContainer from "@/components/Toast";


type PermissionDeniedLocationState = {
  permissionDenied?: boolean
  requestedPath?: string
}

export default function Home() {
  const location = useLocation()
  const [openPermissionToast, setOpenPermissionToast] = useState(false)

  useEffect(() => {
    const locationState = (location.state ?? {}) as PermissionDeniedLocationState

    if (locationState.permissionDenied) {
      setOpenPermissionToast(true)
    }
  }, [location.key, location.state])

  return (
    <>
      <HeaderPage title="SAMP - Sistema de automatizacao de marcas e patentes"/>
      <AppointmentsTimeline />

      <ToastContainer
        open={openPermissionToast}
        message="Você não tem permissão para acessar esta página."
        severity="warning"
        onClose={() => setOpenPermissionToast(false)}
      />
    </>
  )
}