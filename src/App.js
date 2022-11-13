import { alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/js/Header";
import Plans from "./components/js/Plans";
import Footer from "./components/js/Footer";
import Analysis from "./components/js/Analysis";
import "./App.css";
import { useState, useRef } from "react";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      /*primary: {
        //main: "#D6D6D6",
      },
      secondary: {
        main: "#2F3E46",
      },*/
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { minWidth: 0 },
        },
      },
    },
  });
  const [isShown, setIsShown] = useState(false);
  const page = isShown ? <Plans /> : <Analysis />;
  return (
    <div
      className="App"
      style={{
        backgroundColor: "#363636",
      }}
    >
      <ThemeProvider theme={theme}>
        <Header setIsShown={(bool) => setIsShown(bool)} />
        {page}
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
