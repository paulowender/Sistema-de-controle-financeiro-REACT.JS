import { Backdrop, CircularProgress } from '@mui/material';
import React, { createContext, useContext } from 'react';
import { AuthenticationService } from "../services/auth";

export const AuthContext = createContext(null);
const authService = new AuthenticationService()

const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        authService.listenAuth(user => {
            console.log('User changed', user);
            setUser(user);
            setLoading(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user, authService, loading, loggedin: !!user }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)    