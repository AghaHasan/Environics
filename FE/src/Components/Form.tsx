import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AlertBar from "./UI/Alert";

type FormProps = {
  onRefresh: () => void;
  onLoading: (loading: boolean) => void;
  onSuccess: (data: any) => void;
  onShowPrizmCol: (show: boolean) => void;
  loading: boolean;
};

const Form: React.FC<FormProps> = (props) => {
  const [filePath, setFilePath] = useState<string>("");
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isPathValid: boolean = filePath.length > 0;

  const filePathChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilePath(e.target.value);
  };

  const previewHandler = async () => {
    props.onRefresh();
    props.onLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7126/api/CustomerVisits/preview?filePath=${filePath}`
      );

      if (!response.ok) {
        props.onLoading(false);
        manageErrorAlert(await response.text());
        return;
      }

      props.onSuccess(await response.json());
      props.onShowPrizmCol(false);
      props.onLoading(false);
    } catch (err) {
      props.onLoading(false);
      manageErrorAlert("Unable to fetch data!");
    }
  };

  const processHandler = async () => {
    try {
      props.onRefresh();
      props.onLoading(true);
      const response = await fetch(
        `https://localhost:7126/api/CustomerVisits/process?filePath=${filePath}`
      );

      if (!response.ok) {
        manageErrorAlert(await response.text());
        return;
      }

      props.onSuccess(await response.json());
      props.onShowPrizmCol(true);
      props.onLoading(false);
    } catch (err) {
      props.onLoading(false);
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
          disabled={!isPathValid || props.loading}
          variant="contained"
          style={{ padding: "15px" }}
          onClick={previewHandler}
        >
          Preview
        </Button>
        <Button
          disabled={!isPathValid || props.loading}
          variant="contained"
          style={{ marginLeft: "5px", padding: "15px" }}
          onClick={processHandler}
        >
          Process
        </Button>
      </Grid>
    </Grid>
  );
}

export default Form;