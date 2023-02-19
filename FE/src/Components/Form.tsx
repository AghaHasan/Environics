import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AlertBar from "./UI/Alert";
import Datatable from "./UI/Datatable";
import { Response } from "../Models/response.model";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "storeID", headerName: "StoreId", width: 100 },
  { field: "postalCode", headerName: "PostalCode", width: 120 },
  { field: "productType", headerName: "ProductType", width: 120 },
  { field: "customerID", headerName: "CustomerId", width: 400 },
  { field: "totalVisits", headerName: "TotalVisits", width: 150 },
  { field: "dollarsSpend", headerName: "DollarsSpend", width: 150 },
  { field: "segmentCode", headerName: "PrizmCode", width: 150 },
];

const Form: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSegmentCodeCol, setShowSegmentCodeCol] = useState<boolean>(false);
  const [filePath, setFilePath] = useState<string>("");
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [response, setResponse] = useState<Response>({
    data: [],
    length: 0,
    fileName: "",
  });

  const isPathValid: boolean = filePath.length > 0;

  const filePathChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilePath(e.target.value);
  };

  const getFileContent = async (type: string) => {
    setResponse({
      data: [],
      length: 0,
      fileName: "",
    });

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://localhost:7126/api/CustomerVisits/${type}?filePath=${filePath}`
      );

      setIsLoading(false);

      if (!response.ok) {
        manageErrorAlert(await response.text());
        return;
      }

      setResponse(await response.json());
      setShowSegmentCodeCol(type === 'preview' ? false : true);
    } catch (err) {
      setIsLoading(false);
      manageErrorAlert("Unable to fetch data!");
    }
  };

  const manageErrorAlert = (message: string) => {
    setShowErrorAlert(true);
    setErrorMessage(message);
    setTimeout(() => {
      setShowErrorAlert(false);
    }, 2500);
  };

  return (
    <Grid container spacing={2} style={{ marginTop: "0px" }}>
      <Grid item xs={12}>
        {showErrorAlert && (
          <AlertBar message={errorMessage} severity="error"></AlertBar>
        )}
      </Grid>

      <Grid item xs={2}></Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Input File"
          onChange={filePathChangeHandler}
        />
      </Grid>
      <Grid item xs={4}>
        <Button
          disabled={!isPathValid || isLoading}
          variant="contained"
          style={{ padding: "15px" }}
          onClick={() => getFileContent('preview')}
        >
          Preview
        </Button>
        <Button
          disabled={!isPathValid || isLoading}
          variant="contained"
          style={{ marginLeft: "5px", padding: "15px" }}
          onClick={() => getFileContent('process')}
        >
          Process
        </Button>
      </Grid>

      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <Datatable
          columns={columns}
          data={response}
          loading={isLoading}
          showSegmentCodeCol={showSegmentCodeCol}
        ></Datatable>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default Form;
