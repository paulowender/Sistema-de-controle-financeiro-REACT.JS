import { Alert, CssBaseline, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { tr } from '../../lang';
import { AuthenticationService } from '../../services/auth';

const SignInForm = (props) => {
    const { signUpClick = () => { }, signInClick = () => { } } = props

    const authService = new AuthenticationService();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        severity: 'error',
        message: '',
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            email: '',
            password: '',
            severity: 'error',
            message: '',
        };

        if (!formData.email) {
            newErrors.email = tr('emailRequired');
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = tr('passwordRequired');
            valid = false;
        }

        // Password strength check
        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        // if (!passwordRegex.test(formData.password)) {
        //     newErrors.password = tr('passwordStrength');
        //     valid = false;
        // }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            authService.signIn(formData.email, formData.password)
                .then((userCredentials) => {
                    console.log('Logged in', userCredentials.user);

                })
                .catch((error) => {
                    console.log('Login failed', error);
                    setErrors({ severity: 'error', message: tr('emailOrPasswordInvalid') });
                });

        } else {
            console.log('Login failed');
        }
    };

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'rememberMe' ? checked : value,
        });
    };

    return (
        <Grid
            item
            xs={12}
            sm={8}
            md={5}
        // component={Paper}
        // elevation={6}
        // square
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: '500px',
                    margin: 'auto',
                    padding: '20px',
                    // borderRadius: '8px',
                    // boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    // backgroundColor: 'white',
                }}
            >
                <CssBaseline />
                <TextField
                    fullWidth
                    label={tr('email')}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    margin="dense"
                />
                <TextField
                    fullWidth
                    type="password"
                    label={tr('password')}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    margin="dense"
                    sx={{ mt: 2 }}
                />
                <FormControlLabel
                    control={<Checkbox checked={formData.rememberMe} onChange={handleChange} name="rememberMe" color="primary" />}
                    label={tr('rememberMe')}
                    sx={{ mt: 1, textAlign: 'left' }}
                />
                {errors.message && <Alert
                    variant="filled"
                    severity={errors.severity}
                    onClose={() => setErrors({ ...errors, message: '' })}
                >
                    {errors.message}
                </Alert>}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    {tr('signIn')}
                </Button>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Link href="#" variant="body2">
                        {tr('forgotPassword')}
                    </Link>
                    <Box mt={1}>
                        <Link href="#" variant="body2" onClick={signUpClick}>
                            {tr('dontHaveAccount')}
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default SignInForm;