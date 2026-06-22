import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { 
  FormProvider, 
  useForm, 
  useWatch, 
  type SubmitHandler 
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import dayjs from "dayjs";
import { 
  Box, 
  Button, 
  Grid 
} from "@mui/material";

import { optionsQueryListOrdersWithOptions } from "@/api/listOrdersWithOptions";
import { optionsQueryListClientsWithOptions } from "@/api/listClientsWithOptions";
import { useMutationPostAppointment } from "@/features/client/api/mutationPostAppointment";
import HeaderResourceForm from "@/components/HeaderResourceForm";
import { ControlledComboBox } from "@/components/ControlledComboBox";
import { ControlledInput } from "@/components/ControlledInputText";
import { ControlledInputMask } from "@/components/ControlledInputMask";
import ToastContainer from "@/components/Toast";
import { useRequiredParam } from "@/hooks/useRequiredParam";
import { 
  manageAppointmentSchema, 
  type ManageAppointmentSchemaFormData
} from "@/features/client/schema/manageAppointment";


export default function ManageNewAppointment() {

  const navigate = useNavigate();
  const clientId = useRequiredParam('id')

  const [openToast, setOpenToast] = useState("")

  const form = useForm<ManageAppointmentSchemaFormData>({
    resolver:
      zodResolver(manageAppointmentSchema),
  });
  const { errors } = form.formState

  const clientSelected = useWatch({
    control: form.control,
    name: 'clientId',
  })

  const { 
    data: clientsWithOptions,
    isSuccess: isSuccessClientsWithOptions
  } = useQuery(
    optionsQueryListClientsWithOptions()
  )

  const { 
    data: ordersWithOptions,
    isSuccess: isSuccessOrdersWithOptions
  } = useQuery(
    optionsQueryListOrdersWithOptions(clientSelected)
  )

  function executeActionAfterRequest(result: string) {
    setOpenToast(result);
    if (result === "success") {
      setTimeout(() => {
        navigate(`/cliente/${clientId}/detalhes`);
      }, 5000);
    }
  }

  const mutationPostAppointment =
    useMutationPostAppointment({
      onSuccess: () => {
        executeActionAfterRequest("success");
      },
      onError: () => {
        executeActionAfterRequest("error");
      },
    })


  const onSubmit: SubmitHandler<ManageAppointmentSchemaFormData> = async (data) => {

    const appointmentAtOnServer = dayjs(data.appointmentAt, 'DD/MM/YYYY HH:mm').toDate()

    mutationPostAppointment.mutate({
      ...data,
      clientId: clientId!,
      appointmentAt: appointmentAtOnServer,
    })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box component="section" sx={{ p: 8 }}>
          <HeaderResourceForm 
            title="Criar novo agendamento"
            resource="APPOINTMENTS"
          />

          <Grid container spacing={4} sx={{ pt: 8, pb: 3 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ControlledComboBox
                control={form.control}
                name={'clientId'}
                label='Cliente:*'
                options={isSuccessClientsWithOptions ? clientsWithOptions: []}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ControlledComboBox
                control={form.control}
                name={'orderId'}
                label='O.S:'
                options={isSuccessOrdersWithOptions ? ordersWithOptions : []}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <ControlledInput
                control={form.control}
                label="Descricao:*"
                name="description"
                multiline
                rows={4}
                fullWidth
                error={!!errors?.description}
                helperText={
                  String(errors?.description?.message ?? "")
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <ControlledInputMask
                control={form.control}
                variant="outlined"
                name="appointmentAt"
                mask={"99/99/9999 99:99"}
                label="Data da agenda:*"
                fullWidth
                error={!!errors.appointmentAt}
                helperText={errors.appointmentAt?.message}
              />
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>

            <Button
              sx={{ marginTop: 2 }}
              type="submit"
              variant="contained"
              size="large"
              loading={
                mutationPostAppointment.isPending || 
                mutationPostAppointment.isSuccess 
              }
              disabled={
                mutationPostAppointment.isPending || 
                mutationPostAppointment.isSuccess 
              }
              fullWidth
            >
              Cadastrar
            </Button>
          </Grid>
        </Box>
      </form>

      <ToastContainer
        open={openToast === "success"}
        message="Agenda adicionada com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao adicionar essa agenda."
        severity="success"
        onClose={() => setOpenToast("")}
      />
    </FormProvider>
  )
}