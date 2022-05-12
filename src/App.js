import React, { useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AppRoute from './routes'
import { retrieveItem } from './utils/localStorage'
import { setGlobalState, useGlobalState } from './state'
import { Backdrop, CircularProgress } from '@mui/material'
import { IntlProvider } from 'react-intl'
import { getLang } from './utils/intl'

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
    const [loading] = useGlobalState('loading')

    useEffect(() => {
        const addressBook = retrieveItem('addressBook')
        setGlobalState('addressBook', addressBook ? addressBook : [])
    }, [])

    return (
        <IntlProvider locale={getLang()} defaultLocale='en'>
            <ThemeProvider theme={THEME}>
                {loading ? (
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                ) : null}
                <AppRoute />
            </ThemeProvider>
        </IntlProvider>
    )
}

export default App