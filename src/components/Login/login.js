import { CssBaseline, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = { username: '', password: '' };

        if (!formData.username) {
            newErrors.username = 'Username is required';
            valid = false;
        }

        // Password strength check
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!formData.password || !passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters with at least one uppercase and one lowercase letter';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Add your login logic here
            console.log('Login successful');
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
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    // backgroundColor: 'white',
                }}
            >
                <CssBaseline />
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    margin="normal"
                    sx={{ mt: 2 }}
                />
                <FormControlLabel
                    control={<Checkbox checked={formData.rememberMe} onChange={handleChange} name="rememberMe" color="primary" />}
                    label="Remember Me"
                    sx={{ mt: 1, textAlign: 'left' }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Link href="#" variant="body2">
                        Forgot Password?
                    </Link>
                    <Box mt={1}>
                        <Link href="#" variant="body2">
                            Don't have an account? Sign Up
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default LoginForm;