import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Response } from "../../Models/response.model";

type FileContentProps = {
  loading: boolean;
  showSegmentCodeCol: boolean;
  data: Response;
  columns: GridColDef[];
};

const Datatable: React.FC<FileContentProps> = ({
  data,
  showSegmentCodeCol,
  loading,
  columns,
}) => {
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="button" display="block" gutterBottom>
            File: {data.fileName}
          </Typography>
          <Typography variant="button" display="block" gutterBottom>
            Records: {data.length}
          </Typography>
          <Typography variant="button" display="block" gutterBottom>
            <b>File contents preview</b>
          </Typography>

          <Box sx={{ height: 625, marginTop: "5px" }}>
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
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Datatable;
