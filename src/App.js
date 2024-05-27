import React from "react";
import GlobalStyle from "./styles/global";
import Header from "./components/Header";
import Resume from "./components/Resume";
import Form from "./components/Form";
import { Controller } from "./controller";

const App = () => {

  const controller = Controller();

  const {
    income,
    expense,
    total,
    handleAdd,
    transactionsList,
    setTransactionsList,
    onDelete
  } = controller;

  return (
    <>
      <Header />
      <Resume income={income} expense={expense} total={total} />
      <Form
        handleAdd={handleAdd}
        transactionsList={transactionsList}
        setTransactionsList={setTransactionsList}
        onDelete={onDelete}
      />
      <GlobalStyle />
    </>
  );
};

export default App;
