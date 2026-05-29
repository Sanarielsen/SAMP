import { useEffect, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import AllInboxIcon from '@mui/icons-material/AllInbox';
import { 
  Box, 
  Button, 
  Grid, 
  Typography 
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  manageOrderServiceSchema, 
  type ManageOrderSchemaFormData 
} from "@/features/order/schemas/manageOrderServiceSchema";

import { optionsQueryGetOrder } from "@/features/order/api/queryGetOrder";
import { optionsQueryListOrderTypesWithOptions } from "@/features/order/api/queryListOrderTypes";
import { useMutationPatchOrder } from "@/features/order/api/mutationPatchOrder";
import { useMutationPostOrder } from "@/features/order/api/mutationPostOrder";
import { optionsQueryListClientWithOptions } from "@/api/listClientsWithOptions";

import { ControlledComboBox } from "@/components/ControlledComboBox";
import { ControlledInput } from "@/components/ControlledInputText";
import { ControlledInputMask } from "@/components/ControlledInputMask";
import ToastContainer from "@/components/Toast";

import { emptyOrder } from "@/features/order/utils/emptyOrder";
import { formatAsVisualDate } from "@/features/client/utils/formatAsAVisualDate";
import { parseBRDate } from "@/utils/formatDate";

import type { CreateOrderDTO, UpdateOrderDTO } from "@shared/types/orders";

export default function OrderServiceManagePage() {

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const titleHeader = isEditing ? "Atualiza a ordem de servico" : "Adicionar nova ordem de servico"

  const [openToast, setOpenToast] = useState("")

  const { 
    data: listClientsWithOptions,
    isSuccess: isSuccesslistClientsWithOptions
  } = useQuery(
    optionsQueryListClientWithOptions()
  )

  const { 
    data: currentOrder,
  } = useQuery(
    optionsQueryGetOrder(String(id), isEditing),
  )

  const { 
    data: listOrderTypeWithOptions,
    isSuccess: isSuccessOrderTypeWithOptions
  } = useQuery(
    optionsQueryListOrderTypesWithOptions()
  )

  const form = useForm<ManageOrderSchemaFormData>({
    resolver:
      zodResolver(manageOrderServiceSchema),

    defaultValues:
      isEditing
        ? currentOrder
        : emptyOrder,
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = form

  useEffect(() => {
    if (currentOrder) {
      reset({
        ...currentOrder,
        eventDate: formatAsVisualDate(
          currentOrder.eventDate
        ),
        orderTypeId: String(
          currentOrder.orderTypeId
        ),
        observation:
          currentOrder.observation ?? '',
      })
    }
  }, [currentOrder, reset])

  function executeActionAfterRequest(result: string) {
    setOpenToast(result);
    if (result === "success") {
      setTimeout(() => {
        navigate("/oss");
      }, 5000);
    }
  }

  const mutationPostOrder =
    useMutationPostOrder({
      onSuccess: () => {
        executeActionAfterRequest("success")
      },
      onError: () => {
        executeActionAfterRequest("error")
      },
  })

  const mutationPatchOrder =
    useMutationPatchOrder({
      onSuccess: () => {
        executeActionAfterRequest("success")
      },
      onError: () => {
        executeActionAfterRequest("error")
      },
  })

  const onSubmit: SubmitHandler<ManageOrderSchemaFormData> = async (data) => {
  
    if (isEditing) {
      const payload: UpdateOrderDTO = {
        id: id,
        clientId: data.clientId,
        orderTypeId: Number(data.orderTypeId),
        description: data.description,
        observation: data.observation ?? '',
        eventDate: parseBRDate(data.eventDate)
      }

      mutationPatchOrder.mutate(payload)
      return
    }

    const payload: CreateOrderDTO = {
      clientId: data.clientId,
      orderTypeId: Number(data.orderTypeId),
      description: data.description,
      observation: data.observation ?? '',
      eventDate: parseBRDate(data.eventDate)
    }

    mutationPostOrder.mutate(payload)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box component="section" sx={{ p: 8 }}>
          <Grid
            container 
            spacing={4} 
            sx={{
              textAlign: { xs: "center", md: "left" }
            }}
          >
            <Grid 
              size={{ xs: 12}}
              sx={{
                textAlign:"center"
              }}
            >
              <Typography variant="h4" component="h1">
                { titleHeader }
              </Typography>
            </Grid>

            <Grid 
              size={{ xs: 12}}
              sx={{
                textAlign:"center"
              }}
            >
              <AllInboxIcon fontSize="large" />
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ pt: 8, pb: 3 }}>
            <Grid size={{ xs: 12 }}>
              <ControlledComboBox
                control={control}
                name={'clientId'}
                label='Cliente atrelado'
                placeholder='Clientes responsáveis por ti cadastrados'
                options={isSuccesslistClientsWithOptions ? listClientsWithOptions : []}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              <ControlledComboBox
                control={control}
                name={'orderTypeId'}
                label='Tipo de O.S.'
                placeholder='Tipo de ordem de servico a ser cadastrada'
                options={isSuccessOrderTypeWithOptions ? listOrderTypeWithOptions : []}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ pt: 3 }}>
            <Grid size={{ xs: 12 }}>
              <ControlledInput
                control={control}
                label="Descricao"
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

            <Grid size={{ xs: 12, sm: 6 }}>
              <ControlledInput
                control={control}
                label="Observacoes"
                name="observation"
                fullWidth
                error={!!errors?.observation}
                helperText={
                  String(errors?.observation?.message ?? "")
                }
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <ControlledInputMask
                control={control}
                mask="99/99/9999"
                label="Data do evento"
                name="eventDate"
                fullWidth
                error={!!errors?.eventDate}
                helperText={
                  String(errors?.eventDate?.message ?? "")
                }
              />
            </Grid>

            <Grid
              container
              spacing={4}
              size={{ xs: 12 }}
            >
              <Button
                sx={{ marginTop: 4 }}
                variant="contained"
                type="submit"
                size="large"
                loading={isEditing ?
                  mutationPostOrder.isPending :
                  mutationPatchOrder.isPending
                }
                disabled={isEditing ?
                  mutationPostOrder.isPending :
                  mutationPatchOrder.isPending
                }  
                fullWidth
              >
                {isEditing ? "Atualizar" : "Cadastrar"}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <ToastContainer
          open={openToast === "success"}
          message={ isEditing ? "O.S. atualizada com sucesso." : "O.S. cadastrada com sucesso." }
          severity="success"
          onClose={() => setOpenToast("")}
        />

        <ToastContainer
          open={openToast === "error"}
          message={ isEditing ? "Ocorreu um erro ao atualizar essa O.S." : "Ocorreu um erro ao cadastrar esse O.S." }
          severity="error"
          onClose={() => setOpenToast("")}
        />
      </form>
    </FormProvider>
  )
}