import { Backdrop, Box, CircularProgress, CssBaseline, Grid, Typography } from '@mui/material';
import React from 'react';


export default function LandingPage() {
    const loginImage = '../../assets/images/finance.png';
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CssBaseline />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={false}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="img" src={loginImage} sx={{ width: '100%', height: 'auto' }} alt="login image" />
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%', maxWidth: 400 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Sign in
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Sign in to your account
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Don&apos;t have an account?{' '}
                            <Typography variant="body1" component="span" color="primary" sx={{ cursor: 'pointer' }}>
                                Sign up
                            </Typography>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

