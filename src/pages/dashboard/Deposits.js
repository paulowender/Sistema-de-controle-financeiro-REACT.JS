import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';


export default function Deposits({
  title = 'Recent Deposits',
  value = 'R$ 3,024.00',
  icon = 'FaDollarSign',
  updatedAt = 'on 15 March, 2019',
  onClick = () => {},
  details = 'See details'
}) {
  
  function preventDefault(event) {
    event.preventDefault();
    onClick();
  }

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Typography component="p" variant="h4">
        {value}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {updatedAt}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          {details}
        </Link>
      </div>
    </React.Fragment>
  );
}
