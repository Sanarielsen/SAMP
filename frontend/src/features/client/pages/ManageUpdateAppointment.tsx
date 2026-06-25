import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { 
  FormProvider, 
  useForm, 
  useWatch, 
  type SubmitHandler 
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Box, 
  Button, 
  Grid 
} from "@mui/material";

import { optionsQueryGetAppointment } from "@/features/client/api/queryGetAppointment";
import { useMutationPatchAppointment } from "@/features/client/api/mutationPatchAppointment";
import { optionsQueryListOrdersWithOptions } from "@/api/listOrdersWithOptions";
import { optionsQueryListClientsWithOptions } from "@/api/listClientsWithOptions";
import { ControlledComboBox } from "@/components/ControlledComboBox";
import { ControlledInput } from "@/components/ControlledInputText";
import { ControlledInputMask } from "@/components/ControlledInputMask";
import HeaderResourceForm from "@/components/HeaderResourceForm";
import ToastContainer from "@/components/Toast";
import { useParamOptional } from "@/hooks/useRequiredParam";
import { 
  manageAppointmentSchema, 
  type ManageAppointmentSchemaFormData
} from "@/features/client/schema/manageAppointment";
import { emptyAppointment } from "@/features/client/utils/mockConstants";
import { 
  convertBrazilDateTimeToUTC, 
  formatDateTimeBrazil 
} from "@/utils/formatDateTimeBrazil";

export default function ManageUpdateAppointment() {

  const navigate = useNavigate();
  
  const clientId = useParamOptional('clienteId', true)
  const appointmentId = useParamOptional('agendaId', true)

  const [openToast, setOpenToast] = useState("")

  const { 
    data: currentAppointment,
    isSuccess: isSuccessCurrentAppointment
  } = useQuery(
    optionsQueryGetAppointment(appointmentId!, true)
  )

  const form = useForm<ManageAppointmentSchemaFormData>({
    resolver:
      zodResolver(manageAppointmentSchema),

    defaultValues: 
      isSuccessCurrentAppointment 
      ? currentAppointment 
      : emptyAppointment,
  });
  const { errors } = form.formState
  const { reset } = form

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

  useEffect(() => {
    if (currentAppointment) {
      reset({
        ...currentAppointment,
        appointmentAt: formatDateTimeBrazil(currentAppointment.appointmentAt)
      })
    }
  }, [currentAppointment, reset])

  function executeActionAfterRequest(result: string) {
    setOpenToast(result);
    if (result === "success") {
      setTimeout(() => {
        navigate(`/cliente/${clientId}/detalhes`);
      }, 5000);
    }
  }

  const mutationPatchAppointment =
    useMutationPatchAppointment({
      onSuccess: () => {
        executeActionAfterRequest("success");
      },
      onError: () => {
        executeActionAfterRequest("error");
      },
    })

  const hasSomethingHappen = 
    mutationPatchAppointment.isPending ||
    mutationPatchAppointment.isSuccess 

  const onSubmit: SubmitHandler<ManageAppointmentSchemaFormData> = async (data) => {

    const appointmentAtConverted = new Date(convertBrazilDateTimeToUTC(data.appointmentAt ?? undefined))

    mutationPatchAppointment.mutate({ 
      id: currentAppointment.id,
      orderId: data.orderId ?? null,
      clientId: data.clientId ?? undefined,
      appointmentAt: appointmentAtConverted,
      description: data.description ?? undefined,
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
              loading={hasSomethingHappen}
              disabled={hasSomethingHappen}
              fullWidth
            >
              Atualizar
            </Button>
          </Grid>
        </Box>
      </form>

      <ToastContainer
        open={openToast === "success"}
        message="Agenda atualizada com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao atualizada essa agenda."
        severity="success"
        onClose={() => setOpenToast("")}
      />
    </FormProvider>
  )
}