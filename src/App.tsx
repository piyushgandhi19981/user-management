import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import UserManagement from "./components/userManagement/UserManagement";
import store from "./reducer/store";

import "./App.css";

const theme = createTheme();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <UserManagement />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
