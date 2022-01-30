import { createTheme } from "@mui/material/styles";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#4DD0E1", // "#7A7D8A",
    },
    success: {
      main: "#6CD655", //"#55D6BF", //"#55D67E",
    },
    text: {
      secondary: "#A2A2A2",
    },
    error: {
      main: "#D6556C",
    },
  },
});
