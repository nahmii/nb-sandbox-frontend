import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AppRoute from './routes'

const THEME = createTheme({
    typography: {
        'fontFamily': `'Lato', sans-serif`,
        'fontSize': 14,
        'fontWeightLight': 300,
        'fontWeightRegular': 400,
        'fontWeightMedium': 500
    },
    textField: {
        border: 'none'
    }
})

const App = () => {
    return (
        <ThemeProvider theme={THEME}>
            <AppRoute />
        </ThemeProvider>
    )
}

export default App