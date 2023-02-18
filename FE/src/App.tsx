import React, { useState } from "react";
import "./App.css";
import FileContent from "./Components/FileContent";
import InputFileForm from "./Components/InputFileForm";
import Header from "./Components/UI/Header";
import { CustomerVisit } from "./Models/customerVisits.model";
import { Response } from "./Models/response.model";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [dataLength, setDataLength] = useState<number>(0);
  const [tableData, setTableData] = useState<CustomerVisit[]>([]);
  const [showPrizmCol, setShowPrizmCol] = useState<boolean>(false);

  const getDataHandler = (result: Response) => {
    setFileName(result.fileName);
    setDataLength(result.length);
    setTableData(result.data);
  };

  const loadingHandler = (loading: boolean) => {
    setIsLoading(loading);
  };

  const refreshHandler = () => {
    setFileName("");
    setDataLength(0);
    setTableData([]);
  };

  return (
    <>
      <Header />
      <InputFileForm
        loading={isLoading}
        onLoading={loadingHandler}
        onSuccess={getDataHandler}
        onRefresh={refreshHandler}
        onShowPrizmCol={(value) => setShowPrizmCol(value)}
      ></InputFileForm>
      <FileContent
        showPrizmCol={showPrizmCol}
        dataLength={dataLength}
        fileName={fileName}
        loading={isLoading}
        rows={tableData}
      ></FileContent>
    </>
  );
}
