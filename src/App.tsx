import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./config/router";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import NavBar from "./components/common/NavBar";
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
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
