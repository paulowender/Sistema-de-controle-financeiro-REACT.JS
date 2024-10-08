import { Badge, Box, TableCell, TableRow } from "@mui/material";
import { FaEdit, FaRegArrowAltCircleDown, FaRegArrowAltCircleUp, FaTrash } from "react-icons/fa";
import { toCurrency } from "../../../helpers/currency";
import { dateFormat } from "../../../helpers/date";
import { tr } from "../../../lang";

const Transaction = ({ transaction, onDelete, onEdit }) => {
  const { id, desc, amount, date, category, pending, expense } = transaction
  const isExpense = category.type === 'expense' || expense
  const dued = new Date(date) < new Date()
  const statusColor = pending ? dued ? 'error' : 'warning' : 'success'

  return (
    <TableRow key={id}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        {isExpense ? <FaRegArrowAltCircleDown color="red" /> : <FaRegArrowAltCircleUp color="green" />}
        <Box sx={{ display: 'inline', ml: 1 }} >
          {tr(isExpense ? 'expense' : 'income')}
        </Box>
      </TableCell>
      <TableCell>{desc}</TableCell>
      <TableCell>{toCurrency(amount)}</TableCell>
      <TableCell>{dateFormat(date)}</TableCell>
      <TableCell>{category.label || category}</TableCell>
      <TableCell align="center">
        <Badge color={statusColor} badgeContent={tr(pending ? 'pending' : 'paid')} />
      </TableCell>
      <TableCell align="center">
        <FaEdit onClick={() => onEdit(transaction)} />
        &nbsp;&nbsp;
        <FaTrash onClick={() => onDelete(transaction)} />
      </TableCell>
    </TableRow>
  );
}

export default Transaction;