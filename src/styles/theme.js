import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const themeDark = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: grey[900],
        },
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
        background: {
            default: grey[100],
        },
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

