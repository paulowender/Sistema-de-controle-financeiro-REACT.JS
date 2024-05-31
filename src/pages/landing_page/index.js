import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import AppCopyright from '../../components/Copyright';
import SignInForm from '../../components/Login/signin';
import SignUpForm from '../../components/Login/signup';
import { AppImages } from '../../constants/images';
import { tr } from '../../lang';


export default function LandingPage(props) {
    const { theme: { ThemeToggleButton } } = props;

    const [signUpForm, setSignUpForm] = React.useState(false);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    flexGrow: 3,
                    height: '100vh',
                    overflow: 'auto',
                    backgroundImage: `url(${AppImages.background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <Box
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1,
                }}
            >
                {/* Logo */}
                <img src={AppImages.logo} alt="logo" height={200} />

                {/* App Name */}
                <h1>{tr('appName')}</h1>

                {/* Login Form */}
                {!signUpForm && <SignInForm signUpClick={() => setSignUpForm(true)} />}
                {signUpForm && <SignUpForm signInClick={() => setSignUpForm(false)} />}
                <AppCopyright sx={{ mt: 4, mb: 4 }} />
                <ThemeToggleButton />
            </Box>
        </Box>
    );
}
