import { TableCell, TableRow } from "@mui/material";
import { FaEdit, FaRegArrowAltCircleDown, FaRegArrowAltCircleUp, FaTrash } from "react-icons/fa";
import { tr } from "../../../lang";

const Transaction = ({ transaction, onDelete, onEdit }) => {
  const { id, desc, amount, date, category, expense } = transaction
  return (
    <TableRow key={id}>
      <TableCell>
        {expense ? <FaRegArrowAltCircleDown color="red" /> : <FaRegArrowAltCircleUp color="green" />}
      </TableCell>
      <TableCell>{desc}</TableCell>
      <TableCell>{`${tr('currencySymbol')} ${amount}`}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell align="center">
        <FaEdit onClick={() => onEdit(transaction)} />
        &nbsp;&nbsp;
        <FaTrash onClick={() => onDelete(transaction)} />
      </TableCell>
    </TableRow>
  );
}

export default Transaction;