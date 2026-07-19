import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { 
  useForm, 
  type SubmitHandler
} from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Box, 
  Button, 
  Grid 
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

import { optionsQueryListProcessTypeAsAOptions } from "@/features/process/api/queryListProcessTypeAsAnOption";
import { useMutationPostPublication } from "@/features/process/api/mutatePostPublication";
import { useMutationPatchPublication } from "@/features/process/api/mutationUpdatePublication";
import { optionsQueryGetPublication } from "@/features/process/api/queryGetPublication";
import { optionsQueryListClientsWithOptions } from "@/api/listClientsWithOptions";
import { optionsQueryGetClient } from "@/api/queryGetClient";;
import { ControlledComboBox } from "@/components/ControlledComboBox";
import { ControlledInput } from "@/components/ControlledInputText";
import { ControlledInputMask } from "@/components/ControlledInputMask";
import HeaderResourceForm from "@/components/HeaderResourceForm";
import ModalViewEntityDetails from "@/components/ModalViewEntityDetails";
import ToastContainer from "@/components/Toast";
import { useDetailsModal } from "@/hooks/useDetailsModal";
import { 
  manageProcessManualSchema, 
  type ManageProcessManualFormData 
} from "@/features/process/schema/manageProcessManualSchema";
import { 
  listInputNatureValues, 
  listInputPresentationValues 
} from "@/features/process/utils/getMockInputValues";
import { convertDataToServerString } from "@/utils/convertDataToServerString";
import { clientFields } from "@/utils/getRowDetailClient";
import { formatAsVisualOnlyDate } from "@/utils/formatDate2";

import type { CreatePublicationDTO } from "@shared/types/publication";


