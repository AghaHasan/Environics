import React from "react";
import "./App.css";
import DataForm from "./Components/DataForm";
import Header from "./Components/UI/Header";

const App: React.FC = () => {
  return (
    <>
      <Header />

      <DataForm></DataForm>
    </>
  );
}

export default App;