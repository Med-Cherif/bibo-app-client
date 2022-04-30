import { createTheme } from "@mui/material";
import { pink, indigo } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
      primary: {
        main: indigo['500'],
        dark: indigo['800'],
        light: indigo['100'],
        contrastText: '#fff'
      },
      secondary: {
        main: pink['A700'],
        dark: pink['900'],
        light: pink['A100'],
        contrastText: '#fff',
      },
    },
    typography: {
      fontFamily: '"Poppins", "sans-serif"'
    },
    transitions: {
      duration: {
        standard: 500
      }
    }
  })