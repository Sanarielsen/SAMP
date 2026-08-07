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

import { useMutationUpdateProcess } from "@/features/process/api/mutationUpdateImportedProcess";
import { optionsQueryGetProcess } from "@/features/process/api/queryGetProcess";
import { optionsQueryListClientsWithOptions } from "@/api/listClientsWithOptions";
import { optionsQueryGetClient } from "@/api/queryGetClient";;
import ModalLoadProcessINPI from "@/features/process/components/ModalLoadProcessINPI";
import { ControlledComboBox } from "@/components/ControlledComboBox";
import { ControlledInput } from "@/components/ControlledInputText";
import { ControlledInputMask } from "@/components/ControlledInputMask";
import HeaderResourceForm from "@/components/HeaderResourceForm";
import ModalViewEntityDetails from "@/components/ModalViewEntityDetails";
import ToastContainer from "@/components/Toast";
import { useDetailsModal } from "@/hooks/useDetailsModal";
import { 
  manageImportedProcessSchema, 
  type ManageImportedProcessFormData 
} from "@/features/process/schema/manageImportedProcessSchema";
import { 
  listInputNatureValues, 
  listInputPresentationValues 
} from "@/features/process/utils/getMockInputValues";
import { convertDataToServerString } from "@/utils/convertDataToServerString";
import { clientFields } from "@/utils/getRowDetailClient";
import { formatAsVisualOnlyDate } from "@/utils/formatDate2";

import type { ImportedProcessCreateDTO, ImportedProcessFromINPI } from "@shared/types/importedProcess";
import { useMutationPostImportedProcess } from "../api/mutatePostImportedProcessFromINPI";


