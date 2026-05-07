import { DataGrid, type GridColDef, type GridValidRowModel } from "@mui/x-data-grid";
import { Box, Paper } from "@mui/material";

interface DataTableProps<T extends GridValidRowModel> {
  rows: T[];
  columns: GridColDef<T>[];
}

export default function DataTable<T extends { id: number | string }>({
  rows,
  columns,
}: DataTableProps<T>) {
  return (
    <Box component="section">
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
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
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
}