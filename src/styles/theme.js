import { createTheme } from "@mui/material";

const themeDark = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#008B61",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: "#f44336",
        },
    },
});

const themeLight = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#008B61",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: "#f44336",
        },
    },
});

export { themeDark, themeLight };
