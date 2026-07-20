import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  Button,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { optionsQueryListProcessCategoryAsAOptions } from "@/features/process/api/queryListProcessCategoryAsAOptions";
import { optionsQueryListProcessTypeAsAOptions } from "@/features/process/api/queryListProcessTypeAsAnOption";
import { optionsQueryListProcessHistoricsAsAOptions } from "@/features/process/api/listProcessHistoricsAsAOptions";
import { optionsQueryPostQueryImportedProcessWithDetails } from "@/features/process/api/mutatePostQueryImportedProcessWithDetails";
import DataTableImportedProcessColumns from "@/features/process/components/DataTableImportedProcessColumns";
import { ControlledInput } from "@/components/ControlledInputText";
import { ControlledComboBox } from "@/components/ControlledComboBox";
import DataTable from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";
import ModalNewMagazine from "@/features/process/components/ModalNewMagazine";
import PanelFilterGroup from "@/components/PanelFilterGroup";
import PanelFilterItem from "@/components/PanelFilterItem";
import ToastContainer from "@/components/Toast";
import {
  filterImportedProcessesSchema,
  type FilterImportedProcessesFormData
} from "@/features/process/schema/filterImportedProcesses";

import type { ImportedProcessFilter } from "@shared/types/processImported";


export default function ViewImportedProcess() {

  const [openToast, setOpenToast] = useState("")
  const [modalNewMagazine, setModalNewMagazine] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [payloadFilter, setPayloadFilter] = useState<ImportedProcessFilter>({
    categoryId: '',
    historyId: '',
    typeId: '',
  });

  const form = useForm<FilterImportedProcessesFormData>({
    resolver:
      zodResolver(filterImportedProcessesSchema),
  });
  const { errors } = form.formState

  const searchValue = form.watch("search");

  const {
    data: listProcessCategoryAsAOptions,
    isSuccess: isSuccessCategoryOptions,
  } = useQuery(
    optionsQueryListProcessCategoryAsAOptions()
  );

  const {
    data: listProcessTypeAsAOptions,
    isSuccess: isSuccessTypeOptions,
  } = useQuery(
    optionsQueryListProcessTypeAsAOptions()
  );

  const {
    data: processHistoricWithOptions,
    isSuccess: isSuccessHistoricWithOptions
  } = useQuery(
    optionsQueryListProcessHistoricsAsAOptions()
  )

  const {
    data: importedProcessWithDetails,
    isSuccess,
    isLoading,
    isError,
  } = useQuery(
    optionsQueryPostQueryImportedProcessWithDetails({
      search: searchValue ?? undefined,
      payload: {
        ...payloadFilter,
        categoryId: payloadFilter.categoryId,
      },
      isSubmitted
    })
  )

  const onSubmit: SubmitHandler<FilterImportedProcessesFormData> = async (data) => {
    
    setPayloadFilter({
      ...data
    })
    setIsSubmitted(true)
  }

  const stateQuery =
    isSuccess ? "SUCCESS" : 
    isLoading ? "LOADING" :
    isError ? "ERROR" : 
    !isSubmitted ? "IDLE"
    : 'IDLE'

  return (
    <>
      <Box component="section" sx={{ marginTop: 2 }}>
        <HeaderPage title="Listagem de processos importados"/>

        <Box component="section" sx={{ px: 2 }}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <PanelFilterGroup title="Filtros da listagem de processos">

              <PanelFilterItem>
                <ControlledInput
                  control={form.control}
                  name={'search'}
                  label='Campo de pesquisa dos processos'
                  error={!!errors?.search}
                  helperText={
                    String(errors?.search?.message ?? "")
                  }
                  fullWidth
                />
              </PanelFilterItem>

              <PanelFilterItem>
                <ControlledComboBox
                  control={form.control}
                  name={'categoryId'}
                  label='Categoria'
                  placeholder='Categoria do processo'
                  options={ isSuccessCategoryOptions ?
                    listProcessCategoryAsAOptions :
                    []
                  }
                />
              </PanelFilterItem>

              <PanelFilterItem>
                <ControlledComboBox
                  control={form.control}
                  name={'typeId'}
                  label='Tipo'
                  placeholder='Tipo do processo'
                  options={ isSuccessTypeOptions ?
                    listProcessTypeAsAOptions :
                    []
                  }
                />
              </PanelFilterItem>

              <PanelFilterItem>
                <ControlledComboBox
                  control={form.control}
                  name={'historyId'}
                  label='Revista'
                  placeholder='Revista do processo'
                  options={isSuccessHistoricWithOptions ?
                    processHistoricWithOptions :
                    []
                  }
                />
              </PanelFilterItem>

              <PanelFilterItem>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: { xs: "100%", md: "auto" }, }}
                >
                  <SearchIcon fontSize="medium" />
                  Pesquisar
                </Button>
              </PanelFilterItem>
            </PanelFilterGroup>
          </form>
        </Box>

        <Box component="section" sx={{ p: 2}}>
          <DataTable
            state={stateQuery}
            rows={isSuccess ?
              importedProcessWithDetails : []
            }
            columns={DataTableImportedProcessColumns({
              onClickSeeItem: (current) => console.log("Ver os dados dessa importacao: ", current),
            })}
          />
        </Box>
      </Box>

      <ModalNewMagazine
        open={modalNewMagazine}
        onSubmitImport={(action) => {
          setOpenToast(action);
          setModalNewMagazine(false)
        }}
        handleClose={() => setModalNewMagazine(false)}
      />

      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao consultar os processos importados."
        severity="error"
        onClose={() => setOpenToast("")}
      />
    </>
  )
}