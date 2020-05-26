import React from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from "./routes";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        marginTop: "1rem",
      }
    },
    MuiAlert:{
      root:{
        marginTop: '5px',
      }
    } 
  },
  typography:{
    fontFamily: 'Roboto',
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;
