import { useEffect, useState } from "react";
import { tr } from "../lang";
import { CategoryService } from "../services/category";
import { TransactionService } from "../services/transactions";

export const TransactionsProvider = () => {

  const [service] = useState(new TransactionService());
  const [categoryService] = useState(new CategoryService());
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
      .filter(({ expense, pending }) => expense && !pending)
      .map((transaction) => Number(transaction.amount));

    const amountIncome = transactions
      .filter(({ expense, pending }) => !expense && !pending)
      .map((transaction) => Number(transaction.amount));

    const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    const cash = Math.abs(income - expense).toFixed(2);

    setIncome(`${tr("currencySymbol")} ${income}`);
    setExpense(`${tr("currencySymbol")} ${expense}`);
    setCash(`${Number(income) < Number(expense) ? "-" : ""}${tr("currencySymbol")} ${cash}`);
  }, [transactions]);

  const handleAdd = (transaction) => {
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
      id: 'category',
      type: 'dropdown',
      label: tr('category'),
      name: 'category',
      fetch: categoryService.getAll.bind(categoryService)
    },
    {
      id: 'date',
      type: 'date',
      label: tr('date'),
      name: 'date'
    },
    {
      id: 'type',
      type: 'checkbox',
      label: tr('isExpense'),
      name: 'expense',
      value: false
    },
    {
      id: 'pending',
      type: 'checkbox',
      label: tr('pending'),
      name: 'pending',
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