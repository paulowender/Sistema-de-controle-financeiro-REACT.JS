import React from "react";
import GlobalStyle from "../styles/global";
import Header from "../components/Header";
import Resume from "../components/Resume";
import Form from "../components/Form";
import { TransactionsProvider } from "../providers/transactions";
import Dashboard from "./dashboard/Dashboard";

const App = () => {

  const controller = TransactionsProvider();

  const {
    income,
    expense,
    total,
    handleAdd,
    transactionsList,
    setTransactionsList,
    onDelete,
    loading
  } = controller;

  if (!loading) {
    return <Dashboard />
    // return (
    //   <>
    //   <Header />
    //   <Loading />
    //   <GlobalStyle />
    // </>
    // )
  }

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
