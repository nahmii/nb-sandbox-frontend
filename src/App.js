import React, { useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AppRoute from './routes'
import { retrieveItem } from './utils/localStorage'
import { setGlobalState } from './state'

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
    useEffect(() => {
        const addressBook = retrieveItem('addressBook')
        setGlobalState('addressBook', addressBook ? addressBook : [])
    }, [])

    return (
        <ThemeProvider theme={THEME}>
            <AppRoute />
        </ThemeProvider>
    )
}

export default App