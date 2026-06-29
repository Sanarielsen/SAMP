import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Grid } from "@mui/material"

import { useMutationDeleteAppointment } from "@/api/mutationDeleteApppointment";
import { optionsQueryListAppointmentsByOrder } from "@/features/order/api/queryListAppointmentsByOrder";
import ModalAppointmentDetails from "@/features/client/components/ModalAppointmentDetails";
import DataTable from "@/components/DataTable";
import DataTableAppointmentColumns from "@/components/DataTableAppointmentColumns";
import HeaderPage from "@/components/HeaderPage"
import ModalConfirmation from "@/components/ModalConfirmation";
import ToastContainer from "@/components/Toast";
import { useRequiredParam } from "@/hooks/useRequiredParam";
import { appointmentFields } from "@/features/client/utils/getRowDetailAppointmentDetails";

import type { Appointment } from "@shared/types/appointment";


export default function AppointmentInformation() {

  const navigate = useNavigate();
  const orderId = useRequiredParam('id')
  const queryClient = useQueryClient()

  const [appointmentClicked, setAppointmentClicked] = useState<Appointment>()
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [openToast, setOpenToast] = useState("")

  const { 
    data: listAppointments,
    isSuccess,
    isLoading,
    isError,
    refetch
  } = useQuery(
    optionsQueryListAppointmentsByOrder(orderId)
  )

  const mutationChangeDeleteAppointment =
    useMutationDeleteAppointment({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments-by-order', orderId] })
      setOpenToast("success"); 
    },
    onError: () => {
      setOpenToast("error"); 
    },
  })

  const handleView = (appointment: Appointment) => {
    setAppointmentClicked(appointment);
    setOpenModalDetails(true);
  };

  const handleDelete = (appointment: Appointment) => {
    setAppointmentClicked(appointment)
    setOpenModalConfirmation(true)
  };

  function handleDeactivateAppointment(action: boolean){

    setOpenModalConfirmation(false)
    if (!action || !appointmentClicked) return
    
    mutationChangeDeleteAppointment.mutate(
      appointmentClicked.id
    )

    refetch()
  }

  const stateQuery =
    isSuccess ? "SUCCESS" : 
    isLoading ? "LOADING" :
    isError ? "ERROR" : "IDLE";

  return (
    <>
      <HeaderPage title="Agenda atrelada a essa O.S" />

      <Grid
        container 
        spacing={2}
        sx={{ p: 2 }}
      >
      
        <Grid size={{ xs: 12 }}>
          <DataTable
            state={stateQuery}
            rows={listAppointments}
            columns={DataTableAppointmentColumns({
              onClickUpdateItem: (id) => navigate(`/cliente/${orderId}/agenda/${id}`),
              onClickSeeItem: (current) => handleView(current), 
              onClickDeleteItem: (current) => handleDelete(current),
              onClickCheckOrder: (currentOrderId) => navigate(`/os/${currentOrderId}`)
            })}
          />
        </Grid>
      </Grid>

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

      <ModalConfirmation
        open={openModalConfirmation}
        title={"Desativar a agenda atual"}
        description={`Tem certeza que gostaria de desativar o agenda atual? Essa operacão não é inversivel.`}
        handleClose={() => setOpenModalConfirmation(false)}
        handleAnswer={handleDeactivateAppointment}
      />

      {appointmentClicked && (
        <ModalAppointmentDetails
          open={openModalDetails}
          appointment={appointmentClicked}
          fields={appointmentFields}
          handleClose={() => setOpenModalDetails(false)}
        />
      )}
    </>
  )
}