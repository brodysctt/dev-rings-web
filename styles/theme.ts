import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#7A7D8A",
    },
    success: {
      main: "#55D67E",
    },
    text: {
      secondary: "#A2A2A2",
    },
    error: {
      main: "#D6556C",
    },
  },
});
