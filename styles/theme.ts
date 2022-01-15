import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#D655AD",
    },
    success: {
      main: "#55D67E",
    },
    text: {
      secondary: "#A2A2A2",
    },
    error: {
      main: red.A400,
    },
  },
});
