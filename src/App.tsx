import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./config/router";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClient";
import { ToastContainer } from "react-toastify";
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
        <ToastContainer
          stacked
          className="top-3 w-[272px] left-[50%] -translate-x-[50%]"
        />
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
