import { useEffect, useState } from "react";
import { TransactionService } from "./services/transactions";
   
export const Controller = () => {

  const [service] = useState(new TransactionService());
  const [transactionsList, setTransactionsList] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = service.listen((data) => {
      setTransactionsList(data);
      setLoading(false);
    })

    return () => {
      unsubscribe();
    }
  }, [service]);
  
  useEffect(() => {
    const amountExpense = transactionsList
      .filter((item) => item.expense)
      .map((transaction) => Number(transaction.amount));

    const amountIncome = transactionsList
      .filter((item) => !item.expense)
      .map((transaction) => Number(transaction.amount));

    const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    const total = Math.abs(income - expense).toFixed(2);

    setIncome(`R$ ${income}`);
    setExpense(`R$ ${expense}`);
    setTotal(`${Number(income) < Number(expense) ? "-" : ""}R$ ${total}`);
  }, [transactionsList]);


  const generateID = () => {
    const id = Math.round(Math.random() * 1000);
    
    if (transactionsList.map((transaction) => transaction.id).includes(id)) {
      return generateID();
    }
    return id;
  };

  const handleAdd = (transaction) => {
    transaction = { ...transaction, id: generateID() };
    console.log(transaction);
    service.add(transaction);
    setTransactionsList([...transactionsList, transaction]);
  };

  const onDelete = (ID) => {
    const newArray = transactionsList.filter((transaction) => transaction.id !== ID);
    setTransactionsList(newArray);

    service.remove(ID);
  };

  return { transactionsList, income, expense, total, handleAdd, onDelete };
}