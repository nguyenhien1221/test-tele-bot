import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./config/router";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClient";
import { Slide, ToastContainer } from "react-toastify";
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
          transition={Slide}
          position="top-left"
          hideProgressBar
          closeOnClick
          autoClose={2000}
          limit={1}
          stacked
          className="top-3 h-10  left-[50%] rounded-lg -translate-x-[50%]"
          style={{ height: 40, width: "fit-content" }}
        />
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
