import React, { createContext, useContext } from 'react';
import SplashPage from '../pages/splash';
import { AuthenticationService } from "../services/auth";

export const AuthContext = createContext(null);
const auth = new AuthenticationService()

const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        auth.listenAuth(user => {
            console.log('User changed', user);
            setUser(user);
            setLoading(false);
        });
    }, []);

    if (loading) return <SplashPage />

    if (!user && !loading && window.location.pathname !== '/') {
        window.location = '/'
        return <SplashPage />
    }

    return (
        <AuthContext.Provider value={{ user, auth, loading, loggedin: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)    