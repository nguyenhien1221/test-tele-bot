import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            background: "#B1B1B1 !important",
            color: "#8D8D8D !important",
          },
        },
      },
    },
  },
});
