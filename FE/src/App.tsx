import React, { useState } from "react";
import "./App.css";
import Grid from "./Components/Grid";
import Form from "./Components/Form";
import Header from "./Components/UI/Header";
import { Response } from "./Models/response.model";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPrizmCol, setShowPrizmCol] = useState<boolean>(false);
  const [fileContent, setFileContent] = useState<Response>({ data: [], fileName: '', length: 0 })

  const getDataHandler = (result: Response) => {
    setFileContent(result);
  };

  const loadingHandler = (loading: boolean) => {
    setIsLoading(loading);
  };

  const refreshHandler = () => {
    setFileContent({ data: [], fileName: '', length: 0 })
  };

  return (
    <>
      <Header />
      <Form
        loading={isLoading}
        onLoading={loadingHandler}
        onSuccess={getDataHandler}
        onRefresh={refreshHandler}
        onShowPrizmCol={(value) => setShowPrizmCol(value)}
      ></Form>
      <Grid
        showPrizmCol={showPrizmCol}
        loading={isLoading}
        fileContent={fileContent}
      ></Grid>
    </>
  );
}
