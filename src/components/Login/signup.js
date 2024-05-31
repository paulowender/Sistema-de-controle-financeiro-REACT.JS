import { Alert, CssBaseline, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { tr } from '../../lang';

const SignUpForm = (props) => {
    const { authService, signInClick = () => { } } = props

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        agreeTerms: false,
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        severity: 'error',
        message: '',
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            severity: 'error',
            message: '',
        };

        if (!formData.name) {
            newErrors.name = tr('nameRequired');
            valid = false;
        }

        if (!formData.email) {
            newErrors.email = tr('emailRequired');
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = tr('passwordRequired');
            valid = false;
        }

        if (!formData.passwordConfirm) {
            newErrors.passwordConfirm = tr('passwordConfirmRequired');
            valid = false;
        }

        if (formData.password !== formData.passwordConfirm) {
            newErrors.passwordConfirm = tr('passwordsDontMatch');
            valid = false;
        }

        if (valid && !formData.agreeTerms) {
            newErrors.message = tr('agreeTermsRequired');
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            authService.signUp(formData.email, formData.password)
                .then((userCredentials) => {
                    console.log('Logged in', userCredentials.user);
                    if (userCredentials) {
                        window.location = '/dashboard';
                    }
                })
                .catch((error) => {
                    console.log('Sign up failed', error);
                    setErrors({ severity: 'error', message: tr('failedToSignUp') });
                });

        } else {
            console.log('Sign up failed');
        }
    };

    const handleChange = (e) => {
        const { name, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'agreeTerms' ? checked : value,
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
                    label={tr('name')}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    margin="dense"
                />
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
                />
                <TextField
                    fullWidth
                    type="password"
                    label={tr('passwordConfirm')}
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    error={Boolean(errors.passwordConfirm)}
                    helperText={errors.passwordConfirm}
                    margin="dense"
                />
                <FormControlLabel
                    control={<Checkbox checked={formData.agreeTerms} onChange={handleChange} name="agreeTerms" color="primary" />}
                    label={tr('agreeTerms')}
                    sx={{ textAlign: 'left' }}
                />
                {errors.message && <Alert
                    variant="filled"
                    severity={errors.severity}
                    onClose={() => setErrors({ ...errors, message: '' })}
                >
                    {errors.message}
                </Alert>}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    {tr('signUp')}
                </Button>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Box mt={1}>
                        <Link href="#" variant="body2" sx={{ cursor: 'pointer' }} onClick={signInClick}>
                            {tr('alreadyHaveAccount')}
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default SignUpForm;