export default function ManagePublication() {

  const navigate = useNavigate();
  const { id } = useParams()
  const isEditing = !!id;
  const titleSection = !isEditing ? 
    "Criar publicação manualmente" :
    "Atualizar publicação"

  const [openToast, setOpenToast] = useState("")

  const {
    data: listProcessTypeAsAOptions,
    isSuccess: isSuccessTypeOptions,
  } = useQuery(
    optionsQueryListProcessTypeAsAOptions()
  );

  const { 
    data: clientsWithOptions,
    isSuccess: isSuccessClientsWithOptions
  } = useQuery(
    optionsQueryListClientsWithOptions()
  )

  const {
    data: publication
  } = useQuery(
    optionsQueryGetPublication(id)
  );

  const form = useForm<ManageProcessManualFormData>({
    resolver:
      zodResolver(manageProcessManualSchema),
    defaultValues:
      isEditing && publication ? {
        ...publication,
        grantDate: publication.grantDate
          ? formatAsVisualOnlyDate(publication.grantDate)
          : undefined,
        publicationDate: publication.publicationDate
          ? formatAsVisualOnlyDate(publication.publicationDate)
          : undefined,
        depositDate: publication.depositDate
          ? formatAsVisualOnlyDate(publication.depositDate)
          : undefined,
      } : {}
    })
    const { errors } = form.formState


  useEffect(() => {
    if (publication) {
      form.reset({
        ...publication,
        grantDate: publication.grantDate
          ? formatAsVisualOnlyDate(publication.grantDate)
          : undefined,
        publicationDate: publication.publicationDate
          ? formatAsVisualOnlyDate(publication.publicationDate)
          : undefined,
        depositDate: publication.depositDate
          ? formatAsVisualOnlyDate(publication.depositDate)
          : undefined,
      });
    }
  }, [publication, clientsWithOptions]);

  const clientId = form.watch("clientId");

  const {
    data: currentClient
  } = useQuery(optionsQueryGetClient(clientId!))

  function executeActionAfterRequest(result: string) {
    setOpenToast(result);
    if (result === "success") {
      setTimeout(() => {
        navigate("/processos/publicacoes");
      }, 5000);
    }
  }

  const mutationPostPublication =
    useMutationPostPublication({
      onSuccess: () => {
        executeActionAfterRequest("success");
      },
      onError: () => {
        executeActionAfterRequest("error");
      },
    })

  const mutationPatchPublication =
    useMutationPatchPublication({
      onSuccess: () => {
        executeActionAfterRequest("success");
      },
      onError: () => {
        executeActionAfterRequest("error");
      },
    })

  const { openDetails, closeDetails, payload } = useDetailsModal();

  const hasTransferStarted = 
    mutationPostPublication.isPending ||
    mutationPatchPublication.isPending ||
    mutationPostPublication.isSuccess ||
    mutationPatchPublication.isSuccess

  const onSubmit: SubmitHandler<ManageProcessManualFormData> = async (data) => {

    const payload: CreatePublicationDTO = {
      ...data,
      publicationDate: data.depositDate 
        ? new Date(convertDataToServerString(data.publicationDate ?? "")) 
        : undefined,
      depositDate: data.depositDate
        ? new Date(convertDataToServerString(data.depositDate))
        : undefined,
      grantDate: data.grantDate
        ? new Date(convertDataToServerString(data.grantDate))
        : undefined,
      }

    if (isEditing) {

      mutationPatchPublication.mutate({
        id,
        ...payload
      })

      return;
    }
    mutationPostPublication.mutate(payload)
  }

  return (
    <>
      <Box component="section" sx={{ p: 8 }}>
        <HeaderResourceForm
          title={titleSection}
          resource="PROCESSES"
        />

        <Box component="section" sx={{ px: 8 }}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Grid container spacing={4} sx={{ pt: 8, pb: 3 }}>
              <Grid size={{ xs: 12 }}>
                <ControlledComboBox
                  control={form.control}
                  name={'clientId'}
                  label='Cliente:*'
                  placeholder='Cliente a ser considerado'
                  options={isSuccessClientsWithOptions ? clientsWithOptions : []}
                  tooltipTitle="Visualizar cliente selecionado"
                  detailIcon={<PersonIcon fontSize="large"/>}
                  onDetailClick={() =>
                    openDetails({
                      title: "Detalhes do cliente selecionado",
                      data: currentClient,
                      fields: clientFields,
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ControlledComboBox
                  control={form.control}
                  name={'processTypeId'}
                  label='Tipo do processo:*'
                  placeholder='Tipo do processo considerado'
                  options={isSuccessTypeOptions ?
                    listProcessTypeAsAOptions :
                    []
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, lg: 6 }}>
                <ControlledInput
                  control={form.control}
                  type="number"
                  name="processNumber"
                  label="Número do processo:*"
                  fullWidth
                  error={!!errors?.processNumber}
                  helperText={
                    String(errors?.processNumber?.message ?? "")
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, lg: 6 }}>
                <ControlledInput
                  control={form.control}
                  name="holder"
                  label="Titular:*"
                  placeholder='Títular do processo considerado'
                  fullWidth
                  error={!!errors?.holder}
                  helperText={
                    String(errors?.holder?.message ?? "")
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <ControlledInput
                  control={form.control}
                  name="brand"
                  label="Marca:*"
                  placeholder='Marca do processo considerado'
                  fullWidth
                  error={!!errors?.brand}
                  helperText={
                    String(errors?.brand?.message ?? "")
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <ControlledComboBox
                  control={form.control}
                  name={'nature'}
                  label='Natureza:*'
                  placeholder='Natureza da marca considerada'
                  options={listInputNatureValues}
                />
              </Grid>
              <Grid size={{ xs: 12, lg: 4 }}>
                <ControlledComboBox
                  control={form.control}
                  name={'presentation'}
                  label='Apresentação:*'
                  placeholder='Apresentação da marca considerada'
                  options={listInputPresentationValues}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ControlledInput
                  type="number"
                  control={form.control}
                  name="specification"
                  label="Especificações:*"
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors?.specification}
                  helperText={
                    String(errors?.specification?.message ?? "")
                  }
                />
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <ControlledInputMask
                  control={form.control}
                  name="publicationDate"
                  mask="99/99/9999"
                  variant="outlined"
                  label="Data de prioridade"
                  fullWidth
                  error={!!errors.publicationDate}
                  helperText={errors.publicationDate?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <ControlledInputMask
                  control={form.control}
                  name="depositDate"
                  mask="99/99/9999"
                  variant="outlined"
                  label="Data de publicação"
                  fullWidth
                  error={!!errors.depositDate}
                  helperText={errors.depositDate?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                <ControlledInputMask
                  control={form.control}
                  name="grantDate"
                  mask="99/99/9999"
                  variant="outlined"
                  label="Data de conclusão"
                  fullWidth
                  error={!!errors.grantDate}
                  helperText={errors.grantDate?.message}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  loading={hasTransferStarted}
                  disabled={hasTransferStarted}
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  {isEditing ? "Atualizar" : "Cadastrar"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>

        <ModalViewEntityDetails
          open={Boolean(payload)}
          title={payload?.title ?? ""}
          data={payload?.data}
          fields={payload?.fields ?? []}
          handleClose={closeDetails}
        />

        <ToastContainer
          open={openToast === "success"}
          message={isEditing ? "Publicacao atualizada com sucesso." : "Publicacao criada com sucesso."} 
          severity="success"
          onClose={() => setOpenToast("")}
        />
        
        <ToastContainer
          open={openToast === "error"}
          message={isEditing ? "Ocorreu um erro ao atualizar essa publicacao." : "Ocorreu um erro ao criar essa publicacao."} 
          severity="error"
          onClose={() => setOpenToast("")}
        />
      </Box>
    </>
  )
}