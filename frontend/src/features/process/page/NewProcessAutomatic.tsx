import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import {
  Box,
  Button, 
  Grid 
} from "@mui/material";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PersonIcon from '@mui/icons-material/Person';

import { optionsQueryGetProcessHistory } from "@/features/process/api/queryGetProcessHistoric";
import { optionsQueryGetProcessImportedDetails } from "@/features/process/api/queryGetProcessImportedDetails";
import { optionsQueryListImportedProcessPerMagazine } from "@/features/process/api/listImportedProcesses";
import { optionsQueryListProcessHistoricsAsAOptions } from "@/features/process/api/listProcessHistoricsAsAOptions";
import { optionsQueryGetClient } from "@/api/queryGetClient";
import { optionsQueryListClientsWithOptions } from "@/api/listClientsWithOptions";
import { ControlledComboBox } from "@/components/ControlledComboBox";
import HeaderResourceForm from "@/components/HeaderResourceForm";
import ModalViewEntityDetails from "@/components/ModalViewEntityDetails";
import { useDetailsModal } from "@/hooks/useDetailsModal";
import { 
  newProcessAutomaticSchema, 
  type NewProcessAutomaticFormData 
  } from "@/features/process/schema/newProcessAutomaticSchema";
import { processHistoryFields } from "@/features/process/utils/getRowDetailProcessHistory";
import { processImportedFields } from "@/features/process/utils/getRowDetailProcessImported";
import { clientFields } from "@/utils/getRowDetailClient";
  

export default function NewProcessAutomatic() {

  const { 
    data: clientsWithOptions,
    isSuccess: isSuccessClientsWithOptions
  } = useQuery(
    optionsQueryListClientsWithOptions()
  )

  const { 
    data: processHistoricWithOptions,
    isSuccess: isSuccessHistoricWithOptions
  } = useQuery(
    optionsQueryListProcessHistoricsAsAOptions()
  )

  const form = useForm<NewProcessAutomaticFormData>({
    resolver:
      zodResolver(newProcessAutomaticSchema),

    // defaultValues:
    //   isEditing
    //     ? currentClient
    //     : emptyClient,
  })

  const clientId = form.watch("clientId");
  const processHistoricId = form.watch("processHistoricId");
  const importedProcessId = form.watch("importedProcessId");

  const { 
    data: importedProcessesWithOptions,
    isSuccess: isSuccessImportedProcessesWithOptions
  } = useQuery(
    optionsQueryListImportedProcessPerMagazine(processHistoricId)
  )

  const {
    data: currentClient
  } = useQuery(optionsQueryGetClient(clientId!))

  const {
    data: currentProcessHistory
  } = useQuery(optionsQueryGetProcessHistory(processHistoricId!))

      const {
    data: currentProcessImported
  } = useQuery(optionsQueryGetProcessImportedDetails(importedProcessId!))

  const onSubmit: SubmitHandler<NewProcessAutomaticFormData> = async (data) => {
    console.log("Enviou os dados: ", data)
  }

  const { openDetails, closeDetails, payload } = useDetailsModal();

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box component="section" sx={{ p: 8 }}>
          <HeaderResourceForm
            title="Salvar processo importado da revista"
            resource="PROCESSES"
          />
          <Box component="section" sx={{ px: 8 }}>
            <Grid container spacing={4} sx={{ pt: 8, pb: 3 }}>
              <Grid size={{ xs: 12 }}>
                <ControlledComboBox
                  control={form.control}
                  name={'clientId'}
                  label='Cliente:*'
                  placeholder='Cliente a ser considerado'
                  options={ isSuccessClientsWithOptions ? 
                    clientsWithOptions :
                    []
                  }
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
                  name={'processHistoricId'}
                  label='Revista:*'
                  placeholder='Revista exportada a ser considerada'
                  options={ isSuccessHistoricWithOptions ?
                    processHistoricWithOptions :
                    []
                   }
                  tooltipTitle="Visualizar revista selecionada"
                  detailIcon={<ImportContactsIcon fontSize="large"/>}
                  onDetailClick={() =>
                    openDetails({
                      title: "Detalhes da revista importada",
                      data: currentProcessHistory,
                      fields: processHistoryFields,
                    })
                  }
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <ControlledComboBox
                  control={form.control}
                  name={'importedProcessId'}
                  label='Processo:*'
                  placeholder='Processo exportado a ser considerado'
                  options={ isSuccessImportedProcessesWithOptions ?
                    importedProcessesWithOptions : 
                    []
                  }
                  tooltipTitle="Visualizar processo selecionado"
                  detailIcon={<InsertDriveFileIcon fontSize="large"/>}
                  onDetailClick={() =>
                    openDetails({
                      title: "Detalhes do processo importado",
                      data: currentProcessImported,
                      fields: processImportedFields,
                    })
                  }
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  sx={{ marginTop: 2 }}
                  type="submit"
                  variant="contained"
                  size="large"
                  // loading={
                  //   mutationPostAppointment.isPending || 
                  //   mutationPostAppointment.isSuccess 
                  // }
                  // disabled={
                  //   mutationPostAppointment.isPending || 
                  //   mutationPostAppointment.isSuccess 
                  // }
                  fullWidth
                >
                  Cadastrar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <ModalViewEntityDetails
          open={Boolean(payload)}
          title={payload?.title ?? ""}
          data={payload?.data}
          fields={payload?.fields ?? []}
          handleClose={closeDetails}
        />
      </form>
    </>
  )
}