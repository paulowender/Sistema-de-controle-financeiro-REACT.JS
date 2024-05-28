import { createTheme } from "@mui/material";

const themeDark = createTheme({
    palette: {
        mode: "dark",
    },
});

const themeLight = createTheme({
    palette: {
        mode: "light",
    },
});

export { themeDark, themeLight };
