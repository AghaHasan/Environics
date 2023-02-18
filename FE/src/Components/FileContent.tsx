import React from "react";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CustomerVisit } from "../Models/customerVisits.model";

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
  rows: CustomerVisit[];
  loading: boolean;
  fileName: string;
  dataLength: number;
  showPrizmCol: boolean;
}

const FileContent: React.FC<FileContentProps> = ({
  rows,
  loading,
  fileName,
  dataLength,
  showPrizmCol,
}) => {
  return (
    <div style={{ height: 650, width: "100wh", padding: 10 }}>
    <Typography variant="h5" gutterBottom>
      File: {fileName}
    </Typography>
    <Typography variant="h5" gutterBottom>
      Records: {dataLength}
    </Typography>
    <Typography variant="h5" gutterBottom>
      File contents preview
    </Typography>
    <DataGrid
      getRowId={(row) => row.customerID}
      rows={rows}
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

export default FileContent;
