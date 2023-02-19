import React from "react";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Response } from "../../Models/response.model";

type FileContentProps = {
    loading: boolean;
    showSegmentCodeCol: boolean;
    data: Response;
    columns: GridColDef[]
  }

const Datatable: React.FC<FileContentProps> = ({ data, showSegmentCodeCol, loading, columns}) => {
  return (
    <div style={{ height: 625 }}>
    <Typography variant="h5" gutterBottom>
      File: {data.fileName}
    </Typography>
    <Typography variant="h5" gutterBottom>
      Records: {data.length}
    </Typography>
    <Typography variant="h5" gutterBottom>
      File contents preview
    </Typography>
    <DataGrid
      getRowId={(row) => row.customerID}
      rows={data.data}
      columns={
        showSegmentCodeCol
          ? columns
          : columns.filter((col) => col.field !== "segmentCode")
      }
      pageSize={10}
      rowsPerPageOptions={[10]}
      loading={loading}
    />
  </div>
  )
}

export default Datatable;