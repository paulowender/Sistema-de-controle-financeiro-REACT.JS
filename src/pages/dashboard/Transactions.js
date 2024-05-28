import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { tr } from '../../lang';
import Transaction from './components/transaction';
import Title from './Title';



export default function TransactionsList({ transactions, onDetails, onDelete }) {
  function preventDefault(event) {
    event.preventDefault();
  }
  return (
    <React.Fragment>
      <Title>{tr('recent')}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{tr('type')}</TableCell>
            <TableCell>{tr('description')}</TableCell>
            <TableCell>{tr('amount')}</TableCell>
            <TableCell>{tr('date')}</TableCell>
            <TableCell>{tr('category')}</TableCell>
            <TableCell align="center">{tr('actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        {tr('showAll')}
      </Link>
    </React.Fragment>
  );
}

