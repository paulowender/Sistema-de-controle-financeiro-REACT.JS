import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Title from './Title';


export default function Cash({
  title = 'Cash',
  value = '00,00',
  updatedAt = '',
  onClick = () => { },
  details = ''
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
      {details && <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          {details}
        </Link>
      </div>}
    </React.Fragment>
  );
}
