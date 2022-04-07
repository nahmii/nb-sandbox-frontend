import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppRoute from './routes';
import { getTokenSupply } from './hooks/useContract'
import { commify, insertDecimalSeparator } from './utils/format'
import GlobalStateProvider from './context/GlobalState';

const THEME = createTheme({
  typography: {
   "fontFamily": `'Lato', sans-serif`,
   "fontSize": 14,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  },
  textField: {
    border: "none"
  }
});

const App = () => {
  return (
    <GlobalStateProvider>
      <ThemeProvider theme={THEME}>
        <AppRoute />
      </ThemeProvider>
    </GlobalStateProvider>
  )
}


// const Child = () => {
//   const [state, setState] = useContext(GlobalState)
//   const [totalSupply, setTotalSupply] = useState('0.0000')

//   useEffect(() => {
    
//     setState(state => (
//       {...state, totalSupply: "8r98fjsdoksdnc"}
//     ))
//   }, [])

//   console.log(state)
//   return (
//     // <GlobalState.Provider value={[state, setState]}>
      
//     // </GlobalState.Provider>
//   )  
// }

export default App;