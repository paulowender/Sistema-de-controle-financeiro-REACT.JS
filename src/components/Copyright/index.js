import Typography from '@mui/material/Typography';
import * as React from 'react';
import { tr } from '../../lang';

function AppCopyright(props) {
    let copy = tr('copyright');
    console.log(copy)

    if (copy.includes('{appName}')) {
        const appName = tr('appName');
        copy = copy.replace('{appName}', appName)
    }

    if (copy.includes('{year}')) {
        const year = new Date().getFullYear();
        copy = copy.replace('{year}', year)
    }

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {copy}
        </Typography>
    );
}

export default AppCopyright