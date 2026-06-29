import AppointmentsTimeline from "@/features/home/components/AppointmentsTimeline";
import HeaderPage from "@/components/HeaderPage";


export default function Home() {

  return (
    <>
      <HeaderPage title="SAMP - Sistema de automatizacao de marcas e patentes"/>
      <AppointmentsTimeline />
    </>
  )
}