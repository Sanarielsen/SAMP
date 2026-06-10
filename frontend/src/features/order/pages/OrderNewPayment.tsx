import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { newPaymentSchema, type NewPaymentSchemaFormData } from "../schemas/newPaymentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid } from "@mui/material";

import HeaderResourceForm from "@/components/HeaderResourceForm";
import { ControlledInput } from "@/components/ControlledInputText";
import { ControlledInputAdornment } from "@/components/ControlledInputAdornment";
import { ControlledComboBox } from "@/components/ControlledComboBox";
import { ControlledInputMask } from "@/components/ControlledInputMask";
import { useMutationPostPaymentWithInstallments } from "../api/mutationCreatePayment";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import ToastContainer from "@/components/Toast";
import type { CreatePaymentWithInstallmentsDTO } from "@shared/types/payment";
import { parseBRDate } from "@/utils/formatDate";
import { convertCurrencyToCents } from "../utils/convertCurrencyToCents";

const listPaymentMethods = [
  { value: "Crédito", label: "Crédito" },
  { value: "Débito", label: "Débito" },
  { value: "Pix", label: "Pix" },
  { value: "Boleto", label: "Boleto" },
]

export default function OrderNewPayment() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [openToast, setOpenToast] = useState("")

  const form = useForm<NewPaymentSchemaFormData>({
    resolver:
      zodResolver(newPaymentSchema)
  })
  const { errors } = form.formState

  function executeActionAfterRequest(result: string) {
    setOpenToast(result);
    if (result === "success") {
      setTimeout(() => {
        navigate(`/os/detalhes/${id}`);
      }, 5000);
    }
  }

  const mutationPostPaymentWithInstallments =
    useMutationPostPaymentWithInstallments({
      onSuccess: () => {
        executeActionAfterRequest("success")
      },
      onError: () => {
        executeActionAfterRequest("error")
      },
  })

  const onSubmit: SubmitHandler<NewPaymentSchemaFormData> = async (data) => {
    console.log("Salva esse cara: ", data)

    const payload: CreatePaymentWithInstallmentsDTO = {
      totalInstallments: Number(data.totalInstallments),
      totalAmountInCents: convertCurrencyToCents(Number(data.totalAmountInCents)),
      firstDueDate: parseBRDate(data.firstDueDate),
      method: data.method,
      observation: data.observation
    }
    
    mutationPostPaymentWithInstallments.mutate({
      id: id!,
      payload
    })
  }

  console.log(errors)

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box component="section" sx={{ p: 8 }}>
          <HeaderResourceForm 
            title="Inserir nova ordem de pagamento"
            resource="PAYMENTS"
          />

          <Grid container spacing={4} sx={{ pt: 8, pb: 3 }}>

            <Grid size={{ xs: 12, sm: 6, lg: 8 }}>
              <ControlledInputAdornment
                type="number"
                control={form.control}
                label="Valor total das parcelas"
                name="totalAmountInCents"
                contextAdornment="R$"
                positionAdornment="start"
                fullWidth
                error={!!errors?.totalAmountInCents}
                helperText={
                  String(errors?.totalAmountInCents?.message ?? "")
                }
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
              <ControlledInput
                type="number"
                control={form.control}
                label="Parcelas (1 se for a vista)"
                name="totalInstallments"
                fullWidth
                error={!!errors?.totalInstallments}
                helperText={
                  String(errors?.totalInstallments?.message ?? "")
                }
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
              <ControlledComboBox
                control={form.control}
                name={'method'}
                label='Método de pagamento'
                options={listPaymentMethods}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <ControlledInputMask
                control={form.control}
                variant="outlined"
                name="firstDueDate"
                mask={"99/99/9999"}
                label="Data do primeiro vencimento"
                fullWidth
                error={!!errors.firstDueDate}
                helperText={errors.firstDueDate?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, lg: 9 }}>
              <ControlledInput
                control={form.control}
                label="Descricao"
                name="observation"
                fullWidth
                error={!!errors?.observation}
                helperText={
                  String(errors?.observation?.message ?? "")
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                loading={
                  mutationPostPaymentWithInstallments.isPending ||
                  mutationPostPaymentWithInstallments.isSuccess
                }
                disabled={
                  mutationPostPaymentWithInstallments.isPending ||
                  mutationPostPaymentWithInstallments.isSuccess
                }
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>

      <ToastContainer
        open={openToast === "success"}
        message="Pagamento cadastrado com sucesso. Redirecionando..."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao cadastrar esse pagamento."
        severity="error"
        onClose={() => setOpenToast("")}
      />
    </FormProvider>
  )
}