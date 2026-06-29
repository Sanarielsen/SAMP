import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Button, Grid } from "@mui/material";

import { useAuth } from "@/auth/AuthProvider";
import { optionsQueryListRecentAppointments } from "@/features/home/api/queryListRecentAppointments";
import { mockDaysCanBeConsidered } from "@/features/home/utils/mockDaysCanBeConsidered";
import { useMutationDeleteAppointment } from "@/api/mutationDeleteApppointment";
import AppoinentmentListItem from "@/features/home/components/AppoinentmentListItem";
import BoxLoading from "@/components/BoxLoading";
import ComboBox from "@/components/ComboBox";
import HeaderPage from "@/components/HeaderPage";
import ModalConfirmation from "@/components/ModalConfirmation";
import ToastContainer from "@/components/Toast";
import type { AppoitmentItem } from "@shared/types/appointment";


export default function AppointmentsTimeline() {

  const { getUserId } = useAuth()
  const userId = getUserId() ?? ""

  const queryClient = useQueryClient();

  const [daysCanBeConsidered, setDaysCanBeConsidered] = useState<number>(1)

  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [appointmentIdClicked, setAppointmentIdClicked] = useState('')
  const [openToast, setOpenToast] = useState("")

  const { 
    data: recentAppoitments,
    isSuccess: isSuccessRecentAppoitments,
    isPending: isPendingRecentAppoitments,
  } = useQuery(
    optionsQueryListRecentAppointments(userId, daysCanBeConsidered)
  )

  const mutationChangeDeleteAppointment =
    useMutationDeleteAppointment({
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['recent-appointments', userId, daysCanBeConsidered] })
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

          <ComboBox 
            label="Dias considerados"
            value={String(daysCanBeConsidered)}
            options={mockDaysCanBeConsidered}
            onChangeOption={(event) => setDaysCanBeConsidered(Number(event.target.value))}
          />

          {isPendingRecentAppoitments && (
            <BoxLoading description="Carregando agendas..." />
          )}

          {isSuccessRecentAppoitments && (recentAppoitments ?? []).length === 0 && (
            <BoxLoading description="Nenhuma agenda encontrada para o período selecionado." />
          )}

          {isSuccessRecentAppoitments && (recentAppoitments ?? []).map((appointment: AppoitmentItem) => (
            <AppoinentmentListItem
              key={appointment.id}
              appointment={appointment}
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