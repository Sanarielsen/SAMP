import { 
  Box,
  CircularProgress,
  Paper,
  Typography
} from "@mui/material";
import { 
  DataGrid, 
  type GridColDef, 
  type GridValidRowModel 
} from "@mui/x-data-grid";

import BusinessIcon from '@mui/icons-material/Business';

import type { StateQuery } from "@/types/stateQuery";
import BoxError from "./BoxError";
import BoxLoading from "./BoxLoading";


interface DataTableProps<T extends GridValidRowModel> {
  state: StateQuery;
  rows: T[];
  columns: GridColDef<T>[];
}

export default function DataTable<T extends { id: number | string }>({
  state,
  rows,
  columns,
}: DataTableProps<T>) {

  if ( state == "LOADING" ) {
    return (
      <BoxLoading description="Carregando os dados, aguarde..." />
    )
  }

  if ( state == "ERROR" ) {
    return (
      <BoxError description="Erro ao carregar os dados. Tente novamente." />
    )
  }

  if ( rows.length === 0 ) {
    return (
      <Paper sx={{ height: 400, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 4 }}>
        <BusinessIcon fontSize="large" />
        <Typography variant="body2"> Cadastre novos dessa sessão para que sejam exibidos aqui. </Typography>
      </Paper>
    )
  }

  if ( state == "SUCCESS" ) {
    return (
      <Box component="section">
        <Paper sx={{ height: "100%", width: "100%" }}>
          { state === "SUCCESS" ? (
            <DataGrid
              sx={{
                border: 0,

                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  fontWeight: "bold",
                },

                "& .MuiDataGrid-menuIcon button": {
                  color: "primary.contrastText",
                },

                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #eee",
                },

                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#fafafa",
                },

                "& .MuiCheckbox-root": {
                  color: "#1976d2",
                },
              }}
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10, 50]}
              initialState={{
                pagination: {
                  paginationModel: {
                    page: 0,
                    pageSize: 10,
                  },
                },
              }}
              disableColumnMenu
            />
          ) : state === "LOADING" ? (
            <CircularProgress aria-label="Loading…" /> 
          ) : (<>AAAAA</>)
        }
      </Paper>
    </Box>
    )
  }
}