import { alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/js/Header";
import Plans from "./components/js/Plans";
import Footer from "./components/js/Footer";
import "./App.css";

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
  return (
    <div
      className="App"
      style={{
        backgroundColor: "#363636",
      }}
    >
      <ThemeProvider theme={theme}>
        <Header />
        <Plans />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
