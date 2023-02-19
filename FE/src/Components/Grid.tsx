import React from "react";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Response } from "../Models/response.model";

const columns: GridColDef[] = [
  { field: "storeID", headerName: "StoreId", width: 150 },
  { field: "postalCode", headerName: "PostalCode", width: 150 },
  { field: "productType", headerName: "ProductType", width: 150 },
  { field: "customerID", headerName: "CustomerId", width: 450 },
  { field: "totalVisits", headerName: "TotalVisits", width: 150 },
  { field: "dollarsSpend", headerName: "DollarsSpend", width: 150 },
  { field: "segmentCode", headerName: "PrizmCode", width: 150 },
];

type FileContentProps = {
  loading: boolean;
  showPrizmCol: boolean;
  fileContent: Response;
}

const Grid: React.FC<FileContentProps> = (props) => {
  const { fileContent, loading, showPrizmCol } = props;

  return (
    <div style={{ height: 650, width: "100wh", padding: 10 }}>
    <Typography variant="h5" gutterBottom>
      File: {fileContent.fileName}
    </Typography>
    <Typography variant="h5" gutterBottom>
      Records: {fileContent.length}
    </Typography>
    <Typography variant="h5" gutterBottom>
      File contents preview
    </Typography>
    <DataGrid
      getRowId={(row) => row.customerID}
      rows={fileContent.data}
      columns={
        showPrizmCol
          ? columns
          : columns.filter((col) => col.field !== "segmentCode")
      }
      pageSize={10}
      rowsPerPageOptions={[10]}
      loading={loading}
    />
  </div>
  );
};

export default Grid;
