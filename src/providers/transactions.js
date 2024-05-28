import { useEffect, useState } from "react";
import { tr } from "../lang";
import { TransactionService } from "../services/transactions";

export const TransactionsProvider = () => {

  const [service] = useState(new TransactionService());
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [cash, setCash] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = service.listen((data) => {
      setTransactions(data);
      setLoading(false);
    })

    return () => {
      unsubscribe();
    }
  }, [service]);

  useEffect(() => {
    const amountExpense = transactions
      .filter((item) => item.expense)
      .map((transaction) => Number(transaction.amount));

    const amountIncome = transactions
      .filter((item) => !item.expense)
      .map((transaction) => Number(transaction.amount));

    const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    const cash = Math.abs(income - expense).toFixed(2);

    setIncome(`R$ ${income}`);
    setExpense(`R$ ${expense}`);
    setCash(`${Number(income) < Number(expense) ? "-" : ""}R$ ${cash}`);
  }, [transactions]);

  const handleAdd = (transaction) => {
    console.log(transaction);
    service.add(transaction);
  };

  const onDelete = (ID) => {
    service.remove(ID);
  };

  const fields = [
    {
      id: 'desc',
      type: 'text',
      label: tr('description'),
      name: 'desc',
      required: true
    },
    {
      id: 'amount',
      type: 'number',
      label: tr('amount'),
      name: 'amount',
      required: true
    },
    {
      id: 'date',
      type: 'date',
      label: tr('date'),
      name: 'date'
    },
    {
      id: 'category',
      type: 'dropdown',
      label: tr('category'),
      name: 'category'
    },
    {
      id: 'type',
      type: 'checkbox',
      label: tr('isExpense'),
      name: 'expense',
      value: false
    }
  ]

  return {
    transactions,
    fields,
    income,
    expense,
    cash,
    handleAdd,
    onDelete,
    loading,
    stopLoading: () => setLoading(false)
  };
}