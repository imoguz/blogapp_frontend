import "./App.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAuthContext } from "./context/authContext";
import { CssBaseline } from "@mui/material";

function App() {
  const { darkMode } = useAuthContext();
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#333" : "#fff",
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#1a1a4a" : "#fff",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#555" : "#fff",
            color: darkMode ? "#fff" : "#000",
          },
        },
      },
    },
  });
  return (
    <Provider store={store}>
      <ToastContainer />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Header />
          <AppRouter />
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
