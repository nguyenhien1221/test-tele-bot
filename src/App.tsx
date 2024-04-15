import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./config/router";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClient";
declare global {
  interface Window {
    Telegram: any;
  }
}

function App() {
  const tele = window.Telegram.WebApp;

  useEffect(() => {
    tele.ready();
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
