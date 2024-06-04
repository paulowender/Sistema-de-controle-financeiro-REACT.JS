import { LinearProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import AppCopyright from '../../components/Copyright';
import { AppImages } from '../../constants/images';
import { tr } from '../../lang';

export default function SplashPage(props) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    flexGrow: 3,
                    height: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1,
                    overflow: 'auto',
                    backgroundImage: `url(${AppImages.background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Logo */}
                <img src={AppImages.logo} alt="logo" height={200} />

                {/* App Name */}
                <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    sx={{
                        color: 'white',
                        mt: 1
                    }} >
                    {tr('appName')}
                </Typography>

                <AppCopyright sx={{ color: 'white', mt: 1 }} />

                <LinearProgress color="secondary" sx={{ width: 200, mt: 2 }} />
            </Box>
        </Box>
    );
}
