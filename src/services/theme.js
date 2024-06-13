import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { themeDark, themeLight } from '../styles/theme';

const ThemeService = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const theme = darkMode ? themeDark : themeLight;

    const ThemeToggleButton = () => {
        return (
            <IconButton color="inherit" onClick={toggleTheme}>
                {darkMode ? <DarkModeOutlined /> : <LightModeOutlined />}
            </IconButton>
        )
    }

    const props = {
        theme: {
            theme,
            ThemeToggleButton,
            darkMode
        }
    }

    return (
        <ThemeProvider theme={theme}>
            {React.cloneElement(children, props)}
        </ThemeProvider>
    );
}

export default ThemeService;
export const useTheme = () => React.useContext(ThemeService)