import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            background: "#D9D9D9",
            color: "#747474",
          },
        },
      },
    },
  },
});
