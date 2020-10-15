import "react-perfect-scrollbar/dist/css/styles.css";
import React,{useReducer} from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "../src/components/GlobalStyles";
import theme from "../src/theme";
import routes from "../src/routes";

export const GolbalContext = React.createContext(null)
export const initialState = {
  audioURL: "hello",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_URL":
      return {
        ...state,
        audioURL: action.payload,
      };

    default:
      return state;
  }
};
const App = () => {
  const routing = useRoutes(routes);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GolbalContext.Provider value={{
      state,dispatch
    }}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  </GolbalContext.Provider>

  );
};

export default App;
