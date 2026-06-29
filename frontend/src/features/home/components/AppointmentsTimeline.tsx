import { useState } from "react";

import { Button, Grid } from "@mui/material";

import { useMutationDeleteAppointment } from "@/api/mutationDeleteApppointment";
import AppoinentmentListItem from "@/features/home/components/AppoinentmentListItem";
import HeaderPage from "@/components/HeaderPage";
import ModalConfirmation from "@/components/ModalConfirmation";
import ToastContainer from "@/components/Toast";

import type { AppoitmentItem } from "@shared/types/appointment";


const appointmentsMock: AppoitmentItem[] = [
  {
    id: 'test-1',
    description: 'Cadastro de novo registro',
    status: 'COMPLETE',
    appointmentAt: new Date(Date.now()),
    clientName: 'Sanarielsen',
    orderTitle: null
  },
  {
    id: 'test-2',
    description: 'Cadastro de novo documento',
    status: 'COMPLETE',
    appointmentAt: new Date(Date.now()),
    clientName: 'Sanarielsen',
    orderTitle: null,
  },
  {
    id: 'test-3',
    description: 'Conversa com o cliente',
    status: 'PENDING',
    appointmentAt: new Date(Date.now()),
    clientName: 'Sanarielsen',
    orderTitle: 'Adicionar novo registro do processo',
  }
]

export default function AppointmentsTimeline() {

  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [appointmentIdClicked, setAppointmentIdClicked] = useState('')
  const [openToast, setOpenToast] = useState("")

  const mutationChangeDeleteAppointment =
    useMutationDeleteAppointment({
    onSuccess: () => {
      //queryClient.invalidateQueries({ queryKey: ['appointments-by-order', orderId] })
      setOpenToast("success"); 
    },
    onError: () => {
      setOpenToast("error"); 
    },
  })

  const handleDelete = (id: string) => {
    setAppointmentIdClicked(id)
    setOpenModalConfirmation(true)
  };

  function handleDeactivateAppointment(action: boolean){

    setOpenModalConfirmation(false)
    if (!action || !appointmentIdClicked) return
    
    mutationChangeDeleteAppointment.mutate(
      appointmentIdClicked
    )

    //refetch()
  }

  return (
    <>
      <Grid container spacing={4} sx={{ pt: 2, pb: 3, px: 4 }}>
        <Grid size={{ xs: 12, lg: 12, xl: 6 }}>
          <HeaderPage title="Agendas próximas">
            <Button
              type="button"
              variant="contained"
              sx={{ 
                width: { xs: "100%", md: "auto" },
                "&:hover": {
                  backgroundColor: "green",
                },
              }}
              color="success"
              onClick={() => console.log("extrauiu")}
            >
              Extrair
            </Button>
          </HeaderPage>
          {appointmentsMock.map((appointment) => (
            <AppoinentmentListItem
              key={appointment.id}
              appointment={appointment}
              onCompleteItem={(id) => console.log("Completa a agenda: ", id)}
              onDeleteItem={(id) => handleDelete(id)}
            />
          ))}
        </Grid>
      </Grid>

      <ModalConfirmation
        open={openModalConfirmation}
        title={"Desativar a agenda atual"}
        description={`Tem certeza que gostaria de desativar o agenda atual? Essa operacão não é inversivel.`}
        handleClose={() => setOpenModalConfirmation(false)}
        handleAnswer={handleDeactivateAppointment}
      />

      <ToastContainer
        open={openToast === "success"}
        message="Agenda desativada com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />
      
      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao desativar esse agenda."
        severity="error"
        onClose={() => setOpenToast("")}
      />
    </>
    
  )
}