export default function ManageImportedProcess() {

  const navigate = useNavigate();
  const { id } = useParams()
  const isEditing = !!id;
  const titleSection = !isEditing ? 
    "Criar processo manualmente" :
    "Atualizar processo"

  const [openToast, setOpenToast] = useState("")
  const [openModalSearch, setOpenModalSearch] = useState<boolean>()

  const { 
    data: clientsWithOptions,
    isSuccess: isSuccessClientsWithOptions
  } = useQuery(
    optionsQueryListClientsWithOptions()
  )

  const {
    data: process
  } = useQuery(
    optionsQueryGetProcess(id)
  );

  const form = useForm<ManageImportedProcessFormData>({
    resolver:
      zodResolver(manageImportedProcessSchema),
    defaultValues:
      isEditing && process ? {
        ...process,
        filingDate: process.filingDate
          ? formatAsVisualOnlyDate(process.filingDate)
          : undefined,
        grantDate: process.grantDate
          ? formatAsVisualOnlyDate(process.grantDate)
          : undefined,
        expirationDate: process.expirationDate
          ? formatAsVisualOnlyDate(process.expirationDate)
          : undefined,
      } : {}
    })
  const { errors } = form.formState

  useEffect(() => {
    if (process) {
      form.reset({
        ...process,
        filingDate: process.filingDate
          ? formatAsVisualOnlyDate(process.filingDate)
          : undefined,
        grantDate: process.grantDate
          ? formatAsVisualOnlyDate(process.grantDate)
          : undefined,
        expirationDate: process.expirationDate
          ? formatAsVisualOnlyDate(process.expirationDate)
          : undefined,
      });
    }
  }, [process, clientsWithOptions]);

  const clientId = form.watch("clientId");

  const {
    data: currentClient
  } = useQuery(optionsQueryGetClient(clientId!))

  function executeActionAfterRequest(result: string) {
    setOpenToast(result);
    if (result === "success") {
      setTimeout(() => {
        navigate("/processos");
      }, 5000);
    }
  }

  const mutationPostImportedProcess =
    useMutationPostImportedProcess({
      onSuccess: () => {
        executeActionAfterRequest("success");
      },
      onError: () => {
        executeActionAfterRequest("error");
      },
    })

  const mutationUpdateProcess =
    useMutationUpdateProcess({
      onSuccess: () => {
        executeActionAfterRequest("success");
      },
      onError: () => {
        executeActionAfterRequest("error");
      },
    })

  const { openDetails, closeDetails, payload } = useDetailsModal();

  function handleTransferProcess(process: ImportedProcessFromINPI) {
    form.setValue("processNumber", process.processNumber ?? "")
    form.setValue("processMagazine", process.processMagazine ?? "")
    form.setValue("processStatus", process.processStatus ?? "")
    form.setValue("holder", process.holder ?? "")
    form.setValue("brand", process.brand ?? "")
    form.setValue("nature", process.nature ?? "")
    form.setValue("presentation", process.presentation ?? "")
    form.setValue("specification", process.specification ?? "")
    form.setValue("filingDate", formatAsVisualOnlyDate(process.filingDate))
    form.setValue("grantDate", formatAsVisualOnlyDate(process.grantDate))
    form.setValue("expirationDate", formatAsVisualOnlyDate(process.expirationDate))
    setOpenModalSearch(false)
  }

  const hasTransferStarted = 
    mutationPostImportedProcess.isPending ||
    mutationUpdateProcess.isPending ||
    mutationPostImportedProcess.isSuccess ||
    mutationUpdateProcess.isSuccess

  const onSubmit: SubmitHandler<ManageImportedProcessFormData> = async (data) => {

    const payload: ImportedProcessCreateDTO = {
      ...data,
      userIdLogged: 'aa',
      filingDate: data.filingDate 
        ? new Date(convertDataToServerString(data.filingDate ?? "")) 
        : undefined,
      grantDate: data.grantDate
        ? new Date(convertDataToServerString(data.grantDate ?? ""))
        : undefined,
      expirationDate: data.expirationDate
        ? new Date(convertDataToServerString(data.expirationDate ?? ""))
        : undefined,
      }

    if (isEditing) {

      mutationUpdateProcess.mutate({
        id,
        ...payload
      })

      return;
    }
    mutationPostImportedProcess.mutate(payload)
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
              { !isEditing && (
                <Grid size={{ xs: 12 }}>
                  <Button
                    type="button"
                    variant="outlined"
                    fullWidth
                    onClick={() => setOpenModalSearch(true)}
                  >
                    Carregar dados do INPI
                  </Button>
                </Grid>
              ) }
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
                  type="number"
                  name="processMagazine"
                  label="Número da revista:*"
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
              <Grid size={{ xs: 12 }}>
                <ControlledInput
                  control={form.control}
                  name="processStatus"
                  label="Status:*"
                  fullWidth
                  error={!!errors?.processStatus}
                  helperText={
                    String(errors?.processStatus?.message ?? "")
                  }
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
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
              <Grid size={{ xs: 12, sm: 6 }}>
                <ControlledComboBox
                  control={form.control}
                  name={'nature'}
                  label='Natureza:*'
                  placeholder='Natureza da marca considerada'
                  options={listInputNatureValues}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
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
              
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ControlledInputMask
                  control={form.control}
                  name="filingDate"
                  mask="99/99/9999"
                  variant="outlined"
                  label="Data de Depósito"
                  fullWidth
                  error={!!errors.filingDate}
                  helperText={errors.filingDate?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ControlledInputMask
                  control={form.control}
                  name="grantDate"
                  mask="99/99/9999"
                  variant="outlined"
                  label="Data de Concessão"
                  fullWidth
                  error={!!errors.grantDate}
                  helperText={errors.grantDate?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <ControlledInputMask
                  control={form.control}
                  name="expirationDate"
                  mask="99/99/9999"
                  variant="outlined"
                  label="Data de Vigência"
                  fullWidth
                  error={!!errors.expirationDate}
                  helperText={errors.expirationDate?.message}
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

        <ModalLoadProcessINPI
          open={openModalSearch}
          handleClickTransfer={handleTransferProcess}
          handleClose={() => setOpenModalSearch(false)}
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