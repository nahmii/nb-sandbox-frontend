import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from '../views/auth/Dashboard'
import History from '../views/auth/History'

const AppRoute = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Dashboard />} />
                <Route exact path='/history' element={<History />} />
            </Routes>
        </Router>
    )
}

export default AppRoute