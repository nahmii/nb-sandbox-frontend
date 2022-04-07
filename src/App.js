import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppRoute from './routes';
import RpcProvider from './context/RpcProvider';

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
  const [state, setState] = useState({})
  return (
    <RpcProvider.Provider value={[state, setState]}>
      <Child/>
    </RpcProvider.Provider>
  )
}


const Child = () => {
  const [state, setState] = useContext(RpcProvider)

  useEffect(() => {
    setState(state => ({...state, address: "iudsbdujbnscudjdsl"}))
  }, [])

  console.log(state)
  return (
    <RpcProvider.Provider value={[state, setState]}>
      <ThemeProvider theme={THEME}>
        <AppRoute />
      </ThemeProvider>
    </RpcProvider.Provider>
  )  
}

export default App;